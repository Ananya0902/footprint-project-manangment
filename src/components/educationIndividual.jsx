import React, { useState } from 'react';
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
  InputGroup, 
} from '@chakra-ui/react';


const EducationIndividual= () => {
    const [formData, setFormData] = useState({});
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

      <Heading as="h1" size="xl" mb={6} align="center" justifyContent="center">
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

            {/* Name of Project Coordinator */}
            <FormControl isRequired>
              <FormLabel>Name of Project Coordinator</FormLabel>
              <Input
                type="text"
                name="projectCoordinatorName"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Contact of Project Coordinator */}
            <FormControl isRequired>
              <FormLabel>Contact of Project Coordinator</FormLabel>
              <Input
                type="text"
                name="projectCoordinatorContact"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Email of Project Coordinator */}
            <FormControl isRequired>
              <FormLabel>Email of Project Coordinator</FormLabel>
              <Input
                type="email"
                name="projectCoordinatorEmail"
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
    <Select
      name="gender"
      onChange={handleChange}
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
      onChange={handleChange}
      required
    />
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
    <Select
      name="motherStatus"
      onChange={handleChange}
      required
    >
      <option value="healthy">Healthy</option>
      <option value="sick">Sick</option>
      <option value="dead">Dead</option>
    </Select>
  </FormControl>

  {/* Father's Status */}
  <FormControl isRequired>
    <FormLabel>Father is</FormLabel>
    <Select
      name="fatherStatus"
      onChange={handleChange}
      required
    >
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
      <option value="yes">Yes</option>
      <option value="no">No</option>
      <option value="died">Died</option>
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
      <option value="yes">Yes</option>
      <option value="no">No</option>
      <option value="died">Died</option>
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
      <option value="chronicallySick">Chronically Sick</option>
      <option value="hivPositive">HIV/AIDS positive</option>
      <option value="disabled">Disabled</option>
      <option value="alcoholic">Alcoholic</option>
      <option value="others">Others</option>
    </Select>
    {/* Conditional input for 'Others' */}
    {formData.fatherHealthStatus === 'others' && (
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
      <option value="chronicallySick">Chronically Sick</option>
      <option value="hivPositive">HIV/AIDS positive</option>
      <option value="disabled">Disabled</option>
      <option value="alcoholic">Alcoholic</option>
      <option value="others">Others</option>
    </Select>
    {/* Conditional input for 'Others' */}
    {formData.motherHealthStatus === 'others' && (
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
    {formData.residentialStatus === 'others' && (
      <Input
        type="text"
        name="residentialStatusOthers"
        onChange={handleChange}
        placeholder="Specify other residential status"
        required
      />
    )}
  </FormControl>
  <VStack align="start" spacing={4} mb={8}>
  <Heading as="h1" size="xl" mb={6}>
    Family Situation and Employment
  </Heading>

  {/* Family situation of the beneficiary - Need of the present project assistance? */}
  <FormControl isRequired>
    <FormLabel>Family situation of the beneficiary - Need of the present project assistance?</FormLabel>
    <Textarea
      name="familySituationDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Has the family of the beneficiary received financial support previously through St. Ann’s projects? Give the details. */}
  <FormControl isRequired>
    <FormLabel>Has the family of the beneficiary received financial support previously through St. Ann’s projects? Give the details.</FormLabel>
    <Textarea
      name="financialSupportDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Are the family members of the beneficiary employed with St.Ann’s. Give full details. */}
  <FormControl isRequired>
    <FormLabel>Are the family members of the beneficiary employed with St.Ann’s. Give full details.</FormLabel>
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
    <FormLabel>Name and Address of the previous institution:</FormLabel>
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
    <FormLabel>Name and address of the Present Institution of study:</FormLabel>
    <Textarea
      name="presentInstitutionDetails"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* What is the educational aspiration and area of interest of the beneficiary? */}
  <FormControl isRequired>
    <FormLabel>What is the educational aspiration and area of interest of the beneficiary?</FormLabel>
    <Textarea
      name="educationalAspiration"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Sustainability of the support */}
  <FormControl isRequired>
    <FormLabel>Sustainability of the support (Please write down how the support will affect the beneficiary's life in the long run):</FormLabel>
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
    <FormLabel>Is the beneficiary eligible for Scholarship? (government or any other)</FormLabel>
    <Select
      name="eligibleForScholarship"
      onChange={handleChange}
      required
    >
      <option value="yes">Yes</option>
      <option value="no">No</option>
    </Select>
  </FormControl>

  {/* Expected amount of Scholarship */}
  <FormControl isRequired>
    <FormLabel>Expected amount of Scholarship</FormLabel>
    <Input
      type="number"
      name="expectedScholarshipAmount"
      onChange={handleChange}
      required={formData.eligibleForScholarship === 'yes'}
      disabled={formData.eligibleForScholarship === 'no'}
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

  {/* If no support from family, mention the reasons? */}
  <FormControl isRequired>
    <FormLabel>If no support from the family, mention the reasons?</FormLabel>
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
    <Textarea
      name="presentStudy"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Details of Budget */}
  <FormControl isRequired>
    <FormLabel>Details of budget</FormLabel>
    <Textarea
      name="budgetDetails"
      onChange={handleChange}
      required
    />
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
    <FormLabel>Scholarship expected from government/other sources</FormLabel>
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
    <FormLabel>Fee Quotation from the Institution (Original)</FormLabel>
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
    <FormLabel>Proof of Scholarship Received from Government</FormLabel>
    <Input
      type="file"
      name="scholarshipProof"
      onChange={handleChange}
      accept=".pdf, .doc, .docx, .jpeg, .jpg, .png"
      required
    />
  </FormControl>

  {/* Medical Confirmation (In Case of Ill Health of Parents) – Original */}
  <FormControl >
    <FormLabel>Medical Confirmation (In Case of Ill Health of Parents) – Original</FormLabel>
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
  <FormControl >
    <FormLabel>Affidavit Proof (In Case of Single Parent - Original)</FormLabel>
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
  <FormControl >
    <FormLabel>Death Certificate (In Case of Deceased Parents - True Copy)</FormLabel>
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
    <Input
      type="date"
      name="beneficiaryAgreementDate"
      onChange={handleChange}
      required
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

  {/* Project-In-Charge agreement */}
  <FormControl isRequired>
    <Checkbox
      name="projectInChargeAgreement"
      onChange={handleChange}
      size="lg"
    >
      The Project-In-Charge agree
    </Checkbox>
    <Input
      type="date"
      name="projectInChargeAgreementDate"
      onChange={handleChange}
      required
    />
  </FormControl>

  {/* Provincial Superior agreement */}
  <FormControl isRequired>
    <Checkbox
      name="provincialSuperiorAgreement"
      onChange={handleChange}
      size="lg"
    >
      The Provincial Superior agree
    </Checkbox>
    <Input
      type="date"
      name="provincialSuperiorAgreementDate"
      onChange={handleChange}
      required
    />
  </FormControl>
</VStack>
<VStack align="start" spacing={4} mb={8}>
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

  {/* Remarks */}
  <FormControl>
    <FormLabel>Remarks (Optional)</FormLabel>
    <Textarea
      name="remarks"
      onChange={handleChange}
    />
  </FormControl>
</VStack>







         {/* Submit Button */}
         <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
      </ChakraProvider>);


}
export default EducationIndividual;