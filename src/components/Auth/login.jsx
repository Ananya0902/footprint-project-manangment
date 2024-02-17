// Import necessary libraries and components
// done with integration 
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import authAxios , {setAuthToken} from '../../AuthAxios.js' ; 

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  Link as ChakraLink,
  VStack,
  Text,
  Select,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

const LoginPage = () => {
  const showToast = useToast();
  const navigate = useNavigate(); 
  // Use Formik for form management
  const formik = useFormik({
    // Initial values and form validation schema using Yup
    initialValues: {
      userType: "applicant",
      email: "",
      password: "",
      showPassword: false,
    },
    validationSchema: Yup.object({
      userType: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
          "Password must contain at least 1 special character"
        ),
    }),
    onSubmit: async (values) => {
      try {
        var req = {
          userType: values.userType,
          email: values.email,
          password: values.password,
        };
        let response;
        if (values.userType === "applicant") {
          response = await authAxios.post("users/applicantlogin",req);
          if (response.data.isVarified !== true) {
            await showToast({
              title: "Await verification by the reviewer",
              description : "Your account is waiting to be verified by the reviewer",
              status: "loading",
              duration: 5000,
              isClosable: true,
            });
          } else {
            navigate(`/dashboardApplicant`); 
          }
        } else if (values.userType === "reviewer") {
          response = await authAxios.post("/users/reviewerlogin", req);
          console.log(response.data.isVarified);
          if (response.data.isVarified !== true) {
            showToast({
              title: "Await verification by the approver",
              description: "Wait for the verification by approver",
              status: "loading",
              duration: 5000,
              isClosable: true,
            });
          } else {
            showToast({
              title: "Logged In Successfully",
              status: "loading",
              duration: 5000,
              isClosable: true,
            });
            navigate(`/dashboardReviewer`); 
          }
        } else if (values.userType === "approver") {
          response = await authAxios.post("/users/approverlogin", req);
          if (response.data.isVarified !== true) {
            showToast({
              title: "Welcome, logging you in soon",
              status: "loading",
              duration: 5000,
              isClosable: true,
            });
            navigate("/dashboardApprover"); 
          }
        } else {
          showToast({
            title: "Invalid User Type",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }
        console.log(response.data);
        setAuthToken(response.data.token);
        localStorage.setItem("userToken", response.data.token);
        // axios.default.header
        // console.log(axios.defaults.headers.common['Authorization']);
      } catch (error) {
        try {
          if (error.response.status === 400) {
            showToast({
              title: "Invalid Credentials",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          } else {
            throw error;
          }
        } catch (error) {
          showToast({
            title: "Some error has occured. Please contact developer.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    },
  });
  // });

  // Function to toggle password visibility
  const handleTogglePasswordVisibility = () => {
    formik.setFieldValue("password", ""); // Reset password field when toggling visibility
    formik.setFieldTouched("password", false); // Reset touched state
    formik.setFieldValue("showPassword", !formik.values.showPassword);
  };

  // Function to handle any change in zone and correspondingly get reviewers 

  return (
    <VStack spacing={8} p={8} align="center" justify="center">
      <Heading mb={4} fontSize="3xl" fontWeight="bold">
        Welcome back!
      </Heading>
      <Text fontSize="2x9" color="gray.600">
        Login to your account to continue.
      </Text>
      <Box width="100%" maxW="400px">
        {/* Form element with Formik handleSubmit */}
        <form onSubmit={formik.handleSubmit}>
          {/*user type */}
          <FormControl
            id="userType"
            isInvalid={formik.touched.userType && formik.errors.userType}
            isRequired
          >
            <FormLabel>User Type</FormLabel>
            <Select {...formik.getFieldProps("userType")}>
              <option value="applicant">Applicant</option>
              <option value="reviewer">Reviewer</option>
              <option value="approver">Approver</option>
            </Select>
            <FormErrorMessage>{formik.errors.userType}</FormErrorMessage>
          </FormControl>
          {/* Email input */}
          <FormControl
            id="email"
            isInvalid={formik.touched.email && formik.errors.email}
            isRequired
          >
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              placeholder="john.doe@example.com"
              {...formik.getFieldProps("email")}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
          {/* Password input */}
          <FormControl
            id="password"
            isInvalid={formik.touched.password && formik.errors.password}
            isRequired
            mt={2}
          >
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={formik.values.showPassword ? "text" : "password"}
                placeholder="********"
                {...formik.getFieldProps("password")}
              />
              {/* Toggle password visibility button */}
              <InputRightElement>
                <IconButton
                  variant="ghost"
                  icon={formik.values.showPassword ? <FaEyeSlash /> : <FaEye />}
                  onClick={handleTogglePasswordVisibility}
                />
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          {/* Submit button */}
          <Button
            colorScheme="blue"
            type="submit"
            mt={4}
            width="100%"
            borderRadius="full"
          >
            Login
          </Button>
        </form>
      </Box>
      {/* Forgot password link */}
      <Link to="/forgetpassword" mt={2} color="blue.500" fontSize="sm">
        Forgot password?
      </Link>
      {/* Registration link */}
      <Text mt={4} fontSize="sm" color="gray.600">
        Don't have an account?{" "}
        <ChakraLink color="blue.500" as={Link} to="/register">
          Register here.
        </ChakraLink>
      </Text>
    </VStack>
  );
};

export default LoginPage;
