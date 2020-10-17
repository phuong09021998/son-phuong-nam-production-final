// @ts-nocheck
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

interface User {
  email: string;
  name: string;
  role: number;
  password: string;
  id?: string;
}

export const getUsers = () => {
  return axios.get(`${baseUrl}/api/users`, header) ;
};

export const createUserByAdmin = ({ email, name, role, password }: User) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);
  formData.append('password', password);
  formData.append('role', String(role));
  return axios.post(`${baseUrl}/api/admin/user`, formData, header);
};

interface SelectUser {
  id: string;
}

export const deleteUser = ({ id }: SelectUser) => {
  return axios.delete(`${baseUrl}/api/user/${id}`, header);
};

export const editUser = ({ id, name, email, password, role }: User) => {
  const formData = new FormData();
  formData.append('email', email);
  formData.append('name', name);
  formData.append('password', password);
  formData.append('role', String(role));
  return axios.put(`${baseUrl}/api/user/${id}`, formData, header);
};

export const getSiteCarousel = () => {
  return axios.get(`${baseUrl}/api/site/carousel`, header)
}

export const getSiteInfo = () => {
  return axios.get(`${baseUrl}/api/site/info`, header)
}

export const updateSiteCarousel = ({ key, data }: any) => {
  const formData = new FormData();
  formData.append('key', key)
  formData.append('image', data)
  return axios.put(`${baseUrl}/api/site/carousel`, formData, header)
}

export const updateSiteInfo = ({ infos }: any) => {
  return axios.put(`${baseUrl}/api/site/info`, infos, header)
}