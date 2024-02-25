import axios from "axios";

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export const setAuthToken = (token) => {
  // token 
  // there is a token already associated , if the token null authaxios headers token null 
  // generally you set the token into the axios instance 
  // for signing and authorization into backend 
  if (token) {
    authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.log('authToken is null');
    delete authAxios.defaults.headers.common["Authorization"];
  }
};

// const requestInterceptor = () => {

// }


// Function to handle token expiration and removal
export const handleTokenExpirationAndRemoval = () => {
  const token = localStorage.getItem('userToken');
  if (token) {
    const tokenExpirationTime = localStorage.getItem('tokenExpirationTime');
    const currentTime = new Date().getTime();
    if (currentTime > parseInt(tokenExpirationTime)) {
      // Token expired, clear token and log out
      
    } else {
      // Set the token for Axios requests
      setAuthToken(token);
    }
  }
};

window.addEventListener("beforeunload", () => {
  console.log(localStorage.getItem("userToken"));
  setAuthToken(localStorage.getItem("userToken"));
});

export default authAxios;
