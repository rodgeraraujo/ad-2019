import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-ad2019.herokuapp.com/v1',
});

export default api;
