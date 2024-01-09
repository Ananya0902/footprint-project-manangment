// RegisterPage.jsx
import React from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
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
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  FaKey,
  FaMobileAlt,
  FaUser,
  FaEnvelope,
  FaGlobe,
  FaUsers,
} from "react-icons/fa";

// RegisterPage component
const RegisterPage = () => {
  const showToast = useToast();
  const navigate = useNavigate();

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
      reviewerList: [],
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
        is: (value) => value === "reviewer",
        then: () => Yup.string().required("Required"),
        otherwise: () => Yup.string().notRequired(),
      }),

      reviewer: Yup.string().when("userType", {
        is: (value) => value === "reviewer",
        then: () => Yup.string().required("Required"),
        otherwise: () => Yup.string().notRequired(),
      }),
      reviewerList: Yup.array().of(
        Yup.object()
          .shape({
            id: Yup.string().required("Required"), // Validating 'id' field
            name: Yup.string().required("Required"), // Validating 'name' field
          })
          .noUnknown() // Ignore unknown fields in the object
      ),
    }),

    onSubmit: async (values) => {
      let response;
      console.log("Registering with:", values);
      var req = {
        name: values.name,
        email: values.email,
        password: values.password,
        apostolate: values.apostolate,
        mobile: values.mobileNumber,
        nameOfProvince: values.province,
        reviewer: values.reviewer,
      };

      try {
        if (values.userType === "applicant") {
          response = await axios.post("/applicantsignup", req);
        } else if (values.user === "reviewer") {
          response = await axios.post("/reviewersignup", req);
        }
        // showToast.
        showToast({
          title: "You have successfully registered",
          status: "success",
          duration: 50,
          isClosable: true,
        });
        navigate("/login"); // navigate to login page
      } catch (error) {
        if (error.response.status === 400) {
          showToast({
            title: "Invalid Credential",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else if (error.response.status === 404) {
          showToast({
            title: "Invalid Reviewer",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else if (error.response.status === 404) {
          showToast({
            title: "Invalid Reviewer",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else if (error.response.status === 408) {
          showToast({
            title: "User already exist",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else if (error.response.status === 500) {
          showToast({
            title: "Cannot create user",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        } else {
          showToast({
            title: "Unknown Error please contact Developer",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      }
    },
  }); // Formik initialization with data fields
  const getReviewerByZone = async (zone) => {
    // zone = north east central
    try {
      console.log("Value : ", zone);
      const response = await axios.get(`/allreviewer/${zone}`);
      const simplifiedReviewers = response.data.reviewers.map((reviewer) => ({
        id: reviewer._id,
        name: reviewer.name,
      }));
      console.log(response.data);
      console.log("data:", response.data.reviewers);
      formik.setFieldValue("reviewer", "");
      console.log(simplifiedReviewers);
      formik.setFieldValue("reviewerList", simplifiedReviewers);
    } catch (error) {
      formik.setFieldValue("reviewerList", []);
      showToast({
        title: "Cannot fetch reviewers",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
            isInvalid={
              formik.touched.mobileNumber && formik.errors.mobileNumber
            }
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
            onChange={(event) => getReviewerByZone(event.target.value)}
          >
            <FormLabel>
              <Box as={FaGlobe} mr={2} />
              Province
            </FormLabel>
            <Select {...formik.getFieldProps("province")} placeholder="Select">
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="central">Central</option>
            </Select>
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
            <Select
              {...formik.getFieldProps("apostolate")}
              placeholder="Select"
            >
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
            onChange={(event) => console.log(event.target.value)}
          >
            <FormLabel>
              <Box as={FaUsers} mr={2} />
              Reviewer
            </FormLabel>
            <Select {...formik.getFieldProps("reviewer")} placeholder="Select">
              {/* Loop through reviewerList to populate options */}
              {formik.values.reviewerList.map((reviewer) => (
                <option value={reviewer.id}>{reviewer.name}</option>
              ))}
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
