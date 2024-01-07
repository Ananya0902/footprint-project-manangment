// RegisterPage.jsx
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
  Select,
  VStack,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaKey, FaMobileAlt, FaUser, FaEnvelope, FaGlobe, FaUsers } from "react-icons/fa";

// RegisterPage component
const RegisterPage = () => {
  // Formik for form management
  const formik = useFormik({
    initialValues: {
      userType: "applicant",
      name: "",
      email: "",
      password: "",
      mobileNumber: "",
      province: "",
      apostolate: "",
      reviewer: "",
    },
    validationSchema: Yup.object({
        userType: Yup.string().required("Required"),
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
        province: Yup.string().required("Required"),
        apostolate: Yup.string().when("userType", {
          is: (value)=>value === "reviewer",
          then: ()=>Yup.string().required("Required"),
          otherwise: ()=>Yup.string().notRequired(),
        }),
        
        reviewer: Yup.string().when("userType", {
          is: (value)=>value === "reviewer",
          then: ()=>Yup.string().required("Required"),
          otherwise: ()=>Yup.string().notRequired(),
        }),
      }),
      
      onSubmit: (values) => {
        console.log("Registering with:", values);
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
        Register
      </Heading>
      <Box width="100%" maxW="400px">
        {/* Form element with Formik handleSubmit */}
        <form onSubmit={formik.handleSubmit}>
          {/* User Type dropdown */}
          <FormControl
            id="userType"
            isInvalid={formik.touched.userType && formik.errors.userType}
            isRequired
          >
            <FormLabel>User Type</FormLabel>
            <Select {...formik.getFieldProps("userType")}>
              <option value="applicant">Applicant</option>
              <option value="reviewer">Reviewer</option>
            </Select>
            <FormErrorMessage>{formik.errors.userType}</FormErrorMessage>
          </FormControl>
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
          {/* Province input */}
          <FormControl
            id="province"
            isInvalid={formik.touched.province && formik.errors.province}
            isRequired
            mt={2}
          >
            <FormLabel>
              <Box as={FaGlobe} mr={2} />
              Province
            </FormLabel>
            <Input
              type="text"
              placeholder="Your Province"
              {...formik.getFieldProps("province")}
            />
            <FormErrorMessage>{formik.errors.province}</FormErrorMessage>
          </FormControl>
          {/* Apostolate dropdown */}
          <FormControl
            id="apostolate"
            isInvalid={formik.touched.apostolate && formik.errors.apostolate}
            isRequired
            mt={2}
            isDisabled={formik.values.userType === "reviewer"}
          >
            <FormLabel>
              <Box as={FaGlobe} mr={2} />
              Apostolate
            </FormLabel>
            <Select {...formik.getFieldProps("apostolate")} placeholder="Select">
              <option value="social">Social</option>
              <option value="education">Education</option>
              <option value="health">Health</option>
              <option value="others">Others</option>
            </Select>
            <FormErrorMessage>{formik.errors.apostolate}</FormErrorMessage>
          </FormControl>
          {/* Reviewer dropdown */}
          <FormControl
            id="reviewer"
            isInvalid={formik.touched.reviewer && formik.errors.reviewer}
            isRequired
            mt={2}
            isDisabled={formik.values.userType === "reviewer"}
          >
            <FormLabel>
              <Box as={FaUsers} mr={2} />
              Reviewer
            </FormLabel>
            <Select {...formik.getFieldProps("reviewer")} placeholder="Select">
              {/* Add options for reviewers here */}
              <option value="reviewer1">Reviewer 1</option>
              <option value="reviewer2">Reviewer 2</option>
              <option value="reviewer3">Reviewer 3</option>
            </Select>
            <FormErrorMessage>{formik.errors.reviewer}</FormErrorMessage>
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

export default RegisterPage;
