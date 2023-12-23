import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/register.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [province, setProvince] = useState("north");
  const [apostolate, setApostolate] = useState("social");
  const [userType, setUserType] = useState("applicant");
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const [error, setError] = useState({
    email: "",
    mobile: "",
    name: "",
    password: "",
  });

  const handleRegister = async () => {
    const regex = /^[0-9]{10}$/;
    const regpassword =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    const newErrors = {};
    if (email.trim() === "") {
      newErrors.email = "Enter Email";
    }
    if (name.trim() === "") {
      newErrors.name = "Enter name";
    }

    if (regex.test(mobile) === false) {
      newErrors.mobile = "Enter Valid Mobile Number";
    }

    if (regpassword.test(password) === false) {
      newErrors.password = "Enter valid Password";
    }
    setError(newErrors);

    if (newErrors.email || newErrors.name) {
      toast.error("Enter All Fields", {
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
    if (newErrors.mobile) {
      toast.error("Enter Valid mobile number", {
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
    if (userType === "applicant") {
      const response = await fetch("http://localhost:5000/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          email: email,
          mobile: mobile,
          provinceName: province,
          apostolate: apostolate,
          password: password,
        }),
      });
      const data = await response.json();
      console.log(data);
      if (data.message === "User Already Exists") {
        navigate("/login");
      }

      if (data.success === false) {
        toast.error("Something went wrong", {
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

      if (data.success === true) {
        localStorage.setItem("email_token", data.token);
        localStorage.setItem("user", data.user);
        navigate("/EmailVerificationPage");
        return;
      }
    }

    if (userType === "reviewer") {
      const response = await fetch(
        "http://localhost:5000/api/reviewer/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            mobile: mobile,
            provinceName: province,
            // apostolate:apostolate,
            password: password,
          }),
        }
      );
      const result = await response.json();

      if (result.message === "User Already Exists") {
        navigate("/login");
      }

      if (result.success === false) {
        toast.error("Something went wrong", {
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

      if (result.success === true) {
        localStorage.setItem("email_token", result.token);
        localStorage.setItem("user", result.user);
        navigate("/EmailVerificationPage");
        return;
      }
    }
  };

  return (
    <div className="form-container">
      <ToastContainer></ToastContainer>
      <h2>Register</h2>

      <label>Name:</label>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setError({
            ...error,
            name: "",
          });
        }}
        style={error.name ? { border: "2px solid red", outline: "red" } : {}}
      />
      <label>Mobile:</label>
      <input
        type="number"
        value={mobile}
        onChange={(e) => {
          setError({
            ...error,
            mobile: "",
          });
          setMobile(e.target.value);
        }}
        style={error.mobile ? { border: "2px solid red", outline: "red" } : {}}
      />
      <label>Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
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
        onChange={(e) => {
          setPassword(e.target.value);
          setError({
            ...error,
            password: "",
          });
        }}
        style={
          error.password ? { border: "2px solid red", outline: "red" } : {}
        }
      />
      <label>Province:</label>
      <select value={province} onChange={(e) => setProvince(e.target.value)}>
        <option value="north">North</option>
        <option value="south">South</option>
        <option value="central">Central</option>
      </select>
      <label>User Type:</label>
      <select
        value={userType}
        onChange={(e) => {
          if (e.target.value === "applicant") {
            setIsDisabled(false);
          } else {
            setIsDisabled(true);
          }
          setUserType(e.target.value);
        }}
      >
        <option value="applicant">Applicant</option>
        <option value="reviewer">Reviewer</option>
      </select>
      <label>Apostolate:</label>
      <select
        value={apostolate}
        onChange={(e) => setApostolate(e.target.value)}
        disabled={isDisabled}
      >
        <option value="social">Social</option>
        <option value="education">Education</option>
        <option value="health">Health</option>
        <option value="others">Others</option>
      </select>

      <button onClick={handleRegister}>Register</button>
      <p>
        Already have an account?{" "}
        <span className="switch-link" onClick={onSwitchToLogin}>
          <NavLink to="/login">Login here.</NavLink>
        </span>
      </p>
    </div>
  );
};

export default Register;
