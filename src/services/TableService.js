import { useAxios } from "./base/HttpBaseService";

export const useTableService = () => {

  const { api } = useAxios('table');

  const GetById = (id) => {
    return api.get(`/${id}`);
  }

  const Create = (table) => {
    return api.post('/Create', table);
  }

  const Release = (tableChangeStatus) => {
    return api.post('/Release', tableChangeStatus);
  }

  const Delete = (id) => {
    return api.delete('/' + id);
  }

  return {
    GetById,
    Create,
    Release,
    Delete
  }
}
