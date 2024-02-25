// verifyApplicant.jsx
import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Divider,
  List,
  ListIcon,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { FaCheck, FaTimes } from "react-icons/fa";
import axios from "../../AuthAxios.js";

const AllApplicantsReviewer = ({ loggedInReviewerId }) => {
  const [applicants, setApplicants] = useState([]);
  const showToast = useToast();

  // to get all applicants
  console.log(localStorage.getItem("userToken"));

  useEffect(() => {
    axios
      .get("/users/allapplicant")
      .then((response) => {
        console.log(response.data);
        setApplicants(
          response.data.data
            .filter((applicant) => applicant.isVarified === true)
            .map((applicant) => {
              return {
                id: applicant._id,
                name: applicant.name,
                email: applicant.email, 
                contact: applicant.mobile,
                apostolate: applicant.apostolate,
                status: "pending",
              };
            })
        );
      })
      .catch((error) =>
        // console.log(error);
        showToast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 500,
        })
      );
  }, [showToast]);

  // Create a function for addition

  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          Verify Applicants
        </Heading>

        <List spacing={3} width="100%">
  {applicants.length > 0 ? (
    applicants.map((applicant) => (
      <Box
        key={applicant.id}
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="md"
        width="100%"
      >
        <Flex justify="space-between" align="center">
          <Heading size="md" color="blue.500">
            {applicant.name}
          </Heading>
          <VStack align="flex-end" spacing={2}>
            <Text fontSize="md" color="gray.600">
              Email: {applicant.email}
            </Text>
            <Text fontSize="md" color="gray.600">
              Contact: {applicant.contact}
            </Text>
            <Text fontSize="md" color="gray.600">
              Appostolate: {applicant.apostolate}
            </Text>
          </VStack>
        </Flex>
        <Divider mt={4} mb={4} />
      </Box>
    ))
  ) : (
    <Text textAlign="center" color="gray.600">
      No applicants for the logged-in reviewer.
    </Text>
  )}
</List>

      </Box>
    </ChakraProvider>
  );
};

export default AllApplicantsReviewer;
