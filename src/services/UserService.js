import HttpBaseService from "./base/HttpBaseService";

class UserService extends HttpBaseService {
  constructor() {
    super('user')
  }

  Login(email, password) {
    return this.api.post('/login', { Email: email, Password: password });
  }

  Create(email, password, confirmPassword){
    return this.api.post('/create', { Email: email, Password: password, ConfirmPassword: confirmPassword });
  }
}

export default new UserService();
