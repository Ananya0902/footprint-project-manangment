import React, { useState } from "react";
import {
  CircularProgress,
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Input,
  Textarea,
  Select,
  Checkbox,
  Button,
  VStack,
  InputGroup,
  Table,
  Thead,
  Tbody,
  useToast,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import authAxios from "../../AuthAxios.js";
import cloudAxios from "../../CloudAxios.js";

const HealthIndividualOngoing = () => {
  console.log("health individual ongoing");
  const showToast = useToast();
  const presetName = process.env.REACT_APP_UPLOAD_PRESET;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({}); // form data state is used throughtout 
  const [tableData, setTableData] = useState([
    { familyMember: "", natureOfWork: "", monthlyIncome: "" },
  ]);

  const handleChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleImageUpload = async (file) => {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", presetName);
      const response = await cloudAxios.post("/", form);
      const imgData = response.data;
      return imgData.secure_url;
    } catch (error) {
      showToast({
        title: "Error uploading image to cloudinary",
        description: error,
        duration: 5000,
      });
    }
  };
  const { isOpen,onOpen,onClose } = useDisclosure();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    try {
      setIsLoading((prevLoading) => !prevLoading);
      const photographUrl = await handleImageUpload(
        e.target.photographFile.files[0]
      );
      const aadharCardUrl = await handleImageUpload(
        e.target.aadharCardFile.files[0]
      );
      const requestLetterUrl = await handleImageUpload(
        e.target.requestLetterFile.files[0]
      );
      const treatmentRecordUrl = await handleImageUpload(
        e.target.treatmentRecordFile.files[0]
      );
      const otherDocumentsUrl = await handleImageUpload(
        e.target.otherDocumentsFile.files[0]
      );

      const response = await authAxios.post("/projects/createHOI", {
        illness_nature: e.target.natureOfIllness.value,
        photograph_benificary: photographUrl,
        name: e.target.beneficiaryName.value,
        present_earning_member: tableData.map((tableEntry) => {
          return {
            family_member: tableEntry.familyMember,
            nature_of_work: tableEntry.natureOfWork,
            monthly_income: tableEntry.monthlyIncome,
          };
        }), // You need to add this field in your form
        address: e.target.beneficiaryAddress.value,
        aadhar_no: e.target.aadharCardNo.value,
        gender: e.target.gender.value,
        email: e.target.beneficiaryEmail.value,
        DOB: e.target.dob.value,
        mobile: e.target.beneficiaryContact.value,
        father: e.target.guardianName.value,
        no_of_children: e.target.numberOfChildren.value,
        language: e.target.language.value,
        religion: e.target.religion.value,
        caste: e.target.casteTribe.value,
        nature_illness: e.target.natureOfIllnessBeneficiary.value,
        past_project_duration: e.target.projectSupportDuration.value,
        more_details_about_health: e.target.healthSituationDetails.value,
        present_situation_family: e.target.familySituationDetails.value,
        Govt_or_other_support: e.target.accessToSupport.value,
        nature_of_support: e.target.amountAndNatureOfSupport.value,
        previous_amount_received: e.target.amountReceivedFromProject.value,
        previous_total_amount: e.target.totalAmountSpent.value,
        present_health_total_expense: e.target.totalExpense.value,
        present_health_family_contribute: e.target.familyContribution.value,
        present_health_amount_requested: e.target.totalAmountRequested.value,
        aadhar_img: aadharCardUrl,
        request_letter_img: requestLetterUrl,
        treatment_record_img: treatmentRecordUrl,
        benificary_agree: {agree: e.target.beneficiaryAgreement.checked},
        project_in_charge_agree: {agree: e.target.projectInChargeAgreement.checked},
        other_supporting_docs_img: otherDocumentsUrl,
      });
      setIsLoading((prevLoading) => !prevLoading);
      console.log(response.data)
      if (response.data.success) {
        showToast({
          title: "Successfull form submission",
          status: "success",
          duration: 5000,
        });
      }
      else{
        setIsLoading(false);
        showToast({
          title: "Unsuccessful form submission",
          status: "error",
          description: "Please login again session may have expired",
          duration: 5000,
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  const DynamicTable = () => {
    // const [tableData, setTableData] = useState([
    //   { familyMember: "", natureOfWork: "", monthlyIncome: "" },
    // ]);

    const handleInputChange = (index, field, value) => {
      console.log(tableData);
      const newData = [...tableData];
      newData[index][field] = value;
      setTableData(newData);
    };

    const handleAddRow = () => {
      setTableData([
        ...tableData,
        { familyMember: "", natureOfWork: "", monthlyIncome: "" },
      ]);
    };

    const handleDeleteRow = (index) => {
      const newData = [...tableData];
      newData.splice(index, 1);
      setTableData(newData);
    };


    return (
      <Box p={4}>
        <Heading as="h1" size="l" mb={6}>
          Who are the present earning members of the family
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Family Member</Th>
              <Th>Type/Nature of Work</Th>
              <Th>Monthly Income</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    type="text"
                    value={row.familyMember}
                    onChange={(e) =>
                      handleInputChange(index, "familyMember", e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.natureOfWork}
                    onChange={(e) =>
                      handleInputChange(index, "natureOfWork", e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.monthlyIncome}
                    onChange={(e) =>
                      handleInputChange(index, "monthlyIncome", e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <Button colorScheme="red" onClick={() => handleDeleteRow(index)}>
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button onClick={handleAddRow}>Add Row</Button>
      </Box>
    );
  };
  // return (
  //   <>
  //     <Modal isOpen={true} onClose={onClose}>
  //       <ModalOverlay />
    
  //           {/* Use CircularProgress directly as the content */}
  //           <CircularProgress
  //             isIndeterminate
  //             color="green.400"
  //             thickness="4px"
  //             size="60px"
  //           />
  //     </Modal>
  //     </>
  // );
  return (
    <ChakraProvider>
      {isLoading && <>
      <Modal isOpen={true} onClose={onClose}>
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
      </>}
      <Box p={4}>
        <Heading
          as="h1"
          size="xl"
          mb={6}
          align="center"
          justifyContent="center"
        >
          Health individual Ongoing Project Application Form
        </Heading>
        <form onSubmit={handleSubmit}>
          {/* Part 1: Provincial Superior Details */}
          <VStack align="start" spacing={4} mb={8}>
            {/* Nature of Illness */}
            <FormControl isRequired>
              <FormLabel>Nature of Illness</FormLabel>
              <Input
                type="text"
                name="natureOfIllness"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Name of Provincial Superior */}
            <FormControl isRequired>
              <FormLabel>Name of Provincial Superior</FormLabel>
              <Input
                type="text"
                name="provincialSuperiorName"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Contact of Provincial Superior */}
            <FormControl isRequired>
              <FormLabel>Contact of Provincial Superior</FormLabel>
              <Input
                type="text"
                name="provincialSuperiorContact"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/* Name of Project Incharge */}
            <FormControl isRequired>
              <FormLabel>Name of Project Incharge</FormLabel>
              <Input
                type="text"
                name="projectInchargeName"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Contact of Project Incharge */}
            <FormControl isRequired>
              <FormLabel>Contact of Project Incharge</FormLabel>
              <Input
                type="text"
                name="projectInchargeContact"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Email of Project Incharge */}
            <FormControl isRequired>
              <FormLabel>Email of Project Incharge</FormLabel>
              <Input
                type="email"
                name="projectInchargeEmail"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/*Personal Information of the Beneficiary */}
            <Heading as="h1" size="xl" mb={6}>
              Personal Information of the Beneficiary
            </Heading>
            {/* Photograph (URL) */}
            <FormControl isRequired>
              <FormLabel>Photograph</FormLabel>
              <InputGroup>
                <Input
                  type="file"
                  name="photographFile"
                  onChange={handleChange}
                  accept="image/*"
                  required
                />
                {/* <InputRightElement width="4.5rem">
      <Button
        size="sm"
        colorScheme="blue"
        onClick={(e) => {
          e.preventDefault(); // Add your logic for handling the uploaded file
        }}
      >
        Upload
      </Button>
    </InputRightElement> */}
              </InputGroup>
            </FormControl>

            {/* Name */}
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="beneficiaryName"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Contact */}
            <FormControl isRequired>
              <FormLabel>Contact</FormLabel>
              <Input
                type="tel"
                name="beneficiaryContact"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Email */}
            <FormControl isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="beneficiaryEmail"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Address */}
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="beneficiaryAddress"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Aadhar Card No. */}
            <FormControl isRequired>
              <FormLabel>Aadhar Card No.</FormLabel>
              <Input
                type="text"
                name="aadharCardNo"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Gender */}
            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Select name="gender" onChange={handleChange} required>
                <option value="male">Male</option>
                <option value="female">Female</option>
              <option value="other">Other</option>
              </Select>
            </FormControl>

            {/* Date of Birth */}
            <FormControl isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input type="date" name="dob" onChange={handleChange} required />
            </FormControl>

            {/* Name of Father/Husband/Legal Guardian */}
            <FormControl isRequired>
              <FormLabel>Name of Father/Husband/Legal Guardian</FormLabel>
              <Input
                type="text"
                name="guardianName"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Number of Children */}
            <FormControl isRequired>
              <FormLabel>Number of Children</FormLabel>
              <Input
                type="number"
                name="numberOfChildren"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Language */}
            <FormControl isRequired>
              <FormLabel>Language</FormLabel>
              <Input
                type="text"
                name="language"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Religion */}
            <FormControl isRequired>
              <FormLabel>Religion</FormLabel>
              <Input
                type="text"
                name="religion"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Caste / Tribe */}
            <FormControl isRequired>
              <FormLabel>Caste / Tribe</FormLabel>
              <Input
                type="text"
                name="casteTribe"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/* Questions on Health Situation */}

            <Heading as="h1" size="xl" mb={6}>
              Questions on health situation
            </Heading>
            {/* Nature of Illness of the Beneficiary */}
            <FormControl isRequired>
              <FormLabel>Nature of Illness of the Beneficiary</FormLabel>
              <Textarea
                name="natureOfIllnessBeneficiary"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Duration of Project Support */}
            <FormControl isRequired>
              <FormLabel>
                Since how many years the project support is given
              </FormLabel>
              <Input
                type="text"
                name="projectSupportDuration"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Present Health Situation Details */}
            <FormControl isRequired>
              <FormLabel>
                Please write down more details about the present health
                situation of the beneficiary. e.g., improvement
              </FormLabel>
              <Textarea
                name="healthSituationDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Present Family Situation */}
            <FormControl isRequired>
              <FormLabel>
                Give information about the present situation of the family
              </FormLabel>
              <Textarea
                name="familySituationDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* <DynamicTable /> */}
            {DynamicTable()}

            {/* Access to Government or Other Support */}
            <FormControl isRequired>
              <FormLabel>
                Does the beneficiary able to access Government or other support
                in the previous year?
              </FormLabel>
              <Select name="accessToSupport" onChange={handleChange} required>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </FormControl>

            {/* Amount and Nature of Support */}
            <FormControl>
              <FormLabel>If yes, the amount and nature of support </FormLabel>
              <Textarea
                name="amountAndNatureOfSupport"
                onChange={handleChange}
              />
            </FormControl>

            {/* Amount received previously from the project */}
            <FormControl isRequired>
              <FormLabel>Amount received previously from the project</FormLabel>
              <Input
                type="number"
                name="amountReceivedFromProject"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Total amount spent */}
            <FormControl isRequired>
              <FormLabel>Total amount spent</FormLabel>
              <Input
                type="number"
                name="totalAmountSpent"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>
          {/* Information on present Health Cost – Budget details*/}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Information on present Health Cost – Budget details
            </Heading>

            {/* Total Expense */}
            <FormControl isRequired>
              <FormLabel>Total Expense</FormLabel>
              <Input
                type="number"
                name="totalExpense"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* How much can the family contribute? */}
            <FormControl isRequired>
              <FormLabel>How much can the family contribute?</FormLabel>
              <Input
                type="number"
                name="familyContribution"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Total amount requested */}
            <FormControl isRequired>
              <FormLabel>Total amount requested</FormLabel>
              <Input
                type="number"
                name="totalAmountRequested"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Documents Required
            </Heading>

            {/* Aadhar Card */}
            <FormControl isRequired>
              <FormLabel>Aadhar Card</FormLabel>
              <Input
                type="file"
                name="aadharCardFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                required
              />
            </FormControl>

            {/* Request Letter */}
            <FormControl isRequired>
              <FormLabel>Request Letter</FormLabel>
              <Input
                type="file"
                name="requestLetterFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                required
              />
            </FormControl>

            {/* Treatment record of previous year (one proof) */}
            <FormControl isRequired>
              <FormLabel>
                Treatment record of previous year (one proof)
              </FormLabel>
              <Input
                type="file"
                name="treatmentRecordFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                required
              />
            </FormControl>

            {/* Other Supporting Documents */}
            <FormControl isRequired>
              <FormLabel>Other Supporting Documents</FormLabel>
              <Input
                type="file"
                name="otherDocumentsFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>

            {/* Beneficiary / Family member agreement */}
            <FormControl isRequired>
              <Checkbox
                name="beneficiaryAgreement"
                onChange={handleChange}
                size="lg"
              >
                The Beneficiary / Family member agree
              </Checkbox>
              <Input
                type="date"
                name="beneficiaryAgreementDate"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Project-In-Charge agreement */}
            <FormControl isRequired>
              <Checkbox
                name="projectInChargeAgreement"
                onChange={handleChange}
                size="lg"
              >
                The Project-In-Charge agree
              </Checkbox>
              <Input
                type="date"
                name="projectInChargeAgreementDate"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>
          {/* Submit Button */}
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default HealthIndividualOngoing;
