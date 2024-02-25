import React, { useState, useEffect } from "react";
import "../styles/EmailVerificationPage.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  PinInput,
  PinInputField,
  HStack,
  Center,
  Text,
  Box,
  Link
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import authAxios from "../../AuthAxios";

const EmailVerificationPage = () => {
  const [otpValue, setOtpValue] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token1 = localStorage.getItem("email_token");
    const user1 = localStorage.getItem("user");
    if (!token1 || !user1) {
      navigate("/register");
      return;
    }

    toast.info("Please varify your Email", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }, []);

  const handleChange = async (value) => {
    const token = localStorage.getItem("email_token");
    const user = localStorage.getItem("user");

    if (!token || !user) {
      navigate("/register");
      return;
    }

    setOtpValue(value);

    if (value.length === 6) {
      setOtpValue(value);
      if (user === "applicant") {
        const response = await authAxios.post("users/verify_email" , JSON.stringify({token: token , otp: value}))
        const result = await response.json();
        // console.log(result);
        if (result.error === "Incorrect OTP") {
          toast.error("Enter Correct OTP", {
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
        if (!response.ok) {
          navigate("/login");
        }

        if (result.success === true) {
          toast.success("Email varified Successfully, sign in to continue", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // navigate('/login')
        }
      }


      if(user === "reviewer"){
        const response = await fetch(
          "http://localhost:5000/api/reviewer/verify_email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              token: token,
              otp: value,
            }),
          }
        );
        const result = await response.json();
        // console.log(result);
        if (result.error === "Incorrect OTP") {
          toast.error("Enter Correct OTP", {
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
        if (!response.ok) {
          navigate("/login");
        }

        if (result.success === true) {
          toast.success("Email varified Successfully, sign in to continue", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }

    }


    
  };

  return (
    <div className="containerVerify">
      <ToastContainer></ToastContainer>
      <h2 className="header">Email Verification</h2>
      <ChakraProvider>
        <Center display={"flex"} flexDirection={"column"} gap={4}>
          <Text fontStyle={"20px"} fontWeight={"40px"}>
            Enter OTP
          </Text>
          <HStack>
            <PinInput value={otpValue} onChange={handleChange}>
              <PinInputField border={"1px solid black"} />
              <PinInputField border={"1px solid black"} />
              <PinInputField border={"1px solid black"} />
              <PinInputField border={"1px solid black"} />
              <PinInputField border={"1px solid black"} />
              <PinInputField border={"1px solid black"} />
            </PinInput>
          </HStack>
          <Box width={'82%'} display={'flex'} flexDirection={'row-reverse'}>
            
            <Link href="/login">Login</Link>
              </Box>
        </Center>
      
      </ChakraProvider>
    </div>
  );
};

export default EmailVerificationPage;
