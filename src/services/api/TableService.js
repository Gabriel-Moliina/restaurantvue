import { useAxios } from "./base/HttpBaseService";

export const useTableService = () => {

  const { api } = useAxios('table');

  const GetByRestaurantId = (id) => api.get('GetByRestaurantId/' + id);

  const GetById = (id) => api.get(`/${id}`);

  const Create = (table) => api.post('/', table);

  const Release = (tableChangeStatus) => api.post('Release', tableChangeStatus);

  const Delete = (id) => api.delete('/' + id);

  return {
    GetById,
    Create,
    Release,
    Delete,
    GetByRestaurantId
  }
}
