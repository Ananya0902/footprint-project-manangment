import { useState } from "react";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Checkbox,
  Button,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  ChakraProvider,
} from "@chakra-ui/react";

const DisplayForm = () => {
  // Define formData object
  const [formData, setFormData] = useState({
    nameofSociety: "Sample Society",
    nameOfSelfEmployment: "Sample Self-Employment",
    dateOfSubmission: "2024-02-03",
    provincialSuperiorName: "John Doe",
    provincialSuperiorContact: "+1234567890",
    projectInchargeName: "Jane Smith",
    projectInchargeContact: "+9876543210",
    projectInchargeEmail: "jane@example.com",
    beneficiaryName: "John Doe",
    beneficiaryContact: "+1234567890",
    beneficiaryEmail: "john@example.com",
    beneficiaryAddress: "123 Sample Street, Sample City",
    aadharCardNo: "1234 5678 9012",
    gender: "male",
    dob: "1990-01-01",
    fatherName: "John Doe Sr.",
    maritalStatus: "married",
    spouseName: "Jane Doe",
    child: 2,
    eduStatus: "Studying",
    religion: "Christian",
    casteTribe: "General",
    presentFamilySituationDetails: "Details about family situation",
    smallScaleBusinessDetails: "Details about small-scale business",
    monthlyEarnings: 5000,
    businessIdeaDetails: "Details about business idea",
    businessStrengthsPreviousYear: "Strengths of previous year",
    businessWeaknessesPreviousYear: "Weaknesses of previous year",
    riskIdentification: "Risks identified",
    riskMitigationMeasures: "Measures for risk mitigation",
    businessSustainability: "Sustainability of business",
    expectedBenefits: "Expected benefits and outcomes",
    amountApprovedByProjectCoordinator: 10000,
    // Revenue Goals
    revenueData: [
      { businessPlan: "", currentYear: "", year1: "", year2: "", year3: "" },
    ],
    // Budget Details
    budgetData: [{ budget: "", cost: "" }],
    // Document Upload
    documents: [{ name: "", file: null }],
  });

  const calculateTotals = (column) => {
    return formData.revenueData.reduce((total, row) => {
      return total + (parseInt(row[column], 10) || 0);
    }, 0);
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
          Social individual Project Application Form
        </Heading>

        <form>
          {/* All the read-only fields */}
          <VStack align="start" spacing={4} mb={8}>
            <FormControl isReadOnly>
              <FormLabel>Name of society</FormLabel>
              <Input type="text" value={formData.nameofSociety} readOnly />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Name of self employment</FormLabel>
              <Input
                type="text"
                value={formData.nameOfSelfEmployment}
                readOnly
              />
            </FormControl>
            <FormControl isReadOnly>
              <FormLabel>Date of Submission</FormLabel>
              <Input type="date" value={formData.dateOfSubmission} readOnly />
            </FormControl>
            <VStack align="start" spacing={4} mb={8}>
              {/* Name of Provincial Superior */}
              <FormControl isReadOnly>
                <FormLabel>Name of Provincial Superior</FormLabel>
                <Input
                  type="text"
                  value={formData.provincialSuperiorName}
                  readOnly
                />
              </FormControl>

              {/* Contact of Provincial Superior */}
              <FormControl isReadOnly>
                <FormLabel>Contact of Provincial Superior</FormLabel>
                <Input
                  type="text"
                  value={formData.provincialSuperiorContact}
                  readOnly
                />
              </FormControl>
            </VStack>

            <VStack align="start" spacing={4} mb={8}>
              {/* Name of Project Incharge */}
              <FormControl isReadOnly>
                <FormLabel>Name of Project Incharge</FormLabel>
                <Input
                  type="text"
                  value={formData.projectInchargeName}
                  readOnly
                />
              </FormControl>

              {/* Contact of Project Incharge */}
              <FormControl isReadOnly>
                <FormLabel>Contact of Project Incharge</FormLabel>
                <Input
                  type="text"
                  value={formData.projectInchargeContact}
                  readOnly
                />
              </FormControl>

              {/* Email of Project Incharge */}
              <FormControl isReadOnly>
                <FormLabel>Email of Project Incharge</FormLabel>
                <Input
                  type="email"
                  value={formData.projectInchargeEmail}
                  readOnly
                />
              </FormControl>
            </VStack>

            {/* Personal Information of the Beneficiary */}
            <Heading as="h1" size="xl" mb={6}>
              Personal Information of the Beneficiary
            </Heading>
            {/* Photograph */}
            <FormControl isReadOnly>
              <FormLabel>Photograph</FormLabel>
              <img src={formData.photographFile} alt="Photograph" />
            </FormControl>

            {/* Name */}
            <FormControl isReadOnly>
              <FormLabel>Name</FormLabel>
              <Input type="text" value={formData.beneficiaryName} readOnly />
            </FormControl>
            {/* Contact */}
            <FormControl isReadOnly>
              <FormLabel>Contact</FormLabel>
              <Input type="tel" value={formData.beneficiaryContact} readOnly />
            </FormControl>

            {/* Email */}
            <FormControl isReadOnly>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={formData.beneficiaryEmail} readOnly />
            </FormControl>

            {/* Address */}
            <FormControl isReadOnly>
              <FormLabel>Address</FormLabel>
              <Textarea value={formData.beneficiaryAddress} readOnly />
            </FormControl>

            {/* Aadhar Card No. */}
            <FormControl isReadOnly>
              <FormLabel>Aadhar Card No.</FormLabel>
              <Input type="text" value={formData.aadharCardNo} readOnly />
            </FormControl>

            {/* Gender */}
            <FormControl isReadOnly>
              <FormLabel>Gender</FormLabel>
              <Select value={formData.gender} readOnly>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            {/* Date of Birth */}
            <FormControl isReadOnly>
              <FormLabel>Date of Birth</FormLabel>
              <Input type="date" value={formData.dob} readOnly />
            </FormControl>

            {/* Occupation */}
            <FormControl isReadOnly>
              <FormLabel>Occupation</FormLabel>
              <Input type="text" value={formData.fatherName} readOnly />
            </FormControl>

            {/* Marital Status */}
            <FormControl isReadOnly>
              <FormLabel>Marital Status</FormLabel>
              <Select value={formData.maritalStatus} readOnly>
                <option value="married">married</option>
                <option value="unmarried">unmarried</option>
                <option value="divorced">Divorced</option>
                <option value="spouse dead">Spouse dead</option>
              </Select>
            </FormControl>

            {/* Name of spouse */}
            <FormControl isReadOnly>
              <FormLabel>Spouse's name</FormLabel>
              <Input type="text" value={formData.spouseName} readOnly />
            </FormControl>

            {/* Number of children */}
            <FormControl isReadOnly>
              <FormLabel>Number of Children</FormLabel>
              <Input type="number" value={formData.child} readOnly />
            </FormControl>

            {/* Educational status of children */}
            <FormControl isReadOnly>
              <FormLabel>Educational status of children</FormLabel>
              <Input type="text" value={formData.eduStatus} readOnly />
            </FormControl>

            {/* Religion */}
            <FormControl isReadOnly>
              <FormLabel>Religion</FormLabel>
              <Input type="text" value={formData.religion} readOnly />
            </FormControl>

            {/* Caste / Tribe */}
            <FormControl isReadOnly>
              <FormLabel>Caste / Tribe</FormLabel>
              <Input type="text" value={formData.casteTribe} readOnly />
            </FormControl>
          </VStack>

          {/* Revenue Goals Table */}
          {/* Revenue Goals Table */}
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
              {formData.revenueData.map((row, index) => (
                <Tr key={index}>
                  <Td>{row.businessPlan}</Td>
                  <Td>{row.currentYear}</Td>
                  <Td>{row.year1}</Td>
                  <Td>{row.year2}</Td>
                  <Td>{row.year3}</Td>
                </Tr>
              ))}
              <Tr>
                <Td>Total Expenses</Td>
                <Td>{calculateTotals("currentYear")}</Td>
                <Td>{calculateTotals("year1")}</Td>
                <Td>{calculateTotals("year2")}</Td>
                <Td>{calculateTotals("year3")}</Td>
              </Tr>
              <Tr>
                <Td>Estimated Income per Year</Td>
                <Td>{/* Display calculated values */}</Td>
                <Td>{/* Display calculated values */}</Td>
                <Td>{/* Display calculated values */}</Td>
                <Td>{/* Display calculated values */}</Td>
              </Tr>
            </Tbody>
          </Table>

          {/* Budget Table */}
          <Heading as="h1" size="xl" mb={6}>
            Budget Details
          </Heading>
          <Box p={4}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Budget</Th>
                  <Th>Cost</Th>
                </Tr>
              </Thead>
              <Tbody>
                {formData.budgetData.map((row, index) => (
                  <Tr key={index}>
                    <Td>
                      <Input type="text" value={row.budget} isReadOnly />
                    </Td>
                    <Td>
                      <Input type="number" value={row.cost} isReadOnly />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
          {/* Document Upload */}
          <Heading as="h1" size="xl" mb={6}>
            Uploaded Documents
          </Heading>
          <Flex justify="center" align="center" wrap="wrap">
            {formData.documents.map((doc, index) => (
              <Box key={index} w="50%">
                <Image src={doc.url} alt={doc.name} />
              </Box>
            ))}
          </Flex>

          <VStack align="start" spacing={4} mb={8}>
            {/* Signatures */}
            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>

            <FormControl isReadOnly>
              <Checkbox isChecked isReadOnly>
                The Beneficiary / Family member agree
              </Checkbox>
              <Input
                type="date"
                value={formData.beneficiaryAgreementDate}
                readOnly
              />
            </FormControl>
            {/* Signatures */}
            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>
            <VStack align="start" spacing={4} mb={8}>
              {/* Beneficiary / Family member agreement */}
              <FormControl isRequired>
                <Checkbox name="beneficiaryAgreement" isChecked isReadOnly>
                  The Beneficiary / Family member agree
                </Checkbox>
                <Input
                  type="date"
                  name="beneficiaryAgreementDate"
                  value={formData.beneficiaryAgreementDate}
                  isReadOnly
                />
              </FormControl>

              {/* Project Coordinator agreement */}
              <FormControl isRequired>
                <Checkbox
                  name="projectCoordinatorAgreement"
                  isChecked
                  isReadOnly
                >
                  The Project Coordinator agree
                </Checkbox>
                <Input
                  type="date"
                  name="projectCoordinatorAgreementDate"
                  value={formData.projectCoordinatorAgreementDate}
                  isReadOnly
                />
              </FormControl>

              {/* Project-In-Charge agreement */}
              <FormControl isRequired>
                <Checkbox name="projectInChargeAgreement" isChecked isReadOnly>
                  The Project-In-Charge agree
                </Checkbox>
                <Input
                  type="date"
                  name="projectInChargeAgreementDate"
                  value={formData.projectInChargeAgreementDate}
                  isReadOnly
                />
              </FormControl>

              {/* Provincial Superior agreement */}
              <FormControl isRequired>
                <Checkbox
                  name="provincialSuperiorAgreement"
                  isChecked
                  isReadOnly
                >
                  The Provincial Superior agree
                </Checkbox>
                <Input
                  type="date"
                  name="provincialSuperiorAgreementDate"
                  value={formData.provincialSuperiorAgreementDate}
                  isReadOnly
                />
              </FormControl>
            </VStack>
          </VStack>

          {/* Amount Approved by Project Coordinator */}
          <VStack align="start" spacing={4} mb={8}>
            <FormControl isReadOnly>
              <FormLabel>Amount Approved by Project Coordinator</FormLabel>
              <Input
                type="number"
                value={formData.amountApprovedByProjectCoordinator}
                readOnly
              />
            </FormControl>

            {/* Remarks */}
            {/* <FormControl>
                <FormLabel>Remarks (Optional)</FormLabel>
                <Textarea name="remarks" onChange={handleChange} />
              </FormControl> */}
          </VStack>

          {/* Submit Button */}
          {/* The submit button can be hidden or disabled for read-only view */}
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default DisplayForm;
