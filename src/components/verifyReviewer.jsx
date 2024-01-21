// verifyReviewer.jsx
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
import axios from "../AuthAxios.js";

const VerifyReviewer = () => {
  const showToast = useToast();
  // const showToast = useToast();
  const [reviewers, setReviewers] = useState([]);
  console.log(`${reviewers}`);
  useEffect(() => {
    console.log("reviewers", reviewers);
  }, [reviewers]);
  // const getReviewersToVerify =
  useEffect(() => {
    axios
      .get("/users/allreviewer")
      .then((response) => {
        console.log(response.data);
        setReviewers(
          response.data.data
            .filter((reviewer) => reviewer.isVarified === false)
            .map((reviewer) => {
              return {
                id: reviewer._id,
                name: reviewer.name,
                status: "pending",
              };
            })
        );
      })
      .catch((error) =>
        showToast({
          title: "Cannot get all reviewers",
          description: "Error fetching reviewers",
          duration: 500,
          isClosable: true,
          status: "error",
        })
      );
  }, [showToast]);

  // const handleVerify = async (reviewerId) => {
  //   // Update the status of the reviewer to "Verified" and remove from the list

  //   // removal from list
  //   try {
  //     const response = await axios.post("/reviewervarify" , reviewerId);
  //     setReviewers((prevReviewers) =>
  //       prevReviewers
  //         .map((reviewer) =>
  //           reviewer.id === reviewerId
  //             ? { ...reviewer, status: "Verified" }
  //             : reviewer
  //         )
  //         .filter((reviewer) => reviewer.id !== reviewerId)
  //     );
  //   } catch (error) {
  //     showToast({
  //       title: "Error verifying reviewer",
  //       status: "error",
  //       duration: 500,
  //       isClosable: false,
  //     });
  //   }
  // };

  const handleVerify = (reviewerId) => {
    // Update the status of the reviewer to "Verified" on the server
    axios
      .put("/users/reviewervarify", { reviewer: reviewerId })
      .then((response) => {
        console.log(response.data);
        setReviewers((prevReviewers) =>
          prevReviewers.filter((reviewer) => reviewer.id !== reviewerId)
        );
      })
      .catch((error) => {
        console.error("Error verifying reviewer:", error);
      });
  };
  // const handleDecline = async (reviewerId) => {
  //   // Update the status of the reviewer to "Declined" and remove from the list
  //   try {
  //     const response = await axios.post("/reviewerunvarify" , reviewerId);
  //     setReviewers((prevReviewers) =>
  //       prevReviewers
  //         .map((reviewer) =>
  //           reviewer.id === reviewerId
  //             ? { ...reviewer, status: "Declined" }
  //             : reviewer
  //         )
  //         .filter((reviewer) => reviewer.id !== reviewerId)
  //     );
  //   } catch (error) {
  //     showToast({
  //       title: error.response.data,
  //       status: "error",
  //       duration: 500,
  //       isClosable: false,
  //     });
  //   }
  // };
  const handleDecline = (reviewerId) => {
    console.log("decline");
    // Delete the reviewer on the server
    axios
      .delete("/users/reviewerunvarify", { reviewer: reviewerId })
      .then((response) => {
        console.log(response);
        setReviewers((prevReviewers) =>
          prevReviewers.filter((reviewer) => reviewer.id !== reviewerId)
        );
      })
      .catch((error) => {
        console.error("Error declining reviewer:", error);
      });
  };
  // console.log("Get reviewers to verify");
  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          Verify Reviewers
        </Heading>

        {reviewers.length > 0 ? (
          <List spacing={3} width="100%">
            {reviewers.map((reviewer) => (
              <Box
                key={reviewer.id}
                bg="white"
                p={6}
                borderRadius="lg"
                boxShadow="md"
                width="100%"
              >
                <Flex justify="space-between" align="center">
                  <Heading size="md" color="blue.500">
                    {reviewer.name}
                  </Heading>
                  <Text fontSize="md" color="gray.600">
                    Status: {reviewer.status}
                  </Text>
                </Flex>
                <Divider mt={4} mb={4} />
                <VStack spacing={3}>
                  <Button
                    leftIcon={<ListIcon as={FaCheck} />}
                    colorScheme="green"
                    onClick={() => handleVerify(reviewer.id)}
                  >
                    Verify
                  </Button>
                  <Button
                    leftIcon={<ListIcon as={FaTimes} />}
                    colorScheme="red"
                    onClick={() => handleDecline(reviewer.id)}
                  >
                    Decline
                  </Button>
                </VStack>
              </Box>
            ))}
          </List>
        ) : (
          <Text textAlign="center" color="gray.600">
            No reviewers to verify.
          </Text>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default VerifyReviewer;
