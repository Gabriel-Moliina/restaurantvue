import { useAxios } from "./base/HttpBaseService";

export const useReservationService = () => {

  const { api } = useAxios('reservation');

  const Create = (tableId, date, email) => {
    return api.post("/", { tableId, date, email });
  }

  const Cancel = (id) => {
    return api.delete("/" + id);
  }

  return {
    Create,
    Cancel
  }
}
