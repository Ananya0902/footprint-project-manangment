// MyProjects.jsx
import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Divider,
  List,
  ListItem,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';

const projectsData = [
  { id: 1, name: 'Project 1', status: 'Pending' },
  { id: 2, name: 'Project 2', status: 'Approved' },
  { id: 3, name: 'Project 3', status: 'Declined' },
  // Add more projects as needed
];

const MyProjects = () => {
  const [projects, setProjects] = useState(projectsData);

  const handleEditProject = (projectId) => {
    // Implement edit project functionality
    console.log(`Editing project with ID ${projectId}`);
  };

  const handleAddReport = (reportType, projectId) => {
    // Implement add report functionality
    console.log(`Adding ${reportType} report for project with ID ${projectId}`);
  };

  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.500">
          My Projects
        </Heading>

        <List spacing={3} width="100%">
          {projects.map((project) => (
            <Box
              key={project.id}
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              width="100%"
            >
              <Heading size="md" color="teal.500">
                {project.name}
              </Heading>
              <Divider mt={4} mb={4} />
              <Text fontSize="md" color="gray.600">
                Status: {project.status}
              </Text>
              <Button
                colorScheme="blue"
                mt={4}
                ml={4}
                onClick={() => handleEditProject(project.id)}
              >
                Edit Project
              </Button>
              <Button
                mt={4}
                ml={4}
                colorScheme="teal"
                onClick={() => handleAddReport('quaterly', project.id)}
                isDisabled={project.status !== 'Approved'}
              >
                Add Quarterly Report
              </Button>
              <Button
                mt={4}
                ml={4}
                colorScheme="teal"
                onClick={() => handleAddReport('monthly', project.id)}
                isDisabled={project.status !== 'Approved'}
              >
                Add Monthly Report
              </Button>
            </Box>
          ))}
        </List>

    
      </Box>
    </ChakraProvider>
  );
};

export default MyProjects;

