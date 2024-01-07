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


const SocialIndividual = () => {
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



{/*revenue table */}
const RevenueGoalsTable = () => {
    const [revenueData, setRevenueData] = useState([
      { businessPlan: '', currentYear: '', year1: '', year2: '', year3: '' },
    ]);
  
    const handleRevenueChange = (index, field, value) => {
      const newData = [...revenueData];
      newData[index][field] = value;
      setRevenueData(newData);
    };
  
    const handleAddRevenueRow = () => {
      setRevenueData([
        ...revenueData,
        { businessPlan: '', currentYear: '', year1: '', year2: '', year3: '' },
      ]);
    };
  
    // Calculate total expenses and estimated income per year
    const calculateTotals = (column) => {
      return revenueData.reduce((total, row) => {
        return total + (parseInt(row[column], 10) || 0);
      }, 0);
    };
  
    return (
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6}>
          Revenue Goals – Facts and Figures
        </Heading>
  
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Business Plans</Th>
              <Th>Year {new Date().getFullYear()}</Th>
              <Th>Year {new Date().getFullYear() + 1}</Th>
              <Th>Year {new Date().getFullYear() + 2}</Th>
              <Th>Year {new Date().getFullYear() + 3}</Th>
            </Tr>
          </Thead>
          <Tbody>
            {revenueData.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    type="text"
                    value={row.businessPlan}
                    onChange={(e) => handleRevenueChange(index, 'businessPlan', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.currentYear}
                    onChange={(e) => handleRevenueChange(index, 'currentYear', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.year1}
                    onChange={(e) => handleRevenueChange(index, 'year1', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.year2}
                    onChange={(e) => handleRevenueChange(index, 'year2', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.year3}
                    onChange={(e) => handleRevenueChange(index, 'year3', e.target.value)}
                  />
                </Td>
              </Tr>
            ))}
  
            {/* Add Row Button */}
            <Tr>
              <Td colSpan="5" textAlign="center">
                <Button colorScheme="blue" onClick={handleAddRevenueRow}>
                  Add Row
                </Button>
              </Td>
            </Tr>
  
            {/* Total Expenses Row */}
            <Tr>
              <Td>Total Expenses</Td>
              <Td>{calculateTotals('currentYear')}</Td>
              <Td>{calculateTotals('year1')}</Td>
              <Td>{calculateTotals('year2')}</Td>
              <Td>{calculateTotals('year3')}</Td>
            </Tr>
  
            {/* Estimated Income per Year Row */}
            <Tr>
              <Td>Estimated Income per Year</Td>
              <Td><Input type="number" placeholder="Enter value" /></Td>
              <Td><Input type="number" placeholder="Enter value" /></Td>
              <Td><Input type="number" placeholder="Enter value" /></Td>
              <Td><Input type="number" placeholder="Enter value" /></Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    );
  };





{/*budget */}
      const BudgetTable = () => {
        const [budgetData, setBudgetData] = useState([
          { budget: '', cost: '' },
        ]);
      
        const handleBudgetChange = (index, field, value) => {
          const newData = [...budgetData];
          newData[index][field] = value;
          setBudgetData(newData);
        };
      
        const handleAddBudgetRow = () => {
          setBudgetData([...budgetData, { budget: '', cost: '' }]);
        };
      
        const calculateTotalAmount = () => {
          return budgetData.reduce((total, row) => total + parseFloat(row.cost) || 0, 0);
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
                        onChange={(e) => handleBudgetChange(index, 'budget', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="number"
                        value={row.cost}
                        onChange={(e) => handleBudgetChange(index, 'cost', e.target.value)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
      
            <Button onClick={handleAddBudgetRow} mt={4}>
              Add Row
            </Button>
      
            <VStack mt={4} align="start" spacing={4}>
              <FormControl>
                <FormLabel >Total Amount</FormLabel>
                <Input type="text" value={calculateTotalAmount()} isReadOnly />
              </FormControl>
      
              <FormControl>
                <FormLabel isRequired>Beneficiary's Contribution</FormLabel>
                <Input type="number" name="beneficiaryContribution" onChange={handleChange} required />
              </FormControl>
      
              <FormControl>
                <FormLabel>Amount Requested</FormLabel>
                <Input type="number" name="amountRequested" onChange={handleChange} required />
              </FormControl>
            </VStack>
          </Box>
        );
      };

{/*documents needed */}

      const DocumentUpload = () => {
        const [documents, setDocuments] = useState([
          { name: 'Aadhar Card', file: null },
          { name: 'Request Letter', file: null },
          { name: 'Quotations regarding the purchase', file: null },
          { name: 'Other supporting documents', file: null },
        ]);
      
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
                          onChange={(e) => handleFileChange(index, e.target.files[0])}
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

      <Heading as="h1" size="xl" mb={6} align="center" justifyContent="center">
          Social individual Project Application Form 
        </Heading>

        {isSubmitted && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Form submitted successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
        <VStack align="start" spacing={4} mb={8}>
            {/* Name of society*/}
            <FormControl isRequired>
              <FormLabel>Name of society</FormLabel>
              <Input
                type="text"
                name="nameofSociety"
                onChange={handleChange}
                required
              />
            </FormControl>
            {/* Name of self employment */}
            <FormControl isRequired>
              <FormLabel>Name of self employment</FormLabel>
              <Input
                type="text"
                name="nameOfSelfEmployment"
                onChange={handleChange}
                required
              />
            </FormControl>
            {/* Date of Submission */}
            <FormControl isRequired>
              <FormLabel>Date of Submission</FormLabel>
              <Input
                type="date"
                name="dateOfSubmission"
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

  {/* Occupation*/}
  <FormControl isRequired>
    <FormLabel>Occupation</FormLabel>
    <Input
      type="text"
      name="fatherName"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/*Marital Status*/}
  <FormControl isRequired>
    <FormLabel>Marital Status</FormLabel>
    <Select
      name="maritalStatus"
      onChange={handleChange}
      required
    >
      <option value="married">married</option>
      <option value="unmarried">unmarried</option>
      <option value="divorced">Divorced</option>
      <option value="spouse dead">Spouse dead</option>
    </Select>
  </FormControl>

  {/* Name of spouse*/}
  <FormControl isRequired>
    <FormLabel>Spouse's name</FormLabel>
    <Input
      type="text"
      name="spouseName"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* number  of children*/}
  <FormControl>
    <FormLabel>Number of Children</FormLabel>
    <Input
      type="number"
      name="child"
      onChange={handleChange}
     
    />
  </FormControl>

   {/* educational status of children*/}
   <FormControl >
    <FormLabel>Educational status of children</FormLabel>
    <Input
      type="text"
      name="eduStatus"
      onChange={handleChange}
      
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
    Details of the Present Family Situation
  </Heading>

  {/* Give details of the present family situation: */}
  <FormControl isRequired>
    <FormLabel>Give details of the present family situation:</FormLabel>
    <Textarea
      name="presentFamilySituationDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Is the beneficiary currently doing any small-scale business? If yes, give the details. */}
  <FormControl isRequired>
    <FormLabel>Is the beneficiary currently doing any small-scale business? If yes, give the details.</FormLabel>
    <Textarea
      name="smallScaleBusinessDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Current (average) monthly earnings? */}
  <FormControl isRequired>
    <FormLabel>Current (average) monthly earnings?</FormLabel>
    <Input
      type="number"
      name="monthlyEarnings"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Explain the Beneficiary's present business idea: */}
  <FormControl isRequired>
    <FormLabel>Explain the Beneficiary's present business idea:</FormLabel>
    <Textarea
      name="businessIdeaDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

  <RevenueGoalsTable />

  {/* Strengths of Business Activity in the Previous Year */}
<FormControl isRequired>
    <FormLabel>Strengths of Business Activity in the Previous Year</FormLabel>
    <Textarea
      name="businessStrengthsPreviousYear"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Weaknesses of Business Activity in the Previous Year */}
  <FormControl isRequired>
    <FormLabel>Weaknesses of Business Activity in the Previous Year</FormLabel>
    <Textarea
      name="businessWeaknessesPreviousYear"
      onChange={handleChange}
      required
    />
  </FormControl>
</VStack>





<VStack align="start" spacing={4} mb={8}>
  <Heading as="h1" size="xl" mb={6}>
    Risk Analysis and Sustainability
  </Heading>

  {/* Identify risks involved in this small business/enterprise: */}
  <FormControl isRequired>
    <FormLabel>Identify risks involved in this small business/enterprise:</FormLabel>
    <Textarea
      name="riskIdentification"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* What are the measures proposed to face the above challenges to limit the risks? */}
  <FormControl isRequired>
    <FormLabel>What are the measures proposed to face the above challenges to limit the risks?</FormLabel>
    <Textarea
      name="riskMitigationMeasures"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Explain the sustainability of the business / enterprise: */}
  <FormControl isRequired>
    <FormLabel>Explain the sustainability of the business / enterprise:</FormLabel>
    <Textarea
      name="businessSustainability"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* What are the other expected benefits and outcomes foreseen by this initiative? */}
  <FormControl isRequired>
    <FormLabel>What are the other expected benefits and outcomes foreseen by this initiative?</FormLabel>
    <Textarea
      name="expectedBenefits"
      onChange={handleChange}
      required
    />
  </FormControl>
</VStack>
<BudgetTable/>
<DocumentUpload/>
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
</ChakraProvider>);


}
export default SocialIndividual;
