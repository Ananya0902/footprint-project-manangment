// projectsToBeReviewed.jsx
import React, { useEffect, useReducer, useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import authAxios from "../AuthAxios";

const ProjectsToBeReviewed = () => {
  const [projectList, setProjectList] = useReducer(
    (prev, next) => {
      const newProjectList = { ...prev, ...next };
      return newProjectList;
    },
    {
      getAllHOI: [],
      getAllEOI: [],
    }
  );

  useEffect(() => {
    const getAllProject = async () => {
      // get all the three types of projects
      try {
        const getAllHOI =
          (await authAxios.get("projects/getallHOIreviewer")).data.data ?? [];
        const getAllEOI =
          (await authAxios.get("projects/getallEOIreviewer")).data.data ?? [];
        const newProjectList = {
          getAllHOI: getAllHOI
            .filter((val) => val.provincial_superior_agree.agree === false)
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          getAllEOI: getAllEOI
            .filter((val) => val.provincial_superior_agree.agree === false)
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
        };

        setProjectList(newProjectList);
        console.log("projectList", projectList);
      } catch (error) {
        console.log(error);
      }
    };

    getAllProject();

    return () => {};
  }, []);
  console.log(projectList);
  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          Projects to Be Reviewed
        </Heading>

        <VStack spacing={6} align="stretch">
          {projectList.getAllHOI.map((project) => (
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
                to={`/ReviewHIO/${encodeURIComponent(
                  JSON.stringify(project.project)
                )}`} // Update this route as needed
                mb={2}
                borderRadius="full"
              >
                Review
              </Button>
            </Box>
          ))}
          {projectList.getAllEOI.map((project) => (
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
                to={`/ReviewEIO/${encodeURIComponent(
                  JSON.stringify(project.project)
                )}`} // Update this route as needed
                mb={2}
                borderRadius="full"
              >
                Review
              </Button>
            </Box>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default ProjectsToBeReviewed;
