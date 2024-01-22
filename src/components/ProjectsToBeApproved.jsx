// ProjectsToBeApproved.jsx
import React from 'react';
import { ChakraProvider, Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Dummy data, replace this with your actual data
const projectsToBeApproved = [
  { id: 1, title: 'Project to Be Approved 1' },
  { id: 2, title: 'Project to Be Approved 2' },
  // Add more projects to be approved as needed
];

const ProjectsToBeApproved = () => {
  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          Projects to Be Approved
        </Heading>

        <VStack spacing={6} align="stretch">
          {projectsToBeApproved.map((project) => (
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
                to={`/approve-project/${project.id}`} // Update this route as needed
                mb={2}
                borderRadius="full"
              >
                Approve Project
              </Button>
            </Box>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default ProjectsToBeApproved;
