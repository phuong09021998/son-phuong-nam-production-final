import axios from 'axios';
import baseUrl from './basedUrl'

const axiosInstance = axios.create({
  baseURL: `${baseUrl}/api`,
  /* other custom settings */
});

export default axiosInstance;
