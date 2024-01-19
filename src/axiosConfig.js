import axios from "axios";

// Function to set JWT token in the headers
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

window.addEventListener("beforeunload", () => {
  console.log(localStorage.getItem("userToken"));
  setAuthToken(localStorage.getItem("userToken"));
});

export default axios;
