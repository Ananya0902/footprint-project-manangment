import React from 'react';
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea,
  HStack,
} from '@chakra-ui/react';
import { Field, FieldArray, Form, Formik } from 'formik';

const BiAnnualEducationIndividualReport = () => {
  const initialValues = {
    date: '',
    reportingPeriodFrom: '',
    reportingPeriodTo: '',
    communityAddress: '',
    provincialSuperiorName: '',
    provincialSuperiorContact: 0,
    projectInchargeName: '',
    projectInchargeContact: 0,
    beneficiaryName: '',
    presentEducation: '',
    institutionName: '',
    institutionAddress: '',
    initialInitiatives: '',
    progressStatus: '',
    familyResponse: '',
    challengesFaced: '',
    utilizationDetails: [
      {
        budgetHead: '',
        approvedAmount: 0,
        expenditureHead: '',
        expenditureDetails: 0,
      },
    ],
    closingBalance: 0,
    totalApprovedAmount: 0,
    totalExpenditure: 0,
    familyContribution: '',
    governmentScholarship: '',
    amountReceived: 0,
    receivingMonthYear: '',
    conclusion: '',
    beneficiaryPhoto: null,
  };

  const calculateTotalApprovedAmount = (utilizationDetails) => {
    return utilizationDetails.reduce(
      (total, util) => total + Number(util.approvedAmount),
      0
    );
  };

  const calculateTotalExpenditure = (utilizationDetails) => {
    return utilizationDetails.reduce(
      (total, util) => total + Number(util.expenditureDetails),
      0
    );
  };

  const onSubmit = (values) => {
    // Implement your submission logic here
    console.log(values);
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={6}>
        BI-ANNUAL REPORT – EDUCATIONAL SUPPORT - INDIVIDUAL PROJECT
      </Heading>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <VStack spacing={4} align="start">
            <Field name="date">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.date && form.touched.date}
                  >
                    <FormLabel>Date</FormLabel>
                    <Input type="date" {...field} />
                    <FormErrorMessage>{form.errors.date}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <HStack spacing={4}>
                <Field name="reportingPeriodFrom">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.reportingPeriodFrom &&
                        form.touched.reportingPeriodFrom
                      }
                    >
                      <FormLabel>Reporting Period From</FormLabel>
                      <Input type="text" {...field} />
                      <FormErrorMessage>
                        {form.errors.reportingPeriodFrom}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="reportingPeriodTo">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.reportingPeriodTo &&
                        form.touched.reportingPeriodTo
                      }
                    >
                      <FormLabel>Reporting Period To</FormLabel>
                      <Input type="text" {...field} />
                      <FormErrorMessage>
                        {form.errors.reportingPeriodTo}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </HStack>

              <Field name="provincialSuperiorName">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.provincialSuperiorName &&
                      form.touched.provincialSuperiorName
                    }
                  >
                    <FormLabel>Name of the Provincial Superior</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.provincialSuperiorName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="provincialSuperiorContact">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.provincialSuperiorContact &&
                      form.touched.provincialSuperiorContact
                    }
                  >
                    <FormLabel>
                      Contact Number of the Provincial Superior
                    </FormLabel>
                    <Input type="number" {...field} />
                    <FormErrorMessage>
                      {form.errors.provincialSuperiorContact}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="projectInchargeName">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.projectInchargeName &&
                      form.touched.projectInchargeName
                    }
                  >
                    <FormLabel>Name of the Project Incharge</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.projectInchargeName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="projectInchargeContact">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.projectInchargeContact &&
                      form.touched.projectInchargeContact
                    }
                  >
                    <FormLabel>
                      Contact Number of the Project Incharge
                    </FormLabel>
                    <Input type="number" {...field} />
                    <FormErrorMessage>
                      {form.errors.projectInchargeContact}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="communityAddress">
  {({ field, form }) => (
    <FormControl
      isInvalid={
        form.errors.communityAddress && form.touched.communityAddress
      }
    >
      <FormLabel>Name of the Community/Address</FormLabel>
      <Input type="text" {...field} />
      <FormErrorMessage>
        {form.errors.communityAddress}
      </FormErrorMessage>
    </FormControl>
  )}
</Field>

              

<Field name="beneficiaryName">
  {({ field, form }) => (
    <FormControl
      isInvalid={
        form.errors.beneficiaryName && form.touched.beneficiaryName
      }
    >
      <FormLabel>Name of the Beneficiary</FormLabel>
      <Input type="text" {...field} />
      <FormErrorMessage>
        {form.errors.beneficiaryName}
      </FormErrorMessage>
    </FormControl>
  )}
</Field>

              <Field name="presentEducation">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.presentEducation &&
                      form.touched.presentEducation
                    }
                  >
                    <FormLabel>Present Education</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.presentEducation}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="institutionName">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.institutionName &&
                      form.touched.institutionName
                    }
                  >
                    <FormLabel>Name of the Institution</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.institutionName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>


              <Field name="institutionAddress">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.institutionAddress &&
                      form.touched.institutionAddress
                    }
                  >
                    <FormLabel>Address of the Institution</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.institutionAddress}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="initialInitiatives">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.initialInitiatives &&
                      form.touched.initialInitiatives
                    }
                  >
                    <FormLabel>
                      Initial Initiatives taken for the Implementation of the Project
                    </FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.initialInitiatives}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="progressStatus">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.progressStatus &&
                      form.touched.progressStatus
                    }
                  >
                    <FormLabel>
                      Status / Progress of the Beneficiary in Studies / Other Activities
                    </FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.progressStatus}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="familyResponse">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.familyResponse &&
                      form.touched.familyResponse
                    }
                  >
                    <FormLabel>Response of the Family</FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.familyResponse}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="challengesFaced">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.challengesFaced &&
                      form.touched.challengesFaced
                    }
                  >
                    <FormLabel>Difficulties or Challenges Faced</FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.challengesFaced}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

            
              {/* Utilization Details Table */}
              <Box mt={6}>
                <Heading as="h2" fontSize="lg" mb={2}>
                  UTILIZATION DETAILS OF THE BUDGET
                </Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>DETAILS OF AMOUNT SANCTIONED</Th>
                      <Th>PAYMENTS</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {formik.values.utilizationDetails.map((util, index) => (
                      <Tr key={index}>
                        <Td>
                          <Field
                            name={`utilizationDetails.${index}.budgetHead`}
                          >
                            {({ field, form }) => (
                              <Input
                                type="text"
                                placeholder="Particulars of budget heads"
                                {...field}
                              />
                            )}
                          </Field>
                          <Field
                            name={`utilizationDetails.${index}.approvedAmount`}
                          >
                            {({ field, form }) => (
                              <Input
                                type="number"
                                placeholder="Approved Amount"
                                {...field}
                              />
                            )}
                          </Field>
                        </Td>
                        <Td>
                          <Field
                            name={`utilizationDetails.${index}.expenditureHead`}
                          >
                            {({ field, form }) => (
                              <Input
                                type="text"
                                placeholder="Particulars of budget heads"
                                {...field}
                              />
                            )}
                          </Field>
                          <Field
                            name={`utilizationDetails.${index}.expenditureDetails`}
                          >
                            {({ field, form }) => (
                              <Input
                                type="number"
                                placeholder="Expenditure Details"
                                {...field}
                              />
                            )}
                          </Field>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Button
                  mt={2}
                  colorScheme="teal"
                  onClick={() =>
                    formik.setValues({
                      ...formik.values,
                      utilizationDetails: [
                        ...formik.values.utilizationDetails,
                        {
                          budgetHead: "",
                          approvedAmount: 0,
                          expenditureHead: "",
                          expenditureDetails: 0,
                        },
                      ],
                    })
                  }
                >
                  Add Row
                </Button>
              </Box>

              <Field name="closingBalance">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.closingBalance && form.touched.closingBalance
                    }
                  >
                    <FormLabel>
                      Closing Balance of Expenditure details
                    </FormLabel>
                    <Input
                      type="number"
                      placeholder="Enter Closing Balance"
                      {...field}
                    />
                    <FormErrorMessage>
                      {form.errors.closingBalance}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <FormControl>
                <FormLabel>
                  Total of Amount approved as per project proposal
                  (auto-calculated)
                </FormLabel>
                <Input
                  type="number"
                  value={calculateTotalApprovedAmount(
                    formik.values.utilizationDetails
                  )}
                  readOnly
                />
              </FormControl>

              <FormControl>
                <FormLabel>
                  Total of Expenditure details (auto-calculated)
                </FormLabel>
                <Input
                  type="number"
                  value={calculateTotalExpenditure(
                    formik.values.utilizationDetails
                  )}
                  readOnly
                />
              </FormControl>


              <Field name="amountReceived">
  {({ field, form }) => (
    <FormControl
      isInvalid={
        form.errors.amountReceived && form.touched.amountReceived
      }
    >
      <FormLabel>Amount Received</FormLabel>
      <Input type="number" {...field} />
      <FormErrorMessage>
        {form.errors.amountReceived}
      </FormErrorMessage>
    </FormControl>
  )}
</Field>

<Field name="monthYearReceiving">
  {({ field, form }) => (
    <FormControl
      isInvalid={
        form.errors.monthYearReceiving && form.touched.monthYearReceiving
      }
    >
      <FormLabel>Month and Year of Receiving</FormLabel>
      <Input type="text" {...field} />
      <FormErrorMessage>
        {form.errors.monthYearReceiving}
      </FormErrorMessage>
    </FormControl>
  )}
</Field>

              <Field name="familyContribution">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.familyContribution &&
                      form.touched.familyContribution
                    }
                  >
                    <FormLabel>Contribution from the Family</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.familyContribution}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="governmentScholarship">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.governmentScholarship &&
                      form.touched.governmentScholarship
                    }
                  >
                    <FormLabel>Government Scholarship Received</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.governmentScholarship}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              

              <Field name="conclusion">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.conclusion && form.touched.conclusion
                    }
                  >
                    <FormLabel>Conclusion</FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.conclusion}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="beneficiaryPhoto">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.beneficiaryPhoto &&
                      form.touched.beneficiaryPhoto
                    }
                  >
                    <FormLabel>Photo of the Beneficiary</FormLabel>
                    <Input
                      type="file"
                      onChange={(event) =>
                        form.setFieldValue(
                          'beneficiaryPhoto',
                          event.currentTarget.files[0]
                        )
                      }
                      onBlur={field.onBlur}
                    />
                    <FormErrorMessage>
                      {form.errors.beneficiaryPhoto}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Submit Button */}
              <Button
                mt={6}
                colorScheme="teal"
                isLoading={formik.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default BiAnnualEducationIndividualReport;
