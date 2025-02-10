import HttpBaseService from './base/HttpBaseService';

class ReservationService extends HttpBaseService {
  constructor() {
    super('reservation');
  }

  Create(tableId, date, email) {
    return this.api.post("/", { tableId, date, email });
  }

  Cancel(id) {
    return this.api.delete("/" + id);
  }
}

export default new ReservationService();
