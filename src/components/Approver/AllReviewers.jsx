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

const ReviewersUnderMe = ({ loggedInReviewerId }) => {
  const [reviewers, setReviewers] = useState([]);
  const showToast = useToast();

  // to get all applicants
  console.log(localStorage.getItem("userToken"));

  useEffect(() => {
    axios
      .get("/users/allreviewer")
      .then((response) => {
        console.log(response.data);
        setReviewers(
          response.data.data
            .filter((applicant) => applicant.isVarified === true)
            .map((applicant) => {
              return {
                id: applicant._id,
                name: applicant.name,
                email: applicant.email , 
                contact: applicant.mobile,
                province : applicant.nameOfProvince,
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
          {reviewers.length > 0 ? (
            reviewers.map((applicant) => (
              <Box
                key={applicant.id}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="md"
                width="100%"
              >
                    <VStack align="flex-start">
                    <Heading size="md" color="blue.500">
                      {applicant.name}
                    </Heading>
                    {/**Space bwtween items in the HStack */}
                    <Text fontSize="md" color="gray.600">
                      {`Province : ${applicant.province}`}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {`Email : ${applicant.email}`}
                    </Text>
                    <Text fontSize="md" color="gray.600">
                      {`Contact : ${applicant.contact}`}
                    </Text>
                  </VStack>
                <Divider mt={4} mb={4} />
              </Box>
            ))
          ) : (
            <Text textAlign="center" color="gray.600">
              No reviewers for the logged-in approver.
            </Text>
          )}
        </List>
      </Box>
    </ChakraProvider>
  );
};

export default ReviewersUnderMe;
