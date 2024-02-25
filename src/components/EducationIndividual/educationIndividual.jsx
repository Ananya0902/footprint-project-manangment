import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Modal,
  ModalContent,
  ModalOverlay,
  ModalBody,
  CircularProgress,
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
  InputGroup,
  useToast,
  useDisclosure,
} from "@chakra-ui/react";
import cloudAxios from "../../CloudAxios";
import authAxios from "../../AuthAxios";
import {useParams} from 'react-router-dom'; 


const EducationIndividual = () => {
  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
        console.log("images");
        image.photograph_benificary = await handleImageUpload(
          e.target.photographUrl.files[0]
        );

        image.aadhar_img = await handleImageUpload(
          e.target.aadharCardCopy.files[0]
        );
        console.log("image1");
        image.fee_quotation_from_the_institution_img = await handleImageUpload(
          e.target.feeQuotationOriginal.files[0]
        );
        console.log("image2");
        image.proof_of_scholarship_received_from_government_img =
          await handleImageUpload(e.target.scholarshipProof.files[0]);
        console.log("image3");
        image.medical_confirmation_img = e.target.medicalConfirmationOriginal
          .files[0]
          ? await handleImageUpload(
              e.target.medicalConfirmationOriginal.files[0]
            )
          : "";
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
      residential_status: e.target.residentialStatus?.value ?? '',
      residential_status_others: e.target.residentialStatusOthers
        ? e.target.residentialStatusOthers.value
        : "",
      family_situation_of_the_beneficiary:
        e.target.familySituationDetails.value,
      financialSupportDetails: e.target.financialSupportDetails.value,
      familyEmploymentDetails: e.target.familyEmploymentDetails.value,
      previousEducationDetails: e.target.previousEducationDetails.value,
      previousInstitutionDetails: e.target.previousInstitutionDetails.value,
      previousMarksPercentage: parseInt(e.target.previousMarksPercentage.value),
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
      beneficiaryContribution: parseInt(e.target.beneficiaryContribution.value),
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
        navigate("/dashboardApplicant");  

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
                  name="photographUrl"
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
              {formData.motherHealthStatus === "others" && (
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
              <Select
                name="residentialStatus"
                onChange={handleChange}
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
            <FormControl isRequired>
              <FormLabel>
                Family situation of the beneficiary - Need of the present
                project assistance?
              </FormLabel>
              <Textarea
                name="familySituationDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Has the family of the beneficiary received financial support previously through St. Ann’s projects? Give the details. */}
            <FormControl isRequired>
              <FormLabel>
                Has the family of the beneficiary received financial support
                previously through St. Ann’s projects? Give the details.
              </FormLabel>
              <Textarea
                name="financialSupportDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Are the family members of the beneficiary employed with St.Ann’s. Give full details. */}
            <FormControl isRequired>
              <FormLabel>
                Are the family members of the beneficiary employed with
                St.Ann’s. Give full details.
              </FormLabel>
              <Textarea
                name="familyEmploymentDetails"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Educational Background / Present Education
            </Heading>

            {/* Mention the previous academic education? */}
            <FormControl isRequired>
              <FormLabel>Mention the previous academic education?</FormLabel>
              <Textarea
                name="previousEducationDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Name and Address of the previous institution */}
            <FormControl isRequired>
              <FormLabel>
                Name and Address of the previous institution:
              </FormLabel>
              <Textarea
                name="previousInstitutionDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Percentage of marks received previously */}
            <FormControl isRequired>
              <FormLabel>Percentage of marks received previously:</FormLabel>
              <Input
                type="number"
                name="previousMarksPercentage"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Mention the present Education/Training */}
            <FormControl isRequired>
              <FormLabel>Mention the present Education/Training</FormLabel>
              <Textarea
                name="presentEducationDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Name and address of the Present Institution of study */}
            <FormControl isRequired>
              <FormLabel>
                Name and address of the Present Institution of study:
              </FormLabel>
              <Textarea
                name="presentInstitutionDetails"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* What is the educational aspiration and area of interest of the beneficiary? */}
            <FormControl isRequired>
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
            <FormControl isRequired>
              <FormLabel>
                Sustainability of the support (Please write down how the support
                will affect the beneficiary's life in the long run):
              </FormLabel>
              <Textarea
                name="sustainabilityDetails"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Information on Financial Support
            </Heading>

            {/* Is the beneficiary eligible for Scholarship? (government or any other) */}
            <FormControl isRequired>
              <FormLabel>
                Is the beneficiary eligible for Scholarship? (government or any
                other)
              </FormLabel>
              <Select
                name="eligibleForScholarship"
                onChange={handleChange}
                required
              >
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </Select>
            </FormControl>

            {/* Expected amount of Scholarship */}
            <FormControl isRequired>
              <FormLabel>Expected amount of Scholarship</FormLabel>
              <Input
                type="number"
                name="expectedScholarshipAmount"
                onChange={handleChange}
                required={formData.eligibleForScholarship === "Yes"}
                disabled={formData.eligibleForScholarship === "No"}
              />
            </FormControl>

            {/* Financial contribution from the family? */}
            <FormControl isRequired>
              <FormLabel>Financial contribution from the family?</FormLabel>
              <Input
                type="number"
                name="familyFinancialContribution"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* If No support from family, mention the reasons? */}
            <FormControl isRequired>
              <FormLabel>
                If no support from the family, mention the reasons?
              </FormLabel>
              <Textarea
                name="noFamilySupportReasons"
                onChange={handleChange}
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
                name="aadharCardCopy"
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
                name="feeQuotationOriginal"
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
                name="scholarshipProof"
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
                name="medicalConfirmationOriginal"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
              />
            </FormControl>

            {/* Caste Certificate (True Copy) */}
            <FormControl isRequired>
              <FormLabel>Caste Certificate (True Copy)</FormLabel>
              <Input
                type="file"
                name="casteCertificateCopy"
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
                name="affidavitProofOriginal"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
              />
            </FormControl>

            {/* Request Letter (Original Copy) */}
            <FormControl isRequired>
              <FormLabel>Request Letter (Original Copy)</FormLabel>
              <Input
                type="file"
                name="requestLetterOriginal"
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
                name="deathCertificateCopy"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
              />
            </FormControl>

            {/* Mark List of Previous Year */}
            <FormControl isRequired>
              <FormLabel>Mark List of Previous Year</FormLabel>
              <Input
                type="file"
                name="markListPreviousYear"
                onChange={handleChange}
                accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
                required
              />
            </FormControl>
          </VStack>

         

          {/* Submit Button */}
          <Button colorScheme="blue" type="submit" onClick={() => (formData.projectInChargeAgreement = true)}>
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};
export default EducationIndividual;
