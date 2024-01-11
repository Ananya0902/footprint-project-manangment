import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  IconButton,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Formik, Form } from 'formik';

const ProfilePageApplicant = () => {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [changedPassword, setChangedPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const handlePasswordVisibility = (values, setFieldValue, showPassword) => {
    setFieldValue('showPassword', !showPassword);
    setShowPassword(!showPassword);
  };

  const handleToggleChangePassword = () => {
    setShowChangePassword(!showChangePassword);
  };

  const handleSavePassword = (values, { setFieldValue, setSubmitting }) => {
    const newPassword = values.newPassword;
    const confirmPassword = values.confirmPassword;

    // Validate the new password
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    if (!passwordRegex.test(newPassword)) {
      setPasswordError(
        'Password must be at least 6 characters long and include at least 1 special symbol.'
      );
      setConfirmPasswordError('');
      return;
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      setPasswordError('');
      setConfirmPasswordError('Passwords do not match.');
      return;
    }

    // Mock password change logic (replace with actual logic)
    setChangedPassword(newPassword);
    setFieldValue('password', newPassword);
    setShowChangePassword(false);
    setSubmitting(false);
    setPasswordError('');
    setConfirmPasswordError('');
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Applicant Profile
        </Heading>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            userType: 'applicant',
            mobileNumber: '',
            apostolate: '',
            province: '',
            reviewerName: '',
            newPassword: '',
            confirmPassword: '',
            showPassword: false,
          }}
          onSubmit={(values, actions) => console.log(values)}
        >
          {({ values, handleChange, handleSubmit, setFieldValue, setSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <VStack align="start" spacing={4} mb={8} mx="auto" maxWidth="400px">
                {/* User Type */}
                <FormControl isRequired>
                  <FormLabel>User Type</FormLabel>
                  <Input type="text" name="userType" value={values.userType} onChange={handleChange} />
                </FormControl>

                {/* Name */}
                <FormControl isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" name="name" value={values.name} onChange={handleChange} />
                </FormControl>

                {/* Email */}
                <FormControl isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input type="email" name="email" value={values.email} onChange={handleChange} />
                </FormControl>

                {/* Password */}
                <FormControl isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={values.showPassword ? 'text' : 'password'}
                      name="password"
                      value={showChangePassword ? changedPassword : values.password}
                      onChange={handleChange}
                    />
                    <InputRightElement>
                      <IconButton
                        aria-label={values.showPassword ? 'Hide Password' : 'Show Password'}
                        icon={values.showPassword ? <FaEyeSlash /> : <FaEye />}
                        onClick={() =>
                          handlePasswordVisibility(values, setFieldValue, values.showPassword)
                        }
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                {/* Toggle Change Password Button */}
                <Button
                  colorScheme="teal"
                  type="button"
                  onClick={handleToggleChangePassword}
                  mt={2}
                >
                  {showChangePassword ? 'Cancel Change Password' : 'Change Password'}
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
                    onClick={() => handleSavePassword(values, { setFieldValue, setSubmitting })}
                    mt={2}
                  >
                    Save Password
                  </Button>
                )}

                {/* Mobile Number */}
                <FormControl isRequired>
                  <FormLabel>Mobile Number</FormLabel>
                  <Input
                    type="tel"
                    name="mobileNumber"
                    value={values.mobileNumber}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Apostolate */}
                <FormControl isRequired>
                  <FormLabel>Apostolate</FormLabel>
                  <Input type="text" name="apostolate" value={values.apostolate} onChange={handleChange} />
                </FormControl>

                {/* Name of Province */}
                <FormControl isRequired>
                  <FormLabel>Name of Province</FormLabel>
                  <Input type="text" name="province" value={values.province} onChange={handleChange} />
                </FormControl>

                {/* Reviewer's Name */}
                <FormControl isRequired>
                  <FormLabel>Reviewer's Name</FormLabel>
                  <Input
                    type="text"
                    name="reviewerName"
                    value={values.reviewerName}
                    onChange={handleChange}
                  />
                </FormControl>

                {/* Submit Button */}
                <Button colorScheme="blue" type="submit" mt={10} ml="auto">
                  Save Changes
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


