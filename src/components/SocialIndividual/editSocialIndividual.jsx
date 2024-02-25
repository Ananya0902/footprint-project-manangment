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
  Modal,
  ModalContent,
  ModalBody,
  CircularProgress,
  ModalOverlay,
  Flex,
  Table,
  InputGroup,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  useDisclosure,
  ChakraProvider,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import authAxios from "../../AuthAxios";
import cloudAxios from "../../CloudAxios";

// This is the main component for editing the Social Individual project application form
/**
 * Submission has not been tested yet because backend is not ready
 *
 * EditSocialIndividual component.
 * Renders a form for editing social individual project details.
 *
 * @component
 * @returns {JSX.Element} EditSocialIndividual component
 */
const EditSocialIndividual = () => {
  const projectData = JSON.parse(
    decodeURIComponent(useParams()?.project ?? "{}")
  );
  const [formData, setFormData] = useState({
    photographFile: projectData.photograph_benificary,
    nameOfSelfEmployment: projectData.nameOfSelfEmployment,
    projectInchargeName: projectData.applicant.name,
    projectInchargeContact: projectData.applicant.mobile,
    projectInchargeEmail: projectData.applicant.email,
    beneficiaryName: projectData.name,
    beneficiaryContact: projectData.mobile,
    beneficiaryEmail: projectData.email,
    beneficiaryAddress: projectData.address,
    aadharCardNo: projectData.aadhar_no,
    beneficiaryContribution: projectData.beneficiary_contribution,
    amountRequested: projectData.amount_requested,
    gender: projectData.gender,
    dob: projectData.DOB,
    projectInChargeAgreementDate: projectData.project_in_charge_agree.date,
    projectInChargeAgreement: projectData.project_in_charge_agree.agree,
    benificiaryAgree: projectData.benificary_agree.agree,
    benificiaryAgreeDate: projectData.benificary_agree.date,
    maritalStatus: projectData.married,
    spouseName: projectData.spouse_name,
    child: projectData.no_of_children,
    eduStatus: projectData.education_status,
    religion: projectData.religion,
    casteTribe: projectData.caste,
    presentFamilySituationDetails: projectData.present_family_situation,
    smallScaleBusinessDetails: projectData.smallScaleBusinessDetails,
    monthlyEarnings: projectData.monthlyEarnings,
    businessIdeaDetails: projectData.businessIdeaDetails,
    businessStrengthsPreviousYear: projectData.businessStrengthsPreviousYear,
    businessWeaknessesPreviousYear: projectData.businessWeaknessesPreviousYear,
    riskIdentification: projectData.riskIdentification,
    riskMitigationMeasures: projectData.riskMitigationMeasures,
    businessSustainability: projectData.businessSustainability,
    expectedBenefits: projectData.expectedBenefits,
    // Revenue Goals
    revenueData: projectData.revenueGoals,
    // Budget Details
    budgetData: projectData.budget_cost_table,
    // Document Upload
    documents: [
      { name: "aadhar_img", file: projectData.aadhar_img },
      { name: "request_letter_img", file: projectData.request_letter_img },
      {
        name: "quotations_regarding_the_purchase_img",
        file: projectData.quotations_regarding_the_purchase_img,
      },
      {
        name: "other_supporting_documents",
        file: projectData.other_supporting_documents,
      },
    ],
    provincialSuperiorAgree: false,
    provincialSuperiorComment: null,
  });

  const [budgetData, setBudgetData] = useState(formData.budgetData);
  const [revenueData, setRevenueData] = useState(formData.revenueData);
  const [documents, setDocuments] = useState(formData.documents);

  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // Define formData object

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
        status: "error",
        duration: 5000,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    try {
      setIsLoading(true);
      console.log(documents);
      const photographUrl = formData.photographFile.includes("localhost")
        ? await handleImageUpload(formData.photographFile)
        : formData.photographFile;
      const aadharCardUrl = formData.documents[0].file.includes("localhost")
        ? await handleImageUpload(formData.documents[0].file)
        : formData.documents[0].file;
      const requestLetterUrl = formData.documents[0].file.includes("localhost")
        ? await handleImageUpload(formData.documents[0].file)
        : formData.documents[1].file;
      const quotationRegardingPurchase = formData.documents[0].file.includes(
        "localhost"
      )
        ? await handleImageUpload(formData.documents[0].file)
        : formData.documents[2].file;
      const otherDocumentsUrl = formData.documents[0].file.includes("localhost")
        ? await handleImageUpload(formData.documents[0].file)
        : formData.documents[3].file;

      const req = {
        beneficiary_contribution: formData.beneficiaryContribution,
        amount_expected: formData.amountRequested,
        revenueGoals: formData.revenueData,
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
        businessStrengthsPreviousYear:
          e.target.businessStrengthsPreviousYear.value,
        businessWeaknessesPreviousYear:
          e.target.businessWeaknessesPreviousYear.value,
        riskIdentification: e.target.riskIdentification.value,
        riskMitigationMeasures: e.target.riskMitigationMeasures.value,
        businessSustainability: e.target.businessSustainability.value,
        expectedBenefits: e.target.expectedBenefits.value,
        budget_cost_table: formData.budgetData, // You need to handle this separately based on how the data is structured in your form
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
      };

      // Now, `req` contains all the form field values mapped to the corresponding validation schema field names.

      const response = await authAxios.put("/projects/editSI", req);
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
          description: response.data.message,
          duration: 5000,
        });
      }
    } catch (err) {
      setIsLoading(false);
      showToast({
        title: "Unsuccessful form submission",
        status: "error",
        description: "Please try again",
        duration: 5000,
      });
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
                <Input type="number" placeholder="Enter value" />
              </Td>
              <Td>
                <Input type="number" placeholder="Enter value" />
              </Td>
              <Td>
                <Input type="number" placeholder="Enter value" />
              </Td>
              <Td>
                <Input type="number" placeholder="Enter value" />
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
      const total = budgetData.reduce((acc, row) => {
        return acc + (parseInt(row.cost, 10) || 0);
      }, 0);
      return total;
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
              value={formData.beneficiaryContribution}
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
              value={calculateTotalAmount() - formData.beneficiaryContribution}
              readOnly
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
                    <Image
                      src={
                        doc.file instanceof File
                          ? URL.createObjectURL(doc.file)
                          : doc.file
                      }
                      boxSize="100px"
                      objectFit="cover"
                    />
                    <Input
                      type="file"
                      accept=".jpeg, .jpg, .png"
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

            {/* Name of self employment */}
            <FormControl isRequired>
              <FormLabel>Name of self employment</FormLabel>
              <Input
                type="text"
                value={formData.nameOfSelfEmployment}
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
                <Image
                  src={
                    formData.photographFile instanceof File
                      ? URL.createObjectURL(formData.photographFile)
                      : formData.photographFile
                  }
                  alt="Beneficiary Photograph"
                  boxSize="100px"
                  objectFit="cover"
                />
                <Input
                  type="file"
                  name="photographFile"
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      photographFile: e.target.files[0],
                    });
                  }}
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
                value={formData.beneficiaryName}
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
                value={formData.beneficiaryContact}
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
                value={formData.beneficiaryEmail}
                name="beneficiaryEmail"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Address */}
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Textarea
                value={formData.beneficiaryAddress}
                name="beneficiaryAddress"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Aadhar Card No. */}
            <FormControl isRequired>
              <FormLabel>Aadhar Card No.</FormLabel>
              <Input
                value={formData.aadharCardNo}
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
                defaultValue={formData.gender}
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
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </FormControl>

            {/*Marital Status*/}
            <FormControl isRequired>
              <FormLabel>Marital Status</FormLabel>
              <Select
                name="maritalStatus"
                defaultValue={formData.maritalStatus}
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
                value={formData.spouseName}
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
                value={formData.child}
                name="child"
                onChange={handleChange}
              />
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
                value={formData.religion}
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
                value={formData.casteTribe}
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
                value={formData.presentFamilySituationDetails}
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
                value={formData.smallScaleBusinessDetails}
                name="smallScaleBusinessDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Current (average) monthly earnings? */}
            <FormControl isRequired>
              <FormLabel>Current (average) monthly earnings?</FormLabel>
              <Input
                value={formData.monthlyEarnings}
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
                value={formData.businessIdeaDetails}
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
                value={formData.businessStrengthsPreviousYear}
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
                value={formData.businessWeaknessesPreviousYear}
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
                value={formData.riskIdentification}
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
                value={formData.riskMitigationMeasures}
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
                value={formData.businessSustainability}
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
                value={formData.expectedBenefits}
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
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default EditSocialIndividual;
