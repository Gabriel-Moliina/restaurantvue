import { useAxios } from "./base/HttpBaseService";

export const useUserService = () => {

  const { api } = useAxios('user');

  const Login = (email, password) => api.post('/login', { Email: email, Password: password });

  const Create = (user) => 
    api.post('/create', {
      Email: user.email,
      Name: user.name,
      Password: user.password,
      confirmPassword: user.confirmPassword
    });

  return {
    Login,
    Create
  }
}
