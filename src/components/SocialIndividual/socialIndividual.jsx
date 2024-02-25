import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  CircularProgress,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import cloudAxios from "../../CloudAxios";
import authAxios from "../../AuthAxios";

const SocialIndividual = () => {
  const navigate =useNavigate();
  const [formData, setFormData] = useState({});
  const [budgetData, setBudgetData] = useState([{ budget: '', cost: 0 }]);
  const [revenueData, setRevenueData] = useState([
    { businessPlan: "", currentYear: "", year1: "", year2: "", year3: "" },
  ]);
  const [isLoading, setIsLoading] = useState(false);
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
      [e.target.name]: e.target.value || 0,
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
        status: "error",
        duration: 5000,
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  /**
   * Handles the form submission.
   * @param {Event} e - The form submit event.
   * @returns {Promise<void>} - A promise that resolves when the form submission is complete.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    try {
      setIsLoading(true);

      // Images uploaded to cloudinary 
      const photographUrl = await handleImageUpload(
        e.target.photographFile.files[0]
      );
      const aadharCardUrl = await handleImageUpload(documents[0].file);
      const requestLetterUrl = await handleImageUpload(documents[1].file);
      const quotationRegardingPurchase = await handleImageUpload(
        documents[2].file
      );
      const otherDocumentsUrl = await handleImageUpload(documents[3].file);

      const req = {
        revenueGoals: revenueData,
        nameOfSelfEmployment: e.target.nameOfSelfEmployment.value,
        photograph_benificary: photographUrl,
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
        education_status: e.target.eduStatus.value,
        religion: e.target.religion.value,
        caste: e.target.casteTribe.value,
        present_family_situation: e.target.presentFamilySituationDetails.value,
        smallScaleBusinessDetails: e.target.smallScaleBusinessDetails.value,
        monthlyEarnings: e.target.monthlyEarnings.value,
        businessIdeaDetails: e.target.businessIdeaDetails.value,
        beneficiary_contribution: e.target.beneficiaryContribution.value,
        amount_requested: e.target.amountRequested.value,
        businessStrengthsPreviousYear:
          e.target.businessStrengthsPreviousYear.value,
        businessWeaknessesPreviousYear:
          e.target.businessWeaknessesPreviousYear.value,
        riskIdentification: e.target.riskIdentification.value,
        riskMitigationMeasures: e.target.riskMitigationMeasures.value,
        businessSustainability: e.target.businessSustainability.value,
        expectedBenefits: e.target.expectedBenefits.value,
        budget_cost_table: budgetData, // You need to handle this separately based on how the data is structured in your form
        aadhar_img: aadharCardUrl,
        request_letter_img: requestLetterUrl,
        quotations_regarding_the_purchase_img: quotationRegardingPurchase,
        other_supporting_documents: otherDocumentsUrl,
        benificary_agree: {
          agree: true,
        },
        project_in_charge_agree: {
          agree: true,
        },
        estimated_income: {
          currentYear : e.target.estimatedIncomeCurrentYear.value,
          year1: e.target.estimatedIncomeYear1.value,
          year2: e.target.estimatedIncomeYear2.value,
          year3: e.target.estimatedIncomeYear3.value,
        },
      };

      // Now, `req` contains all the form field values mapped to the corresponding validation schema field names.
      console.log(req);
      const response = await authAxios.post("/projects/createSI", req);
      setIsLoading((prevLoading) => !prevLoading);
      console.log(response.data);
      if (response.data.success) {
        showToast({
          title: "Successfull form submission",
          status: "success",
          duration: 5000,
        }); navigate("/dashboardApplicant");
      } else {
        console.log('Error is here')
        showToast({
          title: "Unsuccessful form submission",
          status: "error",
          duration: 5000,
          description: response.data.msg,
        });
      }
    } catch (err) {
      setIsLoading(false);
      showToast(
        {
          title: "Error submitting form",
          status: "error",
          duration: 5000,
        }
      )
      console.log(err);
    }
  };

  // Revenue Table
  const RevenueGoalsTable = () => {
    const handleRevenueChange = (index, field, value) => {
      const newData = [...revenueData];
      newData[index][field] = value;
      setRevenueData(newData);
    };

    const handleAddRevenueRow = () => {
      setRevenueData([
        ...revenueData,
        { businessPlan: "", currentYear: "", year1: "", year2: "", year3: "" },
      ]);
    };

    // Calculate total expenses and estimated income per year
    const calculateTotals = (column) => {
      return revenueData.reduce((total, row) => {
        return total + (parseInt(row[column], 10) || 0);
      }, 0);
    };
    const handleDeleteRevenueRow = (index) => {
      const newData = [...revenueData];
      newData.splice(index, 1);
      setRevenueData(newData);
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
                    onChange={(e) =>
                      handleRevenueChange(index, "businessPlan", e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.currentYear}
                    onChange={(e) =>
                      handleRevenueChange(index, "currentYear", e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.year1}
                    onChange={(e) =>
                      handleRevenueChange(index, "year1", e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.year2}
                    onChange={(e) =>
                      handleRevenueChange(index, "year2", e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.year3}
                    onChange={(e) =>
                      handleRevenueChange(index, "year3", e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDeleteRevenueRow(index)}
                  >
                    Delete
                  </Button>
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
              <Td>{calculateTotals("currentYear")}</Td>
              <Td>{calculateTotals("year1")}</Td>
              <Td>{calculateTotals("year2")}</Td>
              <Td>{calculateTotals("year3")}</Td>
            </Tr>

            {/* Estimated Income per Year Row */}
            <Tr>
              <Td>Estimated Income per Year</Td>
              <Td>
                <Input type="number" name='estimatedIncomeCurrentYear' placeholder="Enter value" />
              </Td>
              <Td>
                <Input type="number" 
                name="estimatedIncomeYear1"
                placeholder="Enter value" 
                />
                
              </Td>
              <Td>
                <Input type="number" 
                name="estimatedIncomeYear2"
                placeholder="Enter value" />
              </Td>
              <Td>
                <Input type="number" 
                name="estimatedIncomeYear3"
                placeholder="Enter value" />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    );
  };

  {
    /*budget */
  }
  const BudgetTable = () => {
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
                  <Button
                    onClick={() => handleDeleteBudgetRow(index)}
                    colorScheme="red"
                  >
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
              readOnly
              value={calculateTotalAmount() - formData.beneficiaryContribution}
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
      </Box>
    );
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        {isLoading && (
          <>
            <Modal isOpen={true} onClose={onClose}>
              <ModalOverlay />

              <ModalContent>
                <ModalBody
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
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
        )}
        <Heading
          as="h1"
          size="xl"
          mb={6}
          align="center"
          justifyContent="center"
        >
          Social individual Project Application Form
        </Heading>

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
              <Input type="text" name="eduStatus" onChange={handleChange} required/>
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
              Detail
            </Heading>

            {/* Give details of the present family situation: */}
            <FormControl isRequired>
              <FormLabel>
                Give details of the present family situation:
              </FormLabel>
              <Textarea
                name="presentFamilySituationDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Is the beneficiary currently doing any small-scale business? If yes, give the details. */}
            <FormControl isRequired>
              <FormLabel>
                Is the beneficiary currently doing any small-scale business? If
                yes, give the details.
              </FormLabel>
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
              <FormLabel>
                Explain the Beneficiary's present business idea:
              </FormLabel>
              <Textarea
                name="businessIdeaDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {RevenueGoalsTable()}

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
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Risk Analysis and Sustainability
            </Heading>

            {/* Identify risks involved in this small business/enterprise: */}
            <FormControl isRequired>
              <FormLabel>
                Identify risks involved in this small business/enterprise:
              </FormLabel>
              <Textarea
                name="riskIdentification"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* What are the measures proposed to face the above challenges to limit the risks? */}
            <FormControl isRequired>
              <FormLabel>
                What are the measures proposed to face the above challenges to
                limit the risks?
              </FormLabel>
              <Textarea
                name="riskMitigationMeasures"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Explain the sustainability of the business / enterprise: */}
            <FormControl isRequired>
              <FormLabel>
                Explain the sustainability of the business / enterprise:
              </FormLabel>
              <Textarea
                name="businessSustainability"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* What are the other expected benefits and outcomes foreseen by this initiative? */}
            <FormControl isRequired>
              <FormLabel>
                What are the other expected benefits and outcomes foreseen by
                this initiative?
              </FormLabel>
              <Textarea
                name="expectedBenefits"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>
          {BudgetTable()}
          {DocumentUpload()}
          <VStack align="start" spacing={4} mb={8}>
            {/* Remarks */}
            {/* <FormControl>
              <FormLabel>Remarks (Optional)</FormLabel>
              <Textarea name="remarks" onChange={handleChange} />
            </FormControl> */}
          </VStack>

          {/* Submit Button */}
          <Button colorScheme="blue" type="submit" 
           onClick={() => (formData.projectInChargeAgreement = true)}>
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};
export default SocialIndividual;
