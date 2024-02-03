import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Image,
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
} from "@chakra-ui/react";

const ApproveEI = () => {
  const [formData, setFormData] = useState({
    provincialSuperiorName: "Ananya",
    provincialSuperiorContact: "",
    projectInchargeName: "",
    projectInchargeContact: "",
    projectInchargeEmail: "",
    beneficiaryName: "",
    beneficiaryContact: "",
    beneficiaryEmail: "",
    beneficiaryAddress: "",
    aadharCardNo: "",
    gender: "male", // Assuming 'male' is the default value
    dob: "",
    fatherName: "",
    motherName: "",
    motherTongue: "",
    religion: "",
    casteTribe: "",
    // Family Information
    fatherOccupation: "",
    fatherMonthlyIncome: 0, // Assuming 0 as the default value
    motherOccupation: "",
    motherMonthlyIncome: 0, // Assuming 0 as the default value

    // Details about Mother and Father
    motherStatus: "healthy", // Assuming 'healthy' as the default value
    fatherStatus: "healthy", // Assuming 'healthy' as the default value
    grandmotherSupport: "yes", // Assuming 'yes' as the default value
    grandfatherSupport: "yes", // Assuming 'yes' as the default value
    fatherHealthStatus: "chronicallySick", // Assuming 'chronicallySick' as the default value
    fatherHealthStatusOthers: "", // Initialize to an empty string
    motherHealthStatus: "chronicallySick", // Assuming 'chronicallySick' as the default value
    motherHealthStatusOthers: "", // Initialize to an empty string
    residentialStatus: "houseOwner", // Assuming 'houseOwner' as the default value
    residentialStatusOthers: "", // Initialize to an empty string

    // Family Situation and Employment
    familySituationDetails: "",
    financialSupportDetails: "",
    familyEmploymentDetails: "",
    // Educational Background / Present Education
    previousEducationDetails: "",
    previousInstitutionDetails: "",
    previousMarksPercentage: 0, // Assuming 0 as the default value
    presentEducationDetails: "",
    presentInstitutionDetails: "",
    educationalAspiration: "",
    sustainabilityDetails: "",

    // Information on Financial Support
    eligibleForScholarship: "yes", // Assuming 'yes' as the default value
    expectedScholarshipAmount: 0, // Assuming 0 as the default value
    familyFinancialContribution: 0, // Assuming 0 as the default value
    noFamilySupportReasons: "", // Initialize to an empty string

    // Present Education/Training
    presentStudy: "",
    budgetDetails: "",
    totalCostOfStudy: 0, // Assuming 0 as the default value
    scholarshipExpected: 0, // Assuming 0 as the default value
    beneficiaryContribution: 0, // Assuming 0 as the default value
    totalScholarshipAndContribution: 0, // Assuming 0 as the default value
    balanceAmountRequested: 0, // Assuming 0 as the default value

    // Documents Needed
    aadharCardCopyUrl: null, // Initialize to null or an empty string
    feeQuotationOriginalUrl: null, // Initialize to null or an empty string
    scholarshipProofUrl: null, // Initialize to null or an empty string
    medicalConfirmationOriginalUrl: null, // Initialize to null or an empty string
    casteCertificateCopyUrl: null, // Initialize to null or an empty string
    affidavitProofOriginalUrl: null, // Initialize to null or an empty string
    requestLetterOriginalUrl: null, // Initialize to null or an empty string
    deathCertificateCopyUrl: null, // Initialize to null or an empty string
    markListPreviousYearUrl: null, // Initialize to null or an empty string

    // Signatures
    beneficiaryAgreement: false,
    beneficiaryAgreementDate: "",
    projectInChargeAgreement: false,
    projectInChargeAgreementDate: "",
    provincialSuperiorAgreement: false,
    provincialSuperiorAgreementDate: "",
    projectCoordinatorAgreement:false,
    projectCoordinatorAgreementDate:"",

    // Additional Fields
    commentReviewer: "",
    commentApprover:"",
    amountApprovedByProjectCoordinator:"",
  });
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
          Education individual Project Application Form
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
            <FormControl>
              <FormLabel>Name of Provincial Superior</FormLabel>
              <Input
                type="text"
                name="provincialSuperiorName"
                onChange={handleChange}
                value={formData.provincialSuperiorName}
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
                value={formData.provincialSuperiorContact}
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
                value={formData.projectInchargeName}
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
                value={formData.projectInchargeContact}
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
                value={formData.projectInchargeEmail}
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
                value={formData.beneficiaryName}
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
                value={formData.beneficiaryContact}
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
                value={formData.beneficiaryEmail}
                readOnly
              />
            </FormControl>

            {/* Address */}
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="beneficiaryAddress"
                onChange={handleChange}
                value={formData.beneficiaryAddress}
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
                value={formData.aadharCardNo}
                readOnly
              />
            </FormControl>

            {/* Gender */}
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                onChange={handleChange}
                value={formData.gender}
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
                value={formData.dob}
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
                value={formData.fatherName}
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
                value={formData.motherName}
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
                value={formData.motherTongue}
                readOnly
              />
            </FormControl>

            {/* Religion */}
            <FormControl isRequired>
              <FormLabel>Religion</FormLabel>
              <Input
                type="text"
                name="religion"
                onChange={handleChange}
                value={formData.religion}
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
                value={formData.casteTribe}
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
                value={formData.fatherOccupation}
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
                value={formData.fatherMonthlyIncome}
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
                value={formData.motherOccupation}
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
                value={formData.motherMonthlyIncome}
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
                value={formData.motherStatus}
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
                value={formData.fatherStatus}
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
                value={formData.grandmotherSupport}
                readOnly
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="died">Died</option>
              </Select>
            </FormControl>

            {/* Grandfather's Support */}
            <FormControl>
              <FormLabel>Grandfather gets family support</FormLabel>
              <Select
                name="grandfatherSupport"
                onChange={handleChange}
                value={formData.grandfatherSupport}
                readOnly
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
                <option value="died">Died</option>
              </Select>
            </FormControl>

            {/* Health Status of Father */}
            <FormControl>
              <FormLabel>Health status of Father</FormLabel>
              <Select
                name="fatherHealthStatus"
                onChange={handleChange}
                value={formData.fatherHealthStatus}
                readOnly
              >
                <option value="chronicallySick">Chronically Sick</option>
                <option value="hivPositive">HIV/AIDS positive</option>
                <option value="disabled">Disabled</option>
                <option value="alcoholic">Alcoholic</option>
                <option value="others">Others</option>
              </Select>
              {/* Conditional input for 'Others' */}
              {formData.fatherHealthStatus === "others" && (
                <Input
                  type="text"
                  name="fatherHealthStatusOthers"
                  onChange={handleChange}
                  placeholder="Specify other health status"
                  value={formData.fatherHealthStatusOthers}
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
                value={formData.motherHealthStatus}
                readOnly
              >
                <option value="chronicallySick">Chronically Sick</option>
                <option value="hivPositive">HIV/AIDS positive</option>
                <option value="disabled">Disabled</option>
                <option value="alcoholic">Alcoholic</option>
                <option value="others">Others</option>
              </Select>
              {/* Conditional input for 'Others' */}
              {formData.motherHealthStatus === "others" && (
                <Input
                  type="text"
                  name="motherHealthStatusOthers"
                  onChange={handleChange}
                  placeholder="Specify other health status"
                  value={formData.motherHealthStatusOthers}
                  readOnly
                />
              )}
            </FormControl>

            {/* Residential Status */}
            <FormControl >
              <FormLabel>Residential Status</FormLabel>
              <Select name="residentialStatus" onChange={handleChange}
               value={formData.residentialStatus}
                  readOnly>
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
                  value={formData.residentialStatusOthers}
                  readOnly
                />
              )}
            </FormControl>
          </VStack>
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Family Situation and Employment
            </Heading>

            {/* Family situation of the beneficiary - Need of the present project assistance? */}
            <FormControl >
              <FormLabel>
                Family situation of the beneficiary - Need of the present
                project assistance?
              </FormLabel>
              <Textarea
                name="familySituationDetails"
                onChange={handleChange}
                value={formData.familySituationDetails}
                  readOnly
              />
            </FormControl>

            {/* Has the family of the beneficiary received financial support previously through St. Ann’s projects? Give the details. */}
            <FormControl >
              <FormLabel>
                Has the family of the beneficiary received financial support
                previously through St. Ann’s projects? Give the details.
              </FormLabel>
              <Textarea
                name="financialSupportDetails"
                onChange={handleChange}
                value={formData.financialSupportDetails}
                  readOnly
              />
            </FormControl>

            {/* Are the family members of the beneficiary employed with St.Ann’s. Give full details. */}
            <FormControl >
              <FormLabel>
                Are the family members of the beneficiary employed with
                St.Ann’s. Give full details.
              </FormLabel>
              <Textarea
                name="familyEmploymentDetails"
                onChange={handleChange}
                value={formData.familyEmploymentDetails}
                readOnly
              />
            </FormControl>
          </VStack>
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Educational Background / Present Education
            </Heading>

            {/* Mention the previous academic education? */}
            <FormControl >
              <FormLabel>Mention the previous academic education?</FormLabel>
              <Textarea
                name="previousEducationDetails"
                onChange={handleChange}
                value={formData.previousEducationDetails}
                  readOnly
              />
            </FormControl>

            {/* Name and Address of the previous institution */}
            <FormControl >
              <FormLabel>
                Name and Address of the previous institution:
              </FormLabel>
              <Textarea
                name="previousInstitutionDetails"
                onChange={handleChange}
                value={formData.previousInstitutionDetails}
                  readOnly
              />
            </FormControl>

            {/* Percentage of marks received previously */}
            <FormControl >
              <FormLabel>Percentage of marks received previously:</FormLabel>
              <Input
                type="number"
                name="previousMarksPercentage"
                onChange={handleChange}
                value={formData.previousMarksPercentage}
                readOnly
              />
            </FormControl>

            {/* Mention the present Education/Training */}
            <FormControl >
              <FormLabel>Mention the present Education/Training</FormLabel>
              <Textarea
                name="presentEducationDetails"
                onChange={handleChange}
                value={formData.presentEducationDetails}
                  readOnly
              />
            </FormControl>

            {/* Name and address of the Present Institution of study */}
            <FormControl >
              <FormLabel>
                Name and address of the Present Institution of study:
              </FormLabel>
              <Textarea
                name="presentInstitutionDetails"
                onChange={handleChange}
                value={formData.presentInstitutionDetails}
                  readOnly
              />
            </FormControl>

            {/* What is the educational aspiration and area of interest of the beneficiary? */}
            <FormControl >
              <FormLabel>
                What is the educational aspiration and area of interest of the
                beneficiary?
              </FormLabel>
              <Textarea
                name="educationalAspiration"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Sustainability of the support */}
            <FormControl >
              <FormLabel>
                Sustainability of the support (Please write down how the support
                will affect the beneficiary's life in the long run):
              </FormLabel>
              <Textarea
                name="sustainabilityDetails"
                onChange={handleChange}
                value={formData.motherHealthStatusOthers}
                readOnly
              />
            </FormControl>
          </VStack>
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Information on Financial Support
            </Heading>

            {/* Is the beneficiary eligible for Scholarship? (government or any other) */}
            <FormControl >
              <FormLabel>
                Is the beneficiary eligible for Scholarship? (government or any
                other)
              </FormLabel>
              <Select
                name="eligibleForScholarship"
                onChange={handleChange}
                value={formData.eligibleForScholarship}
                  readOnly
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FormControl>

            {/* Expected amount of Scholarship */}
            <FormControl >
              <FormLabel>Expected amount of Scholarship</FormLabel>
              <Input
                type="number"
                name="expectedScholarshipAmount"
                onChange={handleChange}
                value={formData.expectedScholarshipAmount}
                  readOnly
                // required={formData.eligibleForScholarship === "yes"}
                // disabled={formData.eligibleForScholarship === "no"}
              />
            </FormControl>

            {/* Financial contribution from the family? */}
            <FormControl >
              <FormLabel>Financial contribution from the family?</FormLabel>
              <Input
                type="number"
                name="familyFinancialContribution"
                onChange={handleChange}
                value={formData.familyFinancialContribution}
                  readOnly
              />
            </FormControl>

            {/* If no support from family, mention the reasons? */}
            <FormControl >
              <FormLabel>
                If no support from the family, mention the reasons?
              </FormLabel>
              <Textarea
                name="noFamilySupportReasons"
                onChange={handleChange}
                value={formData.noFamilySupportReasons}
                readOnly
                // required={formData.familyFinancialContribution === 0}
                // disabled={formData.familyFinancialContribution > 0}
              />
            </FormControl>
          </VStack>
          {/* Present Education/Training */}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Present Education/Training
            </Heading>

            {/* Present Study */}
            <FormControl >
              <FormLabel>Present study</FormLabel>
              <Textarea name="presentStudy" 
              onChange={handleChange} 
              value={formData.presentStudy}
            readOnly />
            </FormControl>

            {/* Details of Budget */}
            <FormControl >
              <FormLabel>Details of budget</FormLabel>
              <Textarea name="budgetDetails" 
              onChange={handleChange} 
              value={formData.budgetDetails}
                  readOnly />
            </FormControl>

            {/* Total Cost of the Study */}
            <FormControl >
              <FormLabel>Total cost of the study</FormLabel>
              <Input
                type="number"
                name="totalCostOfStudy"
                onChange={handleChange}
                value={formData.totalCostOfStudy}
                  readOnly
              />
            </FormControl>

            {/* Scholarship Expected from Government/Other Sources */}
            <FormControl >
              <FormLabel>
                Scholarship expected from government/other sources
              </FormLabel>
              <Input
                type="number"
                name="scholarshipExpected"
                onChange={handleChange}
                value={formData.scholarshipExpected}
                  readOnly
              />
            </FormControl>

            {/* Beneficiary's Contribution */}
            <FormControl >
              <FormLabel>Beneficiary's contribution</FormLabel>
              <Input
                type="number"
                name="beneficiaryContribution"
                onChange={handleChange}
                value={formData.beneficiaryContribution}
                  readOnly
              />
            </FormControl>

            {/* Total Scholarship + Contribution */}
            <FormControl >
              <FormLabel>Total scholarship + contribution</FormLabel>
              <Input
                type="number"
                name="totalScholarshipAndContribution"
                onChange={handleChange}
                value={formData.totalScholarshipAndContribution}
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
                value={formData.balanceAmountRequested}
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

            {/* Project-In-Charge agreement */}
            <FormControl>
              <Checkbox
                name="projectInChargeAgreement"
                onChange={handleChange}
                size="lg"
                value={formData.projectInChargeAgreement || ""}
                readOnly
              >
                The Project-In-Charge agree
              </Checkbox>
            </FormControl>

            {/* Provincial Superior agreement */}
            <FormControl>
              <Checkbox
                name="projectInChargeAgreement"
                onChange={handleChange}
                size="lg"
                isChecked={formData.projectInChargeAgreement}
                readOnly
              >
                The Project Incharge agree
              </Checkbox>
              <Input
                type="date"
                name="projectInChargeAgreementDate"
                onChange={handleChange}
                value={formData.projectInChargeAgreementDate.substring(0, 10)}
                readOnly
              />
            </FormControl>
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
                value={formData.provincialSuperiorAgreementDate.substring(
                  0,
                  10
                )}
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
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};
export default ApproveEI;
