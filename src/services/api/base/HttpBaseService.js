import axios from 'axios';

export const useAxios = (path) => {
  const api = axios.create({
    baseURL: 'http://localhost:5142/api/' + path,
    timeout: 999999,
  });

  api.interceptors.request.use(function (config) {
    config.headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  return { api }
}
