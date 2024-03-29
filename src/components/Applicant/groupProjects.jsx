// IndividualProjects.jsx

import React from 'react';
import { ChakraProvider, Box, Heading, Button, VStack } from '@chakra-ui/react';

import { Link , useParams} from 'react-router-dom';

const GroupProjects = () => {
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
            Group Projects Forms
          </Heading>
          <Heading as="h1" size="xl" textAlign="center" color="purple.500">
             ( Apostolate: {selectedApostolate} )
          </Heading>

          <VStack spacing={4} align="center">

            {selectedApostolate === 'health' && (
              <>
                <Button as={Link} to="/common" colorScheme="teal" fontSize="xl">
                  Development Project - Application
                </Button>
                <Button as={Link} to="/HIVAffectedOutreach" colorScheme="green" fontSize="xl">
                HIV Affected Outfreach Application form
                </Button>

              </>
            )}
            {selectedApostolate === 'others' && (
              <>
                <Button as={Link} to="/common" colorScheme="teal" fontSize="xl">
                  Development Project - Application
                </Button>
                
              </>
            )}

            {selectedApostolate === 'social' && (
              <>
                <Button as={Link} to="/devProjLivliGroup" colorScheme="teal" fontSize="xl">
                  Development project - Livlihood
                </Button>

                <Button as={Link} to="/institutionalSkillGroup" colorScheme="blue" fontSize="xl">
                  Institutional Skill Training Proposal
                </Button>

                <Button as={Link} to="/common" colorScheme="cyan" fontSize="xl">
                  Development Project - Application
                </Button>

                <Button as={Link} to="/WelfareHomeGroup" colorScheme="pink" fontSize="xl">
                  Welfare Home and Child
                </Button>

                <Button as={Link} to="/NextPhaseDevelopmentProject" colorScheme="blue" fontSize="xl">
                Next Phase of Development Proposal
                </Button>

              </>
            )}

            {selectedApostolate === 'education' && (
              <>
                <Button as={Link} to="/educationGroup" colorScheme="teal" fontSize="xl">
                  Education Group- Institutional Template
                </Button>
                <Button as={Link} to="/EducationRuralUrbanTribalGroup" colorScheme="green" fontSize="xl">
                Education Rural Urban Tribal Group
                </Button>
                <Button as={Link} to="/common" colorScheme="pink" fontSize="xl">
                  Development Project - Application
                </Button>
              </>
            )}
          </VStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default GroupProjects;
