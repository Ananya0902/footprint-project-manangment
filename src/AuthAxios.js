import axios from "axios";

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

export const setAuthToken = (token) => {
  if (token) {
    authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete authAxios.defaults.headers.common["Authorization"];
  }
};


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
