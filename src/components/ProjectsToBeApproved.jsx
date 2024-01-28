// ProjectsToBeApproved.jsx
import React from "react";
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
import { useEffect, useState } from "react";

// Dummy data, replace this with your actual data
const projectList = [
  { id: 1, title: "Project to Be Approved 1" },
  { id: 2, title: "Project to Be Approved 2" },
  // Add more projects to be approved as needed
];

const ProjectsToBeApproved = () => {
  const [healthProjectList, setHealthProjectList] = useState([]);
  const [educationProjectList, setEducationProjectList] = useState([]);

  // const handleReviewClick = (project) => {
  //   console.log(project);
  // };

  useEffect(() => {
    const getAllProject = async () => {
      // get all the three types of projects
      try {
        const getAllHOI = (await authAxios.get("projects/getallHOIapprover"))
          .data.data;
        const getAllEOI =
          (await authAxios.get("projects/getallEOIapprover")).data.data ?? [];
          console.log(getAllEOI);

        setHealthProjectList(
          getAllHOI
            .filter((val) => val.project_coordinator_agree.agree === false)
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            })
        );
        setEducationProjectList(
          getAllEOI
            .filter((val) => val.project_coordinator_agree.agree === false)
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            })
        );
      } catch (error) {
        console.log(error);
      }
    };

    getAllProject();

    return () => {};
  }, []);

  console.log(healthProjectList);
  console.log(educationProjectList);
  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="blue.500">
          Projects to Be Approved
        </Heading>

        <VStack spacing={6} align="stretch">
          {healthProjectList.map((project) => (
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
                to={`/ApproveHIO/${encodeURIComponent(
                  JSON.stringify(project.project)
                )}`} // Update this route as needed
                mb={2}
                borderRadius="full"
              >
                Approve Project
              </Button>
            </Box>
          ))}
          {educationProjectList.map((project) => (
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
                to={`/ApproveEIO/${encodeURIComponent(
                  JSON.stringify(project.project)
                )}`} // Update this route as needed
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
