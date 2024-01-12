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

const HealthIndividual = () => {
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
          Health individual Project Application Form 
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
            {/* Name of society */}
            <FormControl isRequired>
              <FormLabel>Nature of Illness</FormLabel>
              <Input
                type="text"
                name="nameOfSociety"
                onChange={handleChange}
                required
              />
            </FormControl>
            {/* Date of Submission */}
            <FormControl isRequired>
              <FormLabel>Date of Submission </FormLabel>
              <Input
                type="date"
                name="dateOfSub"
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

            {/* Name of Project Coordinator
            <FormControl isRequired>
              <FormLabel>Name of Project Coordinator</FormLabel>
              <Input
                type="text"
                name="projectCoordinatorName"
                onChange={handleChange}
                required
              />
            </FormControl> */}

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
    <Input
      type="file"
      name="photographUrl"
      onChange={handleChange}
      accept="image/*"
      required
    />
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
  <Heading as="h1" size="xl" mb={6}>
    Questions on Health Situation
  </Heading>

  {/* Is the beneficiary undergoing medical treatment? */}
  <FormControl isRequired>
    <FormLabel>Is the beneficiary undergoing medical treatment?</FormLabel>
    <Textarea
      name="medicalTreatment"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* If yes, Name and Address of Doctor/Hospital */}
  <FormControl >
    <FormLabel>If yes, Name and Address of Doctor/Hospital</FormLabel>
    <Textarea
      name="doctorHospitalDetails"
      onChange={handleChange}
      
    />
  </FormControl>

  {/* Please write down more details about the health situation of the beneficiary */}
  <FormControl isRequired>
    <FormLabel>Please write down more details about the health situation of the beneficiary:</FormLabel>
    <Textarea
      name="healthSituationDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Give information about the present situation of the family */}
  <FormControl isRequired>
    <FormLabel>Give information about the present situation of the family:</FormLabel>
    <Textarea
      name="familySituationDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

<DynamicTable />


  {/* Are the family members employed with St.Ann’s? Give full details. */}
  <FormControl isRequired>
    <FormLabel>Are the family members employed with St.Ann’s? Give full details.</FormLabel>
    <Textarea
      name="familyEmploymentDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Has the beneficiary or the family received any kind of support in the past from St. Ann’s projects? */}
  <FormControl isRequired>
    <FormLabel>Has the beneficiary or the family received any kind of support in the past from St. Ann’s projects? If yes, please give the details:</FormLabel>
    <Textarea
      name="previousSupportDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Does the beneficiary able to access Government or other support? */}
  <FormControl isRequired>
    <FormLabel>Does the beneficiary able to access Government or other support?</FormLabel>
    <Select
      name="accessToSupport"
      onChange={handleChange}
      required
    >
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </Select>
  </FormControl>

  {/* If yes, the amount and nature of support */}
  {formData.accessToSupport === 'yes' && (
    <FormControl>
      <FormLabel>If yes, the amount and nature of support:</FormLabel>
      <Textarea
        name="supportDetails"
        onChange={handleChange}
      />
    </FormControl>
  )}
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
    <FormLabel>Medical Confirmation (diagnosis)</FormLabel>
    <Input
      type="file"
      name="medicalConfirmation"
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

export default HealthIndividual;
