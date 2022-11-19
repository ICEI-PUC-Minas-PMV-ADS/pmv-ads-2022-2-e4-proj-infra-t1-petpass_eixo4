import axios from 'axios';
import history from './history';
import { getAuthData } from './storage';

export const BASE_URL =
  process.env.REACT_APP_BACKEND_URL ?? 'https://localhost:7110';

export const requestBackendLogin = (loginData) => {
  let headers = {
    'Content-Type': 'application/json',
  };

  const data = {
    id: loginData['username'],
    password: loginData['password'],
  };

  return axios({
    method: 'POST',
    baseURL: BASE_URL,
    url: 'api/Usuarios/authenticate',
    data,
    headers,
  });
};

export const requestBackend = (config) => {
  let headers = {
    'Content-Type': 'application/json',
    ...config.headers
  };

  if (config.withCredentials) {
    headers = {
      ...headers, 
      'Authorization': 'Bearer ' + getAuthData().jwtToken
    }
  }

  return axios({ ...config, baseURL: BASE_URL, headers });
};

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    //
    return config;
  },
  function (error) {
    //
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    //
    console.log(response);
    return response;
  },
  function (error) {
    if (error.response.status === 401) {
      history.push('/auth/login');
    }
    return Promise.reject(error);
  }
);
