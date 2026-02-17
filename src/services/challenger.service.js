export class ChallengerService {
  constructor(request) {
    this.request = request;
    this.apiURL = process.env.API_URL;
  }

  async post () {
    const response = await this.request.post(`${this.apiURL}challenger`);
    return response;
  }

  async get (guid, token) {
    const response = await this.request.get(`${this.apiURL}challenger/${guid}`, {
      headers: {
        "x-challenger": token,
      }
    });
    return response;
  }

  async put (guid, token, payload) {
    const response = await this.request.put(`${this.apiURL}challenger/${guid}`, {
      headers: {
        "x-challenger": token,
        },
        data: payload,
      });
    return response;
  }
}