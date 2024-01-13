// dashboardApprover.jsx
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

const DashboardApprover = () => {
  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
      <Flex align="center" justify="flex-end">
          <Button colorScheme="green" mr={2} as={Link} to="/logout">
            Logout
          </Button>
        </Flex>
        
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="green.500">
          Welcome, Approver!
        </Heading>

        <VStack spacing={6}>
          {/* Projects to Be Approved Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="green.500">
              Projects to Be Approved
            </Heading>
            <Text fontSize="md" color="gray.600">
              Review and approve submitted projects.
            </Text>
            <Button
              as={Link}
              to="/projects-to-be-approved"
              colorScheme="green"
              mt={4}
              borderRadius="full"
            >
              Approve Projects
            </Button>
          </Box>

          {/* Verify Reviewer Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="green.500">
              Verify Reviewer
            </Heading>
            <Text fontSize="md" color="gray.600">
              Verify and approve reviewer information.
            </Text>
            <Button
              as={Link}
              to="/verifyReviewer"
              colorScheme="green"
              mt={4}
              borderRadius="full"
            >
              Verify Reviewer
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
            <Heading size="md" mb={4} color="green.500">
              Profile
            </Heading>
            <Text fontSize="md" color="gray.600">
              Update your personal information.
            </Text>
            <Button
              as={Link}
              to="/profileApprover"
              colorScheme="green"
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
            <Heading size="md" mb={4} color="green.500">
              Approved Projects
            </Heading>
            <Text fontSize="md" color="gray.600">
              View approved projects and their reports.
            </Text>
            <Button
              as={Link}
              to="/approved-projects"
              colorScheme="green"
              mt={4}
              borderRadius="full"
            >
              View Approved Projects
            </Button>
          </Box>
        </VStack>

        <Text mt={8} textAlign="center" color="gray.600">
          Manage your approving tasks efficiently.
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default DashboardApprover;
