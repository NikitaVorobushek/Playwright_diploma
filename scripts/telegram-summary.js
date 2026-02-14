import { readFileSync, existsSync } from 'fs';
import { dirname, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { buildChartUrl } from './build-chart-url.js';

// const resultsDir = join(process.cwd(), 'allure-results');
// const token = process.env.TELEGRAM_BOT_TOKEN;
// const chatId = process.env.TELEGRAM_CHAT_ID;
// const reportLink = process.env.REPORT_LINK || '';
// const runLink = process.env.RUN_LINK || '';

// if (!token || !chatId) {
//   console.log('TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set, skipping summary');
//   process.exit(0);
// }

// let passed = 0, failed = 0, skipped = 0;

// if (existsSync(resultsDir)) {
//   const files = readdirSync(resultsDir).filter(f => f.endsWith('-result.json'));
//   for (const file of files) {
//     try {
//       const data = JSON.parse(readFileSync(join(resultsDir, file), 'utf8'));
//       const status = (data.status || data.state || '').toLowerCase();
//       if (status === 'passed') passed++;
//       else if (status === 'failed' || status === 'broken') failed++;
//       else if (status === 'skipped') skipped++;
//       else passed++;
//     } catch (_) {}
//   }
// }

// const total = passed + failed + skipped;
// const statusText = failed === 0 ? 'success' : 'failure';

// let text = `Прогон тестов завершен
// Статус: ${statusText}
// 📊 Всего пройдено: ${total}
// 😁 Успешные: ${passed}
// 😡 Провалено: ${failed}
// 👻 Пропущено: ${skipped}`;

// if (reportLink) text += `\n\n📎 <a href="${reportLink}">Allure отчёт</a>`;
// if (runLink) text += ` | <a href="${runLink}">Open run</a>`;

// const params = new URLSearchParams({ chat_id: chatId, parse_mode: 'HTML', text });
// const body = params.toString();

// const req = request({
//   hostname: 'api.telegram.org',
//   path: `/bot${token}/sendMessage`,
//   method: 'POST',
//   headers: { 
//     'Content-Type': 'application/x-www-form-urlencoded',
//     'Content-Length': Buffer.byteLength(body) 
//   },
// }, (res) => {
//   res.on('data', () => {});
//   res.on('end', () => {
//     console.error('Telegram API error:', res.statusCode);
//     process.exit(0);
//   });
// });
// req.on('error', (e) => {
//   console.error('Failed to send Telegram summary:', e.message);
//   process.exit(0);
// });
// req.write(body);
// req.end();

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

const SUMMARY_PATH = resolve(ROOT, process.argv[2] || 'allure-report/summary.json');

function loadSummary(path) {
  if (!existsSync(path)) {
    throw new Error(`Summary file not found: ${path}`);
  }
  return JSON.parse(readFileSync(path, 'utf8'));
}

function loadTelegramConfig() {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chat = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chat) {
    throw new Error('Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID environment variables.');
  }
  return { token, chat };
}

function getStats(summary) {
  const stats = summary.stats ?? {};
  const total = stats.total ?? 0;
  const failed = stats.failed ?? 0;
  const broken = stats.broken ?? 0;
  const skipped = stats.skipped ?? 0;
  const unknown = stats.unknown ?? 0;
  const passed = stats.passed ?? Math.max(0, total - failed - broken - skipped - unknown);
  return { total, passed, failed, broken, skipped, unknown };
}

function formatDurationMs(ms) {
  if (ms == null || ms < 0) return '00:00:00.000';
  const totalSec = ms / 1000;
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const secInt = Math.floor(s);
  const millis = Math.round((s - secInt) * 1000);
  const secPart = `${String(secInt).padStart(2, '0')}.${String(millis).padStart(3, '0')}`;
  return [h, m, secPart].map((x) => String(x).padStart(2, '0')).join(':');
}

function buildCaption(summary, stats, options = {}) {
  const { name, duration, createdAt } = summary;
  const { total, passed, failed, broken, skipped, unknown } = stats;
  const project = options.project ?? name ?? 'Allure Report';
  const environment = 'git actions';
  const reportLink = options.reportLink ?? 'https://nikitavorobushek.github.io/Playwright_diploma/';

  const pct = (n) => (total > 0 ? ((n / total) * 100).toFixed(1) : '0');
  const lines = [
    `*${project}*`,
    '',
    '*Results:*',
    `Environment: ${environment}`,
  ];
  if (options.comment) lines.push(`Comment: ${options.comment}`);
  lines.push(
    `Duration: ${formatDurationMs(duration)}`,
    `Total scenarios: ${total}`,
    `Total passed: ${passed} (${pct(passed)} %)`,
    `Total failed: ${failed} (${pct(failed)} %)`,
    `Total broken: ${broken}`,
    `Total unknown: ${unknown}`,
    `Total skipped: ${skipped}`
  );
  lines.push(`Report: ${reportLink}`);
  if (createdAt) lines.push(`Run: ${new Date(createdAt).toISOString()}`);

  return lines.join('\n');
}

async function sendPhotoToTelegram(token, chatId, photoUrl, caption) {
  const url = `https://api.telegram.org/bot${token}/sendPhoto`;
  const body = {
    chat_id: chatId,
    photo: photoUrl,
    caption,
    parse_mode: 'Markdown',
    disable_web_page_preview: true,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Telegram API error ${res.status}: ${err}`);
  }
  const data = await res.json();
  if (!data.ok) {
    throw new Error(`Telegram error: ${data.description || JSON.stringify(data)}`);
  }
}

async function main() {
  const summary = loadSummary(SUMMARY_PATH);
  const { token, chat } = loadTelegramConfig();
  const stats = getStats(summary);

  const chartUrl = buildChartUrl(stats);
  const caption = buildCaption(summary, stats, {
    project: process.env.ALLURE_PROJECT,
    environment: process.env.ALLURE_ENV,
    comment: process.env.ALLURE_COMMENT,
    reportLink: process.env.ALLURE_REPORT_LINK,
  });

  await sendPhotoToTelegram(token, chat, chartUrl, caption);
  console.log('Sent Allure summary with chart to Telegram.');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});