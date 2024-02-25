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
import authAxios from "../../AuthAxios";


const MyProjects = () => {
  const showToast = useToast();

  // project list
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
  
  // From the api call try and get all the projects 
  useEffect(() => {
    const getAllProject = async () => {
      // get projects of a particular type 
      async function fetchDataForApplicantRoute(route) {
        try {
          const response = await authAxios.get(`projects/${route}`);
          console.log(route, response);
          const data = response.data.data ?? [];
          return data;
        } catch (error) {
          console.log(route, error);
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

        const getAllEGData = await fetchDataForApplicantRoute(
          "getAllEGApplicant"
        );
        const getAllEG = getAllEGData ?? [];

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


        /// Error mark 
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
        const getAllCGApplicant = getAllCGApplicantData ?? [];

        // Object 
        /*
        {
          HOI: [
            {
              name: Your name , 
              contact_number : 7085772856
            }
          ] , 
          EOI , DPLG , HIV
        }
        */ 
        const newProjectList = {
          HOI: getAllHOI.map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          EGS: getAllEGS.map((project) => {
            return {
              id: project.project_number,
              project: project,
            };
          }),
          EG: getAllEG.map((project) => {
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
        My Projects
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
            </Box>
          ))}
          {/* To display each of the form what we did 
          We take all the keys from the projectList - EOI , HOI , DPLG 
          */}
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
                    {
                      /* HIV20241 */
                    }
                    {project.id} 
                  </Heading>

                  {/*ViewEOI
                  Object --- use Params - object 
                  Object --> String 
                  String - encodedURIComponent 
                  */}
                  <Button
                    colorScheme="blue"
                    as={Link}
                    to={`/View${key}/${encodeURIComponent(
                      JSON.stringify(project.project)
                    )}`} // Update this route as needed
                    mb={2}
                    borderRadius="full"
                  >
                    View
                  </Button>
                  <Button
                        colorScheme="red"
                        as={Link}
                        to={`/Edit${key}/${encodeURIComponent(
                          JSON.stringify(project.project)
                        )}`} // Update this route as needed
                        mb={2}
                        borderRadius="10"
                      >
                        Edit
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
