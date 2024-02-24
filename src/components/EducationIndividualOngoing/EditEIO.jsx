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
  Alert,
  AlertIcon,
  useToast,
  Image,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import authAxios from "../../AuthAxios";
import cloudAxios from "../../CloudAxios";

const EditEIO = () => {
  const showToast = useToast();

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };



  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  const [formData, setFormData] = useState({
    // Name and contact of Provincial Superior
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
    markListPreviousYear: projectData.mark_list_of_previous_year,
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
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

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



    e.preventDefault();
    try {
      const image = {}
      image.photograph_benificary =
      formData.photographUrl instanceof File
        ? await handleImageUpload(formData.photographUrl)
        : formData.photographUrl;
    image.aadhar_img =
      formData.aadharCardUrl instanceof File
        ? await handleImageUpload(formData.aadharCardUrl)
        : formData.aadharCardUrl;
    image.fee_quotation_from_the_institution_img =

      formData.feeQuotationUrl instanceof File
        ? await handleImageUpload(formData.a)
        : formData.feeQuotationUrl;
    image.proof_of_scholarship_received_from_government_img =
      formData.scholarshipProofUrl instanceof File
        ? await handleImageUpload(formData.scholarshipProofUrl)
        : formData.scholarshipProofUrl;
    image.medical_confirmation_img =
      formData.medicalConfirmationUrl instanceof File
        ? await handleImageUpload(formData.medicalConfirmationUrl)
        : formData.medicalConfirmationUrl;
    image.caste_certificate_img =
      formData.casteCertificateUrl instanceof File
        ? await handleImageUpload(formData.casteCertificateUrl)
        : formData.casteCertificateUrl;
    image.affidavit_proof_img =
      formData.affidavitProofUrl instanceof File
        ? await handleImageUpload(formData.affidavitProofUrl)
        : formData.affidavitProofUrl;
    image.request_letter_img =
      formData.requestLetterUrl instanceof File
        ? await handleImageUpload(formData.requestLetterUrl)
        : formData.requestLetterUrl;
    image.death_certificate_img =
      formData.deathCertificateUrl instanceof File
        ? await handleImageUpload(formData.deathCertificateUrl)
        : formData.deathCertificateUrl;
    image.mark_list_of_previous_year =
      formData.markListPreviousYear instanceof File
        ? await handleImageUpload(formData.markListPreviousYear)
        : formData.markListPreviousYear;

      const req = {
        photograph_benificary: formData.photographUrl , 
        name : formData.beneficiaryName,
        mobile:formData.beneficiaryContact , 
        address: formData.beneficiaryAddress , 
        aadhar_no: formData.aadharCardNo,
        gender: formData.gender , 
        DOB : formData.dob , 
        father: formData.fatherName , 
        mother: formData.motherName, 
        mother_tongue: formData.motherTongue, 
        religion: formData.religion , 
        caste: formData.casteTribe , 
        occupation_of_father: formData.fatherOccupation, 
        monthly_income_of_father : formData.fatherMonthlyIncome,
        occupation_of_mother: formData.motherOccupation,
        motherIs : formData.motherStatus , 
        fatherIs: formData.fatherStatus,
        grandmother_support: formData.grandmotherSupport , 
        grandfather_support: formData.grandfatherSupport , 
        health_status_of_father : formData.fatherHealthStatus, 
        health_status_of_father_others : formData.fatherHealthStatusOthers, 
        health_status_of_mother: formData.motherHealthStatus ,
        health_status_of_mother_others: formData.motherHealthStatusOthers,
        residential_status : formData.residentialStatus , 
        residential_status_others : formData.residentialStatusOthers ,
        family_situation_of_the_beneficiary: formData.familySituationPresent , 
        extra_curricular_activities_participated: formData.extraCurricularActivities,
        nature_of_personality_growth_visible: formData.personalityGrowth ,
        Scholarship_received_from_government : formData.scholarshipAmount , 
        expenses_from_family_of_the_beneficiary : formData.familyContribution , 
        other_support_received_from_other_sources : formData.otherSupportReceived , 
        total_amount : formData.totalAmount , 
        amount_spent_from_project : formData.amountSpentFromProject ,
        total_amount_already_spent_on_the_studies : formData.totalAmountSpentOnStudies , 
        balance_amount_retained : formData.balanceAmountRetained , 
        balance_amount_requested : formData.balanceAmountRequested , 
        beneficiary_agree : {
          agree: true , 
          date : Date.now() 
        } ,
        project_in_charge_agree : {
          agree : true , 
          date : Date.now() , 
        },
        ...image , 
        comment_box_project_coordinator : null , 
        comment_box_provincial_superior :null , 
        present_study : formData.presentStudy , 
        details_of_budget : formData.detailsOfBudget , 
        total_cost_of_study : formData.totalCostOfStudy , 
        scholarship_expected : formData.scholarshipExpected , 
        beneficiaries_contribution : formData.beneficiaryContribution , 
        total_scholarship_contribution : formData.totalScholarshipAndContribution , 
      };
      const res = await authAxios.put("/projects/editapproverEOI/", req);
      if (res.data.success) setIsSubmitted(true);
      else {
        showToast({
          title: "Error submitting the reviewed doc",
          status: "error",
          duration: 5000,
        });
      }
      console.log(res.data);
    } catch (e) {
      console.log(e);
      showToast({
        title: "Error submitting the reviewed doc",
        status: "error",
        duration: 5000,
      });
    }
  };

  // Group projects 
  // mailing_list 
  // project_coordinator : []
  // Revert comment reviewer 
  // Comment = specialCharacter + Comment  
  // comment fields <-- special character + comment 

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
                value={formData.beneficiaryName || ""}
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
                value={formData.beneficiaryContact || ""}
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
                value={formData.beneficiaryEmail || ""}
                required
              />
            </FormControl>

            {/* Address */}
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="beneficiaryAddress"
                onChange={handleChange}
                value={formData.beneficiaryAddress || ""}
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
                value={formData.aadharCardNo || ""}
                required
              />
            </FormControl>

            {/* Gender */}
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                onChange={handleChange}
                value={formData.gender || ""}
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
                value={formData.dob || ""}
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
                value={formData.fatherName || ""}
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
                value={formData.motherName || ""}
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
                value={formData.motherTongue || ""}
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
                value={formData.religion || ""}
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
                value={formData.casteTribe || ""}
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
                value={formData.fatherOccupation || ""}
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
                value={formData.fatherMonthlyIncome || ""}
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
                value={formData.motherOccupation || ""}
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
                value={formData.motherMonthlyIncome || ""}
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
                value={formData.motherStatus || ""}
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
                value={formData.fatherStatus || ""}
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
                value={formData.grandmotherSupport || ""}
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
                value={formData.grandfatherSupport || ""}
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
                value={formData.fatherHealthStatus || ""}
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
                  value={formData.fatherHealthStatusOthers || ""}
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
                value={formData.motherHealthStatus || ""}
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
                  value={formData.motherHealthStatusOthers || ""}
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
                value={formData.residentialStatus || ""}
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
                  value={formData.residentialStatusOthers || ""}
                  required
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
                required
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
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Extra-curricular activities participated</FormLabel>
              <Textarea
                name="extraCurricularActivities"
                onChange={handleChange}
                value={formData.extraCurricularActivities || ""}
                required
              />
            </FormControl>

            <FormControl>
              <FormLabel>Nature of personality growth visible</FormLabel>
              <Textarea
                name="personalityGrowth"
                onChange={handleChange}
                value={formData.personalityGrowth || ""}
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
                required
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
                required
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
                required
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
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
                required
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
                required
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
                required
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
            <FormControl>
              <FormLabel>Present study</FormLabel>
              <Textarea
                name="presentStudy"
                onChange={handleChange}
                value={formData.presentStudy || ""}
                required
              />
            </FormControl>

            {/* Details of Budget */}
            <FormControl>
              <FormLabel>Details of budget</FormLabel>
              <Textarea
                name="budgetDetails"
                onChange={handleChange}
                value={formData.budgetDetails || ""}
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
                value={formData.totalCostOfStudy || ""}
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
                value={formData.scholarshipExpected || ""}
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
                value={formData.beneficiaryContribution || ""}
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
                value={formData.totalScholarshipAndContribution || ""}
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
                value={formData.balanceAmountRequested || ""}
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
                  formData.aadharCardUrl instanceof File
                    ? URL.createObjectURL(formData.aadharCardUrl)
                    : formData.aadharCardUrl
                }
                alt="Aadhar Card"
              />
              {/* component to upload image */}
              <Input
                required={false}
                type="file"
                name="aadharCardUrl"
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
                  // formData.feeQuotationUrl is not instance of file we get file after doing .files[0]

                  formData.feeQuotationUrl instanceof File
                    ? URL.createObjectURL(formData.feeQuotationUrl)
                    : formData.feeQuotationUrl
                }
                alt="Fee Quotation from the Institution"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="feeQuotationUrl"
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
                  formData.scholarshipProofUrl instanceof File
                    ? URL.createObjectURL(formData.scholarshipProofUrl)
                    : formData.scholarshipProofUrl
                }
                alt="Scholarship Proof"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="scholarshipProofUrl"
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
                  formData.medicalConfirmationUrl instanceof File
                    ? URL.createObjectURL(formData.medicalConfirmationUrl)
                    : formData.medicalConfirmationUrl
                }
                alt="Medical Confirmation"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="medicalConfirmationUrl"
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
                  formData.casteCertificateUrl instanceof File
                    ? URL.createObjectURL(formData.casteCertificateUrl)
                    : formData.casteCertificateUrl
                }
                alt="Caste Certificate"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="casteCertificateUrl"
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
                  formData.affidavitProofUrl instanceof File
                    ? URL.createObjectURL(formData.affidavitProofUrl)
                    : formData.affidavitProofUrl
                }
                alt="Affidavit Proof"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="affidavitProofUrl"
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
                  formData.requestLetterUrl instanceof File
                    ? URL.createObjectURL(formData.requestLetterUrl)
                    : formData.requestLetterUrl
                }
                alt="Request Letter"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="requestLetterUrl"
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
                  formData.deathCertificateUrl instanceof File
                    ? URL.createObjectURL(formData.deathCertificateUrl)
                    : formData.deathCertificateUrl
                }
                alt="Death Certificate"
              />
              {/* component to upload image */}
              <Input
                type="file"
                required={false}
                name="deathCertificateUrl"
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
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};
export default EditEIO;
