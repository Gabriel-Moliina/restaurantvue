// base/HttpBaseService.js
import axios from 'axios';

class HttpBaseService {
  constructor(path) {
    this.api = axios.create({
      baseURL: 'http://localhost:5142/api/' + path,
      timeout: 999999,
      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }
}

export default HttpBaseService;
