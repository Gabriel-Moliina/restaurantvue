import HttpBaseService from "./base/HttpBaseService";

class TableService extends HttpBaseService {
  constructor() {
    super('table');
  }

  GetById(id) {
    return this.api.get(`/${id}`);
  }

  Create(table){
    return this.api.post('/Create', table);
  }

  Release(tableChangeStatus) {
    return this.api.post('/Release', tableChangeStatus);
  }
}

export default new TableService();
