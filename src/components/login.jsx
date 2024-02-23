// components/Login.js
import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/login.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCookies } from "react-cookie";

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("applicant");
  const [cookies, setCookie] = useCookies(['token']);
  

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  useEffect(()=>{

    toast.info("Log in to continue", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

    const token1 = localStorage.getItem("email_token");
    const user1 = localStorage.getItem("user");
    if(token1){
      localStorage.removeItem("email_token")
    }
    if(user1){
      localStorage.removeItem("user")
    }

  },[])






  const handleLogin =async () => {
    const regpassword =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);

    const newErrors = {};
    if (email.trim() === "") {
      newErrors.email = "Enter Email";
    }
    if (regpassword.test(password) === false) {
      newErrors.password = "Enter valid Password";
    }
    setError(newErrors);
    if (newErrors.email) {
      toast.error("Enter Your Email", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    if (newErrors.password) {
      toast.error("Enter Valid password", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    if(userType === "applicant"){
      const response=await fetch("http://localhost:5000/api/user/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      
      const data = await response.json();
      // console.log(document.cookie)
      if(data.error==="Email was not found"){
        toast.error("Email not found please Register", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        theme: "light",
        })
        return;
      }

      if(data.error==="Email and password do not match"){
        toast.error("Email and password do not match", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        theme: "light",
        })
        return
      }


      if(!response.ok){
        toast.error("Something wesnt wrong try again", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      if(data.success===true){
        toast.success("Logged in successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setCookie('token',data.token,{ path: '/',expires:expirationDate})

      }


    }


  };

  return (
    <div className="form-container">
      <ToastContainer></ToastContainer>
      <h2>Log in</h2>
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => {setEmail(e.target.value)
          setError({
            ...error,
            email: "",
          });
        }}
        style={error.email ? { border: "2px solid red", outline: "red" } : {}}
      />
      <label>Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => {setPassword(e.target.value)
          setError({
            ...error,
            password: "",
          });
        }}
        style={
          error.password ? { border: "2px solid red", outline: "red" } : {}
        }
      />
      <label>User Type:</label>
      <select value={userType} onChange={(e)=>setUserType(e.target.value)}>
        <option value="applicant">Applicant</option>
        <option value="reviewer">Reviewer</option>
      </select>
      <button className="log" onClick={handleLogin}>
        Login
      </button>
      <p>
        Don't have an account?{" "}
        <span className="switch-link" onClick={onSwitchToRegister}>
          <NavLink to="/register">Register here.</NavLink>
        </span>
      </p>
    </div>
  );
};

export default Login;

