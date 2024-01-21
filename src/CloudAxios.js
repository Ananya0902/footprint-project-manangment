import axios from "axios";

const api_url = `https://api.cloudinary.com/v1_1/dakdoegrx/upload`;

const cloudAxios = axios.create({
  baseURL: api_url,
  // withCredentials: true
});
// for the time being not using signing features
// cloudAxios.defaults.headers.common['Authorization'] = 'Bearer xzNBhAATFoXJ90WJrNHVkx9ZeDs';

export default cloudAxios;
