// DashboardApplicant.jsx
import React from 'react';
import {
  ChakraProvider,
  Box,
  Button,
  VStack,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authAxios from '../../AuthAxios.js';

const DashboardApplicant = () => {
  const showToast = useToast();

  const [userDetails , setUserDetails] = useState({});

  useEffect(() => {
    const getApplicantData = async () => {
      try {
        const applicantData = await authAxios.get("/users/getApplicant");
        console.log("applicant data", applicantData);
        if(applicantData.data.success === false) showToast({
          title: "Error fetching profile", 
          description: "Please login again or refresh the page", 
          status: "error" , 
          duration : 5000,
        }); 
        setUserDetails({
            name: applicantData.data.data.name,
            email: applicantData.data.data.email,
            mobileNumber: applicantData.data.data.mobile,
            apostolate: applicantData.data.data.apostolate,
            reviewerName: applicantData.data.data.reviewer,
            province: applicantData.data.data.nameOfProvince,
        });
      } catch (error) {
        showToast({
          title: "Error getting applicant data",
          duration: 500,
          isClosable: true,
          status: "error",
        });
      }
    };
    getApplicantData();
    return () => {};
  } , []);
  
  console.log("userDetails", userDetails);
  return (
    <ChakraProvider>
      <Box p={8} maxW="xl" mx="auto" bg="gray.100" borderRadius="lg">
        
      
        
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="teal.500">
          Welcome, Applicant!
        </Heading>

        <VStack spacing={6}>
          {/* My Projects Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
            
          >
            <Heading size="md" mb={4} color="teal.500">
              My Projects
            </Heading>
            <Text fontSize="md" color="gray.600">
              Explore and manage your personal projects.
            </Text>
            <Button
              as={Link}
              to="/myProjects"
              colorScheme="teal"
              mt={4}
              borderRadius="full"
            >
              Go to My Projects
            </Button>
          </Box>

          {/* Individual Projects Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="teal.500">
              Individual Projects
            </Heading>
            <Text fontSize="md" color="gray.600">
              View and contribute to individual projects.
            </Text>
            <Button
              as={Link}
              to={`/individualProjects/${userDetails.apostolate}`}
              colorScheme="teal"
              mt={4}
              borderRadius="full"
            >
              Explore Individual Projects
            </Button>
          </Box>

          {/* Group Projects Box */}
          <Box
            bg="white"
            p={6}
            borderRadius="lg"
            boxShadow="md"
            width="100%"
            textAlign="center"
          >
            <Heading size="md" mb={4} color="teal.500">
              Group Projects
            </Heading>
            <Text fontSize="md" color="gray.600">
              Collaborate with others in group projects.
            </Text>
            <Button
              as={Link}
              to={`/groupProjects/${userDetails.apostolate}`}
              colorScheme="teal"
              mt={4}
              borderRadius="full"
            >
              Explore Group Projects
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
            <Heading size="md" mb={4} color="teal.500">
              Profile
            </Heading>
            <Text fontSize="md" color="gray.600">
              Update your personal information.
            </Text>
            <Button
              as={Link}
              to={`/profileApplicant/${JSON.stringify(userDetails)}`}
              colorScheme="teal"
              mt={4}
              borderRadius="full"
              onTouchMoveCapture={()=>{
                console.log(userDetails);
              }}
            >
              Go to Profile
            </Button>
          </Box>
        </VStack>

        <Text mt={8} textAlign="center" color="gray.600">
          Explore and manage your projects with ease.
        </Text>
      </Box>
    </ChakraProvider>
  );
};

export default DashboardApplicant;


