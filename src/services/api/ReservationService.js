import { useAxios } from "./base/HttpBaseService";

export const useReservationService = () => {

  const { api } = useAxios('reservation');

  const GetById = (id) => api.get(`/${id}`);

  const Create = (tableId, date, email) => api.post('/', { TableId: tableId, Date: date, Email: email });

  const Cancel = (id) => api.delete(`/${id}`);

  return {
    GetById,
    Create,
    Cancel
  }
}
