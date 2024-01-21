import axios from "axios";

const authAxios = axios.create()

export const setAuthToken = (token) => {
  if (token) {
    authAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete authAxios.defaults.headers.common["Authorization"];
  }
};

window.addEventListener("beforeunload", () => {
  console.log(localStorage.getItem("userToken"));
  setAuthToken(localStorage.getItem("userToken"));
});

export default authAxios;
