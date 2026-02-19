export class TodosService {
    constructor(request) {
        this.request = request;
        this.apiURL = process.env.API_URL;
    }
    
    async get (token, accept = '*/*'){
        const response = await this.request.get(`${this.apiURL}todos`, {
            headers: {
                "x-challenger": token,
                "accept": accept,
            }
        });
        return response;
    }

    async getById (token, id = 1) {
        const response = await this.request.get(`${this.apiURL}todos/${id}`, {
            headers: {
                "x-challenger": token,
            }
        });
        return response;
    }

    async getByFilter (token, filter = 'id=1') {
        const response = await this.request.get(`${this.apiURL}todos?${filter}`, {
            headers: {
                "x-challenger": token,
            }
        });
        return response;
    }

    async head (token) {
        const response = await this.request.head(`${this.apiURL}todos`, {
            headers: {
                "x-challenger": token,
            }
        });
        return response;
    }

    async post (token, payload, accept = '*/*', type = 'application/json') {
        const response = await this.request.post(`${this.apiURL}todos`, {
            headers: {
                "x-challenger": token,
                "accept": accept,
                "content-type": type,
            },
            data: payload,
        });
        return response;
    }

}
