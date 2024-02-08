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
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import authAxios from "../../AuthAxios";

const RevertedProjects = () => {
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

  const individualFilter = (value) =>
    (!value.project_coordinator_agree.agree &&
      value.comment_box_project_coordinator) ||
    (!value.provincial_superior_agree.agree &&
      value.comment_box_provincial_superior);

  const groupFilterApprover = (approver) => !approver.agree && approver.comment;

  useEffect(() => {
    const getAllProject = async () => {
      // get all the three types of projects
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
        const getAllCGApplicant = getAllCGApplicantData ?? [];

        const newProjectList = {
          HOI: getAllHOI.filter(individualFilter).map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          EGS: getAllEGS
            .filter(
              (value) =>
                (!value.general_information.provincial_superior.agree &&
                  value.general_information.provincial_superior.comment) ||
                value.general_information.project_coordinators.filter(
                  groupFilterApprover
                )
            )
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          EI: getAllEIApplicant.filter(individualFilter).map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          SI: getAllSIApplicant.filter(individualFilter).map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          DPLG: getAllDPLGApplicant
            .filter(
              (value) =>
                (!value.provincial_superior_agree.agree &&
                  value.comment_box_provincial_superior) ||
                value.project_coordinators.filter(groupFilterApprover)
            )
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          HIV: getAllHIVApplicant
            .filter(
              (value) =>
                (!value.mailing_list.provincial_superior.agree &&
                  value.mailing_list.provincial_superior.comment) ||
                value.mailing_list.project_coordinators.filter(
                  groupFilterApprover
                )
            )
            .map((project) => {
              return {
                id: project.project_number,
                project: project,
              };
            }),
          WHFC: getAllWHFCApplicant
            .filter(
              (value) =>
                (!value.mailing_list.provincial_superior.agree &&
                  value.mailing_list.provincial_superior.comment) ||
                value.mailing_list.project_coordinators.filter(
                  groupFilterApprover
                )
            )
            .map((project) => {
              return {
                id: project.project_number,
                project: project,
              };
            }),
          NPDP: getAllNPDPApplicant
            .filter(
              (value) =>
                (!value.mailing_list.provincial_superior.agree &&
                  value.mailing_list.provincial_superior.comment) ||
                value.mailing_list.project_coordinators.filter(
                  groupFilterApprover
                )
            )
            .map((project) => {
              return {
                id: project.project_number,
                project: project,
              };
            }),
          EOI: getAllEOIApplicant.filter(individualFilter).map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          SG: getAllISGApplicant
            .filter(
              (value) =>
                (!value.provincial_superior_agree.agree &&
                  value.comment_box_provincial_superior) ||
                value.project_coordinators.filter(groupFilterApprover)
            )
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          CG: getAllCGApplicant
            .filter(
              (value) =>
                (!value.provincial_superior_agree.agree &&
                  value.comment_box_provincial_superior) ||
                value.project_coordinators.filter(groupFilterApprover)
            )
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
          Reverted Projects
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
                  <VStack>
                    <Heading size="md" mb={2} color="blue.500">
                      {project.id}
                    </Heading>
                    Please view the comments from view section before proceding
                    to edit the form
                    <HStack>
                      <Button
                        colorScheme="blue"
                        as={Link}
                        to={`/View${key}/${encodeURIComponent(
                          JSON.stringify(project.project)
                        )}`} // Update this route as needed
                        mb={2}
                        borderRadius="10"
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
                    </HStack>
                  </VStack>
                </Box>
              ))}
            </React.Fragment>
          ))}
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default RevertedProjects;
