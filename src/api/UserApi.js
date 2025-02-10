import axios from 'axios';

class UserApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5142/api/user',
      timeout: 1000,
    });
  }

  Login(email, password) {
    return this.api.post('/login', { Email: email, Password: password });
  }
}

export default new UserApi();
