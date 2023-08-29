import axios from 'axios';

const api = axios.create({
 //vite env variable
    baseURL: import.meta.env.VITE_API_URL as string,


    timeout: 10000
  });



export default api;