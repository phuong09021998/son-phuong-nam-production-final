import axios from 'axios';
import baseUrl from 'config/basedUrl';
import localStorage from 'local-storage';

// @ts-ignore
const token = localStorage.get('spn_auth')
const header = {
  headers: {
    'Authorization': 'Bearer ' + token
  }
}

export const getCarousel = () => {
  return axios.get(`${baseUrl}/api/site/carousel`, header);
};

export const getSiteInfo = () => {
  return axios.get(`${baseUrl}/api/site/info`, header);
};
