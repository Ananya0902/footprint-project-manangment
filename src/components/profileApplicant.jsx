import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  useToast,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import authAxios from "../AuthAxios.js";
import useLogOut from "../hooks/logout";
import { useParams } from "react-router-dom";

const ProfilePageApplicant = () => {
  const mappedUser = useParams();
  console.log(mappedUser);
  const user = JSON.parse(mappedUser.userDetails);
  const showToast = useToast();
  const logout = useLogOut();
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [userDetails, setUserDetails] = useState({
    ...user,
    newPassword: "",
    confirmPassword: "",
  });

  // useEffect(() => {
  //   const getApplicantData = async () => {
  //     try {
  //       const applicantData = await authAxios.get("/users/getApplicant");
  //       console.log("applicant data", applicantData);
  //       if(applicantData.data.success === false) return;
  //       setUserDetails((prevDetails) => {
  //         console.log("Setting user details", prevDetails);
  //         return {
  //           ...prevDetails,
  //           ...match.params.userDetails
  //         };
  //       });
  //       console.log("userDetails", userDetails);
  //     } catch (error) {
  //       showToast({
  //         title: "Error getting applicant data",
  //         duration: 500,
  //         isClosable: true,
  //         status: "error",
  //       });
  //     }
  //   };
  //   getApplicantData();
  //   return () => {};
  // } , []);

  const handleToggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleChangePassword = async (
    values,
    { setFieldValue, setSubmitting }
  ) => {
    const newPassword = values.newPassword;
    const confirmPassword = values.confirmPassword;

    // Validate the new password
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        "Password must be at least 6 characters long and include at least 1 special symbol."
      );
      setConfirmPasswordError("");
      return;
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      setPasswordError("");
      setConfirmPasswordError("Passwords do not match.");
      return;
    }
    // Mock password change logic (replace with actual logic)
    try {
      const response = await authAxios.put(
        "/users/changepasswordapplicant",
        {newpassword:newPassword}
      );
      console.log(response);
      if (response.data.success === true) {
        showToast({
          title: "Successfully Changed Password",
          duration: 5000,
          status: "success",
        });
      } else {
        throw new Error("Cannot change password successfully");
      }
    } catch (error) {
      showToast({
        title: "Cannot Change Password Successfully",
        duration: 5000,
        status: "error",
      });
    }
    setShowChangePassword(false);
    setPasswordError("");
    setConfirmPasswordError("");
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Applicant Profile
        </Heading>

        <Formik
          enableReinitialize={true}
          initialValues={userDetails}
          onSubmit={(values, actions) => logout()}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            setFieldValue,
            setSubmitting,
          }) => (
            <Form onSubmit={() => logout()}>
              <VStack
                align="start"
                spacing={4}
                mb={8}
                mx="auto"
                maxWidth="400px"
              >
                {/* Name */}
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    readOnly
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Email */}
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    readOnly
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Toggle Change Password Button */}
                <Button
                  colorScheme="teal"
                  type="button"
                  onClick={handleToggleChangePassword}
                  mt={2}
                >
                  {showChangePassword
                    ? "Cancel Change Password"
                    : "Change Password"}
                </Button>

                {/* New Password (visible when Change Password is clicked) */}
                {showChangePassword && (
                  <>
                    <FormControl isRequired>
                      <FormLabel>New Password</FormLabel>
                      <Input
                        type="password"
                        name="newPassword"
                        value={values.newPassword}
                        onChange={handleChange}
                      />
                    </FormControl>

                    {/* Confirm Password */}
                    <FormControl isRequired>
                      <FormLabel>Confirm Password</FormLabel>
                      <Input
                        type="password"
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                      />
                    </FormControl>

                    {/* Error Message for Password Validation */}
                    {passwordError && (
                      <Alert status="error">
                        <AlertIcon />
                        {passwordError}
                      </Alert>
                    )}

                    {/* Error Message for Confirm Password */}
                    {confirmPasswordError && (
                      <Alert status="error">
                        <AlertIcon />
                        {confirmPasswordError}
                      </Alert>
                    )}
                  </>
                )}

                {/* Save Password Button */}
                {showChangePassword && (
                  <Button
                    colorScheme="green"
                    type="button"
                    onClick={() =>
                      handleChangePassword(values, {
                        setFieldValue,
                        setSubmitting,
                      })
                    }
                    mt={2}
                  >
                    Save Password
                  </Button>
                )}

                {/* Mobile Number */}
                <FormControl>
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    readOnly
                    type="tel"
                    name="mobileNumber"
                    value={values.mobileNumber}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Apostolate */}
                <FormControl>
                  <FormLabel>Apostolate</FormLabel>
                  <Input
                    readOnly
                    type="text"
                    name="apostolate"
                    value={values.apostolate}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Name of Province */}
                <FormControl>
                  <FormLabel>Name of Province</FormLabel>
                  <Input
                    readOnly
                    type="text"
                    name="province"
                    value={values.province}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Submit Button */}
                <Button colorScheme="blue" type="submit" mt={10} ml="auto">
                  Logout
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      </Box>
    </ChakraProvider>
  );
};

export default ProfilePageApplicant;
