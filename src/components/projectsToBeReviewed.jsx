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

const ReviewProjects = () => {
  const [yearFilter, setYearFilter] = useState(0);
  const [typeFilter, setTypeFilter] = useState(null);

  // What I want is a filtering feature
  // the selected feature filter shall determine the course of action
  // filter by type can be one
  // filter by year can be other
  // by default one of the updated at or created at shall be made the default thingy
  // that will affect the code at the end

  // Code ??

  const filterByYear = (object, year) => {
    // this shall modify the project list
    // filter will work as follows
    //mapped project.filter((project)=>project.created_at.getFullYear() === year)
  };

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
      async function fetchDataForReviewerRoute(route) {
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
        const getAllHOIData = await fetchDataForReviewerRoute(
          "getAllHOIReviewer"
        );
        const getAllHOI = getAllHOIData ?? [];

        const getAllEGSData = await fetchDataForReviewerRoute(
          "getAllEGSReviewer"
        );
        const getAllEGS = getAllEGSData ?? [];

        const getAllEIReviewerData = await fetchDataForReviewerRoute(
          "getallEIReviewer"
        );
        const getAllEIReviewer = getAllEIReviewerData ?? [];

        const getAllSIReviewerData = await fetchDataForReviewerRoute(
          "getallSIReviewer"
        );
        const getAllSIReviewer = getAllSIReviewerData ?? [];

        const getAllDPLGReviewerData = await fetchDataForReviewerRoute(
          "getallDPLGReviewer"
        );
        const getAllDPLGReviewer = getAllDPLGReviewerData ?? [];

        const getAllHIVReviewerData = await fetchDataForReviewerRoute(
          "getAllHIVReviewer"
        );
        const getAllHIVReviewer = getAllHIVReviewerData ?? [];

        const getAllWHFCReviewerData = await fetchDataForReviewerRoute(
          "getAllWHFCReviewer"
        );
        const getAllWHFCReviewer = getAllWHFCReviewerData ?? [];

        const getAllEGSReviewerData = await fetchDataForReviewerRoute(
          "getAllEGSReviewer"
        );
        const getAllEGSReviewer = getAllEGSReviewerData ?? [];

        const getAllNPDPReviewerData = await fetchDataForReviewerRoute(
          "getAllNPDPReviewer"
        );
        const getAllNPDPReviewer = getAllNPDPReviewerData ?? [];

        const getAllEOIReviewerData = await fetchDataForReviewerRoute(
          "getallEOIReviewer"
        );
        const getAllEOIReviewer = getAllEOIReviewerData ?? [];

        const getAllISGReviewerData = await fetchDataForReviewerRoute(
          "/getallISGReviewer"
        );
        const getAllISGReviewer = getAllISGReviewerData ?? [];

        const getAllCGReviewerData = await fetchDataForReviewerRoute(
          "/getallCGReviewer"
        );
        const getAllCGReviewer = getAllCGReviewerData ?? [];

        const newProjectList = {
          HOI: getAllHOI
            .filter((value) => value.comment_box_provincial_superior === null)
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          EGS: getAllEGS
            .filter(
              (value) =>
                value.general_information.provincial_superior.comment === null
            )
            .map((project) => {
              return {
                id: project.project_number,
                project: project,
              };
            }),
          EI: getAllEIReviewer
            .filter((value) => value.comment_box_provincial_superior === null)
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          SI: getAllSIReviewer
            .filter((value) => value.comment_box_provincial_superior === null)
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          DPLG: getAllDPLGReviewer
            .filter((value) => value.comment_box_provincial_superior === null)
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          HIV: getAllHIVReviewer
            .filter(
              (value) => value.mailing_list.provincial_superior.comment === false
            )
            .map((project) => {
              return {
                id: project.project_number,
                project: project,
              };
            }),
          WHFC: getAllWHFCReviewer
            .filter(
              (value) => value.mailing_list.provincial_superior.comment === null
            )
            .map((project) => {
              return {
                id: project.project_number,
                project: project,
              };
            }),
          NPDP: getAllNPDPReviewer
            .filter(
              (value) => value.mailing_list.provincial_superior.comment === null
            )
            .map((project) => {
              return {
                id: project.project_number,
                project: project,
              };
            }),
          EOI: getAllEOIReviewer
            .filter((value) => value.comment_box_provincial_superior === null)
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          ISG: getAllISGReviewer
            .filter((value) => value.comment_box_provincial_superior === null)
            .map((project) => {
              return {
                id: project.project_code,
                project: project,
              };
            }),
          CG: getAllCGReviewer
            .filter((value) => value.comment_box_provincial_superior === null)
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
          {/* {projectList.getAllHOI.map((project) => (
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
          ))} */}
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
                    to={`/Review${key}/${
                      (encodeURIComponent(JSON.stringify(project.project)))
                    }`} // Update this route as needed
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

export default ReviewProjects;
