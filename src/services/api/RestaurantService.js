import { useAxios } from "./base/HttpBaseService";

export const useRestaurantService = () => {

  const { api } = useAxios('restaurant');

  const Create = (restaurant) => {
    return api.post('', restaurant)
  }

  const GetById = (id) => {
    return api.get(`/${id}`);
  }

  const GetByUserId = (id) => {
    return api.get('GetByUserId/' + id);
  }

  const Delete = (id) => {
    return api.delete('/' + id);
  }

  return {
    GetByUserId,
    GetById,
    Create,
    Delete
  }
}
