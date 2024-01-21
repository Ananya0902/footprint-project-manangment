// ModalOverlay.js
import React, { useEffect } from 'react';
import { ChakraProvider,CircularProgress, useDisclosure, Modal, ModalOverlay, ModalContent, ModalBody ,  } from '@chakra-ui/react';

const CustomOverlay = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody display="flex" alignItems="center" justifyContent="center">
          {/* Use CircularProgress directly as the content */}
          <CircularProgress
            isIndeterminate
            color="green.400"
            thickness="4px"
            size="60px"
          />
        </ModalBody>
      </ModalContent>
    </Modal>
    </>
  );
};

export default ModalOverlay;