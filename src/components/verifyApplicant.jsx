// verifyApplicant.jsx
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
  ListItem,
  ListIcon,
  Flex,
} from '@chakra-ui/react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const applicantsData = [
  { id: 1, name: 'Applicant 1', status: 'Pending', reviewerId: 1 },
  { id: 2, name: 'Applicant 2', status: 'Pending', reviewerId: 2 },
  { id: 3, name: 'Applicant 3', status: 'Pending', reviewerId: 1 },
];

const VerifyApplicant = ({ loggedInReviewerId }) => {
  const [applicants, setApplicants] = useState(applicantsData);
  const filteredApplicants = applicants.filter((applicant) => applicant.reviewerId === loggedInReviewerId);

  const handleVerify = (applicantId) => {
    // Update the status of the applicant to "Verified"
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.id === applicantId ? { ...applicant, status: 'Verified' } : applicant
      )
    );
  };
  // Create a function for addition 
  const handleDecline = (applicantId) => {
    // Update the status of the applicant to "Declined"
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.id === applicantId ? { ...applicant, status: 'Declined' } : applicant
      )
    );
  };

  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          Verify Applicants
        </Heading>

        <List spacing={3} width="100%">
          {filteredApplicants.length > 0 ? (
            filteredApplicants.map((applicant) => (
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
                  <Text fontSize="md" color="gray.600">
                    Status: {applicant.status}
                  </Text>
                </Flex>
                <Divider mt={4} mb={4} />
                <VStack spacing={3}>
                  <Button
                    leftIcon={<ListIcon as={FaCheck} />}
                    colorScheme="green"
                    onClick={() => handleVerify(applicant.id)}
                  >
                    Verify
                  </Button>
                  <Button
                    leftIcon={<ListIcon as={FaTimes} />}
                    colorScheme="red"
                    onClick={() => handleDecline(applicant.id)}
                  >
                    Decline
                  </Button>
                </VStack>
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

export default VerifyApplicant;

