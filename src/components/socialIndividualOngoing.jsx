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

const SocialIndividualOngoing = () => {
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
/*
  {
    Budget here 
  }
*/
  const BudgetTable = () => {
    const [budgetData, setBudgetData] = useState([{ budget: "", cost: "" }]);

    const handleBudgetChange = (index, field, value) => {
      const newData = [...budgetData];
      newData[index][field] = value;
      setBudgetData(newData);
    };

    const handleAddBudgetRow = () => {
      setBudgetData([...budgetData, { budget: "", cost: "" }]);
    };

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
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.cost}
                    onChange={(e) =>
                      handleBudgetChange(index, "cost", e.target.value)
                    }
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
            <FormLabel>Total Amount</FormLabel>
            <Input type="text" value={calculateTotalAmount()} isReadOnly />
          </FormControl>

          <FormControl>
            <FormLabel>Beneficiary's Contribution</FormLabel>
            <Input
              type="number"
              name="beneficiaryContribution"
              onChange={handleChange}
              required
            />
          </FormControl>

          <FormControl>
            <FormLabel>Amount Requested</FormLabel>
            <Input
              type="number"
              name="amountRequested"
              onChange={handleChange}
              required
            />
          </FormControl>
        </VStack>
      </Box>
    );
  };

  {
    /*documents needed */
  }

  const DocumentUpload = () => {
    const [documents, setDocuments] = useState([
      { name: "Aadhar Card", file: null },
      { name: "Request Letter", file: null },
      { name: "Quotations regarding the purchase", file: null },
      { name: "Other supporting documents", file: null },
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
              <Select name="maritalStatus" onChange={handleChange} required>
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
              <Input type="number" name="child" onChange={handleChange} />
            </FormControl>

            {/* educational status of children*/}
            <FormControl>
              <FormLabel>Educational status of children</FormLabel>
              <Input type="text" name="eduStatus" onChange={handleChange} />
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

            {/* Present Family Situation */}
            <FormControl isRequired>
              <FormLabel>Present Family Situation</FormLabel>
              <Textarea
                name="presentFamilySituation"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Project Amount Already Received */}
            <FormControl isRequired>
              <FormLabel>Project Amount Already Received</FormLabel>
              <Input
                type="text"
                name="projectAmountReceived"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Impact Created in the Life of the Beneficiary After Initiating This Livelihood Business */}
            <FormControl isRequired>
              <FormLabel>
                What is the impact created in the life of the beneficiary after
                initiating this livelihood business?
              </FormLabel>
              <Textarea name="impactInLife" onChange={handleChange} required />
            </FormControl>

            {/* Average Revenue Generated in the Previous Year */}
            <FormControl isRequired>
              <FormLabel>
                Average Revenue Generated in the Previous Year
              </FormLabel>
              <Input
                type="text"
                name="averageRevenuePreviousYear"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* How is the Income Invested? Explain in Detail */}
            <FormControl isRequired>
              <FormLabel>
                How is the Income Invested? Explain in Detail
              </FormLabel>
              <Textarea
                name="incomeInvestmentDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Strengths of Business Activity in the Previous Year */}
            <FormControl isRequired>
              <FormLabel>
                Strengths of Business Activity in the Previous Year
              </FormLabel>
              <Textarea
                name="businessStrengthsPreviousYear"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Weaknesses of Business Activity in the Previous Year */}
            <FormControl isRequired>
              <FormLabel>
                Weaknesses of Business Activity in the Previous Year
              </FormLabel>
              <Textarea
                name="businessWeaknessesPreviousYear"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Risks Faced and How They Were Tackled */}
            <FormControl isRequired>
              <FormLabel>Risks Faced and How They Were Tackled</FormLabel>
              <Textarea
                name="risksAndTacklingDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Plans for Business Expansion Now */}
            <FormControl isRequired>
              <FormLabel>Plans for Business Expansion Now</FormLabel>
              <Textarea
                name="businessExpansionPlans"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>
          <BudgetTable />
          <DocumentUpload />
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
              <Textarea name="remarks" onChange={handleChange} />
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
export default SocialIndividualOngoing;
