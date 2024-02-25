import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  Alert,
  AlertIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Image,
  Td,
  useToast,
} from "@chakra-ui/react";
import authAxios from "../../AuthAxios";

const ApproveHIO = () => {
  const navigate = useNavigate();
  const showToast = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  const projectInchargeData = projectData.applicant;
  const provincialSuperiorData = projectData.reviewer;
  console.log("Fetched Data");
  console.log(projectInchargeData);
  console.log(provincialSuperiorData);
  console.log(projectData);

  const [formData, setFormData] = useState({
    natureOfIllness: projectData.illness_nature,
    photographFile: projectData.photograph_benificary,
    beneficiaryName: projectData.name,
    presentEarningMember: projectData.present_earning_member,
    beneficiaryAddress: projectData.address,
    aadharCardNo: projectData.aadhar_no,
    gender: projectData.gender,
    beneficiaryEmail: projectData.email,
    dob: projectData.DOB,
    beneficiaryContact: projectData.mobile,
    guardianName: projectData.father,
    numberOfChildren: projectData.no_of_children,
    language: projectData.language,
    religion: projectData.religion,
    casteTribe: projectData.caste,
    natureOfIllnessBeneficiary: projectData.nature_illness,
    projectSupportDuration: projectData.past_project_duration,
    healthSituationDetails: projectData.more_details_about_health,
    familySituationDetails: projectData.present_situation_family,
    accessToSupport: projectData.Govt_or_other_support,
    amountAndNatureOfSupport: projectData.nature_of_support,
    amountReceivedFromProject: projectData.previous_amount_received,
    totalAmountSpent: projectData.previous_total_amount,
    totalExpense: projectData.present_health_total_expense,
    familyContribution: projectData.present_health_family_contribute,
    totalAmountRequested: projectData.present_health_amount_requested,
    aadharCardFile: projectData.aadhar_img,
    requestLetterFile: projectData.request_letter_img,
    treatmentRecordFile: projectData.treatment_record_img,
    beneficiaryAgreement: projectData.benificary_agree.agree,
    projectInChargeAgreement: projectData.project_in_charge_agree.agree,
    otherDocumentsFile: projectData.other_supporting_docs_img,
    projectInChargeName: projectInchargeData.name,
    projectInChargeContact: projectInchargeData.mobile,
    projectInChargeEmail: projectInchargeData.email,
    beneficiaryAgreementDate: projectData.benificary_agree.date,
    projectInChargeAgreementDate: projectData.project_in_charge_agree.date,
    provincialSuperiorAgreement: projectData.provincial_superior_agree,
    provincialSuperiorAgreementDate: projectData.provincial_superior_agree.date,
    commentReviewer: projectData.comment_box_provincial_superior,
    provincialSuperiorName: provincialSuperiorData.name,
    provincialSuperiorEmail: provincialSuperiorData.email,
    provincialSuperiorContact: provincialSuperiorData.mobile
  });

  const [tableData, setTableData] = useState(
    projectData.present_earning_member.map((member) => {
      return {
        familyMember: member.family_member,
        natureOfWork: member.nature_of_work,
        monthlyIncome: member.monthly_income,
      };
    })
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    try {
      const req = {
        projectID: projectData._id,
        comment_box_project_coordinator: formData.commentApprover,
        project_coordinator_agree: {agree: e.target.projectCoordinatorAgreement.checked},
        amount_approved_project_coordinator:formData.amountApprovedByProjectCoordinator
      };
      const res = await authAxios.put("/projects/editapproverHOI/", req);
      console.log(res.data);
      if (res.data.success) {
        showToast({
          title: formData.projectCoordinatorAgreement ? "Approved successfully" : "Reverted successfully",
          status: "success",
          duration: 5000,
        }); 
        setIsSubmitted(true);
        navigate("/dashboardApprover"); 
      }
      else {
        showToast({
          title: "Error submitting the reviewed doc",
          status: "error",
          duration: 5000,
        });
      }
    } catch (e) {
      // console.log(e);
      showToast({
        title: "Error submitting the reviewed doc",
        description: e,
        status: "error",
        duration: 5000,
      });
    }
  };

  const DynamicTable = () => {
    // const [tableData, setTableData] = useState([
    //   { familyMember: '', natureOfWork: '', monthlyIncome: '' },
    // ]);

    const handleInputChange = (index, field, value) => {
      const newData = [...tableData];
      newData[index][field] = value;
      setTableData(newData);
    };

    const handleAddRow = () => {
      setTableData([
        ...tableData,
        { familyMember: "", natureOfWork: "", monthlyIncome: "" },
      ]);
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
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Input type="text" value={row.familyMember} isReadOnly />
                </Td>
                <Td>
                  <Input type="text" value={row.natureOfWork} isReadOnly />
                </Td>
                <Td>
                  <Input type="number" value={row.monthlyIncome} isReadOnly />
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
        <Heading
          as="h1"
          size="xl"
          mb={6}
          align="center"
          justifyContent="center"
        >
          Health individual Ongoing Project Application Form
        </Heading>

        {isSubmitted && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Form Approved successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Part 1: Provincial Superior Details */}
          <VStack align="start" spacing={4} mb={8}>
            {/* Nature of Illness */}
            <FormControl>
              <FormLabel>Nature of Illness</FormLabel>
              <Input
                type="text"
                name="natureOfIllness"
                onChange={handleChange}
                value={formData.natureOfIllness || ""}
                readOnly
              />
            </FormControl>

            {/* Name of Provincial Superior */}
            <FormControl>
              <FormLabel>Name of Provincial Superior</FormLabel>
              <Input
                type="text"
                name="provincialSuperiorName"
                onChange={handleChange}
                value={formData.provincialSuperiorName || ""}
                readOnly
              />
            </FormControl>

            {/* Contact of Provincial Superior */}
            <FormControl>
              <FormLabel>Contact of Provincial Superior</FormLabel>
              <Input
                type="text"
                name="provincialSuperiorContact"
                onChange={handleChange}
                value={formData.provincialSuperiorContact || ""}
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
                value={formData.projectInChargeName || ""}
                readOnly
              />
            </FormControl>

            {/* Contact of Project Incharge */}
            <FormControl>
              <FormLabel>Contact of Project Incharge</FormLabel>
              <Input
                type="text"
                name="projectInchargeContact"
                // onChange={handleChange}
                value={formData.projectInChargeContact}
                readOnly
              />
            </FormControl>

            {/* Email of Project Incharge */}
            <FormControl>
              <FormLabel>Email of Project Incharge</FormLabel>
              <Input
                type="email"
                name="projectInchargeEmail"
                onChange={handleChange}
                value={formData.projectInChargeEmail}
                readOnly
              />
            </FormControl>
             {/* Contacts Table */}
             <Table variant="simple" mb={4}>
              <Thead>
                <Tr>
                  <Th>Role</Th>
                  <Th>Name</Th>
                 
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
               
               
                {/* Project Coordinators */}
                <Tr>
                  <Td>Project Coordinator India</Td>
                  <Td>Sr. Nirmala Mathew</Td>

                  <Td>micostannsindia@gmail.com</Td>
                </Tr>
                <Tr>
                  <Td>Project Coordinator Luzern, Switzerland</Td>
                  <Td>Mr. Samuel Imbach</Td>
                 
                  <Td>s.imbach@mission-stanna.ch</Td>
                </Tr>
              </Tbody>
            </Table>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/*Personal Information of the Beneficiary */}
            <Heading as="h1" size="xl" mb={6}>
              Personal Information of the Beneficiary
            </Heading>
            {/* Photograph (URL) */}
            <FormControl>
              <FormLabel>Photograph</FormLabel>
              <Box>
                {formData.photographFile && (
                  <Box>
                    <strong>Uploaded File:</strong>{" "}
                    {formData.photographFile.name}
                  </Box>
                )}
                <Image
                  max="auto"
                  boxSize="40%"
                  objectFit="contain"
                  src={formData.photographFile}
                  alt="photgraph"
                />
              </Box>
            </FormControl>

            {/* Name */}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="beneficiaryName"
                onChange={handleChange}
                value={formData.beneficiaryName || ""}
                readOnly
              />
            </FormControl>

            {/* Contact */}
            <FormControl>
              <FormLabel>Contact</FormLabel>
              <Input
                type="tel"
                name="beneficiaryContact"
                onChange={handleChange}
                value={formData.beneficiaryContact || ""}
                readOnly
              />
            </FormControl>

            {/* Email */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="beneficiaryEmail"
                onChange={handleChange}
                value={formData.beneficiaryEmail || ""}
                readOnly
              />
            </FormControl>

            {/* Address */}
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="beneficiaryAddress"
                onChange={handleChange}
                value={formData.beneficiaryAddress || ""}
                readOnly
              />
            </FormControl>

            {/* Aadhar Card No. */}
            <FormControl>
              <FormLabel>Aadhar Card No.</FormLabel>
              <Input
                type="text"
                name="aadharCardNo"
                onChange={handleChange}
                value={formData.aadharCardNo || ""}
                readOnly
              />
            </FormControl>

            {/* Gender */}
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                onChange={handleChange}
                value={formData.gender || ""}
                readOnly
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            {/* Date of Birth */}
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="dob"
                onChange={handleChange}
                value={formData.dob || ""}
                readOnly
              />
            </FormControl>

            {/* Name of Father/Husband/Legal Guardian */}
            <FormControl>
              <FormLabel>Name of Father/Husband/Legal Guardian</FormLabel>
              <Input
                type="text"
                name="guardianName"
                onChange={handleChange}
                value={formData.guardianName || ""}
                readOnly
              />
            </FormControl>

            {/* Number of Children */}
            <FormControl>
              <FormLabel>Number of Children</FormLabel>
              <Input
                type="number"
                name="numberOfChildren"
                onChange={handleChange}
                value={formData.numberOfChildren || ""}
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
                value={formData.language || ""}
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
                value={formData.religion || ""}
                readOnly
              />
            </FormControl>

            {/* Caste / Tribe */}
            <FormControl>
              <FormLabel>Caste / Tribe</FormLabel>
              <Input
                type="text"
                name="casteTribe"
                onChange={handleChange}
                value={formData.casteTribe || ""}
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
            <FormControl>
              <FormLabel>Nature of Illness of the Beneficiary</FormLabel>
              <Textarea
                name="natureOfIllnessBenificiary"
                onChange={handleChange}
                value={formData.natureOfIllnessBeneficiary || ""}
                readOnly
              />
            </FormControl>

            {/* Duration of Project Support */}
            <FormControl>
              <FormLabel>
                Since how many years the project support is given
              </FormLabel>
              <Input
                type="text"
                name="projectSupportDuration"
                onChange={handleChange}
                value={formData.projectSupportDuration || ""}
                readOnly
              />
            </FormControl>

            {/* Present Health Situation Details */}
            <FormControl>
              <FormLabel>
                Please write down more details about the present health
                situation of the beneficiary. e.g., improvement
              </FormLabel>
              <Textarea
                name="healthSituationDetails"
                onChange={handleChange}
                value={formData.healthSituationDetails || ""}
                readOnly
              />
            </FormControl>

            {/* Present Family Situation */}
            <FormControl>
              <FormLabel>
                Give information about the present situation of the family
              </FormLabel>
              <Textarea
                name="familySituationDetails"
                onChange={handleChange}
                value={formData.familySituationDetails || ""}
                readOnly
              />
            </FormControl>

            <DynamicTable />

            {/* Access to Government or Other Support */}
            <FormControl>
              <FormLabel>
                Does the beneficiary able to access Government or other support
                in the previous year?
              </FormLabel>
              <Select
                name="accessToSupport"
                onChange={handleChange}
                value={formData.accessToSupport || ""}
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
                value={formData.amountAndNatureOfSupport || ""}
                readOnly
              />
            </FormControl>

            {/* Amount received previously from the project */}
            <FormControl>
              <FormLabel>Amount received previously from the project</FormLabel>
              <Input
                type="number"
                name="amountReceivedFromProject"
                onChange={handleChange}
                value={formData.amountReceivedFromProject || ""}
                readOnly
              />
            </FormControl>

            {/* Total amount spent */}
            <FormControl>
              <FormLabel>Total amount spent</FormLabel>
              <Input
                type="number"
                name="totalAmountSpent"
                onChange={handleChange}
                value={formData.totalAmountSpent || ""}
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
                value={formData.totalExpense || ""}
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
                value={formData.familyContribution || ""}
                readOnly
              />
            </FormControl>

            {/* Total amount requested */}
            <FormControl>
              <FormLabel>Total amount requested</FormLabel>
              <Input
                type="number"
                name="totalAmountRequested"
                onChange={handleChange}
                value={formData.totalAmountRequested || ""}
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
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.aadharCardFile}
                alt="Aadhar Card File"
              />
            </FormControl>

            {/* Request Letter */}
            <FormControl isRequired>
              <FormLabel>Request Letter</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.requestLetterFile}
                alt="Request Letter"
              />
            </FormControl>

            {/* Treatment record of previous year (one proof) */}
            <FormControl isRequired>
              <FormLabel>
                Treatment record of previous year (one proof)
              </FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.treatmentRecordFile}
                alt="Treatment Record"
              />
            </FormControl>

            {/* Other Supporting Documents */}
            <FormControl isRequired>
              <FormLabel>Other Supporting Documents</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.otherDocumentsFile}
                alt="Other supporting docs"
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>

            {/* Beneficiary / Family member agreement */}
            <FormControl>
              <Checkbox
                name="beneficiaryAgreement"
                onChange={handleChange}
                isChecked={formData.beneficiaryAgreement}
                readOnly
                size="lg"
              >
                The Beneficiary / Family member agree
              </Checkbox>
              <Input
                type="date"
                name="beneficiaryAgreementDate"
                onChange={handleChange}
                value={formData.beneficiaryAgreementDate || ""}
                readOnly
              />
            </FormControl>

            {/* Project-In-Charge agreement */}
            <FormControl>
              <Checkbox
                name="projectInChargeAgreement"
                onChange={handleChange}
                size="lg"
                isChecked={formData.projectInChargeAgreement}
                readOnly
              >
                The Project-In-Charge agree
              </Checkbox>
              <Input
                type="date"
                name="projectInChargeAgreementDate"
                onChange={handleChange}
                value={formData.projectInChargeAgreementDate || ""}
                readOnly
              />
            </FormControl>

            {/* Provincial Superior agreement */}
            <FormControl>
              <Checkbox
                name="provincialSuperiorAgreement"
                onChange={handleChange}
                size="lg"
                isChecked={formData.provincialSuperiorAgreement}
                readOnly
              >
                The Provincial Superior agree
              </Checkbox>
              <Input
                type="date"
                name="provincialSuperiorAgreementDate"
                onChange={handleChange}
                value={formData.provincialSuperiorAgreementDate || ""}
                readOnly
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
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/* Comment for reviewer */}
            <FormControl>
              <FormLabel>Comment(For Reviewer)</FormLabel>
              <Input
                type="text"
                name="commentReviewer"
                onChange={handleChange}
                value={formData.commentReviewer || ""}
                readOnly
              />
            </FormControl>

            {/* Comment for approver */}
            <FormControl isRequired>
              <FormLabel>Comment(For Approver)</FormLabel>
              <Input
                type="text"
                name="commentApprover"
                onChange={handleChange}
                required
              />
            </FormControl>

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
          </VStack>

          {/* Submit Button */}
          <Button
            colorScheme="blue"
            mx={3}
            type="submit"
            onClick={() => (formData.projectCoordinatorAgreement = true)}
          >
            Accept
          </Button>
          {/* decline Button */}
          <Button
            colorScheme="red"
            mx={3}
            type="submit"
            onClick={() => (formData.projectCoordinatorAgreement = false)}
          >
            Revert
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default ApproveHIO;
