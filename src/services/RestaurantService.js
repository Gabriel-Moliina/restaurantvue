import HttpBaseService from './base/HttpBaseService';

class RestaurantService extends HttpBaseService {
  constructor() {
    super('restaurant');
  }

  GetById(id) {
    return this.api.get("/" + id);
  }

  Get() {
    return this.api.get();
  }
}

export default new RestaurantService();
