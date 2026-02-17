import { test as base } from '@playwright/test';
import { App } from '../../pages/app.page';
import { Api } from '../../services/api.facade';

export const test = base.extend({

    app: async ({ page }, use) => {
        const app = new App(page);
        await use(app);
    },

    api: async ({ request, challengerToken }, use) => {
        const api = new Api(request);
        await use(api);
    },

    challengerToken: async ({ request }, use) => {
        const api = new Api(request);
        const response = await api.challengerService.post();
        const token = response.headers()["x-challenger"];
        await use(token);
    },

});