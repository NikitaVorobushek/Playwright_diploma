export class ChallengesService {
    constructor (request) {
        this.request = request;
        this.apiURL = process.env.API_URL;
    }
    
    async get (token) {
        const response = await this.request.get(`${this.apiURL}challenges`, {headers: {
            "x-challenger": token },
        });
        return response;
    }
}
