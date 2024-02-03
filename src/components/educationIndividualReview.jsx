import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  VStack,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import {useParams} from 'react-router-dom';


const EducationIndividual = () => {
  const [formData, setFormData] = useState({
    motherTongue: "",
    religion: "",
    casteTribe: "",
    fatherOccupation: "",
    fatherMonthlyIncome: "",
    motherOccupation: "",
    motherMonthlyIncome: "",
    motherStatus: "",
    fatherStatus: "",
    grandmotherSupport: "",
    grandfatherSupport: "",
    fatherHealthStatus: "",
    fatherHealthStatusOthers: "",
    motherHealthStatus: "",
    motherHealthStatusOthers: "",
    residentialStatus: "",
    residentialStatusOthers: "",
    familySituationDetails: "",
    financialSupportDetails: "",
    familyEmploymentDetails: "",
    previousEducationDetails: "",
    previousInstitutionDetails: "",
    previousMarksPercentage: "",
    presentEducationDetails: "",
    presentInstitutionDetails: "",
    educationalAspiration: "",
    sustainabilityDetails: "",
    eligibleForScholarship: "",
    expectedScholarshipAmount: "",
    familyFinancialContribution: "",
    noFamilySupportReasons: "",
    presentStudy: "",
    budgetDetails: "",
    totalCostOfStudy: "",
    scholarshipExpected: "",
    beneficiaryContribution: "",
    totalScholarshipAndContribution: "",
    balanceAmountRequested: "",
    beneficiaryAgreement: "",
    beneficiaryAgreementDate: "",
    projectCoordinatorAgreement: "",
    projectCoordinatorAgreementDate: "",
    projectInChargeAgreement: "",
    projectInChargeAgreementDate: "",
    provincialSuperiorAgreement: "",
    provincialSuperiorAgreementDate: "",
    amountApprovedByProjectCoordinator: "",
    remarks: "",
  });

  return (
    <ChakraProvider>
      <Box p={8}>
        <form>
          {/* Personal Information */}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Personal Information
            </Heading>

            {/* Name */}
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input type="text" name="name" value={formData.name} readOnly />
            </FormControl>

            {/* Date of Birth */}
            <FormControl isRequired>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                readOnly
              />
            </FormControl>

            {/* Gender */}
            <FormControl isRequired>
              <FormLabel>Gender</FormLabel>
              <Select name="gender" value={formData.gender} readOnly>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            {/* Address */}
            <FormControl isRequired>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="address"
                value={formData.address}
                readOnly
              ></Textarea>
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
                value={formData.motherMonthlyIncome}
                readOnly
              />
            </FormControl>
          </VStack>

          {/* Details about Mother and Father */}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Details about Mother and Father
            </Heading>

            {/* Mother's Status */}
            <FormControl>
              <FormLabel>Mother is</FormLabel>
              <Input
                type="text"
                name="motherStatus"
                value={formData.motherStatus}
                readOnly
              />
            </FormControl>

            {/* Father's Status */}
            <FormControl>
              <FormLabel>Father is</FormLabel>
              <Input
                type="text"
                name="fatherStatus"
                value={formData.fatherStatus}
                readOnly
              />
            </FormControl>

            {/* Grandmother's Support */}
            <FormControl>
              <FormLabel>Grandmother gets family support</FormLabel>
              <Input
                type="text"
                name="grandmotherSupport"
                value={formData.grandmotherSupport}
                readOnly
              />
            </FormControl>

            {/* Grandfather's Support */}
            <FormControl>
              <FormLabel>Grandfather gets family support</FormLabel>
              <Input
                type="text"
                name="grandfatherSupport"
                value={formData.grandfatherSupport}
                readOnly
              />
            </FormControl>

            {/* Health Status of Father */}
            <FormControl>
              <FormLabel>Health status of Father</FormLabel>
              <Input
                type="text"
                name="fatherHealthStatus"
                value={formData.fatherHealthStatus}
                readOnly
              />
              {/* Conditional input for 'Others' */}
              {formData.fatherHealthStatus === "others" && (
                <Input
                  type="text"
                  name="fatherHealthStatusOthers"
                  value={formData.fatherHealthStatusOthers}
                  readOnly
                  placeholder="Specify other health status"
                />
              )}
            </FormControl>

            {/* Health Status of Mother */}
            <FormControl>
              <FormLabel>Health status of Mother</FormLabel>
              <Input
                type="text"
                name="motherHealthStatus"
                value={formData.motherHealthStatus}
                readOnly
              />
              {/* Conditional input for 'Others' */}
              {formData.motherHealthStatus === "others" && (
                <Input
                  type="text"
                  name="motherHealthStatusOthers"
                  value={formData.motherHealthStatusOthers}
                  readOnly
                  placeholder="Specify other health status"
                />
              )}
            </FormControl>

            {/* Residential Status */}
            <FormControl>
              <FormLabel>Residential Status</FormLabel>
              <Input
                type="text"
                name="residentialStatus"
                value={formData.residentialStatus}
                readOnly
              />
              {/* Conditional input for 'Others' */}
              {formData.residentialStatus === "others" && (
                <Input
                  type="text"
                  name="residentialStatusOthers"
                  value={formData.residentialStatusOthers}
                  readOnly
                  placeholder="Specify other residential status"
                />
              )}
            </FormControl>
          </VStack>

          {/* Family Situation and Employment */}
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
                value={formData.familySituationDetails}
                readOnly
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
                value={formData.financialSupportDetails}
                readOnly
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
                value={formData.familyEmploymentDetails}
                readOnly
              />
            </FormControl>
          </VStack>

          {/* Educational Background / Present Education */}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Educational Background / Present Education
            </Heading>

            {/* Mention the previous academic education? */}
            <FormControl>
              <FormLabel>Mention the previous academic education?</FormLabel>
              <Textarea
                name="previousEducationDetails"
                value={formData.previousEducationDetails}
                readOnly
              />
            </FormControl>

            {/* Name and Address of the previous institution */}
            <FormControl>
              <FormLabel>
                Name and Address of the previous institution:
              </FormLabel>
              <Textarea
                name="previousInstitutionDetails"
                value={formData.previousInstitutionDetails}
                readOnly
              />
            </FormControl>

            {/* Percentage of marks received previously */}
            <FormControl>
              <FormLabel>Percentage of marks received previously:</FormLabel>
              <Input
                type="number"
                name="previousMarksPercentage"
                value={formData.previousMarksPercentage}
                readOnly
              />
            </FormControl>

            {/* Mention the present Education/Training */}
            <FormControl>
              <FormLabel>Mention the present Education/Training</FormLabel>
              <Textarea
                name="presentEducationDetails"
                value={formData.presentEducationDetails}
                readOnly
              />
            </FormControl>

            {/* Name and address of the Present Institution of study */}
            <FormControl>
              <FormLabel>
                Name and address of the Present Institution of study:
              </FormLabel>
              <Textarea
                name="presentInstitutionDetails"
                value={formData.presentInstitutionDetails}
                readOnly
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
                value={formData.educationalAspiration}
                readOnly
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
                value={formData.sustainabilityDetails}
                readOnly
              />
            </FormControl>
          </VStack>

          {/* Information on Financial Support */}
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
              <Input
                type="text"
                name="eligibleForScholarship"
                value={formData.eligibleForScholarship}
                readOnly
              />
            </FormControl>

            {/* Expected amount of Scholarship */}
            <FormControl>
              <FormLabel>Expected amount of Scholarship</FormLabel>
              <Input
                type="number"
                name="expectedScholarshipAmount"
                value={formData.expectedScholarshipAmount}
                readOnly
              />
            </FormControl>

            {/* Financial contribution from the family? */}
            <FormControl>
              <FormLabel>Financial contribution from the family?</FormLabel>
              <Input
                type="number"
                name="familyFinancialContribution"
                value={formData.familyFinancialContribution}
                readOnly
              />
            </FormControl>

            {/* If no support from family, mention the reasons? */}
            <FormControl>
              <FormLabel>
                If no support from the family, mention the reasons?
              </FormLabel>
              <Textarea
                name="noFamilySupportReasons"
                value={formData.noFamilySupportReasons}
                readOnly
              />
            </FormControl>
          </VStack>

          {/* Submit Button */}
          <Button colorScheme="blue" type="submit" disabled>
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default EducationIndividual;
