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
    
  test("02 Get the list of challenges @API_pozitive", async () => {
    
    let response = await appi.challengesService.get(token);
    let body = await response.json();

    expect(response.status()).toBe(200);
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(body.challenges.length).toBe(59);
  });

  test("02 Get todos 200oK @API_pozitive", async () => {
    let response = await appi.todosService.get(token);
    let body = await response.json();
      
    expect(response.status()).toBe(200);
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(body.todos[0]).toHaveProperty('id', 'title', 'doneStatus:', 'description:');  
  });

  test("04 Get todos 404 not plural  @API_negative", async () => {
    let response = await appi.todoService.get(token);
            
    expect(response.status()).toBe(404);
  });

  test("05 Get id of todos 200oK  @API_pozitive", async () => {
    let response = await appi.todosService.getById(token);
    let body = await response.json();
            
    expect(response.status()).toBe(200);
    expect(body.todos).toHaveLength(1);
    expect(body.todos[0]).toHaveProperty('id', 'title', 'doneStatus:', 'description:');  
  });

  test("06 Get id of todos 404 not exist  @API_negative", async () => {
    let response = await appi.todosService.getById(token, 555777);
    let body = await response.json();
            
    expect(response.status()).toBe(404);
    expect(body.errorMessages).toBeTruthy();
  });

  test("07 Get todos with filter DONE 200oK @API_pozitive", async () => {
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

  test("08 Head todos 200oK  @API_pozitive", async () => {
    let response = await appi.todosService.head(token);
            
    expect(response.status()).toBe(200);
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": token }));
  });

  test("09 Post/create todo 201oK @API_pozitive", async () => {
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

  test("10 Post/create todo 400 bad status @API_negative", async () => {
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

  test("33 Post/create todo 415 unsupported content type @API_negative", async () => {
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

  test("34 Get challenger guid (existing X-CHALLENGER) @API_pozitive", async () => {
    let response = await appi.challengerService.get(token, token);
    progressData = await response.json();
        
    expect(response.status()).toBe(200);
    expect(progressData).toHaveProperty('xAuthToken', 'xChallenger', 'secretNote', 'challengeStatus')
  });

  test("35 Put challenger guid RESTORE to memory@API_pozitive", async () => {
    let response = await appi.challengerService.get(token, token);
    progressData = await response.json();
    response = await appi.challengerService.put(token, token, progressData);
                
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": token }));
  });

});