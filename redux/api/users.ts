import axios from 'axios';
import baseUrl from 'config/basedUrl'
import localStorage from 'local-storage';

// @ts-ignore
const token = localStorage.get('spn_auth')
const header = {
  headers: {
    'Authorization': 'Bearer ' + token
  }
}

interface LoginUser {
  email: string;
  password: string;
}

export const loginUser = ({ email, password }: LoginUser) => {
  return axios.post(`${baseUrl}/api/user/login`, { email, password }, header);
};

export const getUser = () => {
  return axios.get(`${baseUrl}/api/user`, header);
};

export const createUser = (payload: any) => {
  const formData = new FormData();
  for (const key in payload) {
    formData.append(key, payload[key]);
  }
  return axios.post(`${baseUrl}/api/user`, formData, header);
};

export const loginByGoogle = (fields: any) => {
  return axios.post(`${baseUrl}/api/user/login/google`, fields, header);
};

export const loginByFacebook = (fields: any) => {
  return axios.post(`${baseUrl}/api/user/login/facebook`, fields, header);
};

export const logoutUser = () => {
  return axios.get(`${baseUrl}/api/user/logout`, header);
};

export const updateUser = (fields: any) => {
  return axios.put(`${baseUrl}/api/user`, fields, header);
};
