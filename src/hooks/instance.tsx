import axios from "axios";
import { API } from "./getEnv";
import Cookies from 'js-cookie';

export const instance = axios.create({baseURL:API})

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !window.location.pathname.includes('/login')) {
      Cookies.remove('token');
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);