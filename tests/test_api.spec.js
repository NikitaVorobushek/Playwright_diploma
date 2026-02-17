import { expect } from '@playwright/test';
import { test } from '../src/helpers/fixtures/fixture';
import { TodoBuilder } from '../src/helpers/builders/index';
import 'dotenv/config';

test.describe('API challenges', () => {
  let progressData;

  test.afterAll(async ({ request }) => {
    await request.dispose();
  });
    
  test("02 Get the list of challenges @API_pozitive", async ({ api, challengerToken }) => {
    
    let response = await api.challengesService.get(challengerToken);
    let body = await response.json();

    expect(response.status()).toBe(200);
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": challengerToken }));
    expect(Array.isArray(body.challenges)).toBe(true);
    expect(body.challenges.length).toBeGreaterThan(0);
  });

  test("03 Get todos 200oK @API_pozitive", async ({ api, challengerToken }) => {
    let response = await api.todosService.get(challengerToken);
    let body = await response.json();
      
    expect(response.status()).toBe(200);
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": challengerToken }));
    expect(body.todos[0]).toHaveProperty('id', 'title', 'doneStatus', 'description');  
  });

  test("04 Get todos 404 not plural  @API_negative", async ({ api, challengerToken }) => {
    let response = await api.todoService.get(challengerToken);
            
    expect(response.status()).toBe(404);
  });

  test("05 Get id of todos 200oK  @API_pozitive", async ({ api, challengerToken }) => {
    let response = await api.todosService.getById(challengerToken);
    let body = await response.json();
            
    expect(response.status()).toBe(200);
    expect(body.todos).toHaveLength(1);
    expect(body.todos[0]).toHaveProperty('id', 'title', 'doneStatus', 'description');  
  });

  test("06 Get id of todos 404 not exist  @API_negative", async ({ api, challengerToken }) => {
    let response = await api.todosService.getById(challengerToken, 555777);
    let body = await response.json();
            
    expect(response.status()).toBe(404);
    expect(body.errorMessages).toBeTruthy();
  });

  test("07 Get todos with filter DONE 200oK @API_pozitive", async ({ api, challengerToken }) => {
    const todoBuilder = new TodoBuilder()
      .addTitle()
      .addStatus(true)
      .addDescription()
      .generate();
    let response = await api.todosService.post(challengerToken, todoBuilder);

    response = await api.todosService.getByfilter(challengerToken, 'doneStatus=true');
    let body = await response.json();
            
    expect(response.status()).toBe(200);
    expect(body.todos[0]).toEqual(expect.objectContaining({ "doneStatus": true  }))
  });

  test("08 Head todos 200oK  @API_pozitive", async ({ api, challengerToken }) => {
    let response = await api.todosService.head(challengerToken);
            
    expect(response.status()).toBe(200);
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": challengerToken }));
  });

  test("09 Post/create todo 201oK @API_pozitive", async ({ api, challengerToken }) => {
    const todoBuilder = new TodoBuilder()
      .addTitle()
      .addStatus(true)
      .addDescription()
      .generate();
    let response = await api.todosService.post(challengerToken, todoBuilder);
    let body = await response.json();
      
    expect(response.status()).toBe(201);
    expect(body).toMatchObject(todoBuilder);  
  });

  test("10 Post/create todo 400 bad status @API_negative", async ({ api, challengerToken }) => {
    const todoBuilder = new TodoBuilder()
        .addTitle()
        .addStatus(1)
        .addDescription()
        .generate();
    let response = await api.todosService.post(challengerToken, todoBuilder);
    let body = await response.json();
      
    expect(response.status()).toBe(400);
     expect(body.errorMessages).toBeTruthy();  
  });

  test("33 Post/create todo 415 unsupported content type @API_negative", async ({ api, challengerToken }) => {
    const type = 'fog'
    const todoBuilder = new TodoBuilder()
      .addTitle()
      .addStatus(true)
      .addDescription()
      .generate();

    let response = await api.todosService.post(challengerToken, todoBuilder, '*/*', type);
    let body = await response.json();
        
    expect(response.status()).toBe(415); 
    expect(body.errorMessages).toBeTruthy();
  });

  test("34 Get challenger guid (existing X-CHALLENGER) @API_pozitive", async ({ api, challengerToken }) => {
    let response = await api.challengerService.get(challengerToken, challengerToken);
    progressData = await response.json();
        
    expect(response.status()).toBe(200);
    expect(progressData).toHaveProperty('xAuthToken', 'xChallenger', 'secretNote', 'challengeStatus')
  });

  test("35 Put challenger guid RESTORE to memory@API_pozitive", async ({ api, challengerToken }) => {
    let response = await api.challengerService.get(challengerToken, challengerToken);
    progressData = await response.json();
    response = await api.challengerService.put(challengerToken, challengerToken, progressData);
                
    expect(response.headers()).toEqual(expect.objectContaining({ "x-challenger": challengerToken }));
  });

});