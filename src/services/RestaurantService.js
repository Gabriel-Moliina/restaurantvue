import { useAxios } from "./base/HttpBaseService";

export const useRestaurantService = () => {

  const { api } = useAxios('restaurant');

  const Create = (name) => {
    return api.post("/", { name })
  }

  const GetById = (id) => {
    return api.get("/" + id);
  }

  const Get = () => {
    return api.get();
  }

  return {
    GetById,
    Get,
    Create
  }
}
