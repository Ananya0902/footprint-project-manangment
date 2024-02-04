import axios from "axios";

const api_url = process.env.REACT_APP_CLOUD_API_URL;

const cloudAxios = axios.create({
  baseURL: api_url,
  // withCredentials: true
});
// for the time being not using signing features
// cloudAxios.defaults.headers.common['Authorization'] = 'Bearer xzNBhAATFoXJ90WJrNHVkx9ZeDs';

export default cloudAxios;
