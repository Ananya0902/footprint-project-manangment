// RegisterApproverPage.jsx
import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  Text,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaKey, FaMobileAlt, FaUser, FaEnvelope } from "react-icons/fa";
import authAxios from "../AuthAxios";

// RegisterApproverPage component
const RegisterApproverPage = () => {
  const showToast = useToast() ; 
  // Formik for form management
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      mobileNumber: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .required("Required")
        .min(6, "Password must be at least 6 characters")
        .matches(
          /^(?=.*[!@#$%^&*(),.?":{}|<>])/,
          "Password must contain at least 1 special character"
        ),
      mobileNumber: Yup.string()
        .required("Required")
        .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    }),
    onSubmit: async (values) => {
      console.log("Registering Approver with:", values);
      try {
        const req = {
          name : values.name,
          email : values.email , 
          password : values.password,
          mobile : values.mobileNumber

        }
        const response = await authAxios.post(
          '/users/approversignup' , 
          req 
        ) ; 
        showToast(
          {
            title: "Approver registration" , 
            description : "Approver has been successfully register, please login" , 
            status : "success" , 
            duration : 500 , 
            isClosable : true
          }
        ) ; 
      } catch (error) {
        showToast(
          {
            title: "Error registering approver" , 
            description : "Error registering approver" , 
            status : "error" , 
            duration : 500 , 
            isClosable : true
          }
        )
      }
    },
  });

  return (
    <VStack
      spacing={8}
      p={8}
      align="center" // Center the content horizontally
      justify="center" // Center the content vertically
    >
      <Heading mb={4} fontSize="3xl" fontWeight="bold">
        Register as Approver
      </Heading>
      <Box width="100%" maxW="400px">
        {/* Form element with Formik handleSubmit */}
        <form onSubmit={formik.handleSubmit}>
          {/* Name input */}
          <FormControl
            id="name"
            isInvalid={formik.touched.name && formik.errors.name}
            isRequired
            mt={2}
          >
            <FormLabel>
              <Box as={FaUser} mr={2} />
              Name
            </FormLabel>
            <Input
              type="text"
              placeholder="John Doe"
              {...formik.getFieldProps("name")}
            />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>
          {/* Email input */}
          <FormControl
            id="email"
            isInvalid={formik.touched.email && formik.errors.email}
            isRequired
            mt={2}
          >
            <FormLabel>
              <Box as={FaEnvelope} mr={2} />
              Email address
            </FormLabel>
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
            <FormLabel>
              <Box as={FaKey} mr={2} />
              Password
            </FormLabel>
            <InputGroup>
              <Input
                type="password"
                placeholder="********"
                {...formik.getFieldProps("password")}
              />
              {/* Toggle password visibility button */}
              <InputLeftElement>
                {/* You can customize the eye icon as needed */}
                <Box as={FaKey} color="gray.300" />
              </InputLeftElement>
            </InputGroup>
            <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
          </FormControl>
          {/* Mobile Number input */}
          <FormControl
            id="mobileNumber"
            isInvalid={formik.touched.mobileNumber && formik.errors.mobileNumber}
            isRequired
            mt={2}
          >
            <FormLabel>
              <Box as={FaMobileAlt} mr={2} />
              Mobile Number
            </FormLabel>
            <Input
              type="tel"
              placeholder="1234567890"
              {...formik.getFieldProps("mobileNumber")}
            />
            <FormErrorMessage>{formik.errors.mobileNumber}</FormErrorMessage>
          </FormControl>
          {/* Submit button */}
          <Button
            colorScheme="blue"
            type="submit"
            mt={4}
            width="100%"
            borderRadius="full"
          >
            Register
          </Button>
        </form>
      </Box>
      {/* Already have an account link */}
      <Text mt={4} fontSize="sm" color="gray.600">
        Already have an account?{" "}
        <ChakraLink color="blue.500" as={Link} to="/login">
          Login here.
        </ChakraLink>
      </Text>
    </VStack>
  );
};

export default RegisterApproverPage;
