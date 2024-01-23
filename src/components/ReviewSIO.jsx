import React, { useState } from "react";
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
  InputGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

const ReviewSIO = () => {
  const [formData, setFormData] = useState({
    provincialSuperiorName: 'John Doe',
  provincialSuperiorContact: '123-456-7890',
  projectInchargeName: 'Jane Smith',
  projectInchargeContact: '987-654-3210',
  projectInchargeEmail: 'jane@example.com',
  natureOfSelfEmployment: 'nothing',
  beneficiaryName: 'Alice Doe',
  beneficiaryContact: '555-555-5555',
  beneficiaryEmail: 'alice@example.com',
  beneficiaryAddress: '123 Main St, City',
  aadharCardNo: '1234-5678-9012',
  gender: 'female',
  dob: '1990-01-01',
  occupation: 'Sample Occupation',
  maritalStatus: 'married',
  spouseName: 'Bob Doe',
  child: 2,
  eduStatus: 'Sample Education',
  religion: 'Sample Religion',
  casteTribe: 'Sample Caste/Tribe',
  presentFamilySituation: 'Sample Family Situation',
  projectAmountReceived: 'Sample Amount',
  impactInLife: 'Sample Impact',
  averageRevenuePreviousYear: 'Sample Revenue',
  incomeInvestmentDetails: 'Sample Investment Details',
  businessStrengthsPreviousYear: 'Sample Strengths',
  businessWeaknessesPreviousYear: 'Sample Weaknesses',
  risksAndTacklingDetails: 'Sample Risks and Tackling Details',
  businessExpansionPlans: 'Sample Expansion Plans',
  beneficiaryContribution:'100',
  amountRequested:'1000',
  beneficiaryAgreement: true,
  beneficiaryAgreementDate: '2024-01-19',
  projectInChargeAgreement: true,
  projectInChargeAgreementDate: '2024-01-20',
  provincialSuperiorAgreement: true,
  provincialSuperiorAgreementDate: '2024-01-21',
  comment: 'Sample Comment',
  });
  const [budgetData, setBudgetData] = useState([{ budget: "", cost: "" }]);
  const [documents, setDocuments] = useState([
    { name: "Aadhar Card", file: null },
    { name: "Request Letter", file: null },
    { name: "Quotations regarding the purchase", file: null },
    { name: "Other supporting documents", file: null },
  ]);

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
/*
  {
    Budget here 
  }
*/
const BudgetTable = () => {
    // const [budgetData, setBudgetData] = useState([{ budget: "", cost: "" }]);
  
    const handleBudgetChange = (index, field, value) => {
      const newData = [...budgetData];
      newData[index][field] = value;
      setBudgetData(newData);
    };
  
    const handleAddBudgetRow = () => {
      setBudgetData([...budgetData, { budget: "", cost: "" }]);
    };
  
    // const handleDeleteBudgetRow = (index) => {
    //   const newData = [...budgetData];
    //   newData.splice(index, 1);
    //   setBudgetData(newData);
    // };
  
    const calculateTotalAmount = () => {
      return budgetData.reduce(
        (total, row) => total + parseFloat(row.cost) || 0,
        0
      );
    };
  
    return (
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6}>
          Budget Details
        </Heading>
  
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Budget</Th>
              <Th>Cost</Th>
              
            </Tr>
          </Thead>
          <Tbody>
            {budgetData.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    type="text"
                    value={row.budget}
                    onChange={(e) =>
                      handleBudgetChange(index, "budget", e.target.value)
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.cost}
                    onChange={(e) =>
                      handleBudgetChange(index, "cost", e.target.value)
                      
                    }
                    readOnly
                  />
                </Td>
                {/* <Td>
                  <Button onClick={() => handleDeleteBudgetRow(index)} colorScheme="red">
                    Delete
                  </Button>
                </Td> */}
              </Tr>
            ))}
          </Tbody>
        </Table>
  
        <Button onClick={handleAddBudgetRow} mt={4}>
          Add Row
        </Button>
  
        <VStack mt={4} align="start" spacing={4}>
          <FormControl>
            <FormLabel>Total Amount</FormLabel>
            <Input type="text" value={calculateTotalAmount()} isReadOnly />
          </FormControl>
  
        </VStack>
      </Box>
    );
  };  

  {
    /*documents needed */
  }

  const DocumentUpload = () => {
    // const [documents, setDocuments] = useState([
    //   { name: "Aadhar Card", file: null },
    //   { name: "Request Letter", file: null },
    //   { name: "Quotations regarding the purchase", file: null },
    //   { name: "Other supporting documents", file: null },
    // ]);

    const handleFileChange = (index, file) => {
      const newDocuments = [...documents];
      newDocuments[index].file = file;
      setDocuments(newDocuments);
    };

    return (
      <Box p={4}>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Document</Th>
              <Th>Upload</Th>
            </Tr>
          </Thead>
          <Tbody>
            {documents.map((doc, index) => (
              <Tr key={index}>
                <Td>{doc.name}</Td>
                <Td>
                  <FormControl>
                    <Input
                      type="file"
                      accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                      onChange={(e) =>
                        handleFileChange(index, e.target.files[0])
                      }
                    />
                  </FormControl>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button mt={4} colorScheme="blue" type="submit">
          Submit Documents
        </Button>
      </Box>
    );
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading
          as="h1"
          size="xl"
          mb={6}
          align="center"
          justifyContent="center"
        >
          Social individual Ongoing Project Application Form
        </Heading>

        {isSubmitted && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Form submitted successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack align="start" spacing={4} mb={8}>
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
    value={formData.projectInchargeName || ''}
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

 {/* Nature of Self Employment */}
 <FormControl >
              <FormLabel>Nature of Self Employment</FormLabel>
              <Input
                type="text"
                name="natureOfSelfEmployment"
                onChange={handleChange}
                value={formData.natureOfSelfEmployment||''}
      readOnly
              />
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
  <FormControl >
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

            {/* Occupation*/}
            <FormControl >
              <FormLabel>Occupation</FormLabel>
              <Input
                type="text"
                name="occupation"
                onChange={handleChange}
                value={formData.occupation||''}
                readOnly
              />
            </FormControl>

            {/*Marital Status*/}
            <FormControl >
              <FormLabel>Marital Status</FormLabel>
              <Select name="maritalStatus"
               onChange={handleChange}
               value={formData.maritalStatus||''}
                readOnly
                >
                <option value="married">married</option>
                <option value="unmarried">unmarried</option>
                <option value="divorced">Divorced</option>
                <option value="spouse dead">Spouse dead</option>
              </Select>
            </FormControl>

            {/* Name of spouse*/}
            <FormControl>
              <FormLabel>Spouse's name</FormLabel>
              <Input
                type="text"
                name="spouseName"
                onChange={handleChange}
                value={formData.spouseName||''}
                readOnly
              />
            </FormControl>

            {/* number  of children*/}
            <FormControl>
              <FormLabel>Number of Children</FormLabel>
              <Input type="number"
               name="child"
                onChange={handleChange} 
              value={formData.child||''}
              readOnly/>
            </FormControl>

            {/* educational status of children*/}
            <FormControl>
              <FormLabel>Educational status of children</FormLabel>
              <Input type="text" 
              name="eduStatus" 
              onChange={handleChange} 
              value={formData.eduStatus||''}
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

            {/* Present Family Situation */}
<FormControl >
  <FormLabel>Present Family Situation</FormLabel>
  <Textarea
    name="presentFamilySituation"
    value={formData.presentFamilySituation}
    readOnly
  />
</FormControl>

{/* Project Amount Already Received */}
<FormControl >
  <FormLabel>Project Amount Already Received</FormLabel>
  <Input
    type="text"
    name="projectAmountReceived"
    value={formData.projectAmountReceived}
    readOnly
  />
</FormControl>

{/* Impact Created in the Life of the Beneficiary After Initiating This Livelihood Business */}
<FormControl >
  <FormLabel>
    What is the impact created in the life of the beneficiary after
    initiating this livelihood business?
  </FormLabel>
  <Textarea
    name="impactInLife"
    value={formData.impactInLife}
    readOnly
  />
</FormControl>

{/* Average Revenue Generated in the Previous Year */}
<FormControl >
  <FormLabel>
    Average Revenue Generated in the Previous Year
  </FormLabel>
  <Input
    type="text"
    name="averageRevenuePreviousYear"
    value={formData.averageRevenuePreviousYear}
    readOnly
  />
</FormControl>

{/* How is the Income Invested? Explain in Detail */}
<FormControl >
  <FormLabel>
    How is the Income Invested? Explain in Detail
  </FormLabel>
  <Textarea
    name="incomeInvestmentDetails"
    value={formData.incomeInvestmentDetails}
    readOnly
  />
</FormControl>

{/* Strengths of Business Activity in the Previous Year */}
<FormControl >
  <FormLabel>
    Strengths of Business Activity in the Previous Year
  </FormLabel>
  <Textarea
    name="businessStrengthsPreviousYear"
    value={formData.businessStrengthsPreviousYear}
    readOnly
  />
</FormControl>

{/* Weaknesses of Business Activity in the Previous Year */}
<FormControl >
  <FormLabel>
    Weaknesses of Business Activity in the Previous Year
  </FormLabel>
  <Textarea
    name="businessWeaknessesPreviousYear"
    value={formData.businessWeaknessesPreviousYear}
    readOnly
  />
</FormControl>

{/* Risks Faced and How They Were Tackled */}
<FormControl >
  <FormLabel>Risks Faced and How They Were Tackled</FormLabel>
  <Textarea
    name="risksAndTacklingDetails"
    value={formData.risksAndTacklingDetails}
    readOnly
  />
</FormControl>

{/* Plans for Business Expansion Now */}
<FormControl isRequired>
  <FormLabel>Plans for Business Expansion Now</FormLabel>
  <Textarea
    name="businessExpansionPlans"
    value={formData.businessExpansionPlans}
    isReadOnly
  />
</FormControl>


          </VStack>
          <BudgetTable />
          
          <FormControl>
            <FormLabel>Beneficiary's Contribution</FormLabel>
            <Input
              type="number"
              name="beneficiaryContribution"
              onChange={handleChange}
              value={formData.beneficiaryContribution||''}
              readOnly
            />
          </FormControl>
  
          <FormControl>
            <FormLabel>Amount Requested</FormLabel>
            <Input
              type="number"
              name="amountRequested"
              onChange={handleChange}
              value={formData.amountRequested||''}
              readOnly
            />
          </FormControl>


          <DocumentUpload />
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
export default ReviewSIO;
