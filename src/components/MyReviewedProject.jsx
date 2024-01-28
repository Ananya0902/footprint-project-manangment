// MyReviewedProject.jsx
import React, { useState , useEffect } from 'react';
import { ChakraProvider, Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import authAxios from '../AuthAxios';

// Dummy data, replace this with your actual data
const reviewedProjects = [
  { id: 1, title: 'Project 1', status: 'Approved' },
  { id: 2, title: 'Project 2', status: 'Declined' },
  // Add more reviewed projects as needed
];

const MyReviewedProject = () => {

  const [reviewedProjects , setReviwedProject] = useState(
    [
      {id: "" , project: "" , status: "x"}
    ]
  )

  useEffect(() => {
    const getAllProject = async () => {
      // get all the three types of projects
      try {
        const getAllHOI = (await authAxios.get("projects/getallHOIreviewer"))
          .data.data;

        const getAllEOI =
          (await authAxios.get("projects/getallEOIreviewer")).data.data ?? [];
        const getAllSOI =
          (await authAxios.get("projects/getallLOIreviewer")).data.data ?? [];

        console.log("output", [...getAllHOI, ...getAllEOI, ...getAllSOI]);

        const newProjectList = [...getAllHOI, ...getAllEOI, ...getAllSOI].filter(
          (val)=>val.provincial_superior_agree.agree === true,
        ).map(
          (project) => {
            return {
              id: project.project_code,
              project: project,
              status: "reviewed"
            };
          }
        );

        setReviwedProject(newProjectList);
        console.log("projectList", reviewedProjects);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProject();

    return () => {};
  }, []);

  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          My Reviewed Projects
        </Heading>

        <VStack spacing={6} align="stretch">
          {reviewedProjects.map((project) => (
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
              <Text fontSize="md" color="gray.600" mb={4}>
                Status: {project.status}
              </Text>
              <Button
                colorScheme="blue"
                as={Link}
                to={`/viewProject/${encodeURIComponent(JSON.stringify(project.project))}`} // Update this route as needed
                mb={2}
                borderRadius="full"
              >
                Open Project
              </Button>
              {project.status === 'Declined' && (
                <Button
                  colorScheme="yellow"
                  as={Link}
                  to={`/viewProject/${encodeURIComponent(JSON.stringify(project.project))}`} // Update this route as needed
                  mb={2}
                  borderRadius="full"
                >
                  Edit
                </Button>
              )}
            </Box>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default MyReviewedProject;
