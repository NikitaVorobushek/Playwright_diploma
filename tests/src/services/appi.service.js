import { ChallengerService, ChallengesService, TodoService, TodosService } from './index'

export class Appi {
    constructor(request){
        this.request = request;
        this.challengerService = new ChallengerService(request);
        this.challengesService = new ChallengesService(request);
        this.todoService = new TodoService(request);
        this.todosService = new TodosService(request);
    }
};