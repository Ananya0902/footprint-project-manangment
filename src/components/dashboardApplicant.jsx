// DashboardApplicant.jsx
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

const DashboardApplicant = () => {
  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        
      <Flex align="center" justify="flex-end">
          <Button colorScheme="teal" mr={2} as={Link} to="/logout">
            Logout
          </Button>
        </Flex>
        
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.500">
          Welcome, Applicant!
        </Heading>

        <VStack spacing={6}>
          {/* My Projects Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="teal.500">
              My Projects
            </Heading>
            <Text fontSize="md" color="gray.600">
              Explore and manage your personal projects.
            </Text>
            <Button
              as={Link}
              to="/myProjects"
              colorScheme="teal"
              mt={4}
              borderRadius="full"
            >
              Go to My Projects
            </Button>
          </Box>

          {/* Individual Projects Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="teal.500">
              Individual Projects
            </Heading>
            <Text fontSize="md" color="gray.600">
              View and contribute to individual projects.
            </Text>
            <Button
              as={Link}
              to="/individualProjects"
              colorScheme="teal"
              mt={4}
              borderRadius="full"
            >
              Explore Individual Projects
            </Button>
          </Box>

          {/* Group Projects Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="teal.500">
              Group Projects
            </Heading>
            <Text fontSize="md" color="gray.600">
              Collaborate with others in group projects.
            </Text>
            <Button
              as={Link}
              to="/groupProjects"
              colorScheme="teal"
              mt={4}
              borderRadius="full"
            >
              Explore Group Projects
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
            <Heading size="md" mb={4} color="teal.500">
              Profile
            </Heading>
            <Text fontSize="md" color="gray.600">
              Update your personal information.
            </Text>
            <Button
              as={Link}
              to="/profileApplicant"
              colorScheme="teal"
              mt={4}
              borderRadius="full"
            >
              Go to Profile
            </Button>
          </Box>
        </VStack>

        <Text mt={8} textAlign="center" color="gray.600">
          Explore and manage your projects with ease.
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default DashboardApplicant;


