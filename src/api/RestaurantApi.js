import axios from 'axios';

class RestaurantApi {
  constructor() {
    this.api = axios.create({
      baseURL: 'http://localhost:5142/api/restaurant',
      timeout: 1000,
      headers: {
        "Authorization": 'Bearer ' + sessionStorage.getItem('token')
      }
    });
  }

  GetById(id) {
    return this.api.get(`/${id}`);
  }

  Get() {
    return this.api.get();
  }
}

export default new RestaurantApi();
