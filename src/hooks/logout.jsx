import { setAuthToken } from "../AuthAxios";
import { useNavigate } from "react-router-dom";

const useLogOut = () => {
  console.log("UseLogOUt");
  const navigator = useNavigate();
  return () => {
    localStorage.removeItem("userToken");
    setAuthToken();
    navigator("/login");
    console.log("navigation failed");
  };
};

export default useLogOut;
