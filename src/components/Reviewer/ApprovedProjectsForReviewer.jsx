// ApprovedProjectsForReviewer.jsx
import React from 'react';
import { ChakraProvider, Box, Heading, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Dummy data, replace this with your actual data
const approvedProjectsForReviewer = [
  { id: 1, title: 'Approved Project 1', province: 'north' },
  { id: 2, title: 'Approved Project 2', province: 'south' },
  { id: 3, title: 'Approved Project 3', province: 'north' },
  { id: 4, title: 'Approved Project 4', province: 'north' },
  { id: 5, title: 'Approved Project 5', province: 'central' },
  { id: 6, title: 'Approved Project 6', province: 'north' },
  // Add more approved projects as needed
];

const ApprovedProjectsForReviewer = ({ reviewerProvince }) => {
  const filteredProjects = approvedProjectsForReviewer.filter(
    (project) => project.province === reviewerProvince
  );

  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          Approved Projects for Reviewer in {reviewerProvince}
        </Heading>

        <VStack spacing={6} align="stretch">
          {filteredProjects.map((project) => (
            <Box
              key={project.id}
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              width="100%"
            >
              <Heading size="md" mb={2} color="blue.500">
                {project.title}
              </Heading>
              <Button
                colorScheme="blue"
                as={Link}
                to={`/approved-project-details/${project.id}`} // Update this route as needed for project details
                mb={2}
                borderRadius="full"
              >
                Open Project
              </Button>
            </Box>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default ApprovedProjectsForReviewer;
