import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  Td,
  Image,
} from "@chakra-ui/react";

const ViewProject = () => {
  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  const projectInchargeData = projectData.applicant;

  const formData = {
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
    beneficiaryAgreement: projectData.benificary_agree,
    projectInChargeAgreement: projectData.project_in_charge_agree,
    otherDocumentsFile: projectData.other_supporting_docs_img,
    projectInChargeName: projectInchargeData.name,
    projectInChargeContact: projectInchargeData.mobile,
    projectInChargeEmail: projectInchargeData.email,
    // benificiaryAgreement: pro
    // beneficiaryAgreementDate: null,
    // projectInChargeAgreementDate: null,
    provincialSuperiorAgreement: projectData.provincial_superior_agree,
    projectCoordinatorAgreement: projectData.project_coordinator_agree,
    // provincialSuperiorAgreementDate: null,
    commentBoxReviewer: projectData.comment_box_provincial_superior,
    commentBoxApprover: projectData.comment_box_project_coordinator,
  };

  const tableData = projectData.present_earning_member.map((member) => {
    return {
      familyMember: member.family_member,
      natureOfWork: member.nature_of_work,
      monthlyIncome: member.monthly_income,
    };
  });

  const DynamicTable = () => {
    // const [tableData, setTableData] = useState([
    //   { familyMember: '', natureOfWork: '', monthlyIncome: '' },
    // ]);
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
                {/* <Td>
                  <Button colorScheme="red" onClick={() => handleDeleteRow(index)}>
                    Delete
                  </Button>
                </Td> */}
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

        <form>
          {/* Part 1: Provincial Superior Details */}
          <VStack align="start" spacing={4} mb={8}>
            {/* Nature of Illness */}
            <FormControl>
              <FormLabel>Nature of Illness</FormLabel>
              <Input
                type="text"
                name="natureOfIllness"
                value={formData.natureOfIllness || ""}
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
                value={formData.projectInChargeContact || ""}
                readOnly
              />
            </FormControl>

            {/* Email of Project Incharge */}
            <FormControl>
              <FormLabel>Email of Project Incharge</FormLabel>
              <Input
                type="email"
                name="projectInchargeEmail"
                value={formData.projectInChargeEmail || ""}
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
            <FormControl>
              <FormLabel>Photograph</FormLabel>
              <Box>
                {formData.photographFile && (
                  <Box>
                    <strong>Uploaded File:</strong>{" "}
                    {formData.photographFile.name}
                  </Box>
                )}
                {/* <Input
                  type="file"
                  name="photographFile"
                  onChange={handleChange}
                  accept="image/*"
                /> */}
                <Image
                  mx="auto"
                  boxSize="50%"
                  objectFit="contain"
                  src={formData.photographFile}
                  alt="Person photograph"
                />
              </Box>
            </FormControl>

            {/* Name */}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="beneficiaryName"
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
                value={formData.beneficiaryEmail || ""}
                readOnly
              />
            </FormControl>

            {/* Address */}
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="beneficiaryAddress"
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
                value={formData.aadharCardNo || ""}
                readOnly
              />
            </FormControl>

            {/* Gender */}
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select name="gender" value={formData.gender || ""} readOnly>
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
                name="natureOfIllness"
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
              <Select name="accessToSupport" readOnly>
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FormControl>

            {/* Amount and Nature of Support */}
            <FormControl>
              <FormLabel>If yes, the amount and nature of support </FormLabel>
              <Textarea
                name="amountAndNatureOfSupport"
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
                isChecked={formData.beneficiaryAgreement || ""}
                readOnly
                size="lg"
              >
                The Beneficiary / Family member agree
              </Checkbox>
              {/* <Input
                type="date"
                name="beneficiaryAgreementDate"
                onChange={handleChange}
                value={formData.beneficiaryAgreementDate || ""}
                readOnly
              /> */}
            </FormControl>

            {/* Project-In-Charge agreement */}
            <FormControl>
              <Checkbox
                name="projectInChargeAgreement"
                size="lg"
                isChecked={formData.projectInChargeAgreement}
                readOnly
              >
                The Project-In-Charge agree
              </Checkbox>
              {/* <Input
                type="date"
                name="projectInChargeAgreementDate"
                onChange={handleChange}
                value={formData.projectInChargeAgreementDate || ""}
                readOnly
              /> */}
            </FormControl>

            {/* Provincial Superior agreement */}
            <FormControl>
              <Checkbox
                name="provincialSuperiorAgreement"
                size="lg"
                isChecked={formData.provincialSuperiorAgreement}
                readOnly
              >
                The Provincial Superior agree
              </Checkbox>
              {/* <Input
                type="date"
                name="provincialSuperiorAgreementDate"
                onChange={handleChange}
                required
              /> */}
            </FormControl>
            <FormControl>
              <Checkbox
                name="projectCoordinatorAgreement"
                size="lg"
                isChecked={formData.projectCoordinatorAgreement}
                readOnly
              >
                The Project coordinator agree
              </Checkbox>
              {/* <Input
                type="date"
                name="provincialSuperiorAgreementDate"
                onChange={handleChange}
                required
              /> */}
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/* Comment */}
            <FormControl isRequired>
              <FormLabel>Comment(For Reviewer)</FormLabel>
              <Input
                type="text"
                name="commentReviewer"
                value={formData.commentBoxReviewer ?? ""}
                readOnly
                required
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Approvers Comment</FormLabel>
              <Input
                type="text"
                name="commentApprover"
                value={formData.commentBoxApprover ?? ""}
                readOnly
                required
              />
            </FormControl>
          </VStack>

          {/* Print Button */}
            <Button
              onClick={() => window.print()}
              colorScheme="blue"
              type="submit"
            >
              Print
            </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default ViewProject;
