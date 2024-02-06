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
  useToast,
  InputGroup,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  CircularProgress,
} from "@chakra-ui/react";
import cloudAxios from "../CloudAxios";
import authAxios from "../AuthAxios";

const EducationIndividualOngoing = () => {
  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileUpload = async (file) => {
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
        description: 'error',
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
      const photographUrl = await handleFileUpload(
        e.target.photographFile.files[0]
      );
      const aadharCardUrl = e.target.aadharCardFile.files[0]
        ? await handleFileUpload(e.target.aadharCardFile.files[0])
        : null;
      const feeQuotationUrl = e.target.feeQuotationFile.files[0]
        ? await handleFileUpload(e.target.feeQuotationFile.files[0])
        : null;
      const scholarshipProofUrl = e.target.scholarshipProofFile.files[0]
        ? await handleFileUpload(e.target.scholarshipProofFile.files[0])
        : null;
      const medicalConfirmationUrl = e.target.medicalConfirmationOriginalFile
        .files[0]
        ? await handleFileUpload(
            e.target.medicalConfirmationOriginalFile.files[0]
          )
        : null;
      const casteCertificateUrl = e.target.casteCertificateFile.files[0]
        ? await handleFileUpload(e.target.casteCertificateFile.files[0])
        : null;
      const affidavitProofUrl = e.target.affidavitProofOriginalFile.files[0]
        ? await handleFileUpload(e.target.affidavitProofOriginalFile.files[0])
        : null;
      const requestLetterUrl = e.target.requestLetterOriginalFile.files[0]
        ? await handleFileUpload(e.target.requestLetterOriginalFile.files[0])
        : null;
      const deathCertificateUrl = e.target.deathCertificateFile.files[0]
        ? await handleFileUpload(e.target.deathCertificateFile.files[0])
        : null;
      const markListPreviousYearUrl = e.target.markListPreviousYearFile.files[0]
        ? await handleFileUpload(e.target.markListPreviousYearFile.files[0])
        : null;

      const request = {
        photograph_benificary: photographUrl,
        name: e.target.beneficiaryName.value,
        mobile: e.target.beneficiaryContact.value,
        email: e.target.beneficiaryEmail.value,
        address: e.target.beneficiaryAddress.value,
        aadhar_no: e.target.aadharCardNo.value,
        gender: e.target.gender.value,
        DOB: e.target.dob.value,
        father: e.target.fatherName.value,
        mother: e.target.motherName.value,
        mother_tongue: e.target.motherTongue.value,
        religion: e.target.religion.value,
        caste: e.target.casteTribe.value,
        occupation_of_father: e.target.fatherOccupation.value,
        monthly_income_of_father: e.target.fatherMonthlyIncome.value,
        occupation_of_mother: e.target.motherOccupation.value,
        motherIs: e.target.motherStatus.value,
        fatherIs: e.target.fatherStatus.value,
        grandmother_support: e.target.grandmotherSupport.value,
        grandfather_support: e.target.grandfatherSupport.value,
        health_status_of_father: e.target.fatherHealthStatus.value,
        health_status_of_father_others:
          e.target.fatherHealthStatus.value === "Others" ?
          e.target.fatherHealthStatusOthers.value : " ",
        health_status_of_mother: e.target.motherHealthStatus.value,
        health_status_of_mother_others:
          e.target.motherHealthStatus.value === "Others" ?
          e.target.motherHealthStatusOthers.value : " ",
        residential_status: e.target.residentialStatus.value,
        residential_status_others:
          e.target.residentialStatus.value === "others" ?
          e.target.residentialStatusOthers.value : " ",
        family_situation_of_the_beneficiary:
          e.target.familySituationPresent.value,
        extra_curricular_activities_participated:
          e.target.extraCurricularActivities.value,
        nature_of_personality_growth_visible: e.target.personalityGrowth.value,
        Scholarship_received_from_government: e.target.scholarshipAmount.value,
        expenses_from_family_of_the_beneficiary:
          e.target.familyContribution.value,
        other_support_received_from_other_sources:
          e.target.otherSupportReceived.value,
        total_amount: e.target.totalAmount.value,
        amount_spent_from_project: e.target.amountSpentFromProject.value,
        total_amount_already_spent_on_the_studies:
          e.target.totalAmountSpentOnStudies.value,
        balance_amount_retained_in_the_projects:
          e.target.balanceAmountRetained.value,
        aadhar_img: aadharCardUrl,
        fee_quotation_from_the_institution_img: feeQuotationUrl,
        proof_of_scholarship_received_from_government_img: scholarshipProofUrl,
        medical_confirmation_img: medicalConfirmationUrl,
        affidavit_proof_img: affidavitProofUrl,
        request_letter_img: requestLetterUrl,
        death_certificate_img: deathCertificateUrl,
        mark_list_of_previous_year: markListPreviousYearUrl,
        caste_certificate_img: casteCertificateUrl,
        benificary_agree: { agree: e.target.beneficiaryAgreement.checked },
        project_in_charge_agree: {agree: e.target.projectInChargeAgreement.checked},
        present_study: e.target.presentStudy.value,
        details_of_budget:e.target.budgetDetails.value,
        total_cost_of_study:e.target.totalCostOfStudy.value,
        scholarship_expected:e.target.scholarshipExpected.value,
        beneficiaries_contribution:e.target.beneficiaryContribution.value,
        total_scholarship_contribution:e.target.totalScholarshipAndContribution.value,
        balance_amount_requested:e.target.balanceAmountRequested.value,
      };

      const response = await authAxios.post("/projects/createEOI", request);
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
          description: "Please login again session may have expired",
          duration: 5000,
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  };

  return (
    <ChakraProvider>
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

        <form onSubmit={handleSubmit}>
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

            {/* Name of Father */}
            <FormControl isRequired>
              <FormLabel>Father's Name</FormLabel>
              <Input
                type="text"
                name="fatherName"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/*Mother's Name */}
            <FormControl isRequired>
              <FormLabel>Mother's Name</FormLabel>
              <Input
                type="text"
                name="motherName"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Mother Tongue */}
            <FormControl isRequired>
              <FormLabel>Mother Tongue</FormLabel>
              <Input
                type="text"
                name="motherTongue"
                onChange={handleChange}
                required
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

          {/* Information about the Family */}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Information about the Family
            </Heading>

            {/* Occupation of Father */}
            <FormControl isRequired>
              <FormLabel>Occupation of Father</FormLabel>
              <Input
                type="text"
                name="fatherOccupation"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Monthly Income of Father */}
            <FormControl isRequired>
              <FormLabel>Monthly Income of Father</FormLabel>
              <Input
                type="number"
                name="fatherMonthlyIncome"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Occupation of Mother */}
            <FormControl isRequired>
              <FormLabel>Occupation of Mother</FormLabel>
              <Input
                type="text"
                name="motherOccupation"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Monthly Income of Mother */}
            <FormControl isRequired>
              <FormLabel>Monthly Income of Mother</FormLabel>
              <Input
                type="number"
                name="motherMonthlyIncome"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>
          <VStack align="start" spacing={4} mb={8}>
            {/* Details about Mother and Father */}
            <Heading as="h1" size="xl" mb={6}>
              Details about Mother and Father
            </Heading>

            {/* Mother's Status */}
            <FormControl isRequired>
              <FormLabel>Mother is</FormLabel>
              <Select name="motherStatus" onChange={handleChange} required>
                <option value="healthy">Healthy</option>
                <option value="sick">Sick</option>
                <option value="dead">Dead</option>
              </Select>
            </FormControl>

            {/* Father's Status */}
            <FormControl isRequired>
              <FormLabel>Father is</FormLabel>
              <Select name="fatherStatus" onChange={handleChange} required>
                <option value="healthy">Healthy</option>
                <option value="sick">Sick</option>
                <option value="dead">Dead</option>
                <option value="deserted">Deserted the family</option>
              </Select>
            </FormControl>

            {/* Grandmother's Support */}
            <FormControl isRequired>
              <FormLabel>Grandmother gets family support</FormLabel>
              <Select
                name="grandmotherSupport"
                onChange={handleChange}
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Died">Died</option>
              </Select>
            </FormControl>

            {/* Grandfather's Support */}
            <FormControl isRequired>
              <FormLabel>Grandfather gets family support</FormLabel>
              <Select
                name="grandfatherSupport"
                onChange={handleChange}
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                <option value="Died">Died</option>
              </Select>
            </FormControl>

            {/* Health Status of Father */}
            <FormControl isRequired>
              <FormLabel>Health status of Father</FormLabel>
              <Select
                name="fatherHealthStatus"
                onChange={handleChange}
                required
              >
                <option value="Chronically Sick">Chronically Sick</option>
                <option value="HIV/AIDS positive">HIV/AIDS positive</option>
                <option value="Disabled">Disabled</option>
                <option value="Alcoholic">Alcoholic</option>
                <option value="Others">Others</option>
              </Select>
              {/* Conditional input for 'Others' */}
              {formData.fatherHealthStatus === "Others" && (
                <Input
                  type="text"
                  name="fatherHealthStatusOthers"
                  onChange={handleChange}
                  placeholder="Specify other health status"
                  required
                />
              )}
            </FormControl>

            {/* Health Status of Mother */}
            <FormControl isRequired>
              <FormLabel>Health status of Mother</FormLabel>
              <Select
                name="motherHealthStatus"
                onChange={handleChange}
                required
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
                  required
                />
              )}
            </FormControl>

            {/* Residential Status */}
            <FormControl isRequired>
              <FormLabel>Residential Status</FormLabel>
              <Select name="residentialStatus" onChange={handleChange} required>
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
                  required
                />
              )}
            </FormControl>

            <FormControl isRequired>
              <FormLabel>
                Family situation of the beneficiary (present)
              </FormLabel>
              <Textarea
                name="familySituationPresent"
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>
                Percentage of marks / grade received in the previous year of
                study
              </FormLabel>
              <Input
                type="text"
                name="previousYearMarks"
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Extra-curricular activities participated</FormLabel>
              <Textarea
                name="extraCurricularActivities"
                onChange={handleChange}
                required
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Nature of personality growth visible</FormLabel>
              <Textarea
                name="personalityGrowth"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>

          {/* Finance Contribution / Receipts (Previous Year of Study) */}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Finance Contribution / Receipts (Previous Year of Study)
            </Heading>

            {/* Scholarship Amount Received from Government (State/Central) */}
            <FormControl isRequired>
              <FormLabel>
                Scholarship amount received from government (State/Central) -
                Attach proof
              </FormLabel>
              <Input
                type="number"
                name="scholarshipAmount"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Contribution of Fees / Expenses from Family of the Beneficiary */}
            <FormControl isRequired>
              <FormLabel>
                Contribution of fees / expenses from family of the beneficiary
              </FormLabel>
              <Input
                type="number"
                name="familyContribution"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Any Other Support Received from Other Sources */}
            <FormControl isRequired>
              <FormLabel>
                Any other support received from other sources? (Yes/No)
              </FormLabel>
              <Select
                name="otherSupportReceived"
                onChange={handleChange}
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </FormControl>

            {/* Total Amount */}
            <FormControl isRequired>
              <FormLabel>Total Amount</FormLabel>
              <Input
                type="number"
                name="totalAmount"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Amount Spent from Project */}
            <FormControl isRequired>
              <FormLabel>Amount spent from the project</FormLabel>
              <Input
                type="number"
                name="amountSpentFromProject"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Total Amount Already Spent on the Studies */}
            <FormControl isRequired>
              <FormLabel>Total amount already spent on the studies</FormLabel>
              <Input
                type="number"
                name="totalAmountSpentOnStudies"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Balance Amount Retained in the Project */}
            <FormControl isRequired>
              <FormLabel>Balance amount retained in the project</FormLabel>
              <Input
                type="number"
                name="balanceAmountRetained"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>

          {/* Present Education/Training */}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Present Education/Training
            </Heading>

            {/* Present Study */}
            <FormControl isRequired>
              <FormLabel>Present study</FormLabel>
              <Textarea name="presentStudy" onChange={handleChange} required />
            </FormControl>

            {/* Details of Budget */}
            <FormControl isRequired>
              <FormLabel>Details of budget</FormLabel>
              <Textarea name="budgetDetails" onChange={handleChange} required />
            </FormControl>

            {/* Total Cost of the Study */}
            <FormControl isRequired>
              <FormLabel>Total cost of the study</FormLabel>
              <Input
                type="number"
                name="totalCostOfStudy"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Scholarship Expected from Government/Other Sources */}
            <FormControl isRequired>
              <FormLabel>
                Scholarship expected from government/other sources
              </FormLabel>
              <Input
                type="number"
                name="scholarshipExpected"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Beneficiary's Contribution */}
            <FormControl isRequired>
              <FormLabel>Beneficiary's contribution</FormLabel>
              <Input
                type="number"
                name="beneficiaryContribution"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Total Scholarship + Contribution */}
            <FormControl isRequired>
              <FormLabel>Total scholarship + contribution</FormLabel>
              <Input
                type="number"
                name="totalScholarshipAndContribution"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Balance Amount Requested */}
            <FormControl isRequired>
              <FormLabel>Balance amount requested</FormLabel>
              <Input
                type="number"
                name="balanceAmountRequested"
                onChange={handleChange}
                required
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
              <Input
                type="file"
                name="aadharCardFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                required
              />
            </FormControl>

            {/* Fee Quotation from the Institution (Original) */}
            <FormControl isRequired>
              <FormLabel>
                Fee Quotation from the Institution (Original)
              </FormLabel>
              <Input
                type="file"
                name="feeQuotationFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                required
              />
            </FormControl>

            {/* Proof of Scholarship Received from Government */}
            <FormControl isRequired>
              <FormLabel>
                Proof of Scholarship Received from Government
              </FormLabel>
              <Input
                type="file"
                name="scholarshipProofFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                required
              />
            </FormControl>

            {/* Medical Confirmation (In Case of Ill Health of Parents) – Original */}
            <FormControl>
              <FormLabel>
                Medical Confirmation (In Case of Ill Health of Parents) –
                Original
              </FormLabel>
              <Input
                type="file"
                name="medicalConfirmationOriginalFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
              />
            </FormControl>

            {/* Caste Certificate (True Copy) */}
            <FormControl isRequired>
              <FormLabel>Caste Certificate (True Copy)</FormLabel>
              <Input
                type="file"
                name="casteCertificateFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                required
              />
            </FormControl>

            {/* Affidavit Proof (In Case of Single Parent - Original) */}
            <FormControl>
              <FormLabel>
                Affidavit Proof (In Case of Single Parent - Original)
              </FormLabel>
              <Input
                type="file"
                name="affidavitProofOriginalFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
              />
            </FormControl>

            {/* Request Letter (Original Copy) */}
            <FormControl isRequired>
              <FormLabel>Request Letter (Original Copy)</FormLabel>
              <Input
                type="file"
                name="requestLetterOriginalFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                required
              />
            </FormControl>

            {/* Death Certificate (In Case of Deceased Parents - True Copy) */}
            <FormControl>
              <FormLabel>
                Death Certificate (In Case of Deceased Parents - True Copy)
              </FormLabel>
              <Input
                type="file"
                name="deathCertificateFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
              />
            </FormControl>

            {/* Mark List of Previous Year */}
            <FormControl isRequired>
              <FormLabel>Mark List of Previous Year</FormLabel>
              <Input
                type="file"
                name="markListPreviousYearFile"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                required
              />
            </FormControl>
          </VStack>

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
export default EducationIndividualOngoing;
