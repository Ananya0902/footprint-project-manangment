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
  Alert,
  AlertIcon,
  Image,
  InputGroup,
  useToast,
} from "@chakra-ui/react";
import authAxios from "../../AuthAxios";
import { useParams } from "react-router-dom";

const ReviewEIO = () => {
  const navigate = useNavigate();
  const showToast = useToast();
  const projectData = JSON.parse(decodeURI(useParams().project));
  const projectInchargeData = projectData.applicant;
  console.log(projectData);
  const [formData, setFormData] = useState({
    // Name and contact of Provincial Superior
    // Name and contact of Provincial Superior
    projectInchargeName: projectInchargeData.name,
    projectInchargeEmail: projectInchargeData.email,
    projectInchargeContact: projectInchargeData.mobile,
    photographUrl: projectData.photograph_benificary,
    beneficiaryName: projectData.name,
    beneficiaryContact: projectData.mobile,
    beneficiaryEmail: projectData.email,
    beneficiaryAddress: projectData.address,
    aadharCardNo: projectData.aadhar_no,
    gender: projectData.gender,
    dob: projectData.DOB,
    fatherName: projectData.father,
    motherName: projectData.mother,
    motherTongue: projectData.mother_tongue,
    religion: projectData.religion,
    casteTribe: projectData.caste,
    fatherOccupation: projectData.occupation_of_father,
    fatherMonthlyIncome: projectData.monthly_income_of_father,
    motherOccupation: projectData.occupation_of_mother,
    motherStatus: projectData.motherIs,
    fatherStatus: projectData.fatherIs,
    grandmotherSupport: projectData.grandmother_support,
    grandfatherSupport: projectData.grandfather_support,
    fatherHealthStatus: projectData.health_status_of_father,
    fatherHealthStatusOthers: projectData.health_status_of_father_others,
    motherHealthStatus: projectData.health_status_of_mother,
    motherHealthStatusOthers: projectData.health_status_of_mother_others,
    residentialStatus: projectData.residential_status,
    residentialStatusOthers: projectData.residential_status_others,
    familySituationPresent: projectData.family_situation_of_the_beneficiary,
    extraCurricularActivities:
      projectData.extra_curricular_activities_participated,
    personalityGrowth: projectData.nature_of_personality_growth_visible,
    scholarshipAmount: projectData.Scholarship_received_from_government,
    familyContribution: projectData.expenses_from_family_of_the_beneficiary,
    otherSupportReceived: projectData.other_support_received_from_other_sources,
    totalAmount: projectData.total_amount,
    amountSpentFromProject: projectData.amount_spent_from_project,
    totalAmountSpentOnStudies:
      projectData.total_amount_already_spent_on_the_studies,
    balanceAmountRetained: projectData.balance_amount_retained_in_the_projects,
    aadharCardUrl: projectData.aadhar_img,
    feeQuotationUrl: projectData.fee_quotation_from_the_institution_img,
    scholarshipProofUrl:
      projectData.proof_of_scholarship_received_from_government_img,
    medicalConfirmationUrl: projectData.medical_confirmation_img,
    affidavitProofUrl: projectData.affidavit_proof_img,
    requestLetterUrl: projectData.request_letter_img,
    deathCertificateUrl: projectData.death_certificate_img,
    markListPreviousYearUrl: projectData.mark_list_of_previous_year,
    casteCertificateUrl: projectData.caste_certificate_img,
    beneficiaryAgreement: projectData.benificary_agree.agree,
    beneficiaryAgreementDate: projectData.benificary_agree.date,
    projectInChargeAgreement: projectData.project_in_charge_agree.agree,
    projectInChargeAgreementDate: projectData.project_in_charge_agree.date,
    presentStudy: projectData.present_study,
    budgetDetails: projectData.details_of_budget,
    totalCostOfStudy: projectData.total_cost_of_study,
    scholarshipExpected: projectData.scholarship_expected,
    beneficiaryContribution: projectData.beneficiaries_contribution,
    totalScholarshipAndContribution: projectData.total_scholarship_contribution,
    balanceAmountRequested: projectData.balance_amount_requested,
    provincialSuperiorAgreement: false,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log('submit');
    e.preventDefault();
    // Add your form submission logic here
    try {
      const req = {
        projectID: projectData._id,
        comment_box_provincial_superior: formData.comment,
        provincial_superior_agree: {
          agree: formData.provincialSuperiorAgreement,
        },
      };
      console.log(req);
      const res = await authAxios.put("/projects/editreviewerEOI/", req);
      if (res.data.success) {
        showToast({
          title: formData.provincialSuperiorAgreement ? "Reviewed successfully" : "Reverted successfully",
          status: "success",
          duration: 5000,
        });navigate("/dashboardApplicant");
      }
      else {
        showToast({
          title: "Error submitting the reviewed doc",
          status: "error",
          duration: 5000,
        });
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
      showToast({
        title: "Error submitting the reviewed doc",
        description: e,
        status: "error",
        duration: 5000,
      });
    }
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
          Education individual Ongoing Project Application Form
        </Heading>

        {isSubmitted && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Form Reviewed successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack align="start" spacing={4} mb={8}>
            {/* Name of Project Incharge */}
            <FormControl>
              <FormLabel>Name of Project Incharge</FormLabel>
              <Input
                type="text"
                name="projectInchargeName"
                onChange={handleChange}
                value={formData.projectInchargeName || ""}
                readOnly
              />
            </FormControl>

            {/* Contact of Project Incharge */}
            <FormControl>
              <FormLabel>Contact of Project Incharge</FormLabel>
              <Input
                type="text"
                name="projectInchargeContact"
                onChange={handleChange}
                value={formData.projectInchargeContact || ""}
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
                value={formData.projectInchargeEmail || ""}
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
                <Image
                  boxSize="40%"
                  src={formData.photographUrl}
                  alt="Beneficiary Image"
                  mx="auto"
                  fit="contain"
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

            {/* Name of Father */}
            <FormControl>
              <FormLabel>Father's Name</FormLabel>
              <Input
                type="text"
                name="fatherName"
                onChange={handleChange}
                value={formData.fatherName || ""}
                readOnly
              />
            </FormControl>

            {/*Mother's Name */}
            <FormControl>
              <FormLabel>Mother's Name</FormLabel>
              <Input
                type="text"
                name="motherName"
                onChange={handleChange}
                value={formData.motherName || ""}
                readOnly
              />
            </FormControl>

            {/* Mother Tongue */}
            <FormControl>
              <FormLabel>Mother Tongue</FormLabel>
              <Input
                type="text"
                name="motherTongue"
                onChange={handleChange}
                value={formData.motherTongue || ""}
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

          {/* Information about the Family */}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Information about the Family
            </Heading>

            {/* Occupation of Father */}
            <FormControl>
              <FormLabel>Occupation of Father</FormLabel>
              <Input
                type="text"
                name="fatherOccupation"
                onChange={handleChange}
                value={formData.fatherOccupation || ""}
                readOnly
              />
            </FormControl>

            {/* Monthly Income of Father */}
            <FormControl>
              <FormLabel>Monthly Income of Father</FormLabel>
              <Input
                type="number"
                name="fatherMonthlyIncome"
                onChange={handleChange}
                value={formData.fatherMonthlyIncome || ""}
                readOnly
              />
            </FormControl>

            {/* Occupation of Mother */}
            <FormControl>
              <FormLabel>Occupation of Mother</FormLabel>
              <Input
                type="text"
                name="motherOccupation"
                onChange={handleChange}
                value={formData.motherOccupation || ""}
                readOnly
              />
            </FormControl>

            {/* Monthly Income of Mother */}
            <FormControl>
              <FormLabel>Monthly Income of Mother</FormLabel>
              <Input
                type="number"
                name="motherMonthlyIncome"
                onChange={handleChange}
                value={formData.motherMonthlyIncome || ""}
                readOnly
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/* Details about Mother and Father */}
            <Heading as="h1" size="xl" mb={6}>
              Details about Mother and Father
            </Heading>

            {/* Mother's Status */}
            <FormControl>
              <FormLabel>Mother is</FormLabel>
              <Select
                name="motherStatus"
                onChange={handleChange}
                value={formData.motherStatus || ""}
                readOnly
              >
                <option value="healthy">Healthy</option>
                <option value="sick">Sick</option>
                <option value="dead">Dead</option>
              </Select>
            </FormControl>

            {/* Father's Status */}
            <FormControl>
              <FormLabel>Father is</FormLabel>
              <Select
                name="fatherStatus"
                onChange={handleChange}
                value={formData.fatherStatus || ""}
                readOnly
              >
                <option value="healthy">Healthy</option>
                <option value="sick">Sick</option>
                <option value="dead">Dead</option>
                <option value="deserted">Deserted the family</option>
              </Select>
            </FormControl>

            {/* Grandmother's Support */}
            <FormControl>
              <FormLabel>Grandmother gets family support</FormLabel>
              <Select
                name="grandmotherSupport"
                onChange={handleChange}
                value={formData.grandmotherSupport || ""}
                readOnly
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Died">Died</option>
              </Select>
            </FormControl>

            {/* Grandfather's Support */}
            <FormControl>
              <FormLabel>Grandfather gets family support</FormLabel>
              <Select
                name="grandfatherSupport"
                onChange={handleChange}
                value={formData.grandfatherSupport || ""}
                readOnly
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Died">Died</option>
              </Select>
            </FormControl>

            {/* Health Status of Father */}
            <FormControl>
              <FormLabel>Health status of Father</FormLabel>
              <Select
                name="fatherHealthStatus"
                onChange={handleChange}
                value={formData.fatherHealthStatus || ""}
                readOnly
              >
                <option value="Chronically Sick">Chronically Sick</option>
                <option value="HIV/AIDS positive">HIV/AIDS positive</option>
                <option value="Disabled">Disabled</option>
                <option value="Alcoholic">Alcoholic</option>
                <option value="Others">Others</option>
              </Select>
              {/* Conditional input for 'Others' */}
              {formData.fatherHealthStatus === "others" && (
                <Input
                  type="text"
                  name="fatherHealthStatusOthers"
                  onChange={handleChange}
                  placeholder="Specify other health status"
                  value={formData.fatherHealthStatusOthers || ""}
                  readOnly
                />
              )}
            </FormControl>

            {/* Health Status of Mother */}
            <FormControl>
              <FormLabel>Health status of Mother</FormLabel>
              <Select
                name="motherHealthStatus"
                onChange={handleChange}
                value={formData.motherHealthStatus || ""}
                readOnly
              >
                <option value="Chronically Sick">Chronically Sick</option>
                <option value="HIV/AIDS positive">HIV/AIDS positive</option>
                <option value="Disabled">Disabled</option>
                <option value="Alcoholic">Alcoholic</option>
                <option value="Others">Others</option>
              </Select>
              {/* Conditional input for 'Others' */}
              {formData.motherHealthStatus === "Others" && (
                <Input
                  type="text"
                  name="motherHealthStatusOthers"
                  onChange={handleChange}
                  placeholder="Specify other health status"
                  value={formData.motherHealthStatusOthers || ""}
                  readOnly
                />
              )}
            </FormControl>

            {/* Residential Status */}
            <FormControl>
              <FormLabel>Residential Status</FormLabel>
              <Select
                name="residentialStatus"
                onChange={handleChange}
                value={formData.residentialStatus || ""}
                readOnly
              >
                <option value="houseOwner">House Owner</option>
                <option value="landOwner">Land Owner</option>
                <option value="rentedHouse">Rented House</option>
                <option value="others">Others</option>
              </Select>
              {/* Conditional input for 'Others' */}
              {formData.residentialStatus === "others" && (
                <Input
                  type="text"
                  name="residentialStatusOthers"
                  onChange={handleChange}
                  placeholder="Specify other residential status"
                  value={formData.residentialStatusOthers || ""}
                  readOnly
                />
              )}
            </FormControl>

            <FormControl>
              <FormLabel>
                Family situation of the beneficiary (present)
              </FormLabel>
              <Textarea
                name="familySituationPresent"
                onChange={handleChange}
                value={formData.familySituationPresent || ""}
                readOnly
              />
            </FormControl>

            <FormControl>
              <FormLabel>
                Percentage of marks / grade received in the previous year of
                study
              </FormLabel>
              <Input
                type="text"
                name="previousYearMarks"
                onChange={handleChange}
                value={formData.previousYearMarks || ""}
                readOnly
              />
            </FormControl>

            <FormControl>
              <FormLabel>Extra-curricular activities participated</FormLabel>
              <Textarea
                name="extraCurricularActivities"
                onChange={handleChange}
                value={formData.extraCurricularActivities || ""}
                readOnly
              />
            </FormControl>

            <FormControl>
              <FormLabel>Nature of personality growth visible</FormLabel>
              <Textarea
                name="personalityGrowth"
                onChange={handleChange}
                value={formData.personalityGrowth || ""}
                readOnly
              />
            </FormControl>
          </VStack>

          {/* Finance Contribution / Receipts (Previous Year of Study) */}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Finance Contribution / Receipts (Previous Year of Study)
            </Heading>

            {/* Scholarship Amount Received from Government (State/Central) */}
            <FormControl>
              <FormLabel>
                Scholarship amount received from government (State/Central) -
                Attach proof
              </FormLabel>
              <Input
                type="number"
                name="scholarshipAmount"
                onChange={handleChange}
                value={formData.scholarshipAmount || ""}
                readOnly
              />
            </FormControl>

            {/* Contribution of Fees / Expenses from Family of the Beneficiary */}
            <FormControl>
              <FormLabel>
                Contribution of fees / expenses from family of the beneficiary
              </FormLabel>
              <Input
                type="number"
                name="familyContribution"
                onChange={handleChange}
                value={formData.familyContribution || ""}
                readOnly
              />
            </FormControl>

            {/* Any Other Support Received from Other Sources */}
            <FormControl>
              <FormLabel>
                Any other support received from other sources? (Yes/No)
              </FormLabel>
              <Select
                name="otherSupportReceived"
                onChange={handleChange}
                value={formData.otherSupportReceived || ""}
                readOnly
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </FormControl>

            {/* Total Amount */}
            <FormControl>
              <FormLabel>Total Amount</FormLabel>
              <Input
                type="number"
                name="totalAmount"
                onChange={handleChange}
                value={formData.totalAmount || ""}
                readOnly
              />
            </FormControl>

            {/* Amount Spent from Project */}
            <FormControl>
              <FormLabel>Amount spent from the project</FormLabel>
              <Input
                type="number"
                name="amountSpentFromProject"
                onChange={handleChange}
                value={formData.amountSpentFromProject || ""}
                readOnly
              />
            </FormControl>

            {/* Total Amount Already Spent on the Studies */}
            <FormControl>
              <FormLabel>Total amount already spent on the studies</FormLabel>
              <Input
                type="number"
                name="totalAmountSpentOnStudies"
                onChange={handleChange}
                value={formData.totalAmountSpentOnStudies || ""}
                readOnly
              />
            </FormControl>

            {/* Balance Amount Retained in the Project */}
            <FormControl>
              <FormLabel>Balance amount retained in the project</FormLabel>
              <Input
                type="number"
                name="balanceAmountRetained"
                onChange={handleChange}
                value={formData.balanceAmountRetained || ""}
                readOnly
              />
            </FormControl>
          </VStack>

          {/* Present Education/Training */}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Present Education/Training
            </Heading>

            {/* Present Study */}
            <FormControl>
              <FormLabel>Present study</FormLabel>
              <Textarea
                name="presentStudy"
                onChange={handleChange}
                value={formData.presentStudy || ""}
                readOnly
              />
            </FormControl>

            {/* Details of Budget */}
            <FormControl>
              <FormLabel>Details of budget</FormLabel>
              <Textarea
                name="budgetDetails"
                onChange={handleChange}
                value={formData.budgetDetails || ""}
                readOnly
              />
            </FormControl>

            {/* Total Cost of the Study */}
            <FormControl>
              <FormLabel>Total cost of the study</FormLabel>
              <Input
                type="number"
                name="totalCostOfStudy"
                onChange={handleChange}
                value={formData.totalCostOfStudy || ""}
                readOnly
              />
            </FormControl>

            {/* Scholarship Expected from Government/Other Sources */}
            <FormControl>
              <FormLabel>
                Scholarship expected from government/other sources
              </FormLabel>
              <Input
                type="number"
                name="scholarshipExpected"
                onChange={handleChange}
                value={formData.scholarshipExpected || ""}
                readOnly
              />
            </FormControl>

            {/* Beneficiary's Contribution */}
            <FormControl>
              <FormLabel>Beneficiary's contribution</FormLabel>
              <Input
                type="number"
                name="beneficiaryContribution"
                onChange={handleChange}
                value={formData.beneficiaryContribution || ""}
                readOnly
              />
            </FormControl>

            {/* Total Scholarship + Contribution */}
            <FormControl>
              <FormLabel>Total scholarship + contribution</FormLabel>
              <Input
                type="number"
                name="totalScholarshipAndContribution"
                onChange={handleChange}
                value={formData.totalScholarshipAndContribution || ""}
                readOnly
              />
            </FormControl>

            {/* Balance Amount Requested */}
            <FormControl>
              <FormLabel>Balance amount requested</FormLabel>
              <Input
                type="number"
                name="balanceAmountRequested"
                onChange={handleChange}
                value={formData.balanceAmountRequested || ""}
                readOnly
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/* Documents Needed */}
            <Heading as="h1" size="xl" mb={6}>
              Documents Needed
            </Heading>

            {/* Aadhar Card (True Copy) */}
            <FormControl isRequired>
              <FormLabel>Aadhar Card (True Copy)</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.aadharCardUrl}
                alt="Dan Abramov"
              />
            </FormControl>

            {/* Fee Quotation from the Institution (Original) */}
            <FormControl isRequired>
              <FormLabel>
                Fee Quotation from the Institution (Original)
              </FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.feeQuotationUrl}
                alt="Dan Abramov"
              />
            </FormControl>

            {/* Proof of Scholarship Received from Government */}
            <FormControl isRequired>
              <FormLabel>
                Proof of Scholarship Received from Government
              </FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.scholarshipProofUrl}
                alt="Dan Abramov"
              />
            </FormControl>

            {/* Medical Confirmation (In Case of Ill Health of Parents) – Original */}
            <FormControl>
              <FormLabel>
                Medical Confirmation (In Case of Ill Health of Parents) –
                Original
              </FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.medicalConfirmationUrl}
                alt="Dan Abramov"
              />
            </FormControl>

            {/* Caste Certificate (True Copy) */}
            <FormControl isRequired>
              <FormLabel>Caste Certificate (True Copy)</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.casteCertificateUrl}
                alt="Dan Abramov"
              />
            </FormControl>

            {/* Affidavit Proof (In Case of Single Parent - Original) */}
            <FormControl>
              <FormLabel>
                Affidavit Proof (In Case of Single Parent - Original)
              </FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.affidavitProofUrl}
                alt="Dan Abramov"
              />
            </FormControl>

            {/* Request Letter (Original Copy) */}
            <FormControl isRequired>
              <FormLabel>Request Letter (Original Copy)</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.requestLetterUrl}
                alt="Dan Abramov"
              />
            </FormControl>

            {/* Death Certificate (In Case of Deceased Parents - True Copy) */}
            <FormControl>
              <FormLabel>
                Death Certificate (In Case of Deceased Parents - True Copy)
              </FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.deathCertificateUrl}
                alt="Dan Abramov"
              />
            </FormControl>

            {/* Mark List of Previous Year */}
            <FormControl isRequired>
              <FormLabel>Mark List of Previous Year</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.markListPreviousYearUrl}
                alt="Dan Abramov"
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
                value={formData.beneficiaryAgreementDate.substring(0, 10) || ""}
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
                isChecked={formData.projectInChargeAgreement}
                readOnly
              >
                The Project-In-Charge agree
              </Checkbox>
              <Input
                type="date"
                name="projectInChargeAgreementDate"
                onChange={handleChange}
                value={
                  formData.projectInChargeAgreementDate.substring(0, 10) || ""
                }
                readOnly
              />
            </FormControl>

            {/* Provincial Superior agreement */}
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
          {/* Submit Button */}
          <Button
            colorScheme="blue"
            mx="3"
            type="submit"
            onClick={() => {(formData.provincialSuperiorAgreement = true)}}
          >
            Accept
          </Button>
          <Button colorScheme="red" mx="3" type="submit" flex={1} onClick={() => {(formData.provincialSuperiorAgreement = false)}}>
            Revert
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};
export default ReviewEIO;
