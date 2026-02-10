import { test, expect } from '@playwright/test';
import { Appi } from './src/services/appi.service';
import { TodoBuilder } from './src/helpers/index';

test.describe('API challenges', () => {
  let request, appi, token, progressData;

  test.beforeAll(async ({ playwright }) => {
      request = await playwright.request.newContext();
      appi = new Appi(request);
      const response = await appi.challengerService.post();
      token = response.headers()["x-challenger"];
    });

  test.afterAll(async () => {
    await request.dispose();
  });
    
  test("ID 02 GET /challenges @API_pozitive", async () => {
    let response = await appi.challengesService.get(token);
    let body = await response.json();

    expect(response.status()).toBe(200);
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(body.challenges.length).toBe(59);
  });

  test("ID 03 GET /todos  @API_pozitive", async () => {
    let response = await appi.todosService.get(token);
    let body = await response.json();
      
    expect(response.status()).toBe(200);
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(body.todos[0]).toHaveProperty('id', 'title', 'doneStatus:', 'description:');  
  });

  test("ID 04 GET /todo (404) not plural  @API_negative", async () => {
    let response = await appi.todoService.get(token);
            
    expect(response.status()).toBe(404);
  });

  test("ID 05 GET /todos/{id}  @API_pozitive", async () => {
    let response = await appi.todosService.getById(token);
    let body = await response.json();
            
    expect(response.status()).toBe(200);
    expect(body.todos).toHaveLength(1);
    expect(body.todos[0]).toHaveProperty('id', 'title', 'doneStatus:', 'description:');  
  });

  test("ID 06 GET /todos/{id} (404)  @API_negative", async () => {
    let response = await appi.todosService.getById(token, 555777);
    let body = await response.json();
            
    expect(response.status()).toBe(404);
    expect(body.errorMessages).toBeTruthy();
  });

  test("ID 07 GET /todos ?filter  @API_pozitive", async () => {
    const todoBuilder = new TodoBuilder()
      .addTitle()
      .addStatus(true)
      .addDescription()
      .generate();
    let response = await appi.todosService.post(token, todoBuilder);

    response = await appi.todosService.getByfilter(token, 'doneStatus=true');
    let body = await response.json();
            
    expect(response.status()).toBe(200);
    expect(body.todos[0]).toEqual(expect.objectContaining({ "doneStatus": true  }))
  });

  test("ID 08 HEAD /todos  @API_pozitive", async () => {
    let response = await appi.todosService.head(token);
            
    expect(response.status()).toBe(200);
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": token }));
  });

  test("ID 09 POST todos  @API_pozitive", async () => {
    const todoBuilder = new TodoBuilder()
      .addTitle()
      .addStatus(true)
      .addDescription()
      .generate();
    let response = await appi.todosService.post(token, todoBuilder);
    let body = await response.json();
      
    expect(response.status()).toBe(201);
    expect(body).toMatchObject(todoBuilder);  
  });

  test("ID 10 POST /todos (400) doneStatus  @API_negative", async () => {
    const todoBuilder = new TodoBuilder()
        .addTitle()
        .addStatus(1)
        .addDescription()
        .generate();
    let response = await appi.todosService.post(token, todoBuilder);
    let body = await response.json();
      
    expect(response.status()).toBe(400);
     expect(body.errorMessages).toBeTruthy();  
  });

  test("ID 33 POST /todos (415) @API_negative", async () => {
    const type = 'fog'
    const todoBuilder = new TodoBuilder()
      .addTitle()
      .addStatus(true)
      .addDescription()
      .generate();

    let response = await appi.todosService.post(token, todoBuilder, '*/*', type);
    let body = await response.json();
        
    expect(response.status()).toBe(415); 
    expect(body.errorMessages).toBeTruthy();
  });

  test("ID 34 GET /challenger/guid (existing X-CHALLENGER) @API_pozitive", async () => {
    let response = await appi.challengerService.get(token, token);
    progressData = await response.json();
        
    expect(response.status()).toBe(200);
    expect(progressData).toHaveProperty('xAuthToken', 'xChallenger', 'secretNote', 'challengeStatus')
  });

  test("ID 35 PUT /challenger/guid RESTORE @API_pozitive", async () => {
    let response = await appi.challengerService.get(token, token);
    progressData = await response.json();
    response = await appi.challengerService.put(token, token, progressData);
                
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": token }));
  });

});