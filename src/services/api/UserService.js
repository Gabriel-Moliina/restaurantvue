import { useAxios } from "./base/HttpBaseService";

export const useUserService = () => {

  const { api } = useAxios('user');

  const Login = (email, password) => {
    return api.post('/login', { Email: email, Password: password });
  }

  const Create = (user) => {
    return api.post('/create', {
      Email: user.email,
      Name: user.name,
      Password: user.password,
      confirmPassword: user.confirmPassword
    });
  }

  return {
    Login,
    Create
  }
}
