// projectsToBeReviewed.jsx
import React, { useEffect, useReducer, useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  Text,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import authAxios from "../AuthAxios";

const MyProjects = () => {
  const showToast = useToast();
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
      async function fetchDataForApplicantRoute(route) {
        try {
          const response = await authAxios.get(`projects/${route}`);
          console.log(response);
          const data = response.data.data ?? [];
          return data;
        } catch (error) {
          return [];
        }
      }

      try {
        const getAllHOIData = await fetchDataForApplicantRoute(
          "getAllHOIapplicant"
        );
        const getAllHOI = getAllHOIData ?? [];

        const getAllEGSData = await fetchDataForApplicantRoute(
          "getAllEGSApplicant"
        );
        const getAllEGS = getAllEGSData ?? [];

        const getAllEIApplicantData = await fetchDataForApplicantRoute(
          "getallEIapplicant"
        );
        const getAllEIApplicant = getAllEIApplicantData ?? [];

        const getAllSIApplicantData = await fetchDataForApplicantRoute(
          "getallSIapplicant"
        );
        const getAllSIApplicant = getAllSIApplicantData ?? [];

        const getAllDPLGApplicantData = await fetchDataForApplicantRoute(
          "getallDPLGapplicant"
        );
        const getAllDPLGApplicant = getAllDPLGApplicantData ?? [];

        const getAllHIVApplicantData = await fetchDataForApplicantRoute(
          "getAllHIVApplicant"
        );
        const getAllHIVApplicant = getAllHIVApplicantData ?? [];

        const getAllWHFCApplicantData = await fetchDataForApplicantRoute(
          "getAllWHFCApplicant"
        );
        const getAllWHFCApplicant = getAllWHFCApplicantData ?? [];

        const getAllEGSApplicantData = await fetchDataForApplicantRoute(
          "getAllEGSApplicant"
        );
        const getAllEGSApplicant = getAllEGSApplicantData ?? [];

        const getAllNPDPApplicantData = await fetchDataForApplicantRoute(
          "getAllNPDPApplicant"
        );
        const getAllNPDPApplicant = getAllNPDPApplicantData ?? [];

        const getAllEOIApplicantData = await fetchDataForApplicantRoute(
          "getallEOIapplicant"
        );
        const getAllEOIApplicant = getAllEOIApplicantData ?? [];

        const getAllISGApplicantData = await fetchDataForApplicantRoute(
          "/getallISGapplicant"
        );
        const getAllISGApplicant = getAllISGApplicantData ?? [];

        const getAllCGApplicantData = await fetchDataForApplicantRoute(
          "/getallCGapplicant"
        );
        const getAllCGApplicant = getAllISGApplicantData ?? [];

        console.log(getAllEGSApplicant)
        console.log(getAllISGApplicant)
        console.log(getAllHIVApplicant)
        console.log(getAllNPDPApplicant)

        const newProjectList = {
          HOI: getAllHOI.map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          EGS: getAllEGS.map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          EI: getAllEIApplicant.map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          SI: getAllSIApplicant.map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          DPLG: getAllDPLGApplicant.map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          HIV: getAllHIVApplicant.map((project) => {
            return {
              id: project.project_number,
              project: project,
            };
          }),
          WHFC: getAllWHFCApplicant.map((project) => {
            return {
              id: project.project_number,
              project: project,
            };
          }),
          EGS: getAllEGSApplicant.map((project) => {
            return {
              id: project.project_number,
              project: project,
            };
          }),
          NPDP: getAllNPDPApplicant.map((project) => {
            return {
              id: project.project_number,
              project: project,
            };
          }),
          EOI: getAllEOIApplicant.map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          SG: getAllISGApplicant.map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          CG: getAllCGApplicant.map((project) => {
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
          {Object.keys(projectList).map((key) => (
            <React.Fragment key={key}>
              {projectList[key].map((project) => (
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
                    to={`/Review${key}/${encodeURIComponent(
                      JSON.stringify(project.project)
                    )}`} // Update this route as needed
                    mb={2}
                    borderRadius="full"
                  >
                    Review
                  </Button>
                </Box>
              ))}
            </React.Fragment>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default MyProjects;
