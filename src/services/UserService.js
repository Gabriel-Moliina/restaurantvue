import { useAxios } from "./base/HttpBaseService";

export const useUserService= () => {

const { api } = useAxios('user');

  const Login = (email, password) => {
    return api.post('/login', { Email: email, Password: password });
  }

  const Create = (email, password, confirmPassword) => {
    return api.post('/create', { Email: email, Password: password, ConfirmPassword: confirmPassword });
  }

  return {
    Login,
    Create
  }
}
