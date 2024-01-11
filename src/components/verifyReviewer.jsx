// verifyReviewer.jsx
import React, { useState } from 'react';
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
} from '@chakra-ui/react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const reviewersData = [
  { id: 1, name: 'Reviewer 1', status: 'Pending' },
  { id: 2, name: 'Reviewer 2', status: 'Pending' },
  { id: 3, name: 'Reviewer 3', status: 'Pending' },
];

const VerifyReviewer = () => {
  const [reviewers, setReviewers] = useState(reviewersData);

  const handleVerify = (reviewerId) => {
    // Update the status of the reviewer to "Verified" and remove from the list
    setReviewers((prevReviewers) =>
      prevReviewers
        .map((reviewer) =>
          reviewer.id === reviewerId ? { ...reviewer, status: 'Verified' } : reviewer
        )
        .filter((reviewer) => reviewer.id !== reviewerId)
    );
  };

  const handleDecline = (reviewerId) => {
    // Update the status of the reviewer to "Declined" and remove from the list
    setReviewers((prevReviewers) =>
      prevReviewers
        .map((reviewer) =>
          reviewer.id === reviewerId ? { ...reviewer, status: 'Declined' } : reviewer
        )
        .filter((reviewer) => reviewer.id !== reviewerId)
    );
  };

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
