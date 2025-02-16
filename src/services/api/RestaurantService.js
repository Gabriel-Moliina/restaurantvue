import { useAxios } from "./base/HttpBaseService";

export const useRestaurantService = () => {

  const { api } = useAxios('restaurant');

  const GetById = (id) => api.get(`/${id}`);

  const GetByUserId = () => api.get();

  const Create = (restaurant) => api.post('', restaurant)

  const Delete = (id) => api.delete('/' + id);

  return {
    GetByUserId,
    GetById,
    Create,
    Delete
  }
}
