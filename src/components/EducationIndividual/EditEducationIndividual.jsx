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
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import authAxios from "../../AuthAxios";
import cloudAxios from "../../CloudAxios";

const ReviewEI = () => {
  const showToast = useToast();
  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  console.log(projectData);
  const imageMappings = {
    photographUrl: projectData.photograph_benificary,
    aadharCardCopy: projectData.aadhar_img,
    feeQuotationOriginal: projectData.fee_quotation_from_the_institution_img,
    scholarshipProof:
      projectData.proof_of_scholarship_received_from_government_img,
    medicalConfirmationOriginal: projectData.medical_confirmation_img,
    casteCertificateCopy: projectData.caste_certificate_img,
    affidavitProofOriginal: projectData.affidavit_proof_img,
    requestLetterOriginal: projectData.request_letter_img,
    deathCertificateCopy: projectData.death_certificate_img,
    markListPreviousYear: projectData.mark_list_of_previous_year,
  };

  const [formData, setFormData] = useState({
    ...imageMappings,
    provincialSuperiorName: "", // Assuming not present in req
    provincialSuperiorContact: "", // Assuming not present in req
    projectInchargeName: projectData.applicant.name,
    projectInchargeContact: projectData.applicant.mobile, // Assuming not present in req
    projectInchargeEmail: projectData.applicant.email, // Assuming not present in req
    beneficiaryName: projectData.name || "",
    beneficiaryContact: projectData.mobile || "",
    beneficiaryEmail: projectData.email || "",
    beneficiaryAddress: projectData.address || "",
    aadharCardNo: projectData.aadhar_no || "",
    gender: projectData.gender || "male", // Assuming 'male' is the default value
    dob: projectData.DOB || "",
    fatherName: projectData.father || "",
    motherName: projectData.mother || "",
    motherTongue: projectData.mother_tongue || "",
    religion: projectData.religion || "",
    casteTribe: projectData.caste || "",
    fatherOccupation: projectData.occupation_of_father || "",
    fatherMonthlyIncome: projectData.monthly_income_of_father || 0, // Assuming 0 as the default value
    motherOccupation: projectData.occupation_of_mother || "",
    motherMonthlyIncome: projectData.monthly_income_of_mother || 0, // Assuming 0 as the default value
    motherIs: projectData.motherIs || "",
    fatherIs: projectData.fatherIs || "",
    grandmotherSupport: projectData.grandmother_support || "",
    grandfatherSupport: projectData.grandfather_support || "",
    fatherHealthStatus: projectData.health_status_of_father || "",
    fatherHealthStatusOthers: projectData.health_status_of_father_others || "",
    motherHealthStatus: projectData.health_status_of_mother || "",
    motherHealthStatusOthers: projectData.health_status_of_mother_others || "",
    residentialStatus: projectData.residential_status || "",
    residentialStatusOthers: projectData.residential_status_others || "",
    familySituationDetails:
      projectData.family_situation_of_the_beneficiary || "",
    financialSupportDetails: projectData.financialSupportDetails || "",
    familyEmploymentDetails: projectData.familyEmploymentDetails || "",
    previousEducationDetails: projectData.previousEducationDetails || "",
    previousInstitutionDetails: projectData.previousInstitutionDetails || "",
    previousMarksPercentage: projectData.previousMarksPercentage || 0, // Assuming 0 as the default value
    presentEducationDetails: projectData.presentEducationDetails || "",
    presentInstitutionDetails: projectData.presentInstitutionDetails || "",
    educationalAspiration: projectData.educationalAspiration || "", // not present
    sustainabilityDetails: projectData.sustainabilityDetails || "", // sustainability
    eligibleForScholarship: projectData.eligibleForScholarship || "",
    expectedScholarshipAmount: projectData.expectedScholarshipAmount || 0, // Assuming 0 as the default value
    familyFinancialContribution: projectData.familyFinancialContribution || 0, // Assuming 0 as the default value
    noFamilySupportReasons: projectData.noFamilySupportReasons || "",
    presentStudy: projectData.presentStudy || "",
    budgetDetails: projectData.budgetDetails || "",
    totalCostOfStudy: projectData.totalCostOfStudy || 0, // Assuming 0 as the default value
    scholarshipExpected: projectData.scholarshipExpected || 0, // Assuming 0 as the default value
    beneficiaryContribution: projectData.beneficiaryContribution || 0, // Assuming 0 as the default value
    totalScholarshipAndContribution:
      projectData.totalScholarshipAndContribution || 0, // Assuming 0 as the default value
    balanceAmountRequested: projectData.balanceAmountRequested || 0, // Assuming 0 as the default value
    beneficiaryAgreement: projectData.benificary_agree.agree || false,
    beneficiaryAgreementDate: projectData.benificary_agree.date || "",
    projectInChargeAgreement:
      projectData.project_in_charge_agree.agree || false,
    projectInChargeAgreementDate:
      projectData.project_in_charge_agree.date || "",
    provincialSuperiorAgreement: "", // Assuming not present in req
    provincialSuperiorAgreementDate: "", // Assuming not present in req
    comment: "", // Assuming not present in req
  });
  console.log(formData);
  // Populate formData from req

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [isLoading, setIsLoading] = useState(true);

  const handleSubmit = async (e) => {
    const handleImageUpload = async (file) => {
      try {
        console.log("try");
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

    const convertImagesToUrls = async (e) => {
      const image = {};

      try {
        image.photograph_benificary =
          (await handleImageUpload(e.target.photographUrl.files[0])) ??
          imageMappings.photographUrl;

        image.aadhar_img =
          (await handleImageUpload(e.target.aadharCardCopy.files[0])) ??
          imageMappings.aadharCardCopy;
        console.log("image1");
        image.fee_quotation_from_the_institution_img =
          (await handleImageUpload(e.target.feeQuotationOriginal.files[0])) ??
          imageMappings.feeQuotationOriginal;
        console.log("image2");
        image.proof_of_scholarship_received_from_government_img = e.target
          .proof_of_scholarship_recieved_from_government_img
          ? await handleImageUpload(e.target.scholarshipProof.files[0])
          : imageMappings.scholarshipProof;
        image.medical_confirmation_img = e.target.medicalConfirmationOriginal
          .files[0]
          ? await handleImageUpload(
              e.target.medicalConfirmationOriginal.files[0]
            )
          : imageMappings.medicalConfirmationOriginal;
        console.log("image4");
        image.caste_certificate_img = await handleImageUpload(
          e.target.casteCertificateCopy.files[0]
        );
        console.log("image5");
        image.affidavit_proof_img = e.target.affidavitProofOriginal.files[0]
          ? await handleImageUpload(e.target.affidavitProofOriginal.files[0])
          : "";
        image.request_letter_img = await handleImageUpload(
          e.target.requestLetterOriginal.files[0]
        );
        console.log("image6");
        image.death_certificate_img = e.target.deathCertificateCopy.files[0]
          ? await handleImageUpload(e.target.deathCertificateCopy.files[0])
          : "";
        console.log("image7");
        image.mark_list_of_previous_year = await handleImageUpload(
          e.target.markListPreviousYear.files[0]
        );
        console.log("image8");

        // At this point, the image object contains URLs for all the images
        return image;
      } catch (error) {
        console.log(error);
        showToast({
          title: "Error uploading image to cloudinary",
          description: "error",
          duration: 5000,
        });
        return {}; // Or handle the error as needed in your application
      }
    };
    e.preventDefault();

    setIsLoading(true);

    try {
      const image = await convertImagesToUrls(e);
      console.log(image);

      const req = {
        name: e.target.beneficiaryName.value,
        mobile: e.target.beneficiaryContact.value,
        email: e.target.beneficiaryEmail.value,
        address: e.target.beneficiaryAddress.value,
        aadhar_no: parseInt(e.target.aadharCardNo.value),
        gender: e.target.gender.value,
        DOB: e.target.dob.value,
        father: e.target.fatherName.value,
        mother: e.target.motherName.value,
        mother_tongue: e.target.motherTongue.value,
        religion: e.target.religion.value,
        caste: e.target.casteTribe.value,
        occupation_of_father: e.target.fatherOccupation.value,
        monthly_income_of_father: parseInt(e.target.fatherMonthlyIncome.value),
        monthly_income_of_mother: parseInt(e.target.motherMonthlyIncome.value),
        occupation_of_mother: e.target.motherOccupation.value,
        motherIs: e.target.motherStatus.value,
        fatherIs: e.target.fatherStatus.value,
        grandmother_support: e.target.grandmotherSupport.value,
        grandfather_support: e.target.grandfatherSupport.value,
        health_status_of_father: e.target.fatherHealthStatus.value,
        health_status_of_father_others: e.target.fatherHealthStatusOthers
          ? e.target.fatherHealthStatusOthers.value
          : "",
        health_status_of_mother: e.target.motherHealthStatus.value,
        health_status_of_mother_others: e.target.motherHealthStatusOthers
          ? e.target.motherHealthStatusOthers.value
          : "",
        residential_status: e.target.residentialStatus?.value ?? "",
        residential_status_others: e.target.residentialStatusOthers
          ? e.target.residentialStatusOthers.value
          : "",
        family_situation_of_the_beneficiary:
          e.target.familySituationDetails.value,
        financialSupportDetails: e.target.financialSupportDetails.value,
        familyEmploymentDetails: e.target.familyEmploymentDetails.value,
        previousEducationDetails: e.target.previousEducationDetails.value,
        previousInstitutionDetails: e.target.previousInstitutionDetails.value,
        previousMarksPercentage: parseInt(
          e.target.previousMarksPercentage.value
        ),
        presentEducationDetails: e.target.presentEducationDetails.value,
        presentInstitutionDetails: e.target.presentInstitutionDetails.value,
        educationalAspiration: e.target.educationalAspiration.value,
        sustainabilityDetails: e.target.sustainabilityDetails.value,
        eligibleForScholarship: e.target.eligibleForScholarship.value,
        expectedScholarshipAmount: parseInt(
          e.target.expectedScholarshipAmount.value
        ),
        familyFinancialContribution: parseInt(
          e.target.familyFinancialContribution.value
        ),
        noFamilySupportReasons: e.target.noFamilySupportReasons.value,
        presentStudy: e.target.presentStudy.value,
        budgetDetails: e.target.budgetDetails.value,
        totalCostOfStudy: parseInt(e.target.totalCostOfStudy.value),
        scholarshipExpected: parseInt(e.target.scholarshipExpected.value),
        beneficiaryContribution: parseInt(
          e.target.beneficiaryContribution.value
        ),
        totalScholarshipAndContribution: parseInt(
          e.target.totalScholarshipAndContribution.value
        ),
        balanceAmountRequested: parseInt(e.target.balanceAmountRequested.value),
        benificary_agree: {
          agree: true,
        },
        project_in_charge_agree: {
          agree: true,
        },
        ...image,
      };

      console.log(req);

      const res = await authAxios.post("projects/createEI", req);
      console.log(res.data);
      setIsLoading(false);
      if (res.data.success) {
        showToast({
          title: "Successfull form submission",
          duration: 5000,
          status: "success",
        });
      } else {
        showToast({
          title: "Unsuccessful form submission",
          duration: 5000,
          status: "error",
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      showToast({
        title: "Unsuccessful form submission",
        duration: 5000,
        status: "error",
      });
    }
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
            {/* Name of Project Incharge */}
            <FormControl>
              <FormLabel>Name of Project Incharge</FormLabel>
              <Input
                type="text"
                name="projectInchargeName"
                onChange={handleChange}
                value={formData.projectInchargeName}
                required
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
                required
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
                required
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
                required
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
                required
              />
            </FormControl>

            {/* Address */}
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="beneficiaryAddress"
                onChange={handleChange}
                value={formData.beneficiaryAddress}
                required
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
                required
              />
            </FormControl>

            {/* Gender */}
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                onChange={handleChange}
                value={formData.gender}
                required
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
                required
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
                required
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
                required
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
                value={formData.religion}
                required
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
            <FormControl>
              <FormLabel>Occupation of Father</FormLabel>
              <Input
                type="text"
                name="fatherOccupation"
                onChange={handleChange}
                value={formData.fatherOccupation}
                required
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
                required
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
                required
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
            <FormControl>
              <FormLabel>Mother is</FormLabel>
              <Select
                name="motherStatus"
                onChange={handleChange}
                value={formData.motherStatus}
                required
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
                required
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
                required
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
                required
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
                required
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
                  required
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
                required
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
                  required
                />
              )}
            </FormControl>

            {/* Residential Status */}
            <FormControl>
              <FormLabel>Residential Status</FormLabel>
              <Select
                name="residentialStatus"
                onChange={handleChange}
                value={formData.residentialStatus}
                required
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
                  value={formData.residentialStatusOthers}
                  required
                />
              )}
            </FormControl>
          </VStack>
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Family Situation and Employment
            </Heading>

            {/* Family situation of the beneficiary - Need of the present project assistance? */}
            <FormControl>
              <FormLabel>
                Family situation of the beneficiary - Need of the present
                project assistance?
              </FormLabel>
              <Textarea
                name="familySituationDetails"
                onChange={handleChange}
                value={formData.familySituationDetails}
                required
              />
            </FormControl>

            {/* Has the family of the beneficiary received financial support previously through St. Ann’s projects? Give the details. */}
            <FormControl>
              <FormLabel>
                Has the family of the beneficiary received financial support
                previously through St. Ann’s projects? Give the details.
              </FormLabel>
              <Textarea
                name="financialSupportDetails"
                onChange={handleChange}
                value={formData.financialSupportDetails}
                required
              />
            </FormControl>

            {/* Are the family members of the beneficiary employed with St.Ann’s. Give full details. */}
            <FormControl>
              <FormLabel>
                Are the family members of the beneficiary employed with
                St.Ann’s. Give full details.
              </FormLabel>
              <Textarea
                name="familyEmploymentDetails"
                onChange={handleChange}
                value={formData.familyEmploymentDetails}
                required
              />
            </FormControl>
          </VStack>
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Educational Background / Present Education
            </Heading>

            {/* Mention the previous academic education? */}
            <FormControl>
              <FormLabel>Mention the previous academic education?</FormLabel>
              <Textarea
                name="previousEducationDetails"
                onChange={handleChange}
                value={formData.previousEducationDetails}
                required
              />
            </FormControl>

            {/* Name and Address of the previous institution */}
            <FormControl>
              <FormLabel>
                Name and Address of the previous institution:
              </FormLabel>
              <Textarea
                name="previousInstitutionDetails"
                onChange={handleChange}
                value={formData.previousInstitutionDetails}
                required
              />
            </FormControl>

            {/* Percentage of marks received previously */}
            <FormControl>
              <FormLabel>Percentage of marks received previously:</FormLabel>
              <Input
                type="number"
                name="previousMarksPercentage"
                onChange={handleChange}
                value={formData.previousMarksPercentage}
                required
              />
            </FormControl>

            {/* Mention the present Education/Training */}
            <FormControl>
              <FormLabel>Mention the present Education/Training</FormLabel>
              <Textarea
                name="presentEducationDetails"
                onChange={handleChange}
                value={formData.presentEducationDetails}
                required
              />
            </FormControl>

            {/* Name and address of the Present Institution of study */}
            <FormControl>
              <FormLabel>
                Name and address of the Present Institution of study:
              </FormLabel>
              <Textarea
                name="presentInstitutionDetails"
                onChange={handleChange}
                value={formData.presentInstitutionDetails}
                required
              />
            </FormControl>

            {/* What is the educational aspiration and area of interest of the beneficiary? */}
            <FormControl>
              <FormLabel>
                What is the educational aspiration and area of interest of the
                beneficiary?
              </FormLabel>
              <Textarea
                name="educationalAspiration"
                required
                value={formData.educationalAspiration}
              />
            </FormControl>

            {/* Sustainability of the support */}
            <FormControl>
              <FormLabel>
                Sustainability of the support (Please write down how the support
                will affect the beneficiary's life in the long run):
              </FormLabel>
              <Textarea
                name="sustainabilityDetails"
                onChange={handleChange}
                value={formData.sustainabilityDetails}
                required
              />
            </FormControl>
          </VStack>
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Information on Financial Support
            </Heading>

            {/* Is the beneficiary eligible for Scholarship? (government or any other) */}
            <FormControl>
              <FormLabel>
                Is the beneficiary eligible for Scholarship? (government or any
                other)
              </FormLabel>
              <Select
                name="eligibleForScholarship"
                onChange={handleChange}
                value={formData.eligibleForScholarship}
                required
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FormControl>

            {/* Expected amount of Scholarship */}
            <FormControl>
              <FormLabel>Expected amount of Scholarship</FormLabel>
              <Input
                type="number"
                name="expectedScholarshipAmount"
                onChange={handleChange}
                value={formData.expectedScholarshipAmount}
                required
                // required={formData.eligibleForScholarship === "yes"}
                // disabled={formData.eligibleForScholarship === "no"}
              />
            </FormControl>

            {/* Financial contribution from the family? */}
            <FormControl>
              <FormLabel>Financial contribution from the family?</FormLabel>
              <Input
                type="number"
                name="familyFinancialContribution"
                onChange={handleChange}
                value={formData.familyFinancialContribution}
                required
              />
            </FormControl>

            {/* If no support from family, mention the reasons? */}
            <FormControl>
              <FormLabel>
                If no support from the family, mention the reasons?
              </FormLabel>
              <Textarea
                name="noFamilySupportReasons"
                onChange={handleChange}
                value={formData.noFamilySupportReasons}
                required
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
            <FormControl>
              <FormLabel>Present study</FormLabel>
              <Textarea
                name="presentStudy"
                onChange={handleChange}
                value={formData.presentStudy}
                required
              />
            </FormControl>

            {/* Details of Budget */}
            <FormControl>
              <FormLabel>Details of budget</FormLabel>
              <Textarea
                name="budgetDetails"
                onChange={handleChange}
                value={formData.budgetDetails}
                required
              />
            </FormControl>

            {/* Total Cost of the Study */}
            <FormControl>
              <FormLabel>Total cost of the study</FormLabel>
              <Input
                type="number"
                name="totalCostOfStudy"
                onChange={handleChange}
                value={formData.totalCostOfStudy}
                required
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
                value={formData.scholarshipExpected}
                required
              />
            </FormControl>

            {/* Beneficiary's Contribution */}
            <FormControl>
              <FormLabel>Beneficiary's contribution</FormLabel>
              <Input
                type="number"
                name="beneficiaryContribution"
                onChange={handleChange}
                value={formData.beneficiaryContribution}
                required
              />
            </FormControl>

            {/* Total Scholarship + Contribution */}
            <FormControl>
              <FormLabel>Total scholarship + contribution</FormLabel>
              <Input
                type="number"
                name="totalScholarshipAndContribution"
                onChange={handleChange}
                value={formData.totalScholarshipAndContribution}
                required
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
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={formData.aadharCardCopy}
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
                src={formData.feeQuotationOriginal}
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
                src={formData.scholarshipProof}
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
                src={formData.medicalConfirmationOriginal}
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
                src={formData.casteCertificateCopy}
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
                src={formData.requestLetterOriginal}
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
                src={formData.deathCertificateCopy}
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
                src={formData.markListPreviousYear}
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
                required
                size="lg"
              >
                The Beneficiary / Family member agree
              </Checkbox>
              <Input
                type="date"
                name="beneficiaryAgreementDate"
                onChange={handleChange}
                value={formData.beneficiaryAgreementDate.substring(0, 10) || ""}
                required
              />
            </FormControl>

            {/* Project-In-Charge agreement */}
            <FormControl>
              <Checkbox
                name="projectInChargeAgreement"
                onChange={handleChange}
                size="lg"
                isChecked={formData.projectInChargeAgreement}
                required
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
                required
              />
            </FormControl>
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
          <Button
            mx="3"
            colorScheme="blue"
            type="submit"
            onClick={() => {
              formData.provincialSuperiorAgreement = true;
            }}
          >
            Accept
          </Button>
          <Button
            colorScheme="red"
            type="submit"
            mx={3}
            onClick={() => {
              formData.provincialSuperiorAgreement = false;
            }}
          >
            Revert
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};
export default ReviewEI;
