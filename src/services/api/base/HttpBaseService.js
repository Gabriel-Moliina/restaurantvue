import axios from 'axios';
import { useToastService } from '@/shared/ToastService';

export const useAxios = (path) => {
  const { showToast} = useToastService();

  const api = axios.create({
    baseURL: 'http://localhost:5142/api/' + path,
    timeout: 10000,
  });

  api.interceptors.request.use(function (config) {
    config.headers = {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });

  api.interceptors.response.use((response) => response,
    (error) => {
      if(error.response)
        showToast('error', 'Algo deu errado', error?.response?.data?.messages?.map(x => x.message).join('\n') ?? error)
      else{
        showToast('error', 'ERROR', 'Servidor indisponível')
        return new Promise(() => {});
      }
      return Promise.reject(error);
    });


  return { api }
}
