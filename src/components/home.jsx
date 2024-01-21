// Home.jsx
import React from "react";
import { VStack, Heading, Button, Link, Text } from "@chakra-ui/react";
import { Link as ReactRouterLink } from "react-router-dom";

const Home = () => {
  return (
    <VStack
      height="100vh"
      justify="center"
      align="center"
      bgGradient="linear(to-r, teal.200, cyan.400)"
      color="white"
      spacing={6}
      p={4}
    >
      {/* Welcome Text */}
      <VStack>
        <Heading mb={2} fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>
          Welcome to -
        </Heading>
        <Heading as="h1" size={{ base: "2xl", md: "3xl", lg: "4xl" }}>
          Salsproject
        </Heading>
      </VStack>

      {/* Buttons */}
      <VStack width="100%" spacing={4} align="center" justify="center"> 
        <Link as={ReactRouterLink} to="/login" width="100%">
          <Button
            colorScheme="teal"
            size="lg"
            w="20%"
            bgGradient="linear(to-r, teal.500, teal.300)"
            _hover={{ bgGradient: "linear(to-r, teal.600, teal.200)" }}
          >
            <Text fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>Login</Text>
          </Button>
        </Link>
        <Link as={ReactRouterLink} to="/register" width="100%">
          <Button
            colorScheme="purple"
            size="lg"
            w="20%"
            bgGradient="linear(to-r, purple.500, purple.300)"
            _hover={{ bgGradient: "linear(to-r, purple.600, purple.200)" }}
            p={5}
          >
            <Text fontSize={{ base: "l", md: "xl", lg: "2xl" }}>Register</Text>
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
};

export default Home;


  