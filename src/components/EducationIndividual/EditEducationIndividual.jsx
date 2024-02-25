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

/**
 * EditEI component for editing education individual data.
 *
 * @returns {JSX.Element} The EditEI component.
 */

const EditEI = () => {
  const showToast = useToast();
  const projectData = JSON.parse(decodeURIComponent(useParams().project));
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
  });
  // Populate formData from req

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
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

    // Comment and all logic for the form submission
    // To be used in some later phase 
    // formData.projectInChargeAgreement = true;
    // formData.projectInChargeAgreementDate = new Date();
    // formData.commentBoxProvincialSuperior = `*Reverted: ${projectData.comment_box_provincial_superior}*`;
    // formData.provincialSuperiorAgreement = false;
    // formData.commentBoxProjectCooredinator = `*Reverted: ${projectData.comment_box_project_coordinator}*`;
    // formData.projectCoordinatorAgreement = false;

    /**
     * Converts the images in the form data to URLs by uploading them to Cloudinary.
     * @param {Event} e - The event object.
     * @returns {Promise<Object>} - A promise that resolves to an object containing URLs for all the images.
     */
    const convertImagesToUrls = async (e) => {
      const image = {};

      try {
        image.photograph_benificary =
          formData.photographUrl instanceof File
            ? await handleImageUpload(formData.photographUrl)
            : imageMappings.photographUrl;
        image.aadhar_img =
          formData.aadharCardCopy instanceof File
            ? await handleImageUpload(formData.aadharCardCopy)
            : imageMappings.aadharCardCopy;
        image.fee_quotation_from_the_institution_img =
          formData.feeQuotationOriginal instanceof File
            ? await handleImageUpload(formData.a)
            : imageMappings.feeQuotationOriginal;
        image.proof_of_scholarship_received_from_government_img =
          formData.scholarshipProof instanceof File
            ? await handleImageUpload(formData.scholarshipProof)
            : imageMappings.scholarshipProof;
        image.medical_confirmation_img =
          formData.medicalConfirmationOriginal instanceof File
            ? await handleImageUpload(formData.medicalConfirmationOriginal)
            : imageMappings.medicalConfirmationOriginal;
        image.caste_certificate_img =
          formData.casteCertificateCopy instanceof File
            ? await handleImageUpload(formData.casteCertificateCopy)
            : imageMappings.casteCertificateCopy;
        image.affidavit_proof_img =
          formData.affidavitProofOriginal instanceof File
            ? await handleImageUpload(formData.affidavitProofOriginal)
            : imageMappings.affidavitProofOriginal;
        image.request_letter_img =
          formData.requestLetterOriginal instanceof File
            ? await handleImageUpload(formData.requestLetterOriginal)
            : imageMappings.requestLetterOriginal;
        image.death_certificate_img =
          formData.deathCertificateCopy instanceof File
            ? await handleImageUpload(formData.deathCertificateCopy)
            : imageMappings.deathCertificateCopy;
        image.mark_list_of_previous_year =
          formData.markListPreviousYear instanceof File
            ? await handleImageUpload(formData.markListPreviousYear)
            : imageMappings.markListPreviousYear;

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
        projectID: projectData.project_code,
        name: formData.beneficiaryName,
        mobile: formData.beneficiaryContact,
        email: formData.beneficiaryEmail,
        address: formData.beneficiaryAddress,
        aadhar_no: parseInt(formData.aadharCardNo),
        gender: formData.gender,
        DOB: formData.dob,
        father: formData.fatherName,
        mother: formData.motherName,
        mother_tongue: formData.motherTongue,
        religion: formData.religion,
        caste: formData.casteTribe,
        occupation_of_father: formData.fatherOccupation,
        monthly_income_of_father: parseInt(formData.fatherMonthlyIncome),
        monthly_income_of_mother: parseInt(formData.motherMonthlyIncome),
        occupation_of_mother: formData.motherOccupation,
        motherIs: formData.motherIs,
        fatherIs: formData.fatherIs,
        grandmother_support: formData.grandmotherSupport ?? "Supportive",
        grandfather_support: formData.grandfatherSupport,
        health_status_of_father: formData.fatherHealthStatus,
        health_status_of_father_others: formData.fatherHealthStatus,
        health_status_of_mother: formData.motherHealthStatus,
        health_status_of_mother_others: formData.motherHealthStatusOthers,
        residential_status: formData.residentialStatus,
        residential_status_others: formData.residentialStatusOthers,
        family_situation_of_the_beneficiary: formData.familySituationDetails,
        financialSupportDetails: formData.financialSupportDetails,
        familyEmploymentDetails: formData.familyEmploymentDetails,
        previousEducationDetails: formData.previousEducationDetails,
        previousInstitutionDetails: formData.previousInstitutionDetails,
        previousMarksPercentage: parseInt(formData.previousMarksPercentage),
        presentEducationDetails: formData.presentEducationDetails,
        presentInstitutionDetails: formData.presentInstitutionDetails,
        educationalAspiration: formData.educationalAspiration,
        sustainabilityDetails: formData.sustainabilityDetails,
        eligibleForScholarship: formData.eligibleForScholarship,
        expectedScholarshipAmount: parseInt(formData.expectedScholarshipAmount),
        familyFinancialContribution: parseInt(
          formData.familyFinancialContribution
        ),
        noFamilySupportReasons: formData.noFamilySupportReasons,
        presentStudy: formData.presentStudy,
        budgetDetails: formData.budgetDetails,
        totalCostOfStudy: formData.totalCostOfStudy,
        scholarshipExpected: parseInt(formData.scholarshipExpected),
        beneficiaryContribution: parseInt(formData.beneficiaryContribution),
        totalScholarshipAndContribution: parseInt(
          formData.totalScholarshipAndContribution
        ),
        balanceAmountRequested: parseInt(formData.balanceAmountRequested),
        benificary_agree: {
          agree: true,
        },
        project_in_charge_agree: {
          agree: true,
        },
        ...image,
        // comment_box_project_coordinator: formData.commentBoxProjectCooredinator,
        // comment_box_provincial_superior: formData.commentBoxProvincialSuperior,
        comment_box_project_coordinator: null,
        comment_box_provincial_superior: null,
        project_coordinator_agree: { agree: false },
        provincial_superior_agree: { agree: false },
      };

      const res = await authAxios.put("projects/editEI", req);
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
            {/*Personal Information of the Beneficiary */}
            <Heading as="h1" size="xl" mb={6}>
              Personal Information of the Beneficiary
            </Heading>
            {/* Photograph (URL) */}
            <FormControl>
              <FormLabel>Photograph</FormLabel>
              <Box>
                {formData.photographUrl && (
                  <Box>
                    <strong>Uploaded File:</strong>{" "}
                    {formData.photographUrl?.name ??
                      formData.photographUrl.split("/")[
                        formData.photographUrl.split("/").length - 1
                      ]}
                  </Box>
                )}
                <Image
                  boxSize="40%"
                  src={
                    // Determine if formData.photographUrl is a fake path or a URL and if a fake path convert into file
                    formData.photographUrl instanceof File
                      ? URL.createObjectURL(formData.photographUrl)
                      : formData.photographUrl
                  }
                  alt="Beneficiary Image"
                  mx="auto"
                  fit="contain"
                />
                {/* component to upload image */}
                <Input
                  type="file"
                  name="photographUrl"
                  onChange={handleImageChange}
                  accept="image/*"
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
            <FormControl>
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
                required={formData.familyFinancialContribution === 0}
                disabled={formData.familyFinancialContribution > 0}
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
            <FormControl>
              <FormLabel>Aadhar Card (True Copy)</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={
                  formData.aadharCardCopy instanceof File
                    ? URL.createObjectURL(formData.aadharCardCopy)
                    : formData.aadharCardCopy
                }
                alt="Aadhar Card"
              />
              {/* component to upload image */}
              <Input
                required={false}
                type="file"
                name="aadharCardCopy"
                onChange={handleImageChange}
                accept="image/*"
              />
            </FormControl>

            {/* Fee Quotation from the Institution (Original) */}
            <FormControl>
              <FormLabel>
                Fee Quotation from the Institution (Original)
              </FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={
                  // formData.feeQuotationOriginal is not instance of file we get file after doing .files[0]

                  formData.feeQuotationOriginal instanceof File
                    ? URL.createObjectURL(formData.feeQuotationOriginal)
                    : formData.feeQuotationOriginal
                }
                alt="Fee Quotation from the Institution"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="feeQuotationOriginal"
                onChange={handleImageChange}
                accept="image/*"
              />
            </FormControl>

            {/* Proof of Scholarship Received from Government */}
            <FormControl>
              <FormLabel>
                Proof of Scholarship Received from Government
              </FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={
                  formData.scholarshipProof instanceof File
                    ? URL.createObjectURL(formData.scholarshipProof)
                    : formData.scholarshipProof
                }
                alt="Scholarship Proof"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="scholarshipProof"
                onChange={handleImageChange}
                accept="image/*"
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
                src={
                  formData.medicalConfirmationOriginal instanceof File
                    ? URL.createObjectURL(formData.medicalConfirmationOriginal)
                    : formData.medicalConfirmationOriginal
                }
                alt="Medical Confirmation"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="medicalConfirmationOriginal"
                onChange={handleImageChange}
                accept="image/*"
              />
            </FormControl>

            {/* Caste Certificate (True Copy) */}
            <FormControl>
              <FormLabel>Caste Certificate (True Copy)</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={
                  formData.casteCertificateCopy instanceof File
                    ? URL.createObjectURL(formData.casteCertificateCopy)
                    : formData.casteCertificateCopy
                }
                alt="Caste Certificate"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="casteCertificateCopy"
                onChange={handleImageChange}
                accept="image/*"
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
                src={
                  formData.affidavitProofOriginal instanceof File
                    ? URL.createObjectURL(formData.affidavitProofOriginal)
                    : formData.affidavitProofOriginal
                }
                alt="Affidavit Proof"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="affidavitProofOriginal"
                onChange={handleImageChange}
                accept="image/*"
              />
            </FormControl>

            {/* Request Letter (Original Copy) */}
            <FormControl>
              <FormLabel>Request Letter (Original Copy)</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={
                  formData.requestLetterOriginal instanceof File
                    ? URL.createObjectURL(formData.requestLetterOriginal)
                    : formData.requestLetterOriginal
                }
                alt="Request Letter"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="requestLetterOriginal"
                onChange={handleImageChange}
                accept="image/*"
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
                src={
                  formData.deathCertificateCopy instanceof File
                    ? URL.createObjectURL(formData.deathCertificateCopy)
                    : formData.deathCertificateCopy
                }
                alt="Death Certificate"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="deathCertificateCopy"
                onChange={handleImageChange}
                accept="image/*"
              />
            </FormControl>

            {/* Mark List of Previous Year */}
            <FormControl>
              <FormLabel>Mark List of Previous Year</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={
                  formData.markListPreviousYear instanceof File
                    ? URL.createObjectURL(formData.markListPreviousYear)
                    : formData.markListPreviousYear
                }
                alt="Mark List of Previous Year"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="markListPreviousYear"
                onChange={handleImageChange}
                accept="image/*"
              />
            </FormControl>
          </VStack>

          {/* Submit Button */}
          <Button mx="3" colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};
export default EditEI;
