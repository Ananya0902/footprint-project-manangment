// projectsToBeReviewed.jsx
import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Button,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

// Dummy data, replace this with your actual data
const dummyProjectList = [
  { id: 1, title: 'Project 1' },
  { id: 2, title: 'Project 2' },
  // Add more projects as needed
];

const ProjectsToBeReviewed = () => {
  const [projectList, setProjectList] = useState(dummyProjectList);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleReviewClick = (projectId) => {
    // Find the index of the reviewed project in the list
    const projectIndex = projectList.findIndex((project) => project.id === projectId);

    // Make a copy of the projectList and remove the reviewed project
    const updatedProjectList = [...projectList.slice(0, projectIndex), ...projectList.slice(projectIndex + 1)];

    // Update the state with the new projectList
    setProjectList(updatedProjectList);

    // Set the selected project for additional details or modal
    setSelectedProject(projectId);

    // Implement logic for handling the review button click
    console.log(`Reviewing project with ID ${projectId}`);
  };

  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          Projects to Be Reviewed
        </Heading>

        <VStack spacing={6} align="stretch">
          {projectList.map((project) => (
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
                to={`/project/${project.id}`} // Update this route as needed
                onClick={() => handleReviewClick(project.id)}
                mb={2}
                borderRadius="full"
              >
                Review
              </Button>
            </Box>
          ))}
        </VStack>

        {selectedProject && (
          <Box mt={8} textAlign="center">
            {/* Render additional details or a modal for the selected project if needed */}
            <Text color="blue.500">Selected Project: {selectedProject}</Text>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default ProjectsToBeReviewed;

