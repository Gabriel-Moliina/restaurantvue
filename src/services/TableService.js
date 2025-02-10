import HttpBaseService from "./base/HttpBaseService";

class TableService extends HttpBaseService {
  constructor() {
    super('table');
  }

  GetById(id) {
    return this.api.get(`/${id}`);
  }

  Edit(tableEdit) {
    return this.api.get();
  }
}

export default new TableService();
