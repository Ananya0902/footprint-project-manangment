// IndividualProjects.jsx
import React from 'react';
import { ChakraProvider, Box, Heading, Button, VStack } from '@chakra-ui/react';
import { Link , useParams} from 'react-router-dom';

const IndividualProjects = () => {
  const selectedApostolate = useParams().selectedAppostolate;
  return (
    <ChakraProvider>
      <Box
        p={8}
        maxW="xl"
        maxH="xxl"
        mx="auto"
        mt={150}// Added margin-top for centering
        bg="gray.100"
        borderRadius="lg"
      >
        <VStack spacing={6}>
          <Heading as="h1" size="xl" textAlign="center" color="purple.500">
            Individual Projects Forms
          </Heading>
          <Heading as="h1" size="xl" textAlign="center" color="purple.500">
             ( Apostolate: {selectedApostolate} )
          </Heading>

          <VStack spacing={4} align="center">
            {selectedApostolate === 'health' && (
              <>
                <Button as={Link} to="/healthIndividualOngoing" colorScheme="teal" fontSize="xl">
                  Health Individual Ongoing
                </Button>
                <Button as={Link} to="/healthIndividual" colorScheme="blue" fontSize="xl">
                  Health Individual
                </Button>
              </>
            )}

            {selectedApostolate === 'social' && (
              <>
                <Button as={Link} to="/socialIndividualOngoing" colorScheme="teal" fontSize="xl">
                  Social Individual Ongoing
                </Button>
                <Button as={Link} to="/socialIndividual" colorScheme="blue" fontSize="xl">
                  Social Individual
                </Button>
              </>
            )}

            {selectedApostolate === 'education' && (
              <>
                <Button as={Link} to="/educationIndividualOngoing" colorScheme="teal" fontSize="xl">
                  Education Individual Ongoing
                </Button>
                <Button as={Link} to="/educationIndividual" colorScheme="blue" fontSize="xl">
                  Education Individual
                </Button>
              </>
            )}
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default IndividualProjects;

