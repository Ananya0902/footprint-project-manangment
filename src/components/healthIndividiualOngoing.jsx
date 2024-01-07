import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  Button,
  VStack,
  Alert,
  AlertIcon,
  InputGroup, Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';

const HealthIndividualOngoing = () => {
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    setIsSubmitted(true);
  };

  const DynamicTable = () => {
    const [tableData, setTableData] = useState([
      { familyMember: '', natureOfWork: '', monthlyIncome: '' },
    ]);

    const handleInputChange = (index, field, value) => {
      const newData = [...tableData];
      newData[index][field] = value;
      setTableData(newData);
    };

    const handleAddRow = () => {
      setTableData([...tableData, { familyMember: '', natureOfWork: '', monthlyIncome: '' }]);
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
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    type="text"
                    value={row.familyMember}
                    onChange={(e) => handleInputChange(index, 'familyMember', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.natureOfWork}
                    onChange={(e) => handleInputChange(index, 'natureOfWork', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.monthlyIncome}
                    onChange={(e) => handleInputChange(index, 'monthlyIncome', e.target.value)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button onClick={handleAddRow}>Add Row</Button>
      </Box>
    );
  };



  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6} align="center" justifyContent="center">
          Health individual Ongoing Project Application Form 
        </Heading>

        {isSubmitted && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Form submitted successfully!
          </Alert>
        )}

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

            {/* Name of Project Coordinator */}
            <FormControl isRequired>
              <FormLabel>Name of Project Coordinator</FormLabel>
              <Input
                type="text"
                name="projectCoordinatorName"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Contact of Project Coordinator */}
            <FormControl isRequired>
              <FormLabel>Contact of Project Coordinator</FormLabel>
              <Input
                type="text"
                name="projectCoordinatorContact"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Email of Project Coordinator */}
            <FormControl isRequired>
              <FormLabel>Email of Project Coordinator</FormLabel>
              <Input
                type="email"
                name="projectCoordinatorEmail"
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
      name="photographUrl"
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
    <Select
      name="gender"
      onChange={handleChange}
      required
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </Select>
  </FormControl>

  {/* Date of Birth */}
  <FormControl isRequired>
    <FormLabel>Date of Birth</FormLabel>
    <Input
      type="date"
      name="dob"
      onChange={handleChange}
      required
    />
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
      name="natureOfIllness"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Duration of Project Support */}
  <FormControl isRequired>
    <FormLabel>Since how many years the project support is given</FormLabel>
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
      Please write down more details about the present health situation of the beneficiary. e.g., improvement
    </FormLabel>
    <Textarea
      name="healthSituationDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Present Family Situation */}
  <FormControl isRequired>
    <FormLabel>Give information about the present situation of the family</FormLabel>
    <Textarea
      name="familySituationDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

  <DynamicTable />

  {/* Access to Government or Other Support */}
  <FormControl isRequired>
  <FormLabel>
    Does the beneficiary able to access Government or other support in the previous year?
  </FormLabel>
  <Select
    name="accessToSupport"
    onChange={handleChange}
    required
  >
    <option value="yes">Yes</option>
    <option value="no">No</option>
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
    <FormLabel>Treatment record of previous year (one proof)</FormLabel>
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

  {/* Project Coordinator agreement */}
  <FormControl isRequired>
    <Checkbox
      name="projectCoordinatorAgreement"
      onChange={handleChange}
      size="lg"
    >
      The Project Coordinator agree
    </Checkbox>
    <Input
      type="date"
      name="projectCoordinatorAgreementDate"
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

  {/* Provincial Superior agreement */}
  <FormControl isRequired>
    <Checkbox
      name="provincialSuperiorAgreement"
      onChange={handleChange}
      size="lg"
    >
      The Provincial Superior agree
    </Checkbox>
    <Input
      type="date"
      name="provincialSuperiorAgreementDate"
      onChange={handleChange}
      required
    />
  </FormControl>
</VStack>
<VStack align="start" spacing={4} mb={8}>
  {/* Amount Approved by Project Coordinator */}
  <FormControl isRequired>
    <FormLabel>Amount Approved by Project Coordinator</FormLabel>
    <Input
      type="number"
      name="amountApprovedByProjectCoordinator"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Remarks */}
  <FormControl>
    <FormLabel>Remarks (Optional)</FormLabel>
    <Textarea
      name="remarks"
      onChange={handleChange}
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
            
