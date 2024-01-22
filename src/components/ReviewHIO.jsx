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
   Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';

const ReviewHIO = () => {
  const [formData, setFormData] = useState({
    natureOfIllness: 'Some illness',
    provincialSuperiorName: 'John Doe',
    provincialSuperiorContact: '123-456-7890',
    projectInchargeName: 'Jane Smith',
    projectInchargeContact: '987-654-3210',
    projectInchargeEmail: 'jane@example.com',
    beneficiaryName: 'Alice Doe',
    beneficiaryContact: '555-555-5555',
    beneficiaryEmail: 'alice@example.com',
    beneficiaryAddress: '123 Main St, City',
    aadharCardNo: '1234-5678-9012',
    gender: 'female',
    dob: '1990-01-01',
    guardianName: 'Bob Doe',
    numberOfChildren: 2,
    language: 'English',
    religion: 'Christian',
    casteTribe: 'General',
    natureOfIllness: 'Some illness',
    projectSupportDuration: '3 years',
    healthSituationDetails: 'Some health details',
    familySituationDetails: 'Some family details',
    accessToSupport: 'yes',
    amountAndNatureOfSupport: 'Financial support',
    amountReceivedFromProject: 5000,
    totalAmountSpent: 3000,
    totalExpense: 8000,
    familyContribution: 2000,
    totalAmountRequested: 6000,
    photographFile: null, // Assuming this field represents the uploaded photograph file
  aadharCardFile: null,
  requestLetterFile: null,
  treatmentRecordFile: null,
  otherDocumentsFile: null,
  beneficiaryAgreement: false,
  beneficiaryAgreementDate: null,
  projectInChargeAgreement: false,
  projectInChargeAgreementDate: null,
  provincialSuperiorAgreement: false,
  provincialSuperiorAgreementDate: null,
  comment: '',
  });
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

    // const handleDeleteRow = (index) => {
    //   const newData = [...tableData];
    //   newData.splice(index, 1);
    //   setTableData(newData);
    // };

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
                    isReadOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.natureOfWork}
                    isReadOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.monthlyIncome}
                    isReadOnly
                  />
                </Td>
                {/* <Td>
                  <Button colorScheme="red" onClick={() => handleDeleteRow(index)}>
                    Delete
                  </Button>
                </Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
    
        <Button onClick={handleAddRow}>Add Row</Button>
      </Box>
    );
   }    

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
            <FormControl >
              <FormLabel>Nature of Illness</FormLabel>
              <Input
                type="text"
                name="natureOfIllness"
                onChange={handleChange}
                value={formData.natureOfIllness||''}
                readOnly
              />
            </FormControl>

            {/* Name of Provincial Superior */}
            <FormControl >
              <FormLabel>Name of Provincial Superior</FormLabel>
              <Input
                type="text"
                name="provincialSuperiorName"
                onChange={handleChange}
                value={formData.provincialSuperiorName||''}
                readOnly
              />
            </FormControl>

            {/* Contact of Provincial Superior */}
            <FormControl >
              <FormLabel>Contact of Provincial Superior</FormLabel>
              <Input
                type="text"
                name="provincialSuperiorContact"
                onChange={handleChange}
                value={formData.provincialSuperiorContact||''}
                readOnly
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/* Name of Project Incharge */}
            <FormControl>
              <FormLabel>Name of Project Incharge</FormLabel>
              <Input
                type="text"
                name="projectInchargeName"
                onChange={handleChange}
                value={formData.provincialSuperiorName||''}
                readOnly
              />
            </FormControl>

            {/* Contact of Project Incharge */}
            <FormControl >
              <FormLabel>Contact of Project Incharge</FormLabel>
              <Input
                type="text"
                name="projectInchargeContact"
                onChange={handleChange}
                value={formData.projectInchargeContact||''}
                readOnly
              />
            </FormControl>

            {/* Email of Project Incharge */}
            <FormControl >
              <FormLabel>Email of Project Incharge</FormLabel>
              <Input
                type="email"
                name="projectInchargeEmail"
                onChange={handleChange}
                value={formData.projectInchargeEmail||''}
                readOnly
              />
            </FormControl>
          </VStack>
         
          <VStack align="start" spacing={4} mb={8}>
{/*Personal Information of the Beneficiary */}
<Heading as="h1" size="xl" mb={6}>
Personal Information of the Beneficiary
        </Heading>
  {/* Photograph (URL) */}
<FormControl >
  <FormLabel>Photograph</FormLabel>
  <Box>
    {formData.photographFile && (
      <Box>
        <strong>Uploaded File:</strong> {formData.photographFile.name}
      </Box>
    )}
    <Input
      type="file"
      name="photographFile"
      onChange={handleChange}
      accept="image/*"
    />
  </Box>
</FormControl>


  {/* Name */}
  <FormControl >
    <FormLabel>Name</FormLabel>
    <Input
      type="text"
      name="beneficiaryName"
      onChange={handleChange}
      value={formData.beneficiaryName||''}
      readOnly
    />
  </FormControl>

  {/* Contact */}
  <FormControl >
    <FormLabel>Contact</FormLabel>
    <Input
      type="tel"
      name="beneficiaryContact"
      onChange={handleChange}
      value={formData.beneficiaryContact||''}
      readOnly
    />
  </FormControl>

  {/* Email */}
  <FormControl >
    <FormLabel>Email</FormLabel>
    <Input
      type="email"
      name="beneficiaryEmail"
      onChange={handleChange}
      value={formData.beneficiaryEmail||''}
      readOnly
    />
  </FormControl>

  {/* Address */}
  <FormControl >
    <FormLabel>Address</FormLabel>
    <Textarea
      name="beneficiaryAddress"
      onChange={handleChange}
      value={formData.beneficiaryAddress||''}
      readOnly
    />
  </FormControl>

  {/* Aadhar Card No. */}
  <FormControl isRequired>
    <FormLabel>Aadhar Card No.</FormLabel>
    <Input
      type="text"
      name="aadharCardNo"
      onChange={handleChange}
      value={formData.aadharCardNo||''}
      readOnly
    />
  </FormControl>

  {/* Gender */}
  <FormControl >
    <FormLabel>Gender</FormLabel>
    <Select
      name="gender"
      onChange={handleChange}
      value={formData.gender||''}
      readOnly
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </Select>
  </FormControl>

  {/* Date of Birth */}
  <FormControl >
    <FormLabel>Date of Birth</FormLabel>
    <Input
      type="date"
      name="dob"
      onChange={handleChange}
      value={formData.dob||''}
      readOnly
    />
  </FormControl>

  {/* Name of Father/Husband/Legal Guardian */}
  <FormControl >
    <FormLabel>Name of Father/Husband/Legal Guardian</FormLabel>
    <Input
      type="text"
      name="guardianName"
      onChange={handleChange}
      value={formData.guardianName||''}
      readOnly
    />
  </FormControl>

  {/* Number of Children */}
  <FormControl >
    <FormLabel>Number of Children</FormLabel>
    <Input
      type="number"
      name="numberOfChildren"
      onChange={handleChange}
      value={formData.numberOfChildren||''}
      readOnly
    />
  </FormControl>

  {/* Language */}
  <FormControl>
    <FormLabel>Language</FormLabel>
    <Input
      type="text"
      name="language"
      onChange={handleChange}
      value={formData.language||''}
      readOnly
    />
  </FormControl>

  {/* Religion */}
  <FormControl>
    <FormLabel>Religion</FormLabel>
    <Input
      type="text"
      name="religion"
      onChange={handleChange}
      value={formData.religion||''}
      readOnly
    />
  </FormControl>

  {/* Caste / Tribe */}
  <FormControl >
    <FormLabel>Caste / Tribe</FormLabel>
    <Input
      type="text"
      name="casteTribe"
      onChange={handleChange}
      value={formData.casteTribe||''}
      readOnly
    />
  </FormControl>
</VStack>

<VStack align="start" spacing={4} mb={8}>
  {/* Questions on Health Situation */}

  <Heading as="h1" size="xl" mb={6}>
  Questions on health situation 
        </Heading>


  {/* Nature of Illness of the Beneficiary */}
  <FormControl >
    <FormLabel>Nature of Illness of the Beneficiary</FormLabel>
    <Textarea
      name="natureOfIllness"
      onChange={handleChange}
      value={formData.natureOfIllness||''}
      readOnly
    />
  </FormControl>

  {/* Duration of Project Support */}
  <FormControl>
    <FormLabel>Since how many years the project support is given</FormLabel>
    <Input
      type="text"
      name="projectSupportDuration"
      onChange={handleChange}
      value={formData.projectSupportDuration||''}
      readOnly
    />
  </FormControl>

  {/* Present Health Situation Details */}
  <FormControl >
    <FormLabel>
      Please write down more details about the present health situation of the beneficiary. e.g., improvement
    </FormLabel>
    <Textarea
      name="healthSituationDetails"
      onChange={handleChange}
      value={formData.healthSituationDetails||''}
      readOnly
    />
  </FormControl>

  {/* Present Family Situation */}
  <FormControl >
    <FormLabel>Give information about the present situation of the family</FormLabel>
    <Textarea
      name="familySituationDetails"
      onChange={handleChange}
      value={formData.familySituationDetails||''}
      readOnly
    />
  </FormControl>

  <DynamicTable />

  {/* Access to Government or Other Support */}
  <FormControl>
  <FormLabel>
    Does the beneficiary able to access Government or other support in the previous year?
  </FormLabel>
  <Select
    name="accessToSupport"
    onChange={handleChange}
    value={formData.accessToSupport||''}
      readOnly
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
                value={formData.amountAndNatureOfSupport||''}
                readOnly
              />
            </FormControl>

            {/* Amount received previously from the project */}
            <FormControl >
              <FormLabel>Amount received previously from the project</FormLabel>
              <Input
                type="number"
                name="amountReceivedFromProject"
                onChange={handleChange}
                value={formData.amountReceivedFromProject||''}
                readOnly
              />
            </FormControl>

            {/* Total amount spent */}
            <FormControl >
              <FormLabel>Total amount spent</FormLabel>
              <Input
                type="number"
                name="totalAmountSpent"
                onChange={handleChange}
                value={formData.totalAmountSpent||''}
                readOnly
              />
            </FormControl>
</VStack>


{/* Information on present Health Cost – Budget details*/}
<VStack align="start" spacing={4} mb={8}>
  <Heading as="h1" size="xl" mb={6}>
    Information on present Health Cost – Budget details
  </Heading>

  {/* Total Expense */}
  <FormControl>
    <FormLabel>Total Expense</FormLabel>
    <Input
      type="number"
      name="totalExpense"
      onChange={handleChange}
      value={formData.totalExpense||''}
       readOnly
    />
  </FormControl>

  {/* How much can the family contribute? */}
  <FormControl>
    <FormLabel>How much can the family contribute?</FormLabel>
    <Input
      type="number"
      name="familyContribution"
      onChange={handleChange}
      value={formData.familyContribution||''}
       readOnly
    />
  </FormControl>

  {/* Total amount requested */}
  <FormControl >
    <FormLabel>Total amount requested</FormLabel>
    <Input
      type="number"
      name="totalAmountRequested"
      onChange={handleChange}
      value={formData.totalAmountRequested||''}
      readOnly
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
  <FormControl >
    <Checkbox
      name="beneficiaryAgreement"
      onChange={handleChange}
      value={formData.beneficiaryAgreement||''}
      readOnly
      size="lg"
    >
      The Beneficiary / Family member agree
    </Checkbox>
    <Input
      type="date"
      name="beneficiaryAgreementDate"
      onChange={handleChange}
      value={formData.beneficiaryAgreementDate||''}
      readOnly
    />
  </FormControl>

  {/* Project Coordinator agreement */}
  {/* <FormControl isRequired>
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
  </FormControl> */}

{/* Project-In-Charge agreement */}
  <FormControl>
    <Checkbox
      name="projectInChargeAgreement"
      onChange={handleChange}
      size="lg"
      value={formData.projectInChargeAgreement||''}
      readOnly
    >
      The Project-In-Charge agree
    </Checkbox>
    <Input
      type="date"
      name="projectInChargeAgreementDate"
      onChange={handleChange}
      value={formData.projectInChargeAgreementDate||''}
      readOnly
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
{/* Comment */}
  <FormControl isRequired>
    <FormLabel>Comment(For Reviewer)</FormLabel>
    <Input
      type="text"
      name="comment"
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

export default ReviewHIO;
            
