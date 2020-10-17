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

export const getProductsByAdmin = () => {
  return axios.get(`${baseUrl}/api/products?limit=10000&skip=0&sortBy=name&order=asc`, header);
};

export const createProduct = (payload: any) => {
  const formData = new FormData();
  for (const key in payload) {
    formData.append(key, payload[key]);
  }
  return axios.post(`${baseUrl}/api/product`, formData, header);
};

export const updatePublishProduct = ({ publish, id }: any) => {
  const formData = new FormData();
  formData.append('publish', publish);
  return axios.put(`${baseUrl}/api/product/${id}`, formData, header);
};

export const updateAvailableProduct = ({ available, id }: any) => {
  // console.log('run');
  const formData = new FormData();
  formData.append('available', available);
  return axios.put(`${baseUrl}/api/product/${id}`, formData, header);
};

export const deleteProduct = ({ id }: any) => {
  return axios.delete(`${baseUrl}/api/product/${id}`, header);
};

export const updateProduct = (payload: any) => {
  const formData = new FormData();
  for (const key in payload) {
    formData.append(key, payload[key]);
  }

  return axios.put(`${baseUrl}/api/product/${payload.id}`, formData, header);
};
