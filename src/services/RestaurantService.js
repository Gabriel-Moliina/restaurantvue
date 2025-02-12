import { useAxios } from "./base/HttpBaseService";

export const useRestaurantService = () => {

  const { api } = useAxios('restaurant');

  const Create = (name) => {
    return api.post('/', { name })
  }

  const Get = () => {
    return api.get();
  }

  return {
    Get,
    Create
  }
}
