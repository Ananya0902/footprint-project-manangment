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
import {useParams} from "react-router-dom";

const ApproveProjects = () => {
  const approverProfile = JSON.parse(decodeURIComponent(useParams().profile));
  // const [yearFilter, setYearFilter] = useState(0);
  // const [typeFilter, setTypeFilter] = useState(null);

  // What I want is a filtering feature
  // the selected feature filter shall determine the course of action
  // filter by type can be one
  // filter by year can be other
  // by default one of the updated at or created at shall be made the default thingy
  // that will affect the code at the end

  // Code ??

  // const filterByYear = (object, year) => {
  //   // this shall modify the project list
  //   // filter will work as follows
  //   //mapped project.filter((project)=>project.created_at.getFullYear() === year)
  // };

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

  // what Happens if one projectCoordinator decides to revert while other does not care
  // Tough nut that becomes hard to crack

  const approved = (projectCoordinator) =>
    projectCoordinator.ref === approverProfile._id &&
    projectCoordinator.comment === null;

  const individualFilter = (value) =>
    value.comment_box_project_coordinator === null &&
    value.provincial_superior_agree.agree;

  useEffect(() => {
    const getAllProject = async () => {
      // get all the three types of projects
      async function fetchDataForApproverRoute(route) {
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
        const getAllHOIData = await fetchDataForApproverRoute(
          "getAllHOIApprover"
        );
        const getAllHOI = getAllHOIData ?? [];

        const getAllEGData = await fetchDataForApproverRoute(
          "getAllEGApprover"
        );
        const getAllEGApprover = getAllEGData ?? [];

        const getAllEIApproverData = await fetchDataForApproverRoute(
          "getallEIApprover"
        );
        const getAllEIApprover = getAllEIApproverData ?? [];

        const getAllSIApproverData = await fetchDataForApproverRoute(
          "getallSIApprover"
        );
        const getAllSIApprover = getAllSIApproverData ?? [];

        const getAllDPLGApproverData = await fetchDataForApproverRoute(
          "getallDPLGApprover"
        );
        const getAllDPLGApprover = getAllDPLGApproverData ?? [];

        const getAllHIVApproverData = await fetchDataForApproverRoute(
          "getAllHIVApprover"
        );
        const getAllHIVApprover = getAllHIVApproverData ?? [];

        const getAllWHFCApproverData = await fetchDataForApproverRoute(
          "getAllWHFCApprover"
        );
        const getAllWHFCApprover = getAllWHFCApproverData ?? [];

        const getAllEGSApproverData = await fetchDataForApproverRoute(
          "getAllEGSApprover"
        );
        const getAllEGSApprover = getAllEGSApproverData ?? [];

        const getAllNPDPApproverData = await fetchDataForApproverRoute(
          "getAllNPDPApprover"
        );
        const getAllNPDPApprover = getAllNPDPApproverData ?? [];

        const getAllEOIApproverData = await fetchDataForApproverRoute(
          "getallEOIApprover"
        );
        const getAllEOIApprover = getAllEOIApproverData ?? [];

        const getAllISGApproverData = await fetchDataForApproverRoute(
          "/getallISGApprover"
        );
        const getAllISGApprover = getAllISGApproverData ?? [];

        const getAllCGApproverData = await fetchDataForApproverRoute(
          "/getallCGApprover"
        );
        const getAllCGApprover = getAllCGApproverData ?? [];

        // Anyone approving individual projects is good
        // for group projects you have two approver

        // approved projects shall only be those whose comment is not null and
        // agree field is true for both

        const newProjectList = {
          // individual
          // provincial supperior should agree and rp
          HOI: getAllHOI.filter(individualFilter).map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          // group project - education group
          EGS: getAllEGSApprover
            .filter((value) =>
              // logic
              value?.general_information?.project_coordinators?.find(approved)
                ? false
                : true
            )
            .map((project) => {
              return {
                id: project.project_number,
                project: project,
              };
            }),
          EI: getAllEIApprover.filter(individualFilter).map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          SI: getAllSIApprover.filter(individualFilter).map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          DPLG: getAllDPLGApprover
            .filter((value) =>
              value.project_coordinators.find(approved) ? false : true
            )
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          HIV: getAllHIVApprover
            .filter((value) =>
              value.mailing_list.project_coordinators.find(approved)
                ? false
                : true
            )
            .map((project) => {
              return {
                id: project.project_number,
                project: project,
              };
            }),
          WHFC: getAllWHFCApprover
            .filter((value) =>
              value.mailing_list.project_coordinators.find(approved)
                ? false
                : true
            )
            .map((project) => {
              return {
                id: project.project_number,
                project: project,
              };
            }),
          NPDP: getAllNPDPApprover
            .filter((value) =>
              value.mailing_list.project_coordinators.find(approved)
                ? false
                : true
            )
            .map((project) => {
              return {
                id: project.project_number,
                project: project,
              };
            }),
          EOI: getAllEOIApprover.filter(individualFilter).map((project) => {
            return {
              id: project.project_code,
              project: project,
            };
          }),
          ISG: getAllISGApprover
            .filter((value) =>
              value.project_coordinators.find(approved) ? false : true
            )
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          CG: getAllCGApprover
            .filter((value) =>
              value.project_coordinators.find(approved) ? false : true
            )
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          EG: getAllEGApprover
            .filter((value) =>
              value.project_coordinators.find(approved) ? false : true
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
          Projects to Be Reviewed
        </Heading>

        <VStack spacing={6} align="stretch">
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
                    to={`/Approve${key}/${encodeURIComponent(
                      JSON.stringify(project.project)
                    )}`} // Update this route as needed
                    mb={2}
                    borderRadius="full"
                  >
                    Approve
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

export default ApproveProjects;
