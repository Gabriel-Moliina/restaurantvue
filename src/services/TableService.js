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

  Delete(id) {
    return this.api.delete('/' + id);
  }
}

export default new TableService();
