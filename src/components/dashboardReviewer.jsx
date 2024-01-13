// dashboardReviewer.jsx
import React from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  VStack,
  Heading,
  Text,
  Flex,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const DashboardReviewer = () => {
  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
      <Flex align="center" justify="flex-end">
          <Button colorScheme="blue" mr={2} as={Link} to="/logout">
            Logout
          </Button>
        </Flex>
        
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          Welcome, Reviewer!
        </Heading>

        <VStack spacing={6}>
          {/* Projects to Be Reviewed Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="blue.500">
              Projects to Be Reviewed
            </Heading>
            <Text fontSize="md" color="gray.600">
              Review and provide feedback on submitted projects.
            </Text>
            <Button
              as={Link}
              to="/projects-to-be-reviewed"
              colorScheme="blue"
              mt={4}
              borderRadius="full"
            >
              Review Projects
            </Button>
          </Box>
          {/* My Reviewed Projects */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="blue.500">
            My Reviewed Projects
            </Heading>
            <Text fontSize="md" color="gray.600">
            Explore and manage your reviewed projects.
            </Text>
            <Button
              as={Link}
              to="/MyReviewedProject"
              colorScheme="blue"
              mt={4}
              borderRadius="full"
            >
              My projects
            </Button>
          </Box>

          {/* Verify Applicant Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="blue.500">
              Verify Applicant
            </Heading>
            <Text fontSize="md" color="gray.600">
              Verify and approve applicant information.
            </Text>
            <Button
              as={Link}
              to="/verifyApplicant"
              colorScheme="blue"
              mt={4}
              borderRadius="full"
            >
              Verify Applicant
            </Button>
          </Box>

          {/* Profile Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="blue.500">
              Profile
            </Heading>
            <Text fontSize="md" color="gray.600">
              Update your personal information.
            </Text>
            <Button
              as={Link}
              to="/profileReviewer"
              colorScheme="blue"
              mt={4}
              borderRadius="full"
            >
              Go to Profile
            </Button>
          </Box>

          {/* Approved Projects Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="blue.500">
              Approved Projects
            </Heading>
            <Text fontSize="md" color="gray.600">
              View approved projects and their reports.
            </Text>
            <Button
              as={Link}
              to="/approved-projects"
              colorScheme="blue"
              mt={4}
              borderRadius="full"
            >
              View Approved Projects
            </Button>
          </Box>
        </VStack>

        <Text mt={8} textAlign="center" color="gray.600">
          Manage your reviewing tasks efficiently.
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default DashboardReviewer;

