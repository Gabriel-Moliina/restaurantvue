import { useAxios } from "./base/HttpBaseService";

export const useTableService = () => {

  const { api } = useAxios('table');

  const GetByRestaurantId = (id) => api.get('restaurant/' + id);

  const GetById = (id) => api.get(`/${id}`);

  const Create = (table) => api.post('/', table);

  const Release = (tableRelease) => api.post('release', tableRelease);

  const Delete = (id) => api.delete('/' + id);

  return {
    GetById,
    Create,
    Release,
    Delete,
    GetByRestaurantId
  }
}
