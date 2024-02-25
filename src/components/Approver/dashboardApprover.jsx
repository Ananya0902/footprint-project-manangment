// dashboardApprover.jsx
import React, { useEffect, useState } from "react";
import {
  ChakraProvider,
  Box,
  Button,
  VStack,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import authAxios from "../../AuthAxios";

const DashboardApprover = () => {
  const showToast = useToast();
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const getApproversData = async () => {
      try {
        const approversData = await authAxios.get("users/getApprover");
        if (approversData.data.success === false) return;
        setUserDetails(approversData.data.data);
        console.log("userDetails", approversData.data.data);
      } catch (error) {
        showToast({
          title: "Error getting approvers data",
          duration: 500,
          isClosable: true,
          status: "error",
        });
      }
    };
    getApproversData();
    return () => {};
  }, []);

  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="green.500">
          Welcome, Approver!
        </Heading>

        <VStack spacing={6}>
          {/* Projects to Be Approved Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="green.500">
              Projects to Be Approved
            </Heading>
            <Text fontSize="md" color="gray.600">
              Review and approve submitted projects.
            </Text>
            <Button
              as={Link}
              to={`/projectsToBeApproved/${encodeURIComponent(
                JSON.stringify(userDetails)
              )}`}
              colorScheme="green"
              mt={4}
              borderRadius="full"
            >
              Approve Projects
            </Button>
          </Box>

          {/* Verify Applicant Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="green.500">
              Project Applicants and Executors
            </Heading>
            <Text fontSize="md" color="gray.600">
              All the registered applicants and executors.
            </Text>
            <Button
              as={Link}
              to="/allApplicantsApprover"
              colorScheme="green"
              mt={4}
              borderRadius="full"
            >
              All Applicants
            </Button>
          </Box>

          {/* Verify Applicant Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="green.500">
              Presidents Of Societies
            </Heading>
            <Text fontSize="md" color="gray.600">
              All the registered presidents of societies.
            </Text>
            <Button
              as={Link}
              to="/allReviewersApprover"
              colorScheme="green"
              mt={4}
              borderRadius="full"
            >
              All Reviewers
            </Button>
          </Box>

          {/* Verify Reviewer Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="green.500">
              Verify Reviewer
            </Heading>
            <Text fontSize="md" color="gray.600">
              Verify and approve reviewer information.
            </Text>
            <Button
              as={Link}
              to="/verifyReviewer"
              colorScheme="green"
              mt={4}
              borderRadius="full"
            >
              Verify Reviewer
            </Button>
          </Box>

          {/* Profile Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="green.500">
              Profile
            </Heading>
            <Text fontSize="md" color="gray.600">
              Update your personal information.
            </Text>
            <Button
              as={Link}
              to={`/profileApprover/${encodeURIComponent(
                JSON.stringify(userDetails)
              )}`}
              colorScheme="green"
              mt={4}
              borderRadius="full"
            >
              Go to Profile
            </Button>
          </Box>

          {/* Approved Projects Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="green.500">
              Approved Projects
            </Heading>
            <Text fontSize="md" color="gray.600">
              View approved projects and their reports.
            </Text>
            <Button
              as={Link}
              to={`/ApprovedProjects/${encodeURIComponent(
                JSON.stringify(userDetails)
              )}`}
              colorScheme="green"
              mt={4}
              borderRadius="full"
            >
              View Approved Projects
            </Button>
          </Box>
        </VStack>

        <Text mt={8} textAlign="center" color="gray.600">
          Manage your approving tasks efficiently.
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default DashboardApprover;
