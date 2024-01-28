// ApprovedProjects.jsx
import React, { useEffect,useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  Button,
  VStack,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import authAxios from '../AuthAxios';

// Dummy data, replace this with your actual data
const initialApprovedProjects = [
  { id: 1, title: 'Approved Project 1' },
  { id: 2, title: 'Approved Project 2' },
  // Add more approved projects as needed
];

const ApprovedProjects = () => {
  const [approvedProjects, setApprovedProjects] = useState(initialApprovedProjects);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState(false);


  
  useEffect(() => {
    const getAllProject = async () => {
      // get all the three types of projects
      try {
        const getAllHOI = (await authAxios.get("projects/getallHOIapprover"))
          .data.data;
        const getAllEOI =
          (await authAxios.get("projects/getallEOIapprover")).data.data ?? [];


        const newProjectList = [...getAllHOI , ...getAllEOI].filter(
          (val)=>val.project_coordinator_agree.agree === true,
        ).map(
          (project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }
        );

        setApprovedProjects(newProjectList);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProject();

    return () => {};
  }, []);
  

  const onDelete = (projectId) => {
    setSelectedProject(projectId);
    setIsDeleteAlertOpen(true);
  };

  const handleDelete = () => {
    // Handle project deletion logic here
    const updatedProjects = approvedProjects.filter((project) => project.id !== selectedProject);
    setApprovedProjects(updatedProjects);

    setIsDeleteAlertOpen(false);
    // Display an alert or perform any other necessary actions after deletion
    alert(`Project ${selectedProject} deleted successfully.`);
  };

  const onCloseDeleteAlert = () => {
    setSelectedProject(null);
    setIsDeleteAlertOpen(false);
  };

  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          Approved Projects
        </Heading>

        <VStack spacing={6} align="stretch">
          {approvedProjects.map((project) => (
            <Box
              key={project.id}
              bg="white"
              p={6}
              borderRadius="lg"
              boxShadow="md"
              width="100%"
            >
              <Heading size="md" mb={2} color="blue.500">
                {project.id}
              </Heading>
              <Button
                colorScheme="blue"
                as={Link}
                to={`/viewProject/${encodeURIComponent(JSON.stringify(project.project))}`} // Update this route as needed for downloading PDF
                mb={2}
                borderRadius="full"
              >
                Download PDF
              </Button>

              <Button
                colorScheme="teal"
                as={Link}
                // to={`/viewProject/${encodeURIComponent(JSON.stringify(project.project))}`} // Update this route as needed for downloading PDF
                mb={2}
                borderRadius="full"
              >
                View Report 
              </Button>
              <Button
                colorScheme="red"
                onClick={() => onDelete(project.id)}
                mb={2}
                borderRadius="full"
              >
                Delete Project
              </Button>
            </Box>
          ))}
        </VStack>

        <AlertDialog isOpen={isDeleteAlertOpen} onClose={onCloseDeleteAlert}>
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Confirm Delete
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this project? This action cannot be undone.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button onClick={onCloseDeleteAlert}>Cancel</Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Box>
    </ChakraProvider>
  );
};

export default ApprovedProjects;
