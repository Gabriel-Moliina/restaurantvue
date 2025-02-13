import { useAxios } from "./base/HttpBaseService";

export const useRestaurantService = () => {

  const { api } = useAxios('restaurant');

  const Create = (restaurant) => {
    return api.post('', restaurant)
  }

  const GetById = (id) => {
    return api.get(`/${id}`);
  }

  const Get = () => {
    return api.get();
  }

  return {
    Get,
    GetById,
    Create
  }
}
