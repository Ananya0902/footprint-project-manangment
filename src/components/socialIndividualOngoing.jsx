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
  InputGroup,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  useDisclosure,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  CircularProgress
} from "@chakra-ui/react";

import cloudAxios from "../CloudAxios";
import authAxios from "../AuthAxios";

const SocialIndividualOngoing = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [budgetData, setBudgetData] = useState([{ budget: "", cost: "" }]);
  const [documents, setDocuments] = useState([
    { name: "Aadhar Card", file: null },
    { name: "Request Letter", file: null },
    { name: "Quotations regarding the purchase", file: null },
    { name: "Other supporting documents", file: null },
  ]);
  const showToast = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (file) => {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
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
  
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    try {
      setIsLoading((prevLoading) => !prevLoading);
      const photographUrl = await handleImageUpload(
        e.target.photographFile.files[0]
      );
      const aadharCardUrl = await handleImageUpload(documents[0].file);
      const requestLetterUrl = await handleImageUpload(documents[1].file);
      const quotationRegardingPurchase = await handleImageUpload(
        documents[2].file
      );
      const otherSupportingDocuments = await handleImageUpload(
        documents[3].file
      );

      const response = await authAxios.post("/projects/createLOI", {
        self_employment_nature: e.target.natureOfSelfEmployment.value,
        photograph_benificary: e.target.photographFile.value,
        name: e.target.beneficiaryName.value,
        mobile: e.target.beneficiaryContact.value,
        email: e.target.beneficiaryEmail.value,
        address: e.target.beneficiaryAddress.value,
        aadhar_no: e.target.aadharCardNo.value,
        gender: e.target.gender.value,
        DOB: e.target.dob.value,
        married: e.target.maritalStatus.value,
        spouse_name: e.target.spouseName.value,
        no_of_children: e.target.child.value,
        children_education: e.target.eduStatus.value,
        religion: e.target.religion.value,
        caste: e.target.casteTribe.value,
        present_family_situation: e.target.presentFamilySituation.value,
        Project_amount_already_received: e.target.projectAmountReceived.value,
        impact_created_in_the_ife_of_the_beneficiary:
          e.target.impactInLife.value,
        Average_revenue_generated_previous_year:
          e.target.averageRevenuePreviousYear.value,
        how_the_income_invested: e.target.incomeInvestmentDetails.value,
        strengths_of_business_activity_in_the_previous_year:
          e.target.businessStrengthsPreviousYear.value,
        weaknesses_of_business_activity_in_the_previous_year:
          e.target.businessWeaknessesPreviousYear.value,
        about_risks: e.target.risksAndTacklingDetails.value,
        plans_of_the_business_expansion: e.target.businessExpansionPlans.value,
        budget_cost_table: budgetData,
        total_amount_cost: e.target.totalAmountCost.value,
        beneficiaries_contribution: e.target.beneficiaryContribution.value,
        amount_requested: e.target.amountRequested.value,
        aadhar_img: aadharCardUrl, 
        request_letter_img: requestLetterUrl, 
        quotations_regarding_the_purchase_img:
          quotationRegardingPurchase,
        other_supporting_documents: otherSupportingDocuments, // Provide a way to upload/get the document UR
        benificary_agree: e.target.beneficiaryAgreement.checked,
      });
      setIsLoading((prevLoading) => !prevLoading);
      console.log(response.data);
      if (response.data.success) {
        showToast({
          title: "Successfull form submission",
          status: "success",
          duration: 5000,
        });
      } else {
        showToast({
          title: "Unsuccessful form submission",
          status: "error",
          description: "Adhar exists or invalid login session",
          duration: 5000,
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };
  /*
  {
    Budget here 
  }
*/
  const budgetTable = () => {
    const handleBudgetChange = (index, field, value) => {
      const newData = [...budgetData];
      newData[index][field] = value;
      setBudgetData(newData);
    };

  const handleAddBudgetRow = () => {
    setBudgetData([...budgetData, { budget: "", cost: "" }]);
  };

  const handleDeleteBudgetRow = (index) => {
    const newData = [...budgetData];
    newData.splice(index, 1);
    setBudgetData(newData);
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
            <Th>Action</Th>
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
              <Td>
                <Button onClick={() => handleDeleteBudgetRow(index)} colorScheme="red">
                  Delete
                </Button>
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
            <Input type="text" name="totalAmountCost" value={calculateTotalAmount()} isReadOnly />
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


// for document upload
  const documentUpload = () => {
    const handleFileChange = (index, file) => {
      const newDocuments = [...documents];
      newDocuments[index].file = file;
      setDocuments(newDocuments);
    };

    return (
      <Box p={4}>
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

            {/* Nature of Self Employment */}
            <FormControl isRequired>
              <FormLabel>Nature of Self Employment</FormLabel>
              <Input
                type="text"
                name="natureOfSelfEmployment"
                onChange={handleChange}
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
          {budgetTable()}
          {documentUpload()}
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
