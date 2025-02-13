import { useAxios } from "./base/HttpBaseService";

export const useRestaurantService = () => {

  const { api } = useAxios('restaurant');

  const Create = (restaurant) => {
    return api.post('', restaurant)
  }

  const Get = () => {
    return api.get();
  }

  return {
    Get,
    Create
  }
}
