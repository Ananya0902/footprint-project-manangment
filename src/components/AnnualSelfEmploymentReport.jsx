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
} from '@chakra-ui/react';
import { Field, FieldArray, Form, Formik } from 'formik';

const AnnualSelfEmployment = () => {
  const initialValues = {
    date: '',
    sisterInCharge: '',
    projectInCharge: '',
    beneficiary: '',
    natureOfSelfEmployment: '',
    projectSanctionedDate: '',
    amountSanctioned: 0,
    reportingPeriodFrom: '',
    reportingPeriodTo: '',
    outcomeOfProject: [
      { averageMonthlyIncome: 0, annualIncome: 0, positiveImpact: '', challengesFaced: '', lessonsLearned: '' },
    ],
    accountStatement: [
      { budgetHead: '', amountApproved: 0, expenditure: 0 },
    ],
    totalAmountApproved: 0,
    totalExpenditure: 0,
    
    remarks: '',
    photos: [],
  };

  const calculateTotalAmountApproved = (values) => {
    return values.accountStatement.reduce((total, entry) => total + entry.amountApproved, 0);
  };

  const calculateTotalExpenditure = (values) => {
    return values.accountStatement.reduce((total, entry) => total + entry.expenditure, 0);
  };

  const calculateTotalLeft = (values) => {
    return values.totalAmountApproved - values.totalExpenditure;
  };

  const onSubmit = (values) => {
    // Implement your submission logic here
    console.log(values);
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={6}>
        ANNUAL SELF EMPLOYMENT
      </Heading>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <VStack spacing={4} align="start">
            
<Field name="date">
  {({ field, form }) => (
    <FormControl isInvalid={form.errors.date && form.touched.date}>
      <FormLabel>Date</FormLabel>
      <Input type="date" {...field} />
      <FormErrorMessage>{form.errors.date}</FormErrorMessage>
    </FormControl>
  )}
</Field>

<Field name="sisterInCharge">
  {({ field, form }) => (
    <FormControl isInvalid={form.errors.sisterInCharge && form.touched.sisterInCharge}>
      <FormLabel>Name of Sister-In-Charge</FormLabel>
      <Input type="text" {...field} />
      <FormErrorMessage>{form.errors.sisterInCharge}</FormErrorMessage>
    </FormControl>
  )}
</Field>

<Field name="projectInCharge">
  {({ field, form }) => (
    <FormControl isInvalid={form.errors.projectInCharge && form.touched.projectInCharge}>
      <FormLabel>Name of the Project Incharge</FormLabel>
      <Input type="text" {...field} />
      <FormErrorMessage>{form.errors.projectInCharge}</FormErrorMessage>
    </FormControl>
  )}
</Field>

<Field name="beneficiary">
  {({ field, form }) => (
    <FormControl isInvalid={form.errors.beneficiary && form.touched.beneficiary}>
      <FormLabel>Name of the Beneficiary</FormLabel>
      <Input type="text" {...field} />
      <FormErrorMessage>{form.errors.beneficiary}</FormErrorMessage>
    </FormControl>
  )}
</Field>

<Field name="natureOfSelfEmployment">
  {({ field, form }) => (
    <FormControl isInvalid={form.errors.natureOfSelfEmployment && form.touched.natureOfSelfEmployment}>
      <FormLabel>Nature of Self Employment</FormLabel>
      <Input type="text" {...field} />
      <FormErrorMessage>{form.errors.natureOfSelfEmployment}</FormErrorMessage>
    </FormControl>
  )}
</Field>

<Field name="projectSanctionedDate">
  {({ field, form }) => (
    <FormControl isInvalid={form.errors.projectSanctionedDate && form.touched.projectSanctionedDate}>
      <FormLabel>When was the Project Sanctioned (month & year)</FormLabel>
      <Input type="date" {...field} />
      <FormErrorMessage>{form.errors.projectSanctionedDate}</FormErrorMessage>
    </FormControl>
  )}
</Field>

<Field name="amountSanctioned">
  {({ field, form }) => (
    <FormControl isInvalid={form.errors.amountSanctioned && form.touched.amountSanctioned}>
      <FormLabel>Amount Sanctioned for the Project</FormLabel>
      <Input type="number" {...field} />
      <FormErrorMessage>{form.errors.amountSanctioned}</FormErrorMessage>
    </FormControl>
  )}
</Field>

<Field name="reportingPeriodFrom">
  {({ field, form }) => (
    <FormControl isInvalid={form.errors.reportingPeriodFrom && form.touched.reportingPeriodFrom}>
      <FormLabel>Reporting Period From</FormLabel>
      <Input type="text" {...field} />
      <FormErrorMessage>{form.errors.reportingPeriodFrom}</FormErrorMessage>
    </FormControl>
  )}
</Field>

<Field name="reportingPeriodTo">
  {({ field, form }) => (
    <FormControl isInvalid={form.errors.reportingPeriodTo && form.touched.reportingPeriodTo}>
      <FormLabel>Reporting Period To</FormLabel>
      <Input type="text" {...field} />
      <FormErrorMessage>{form.errors.reportingPeriodTo}</FormErrorMessage>
    </FormControl>
  )}
</Field>
{/* ... (Remaining code) ... */}



              <Heading as="h2" fontSize="lg" mb={2}>
             OUTCOME OF THE PROJECT IN THE LIFE OF THE BENEFICIARY
              </Heading>
              {/* Outcome of the Project Table */}
              <Table variant="simple" mt={6}>
                <Thead>
                  <Tr>
                    <Th>Average Monthly Income</Th>
                    <Th>Annual Income</Th>
                    <Th>Positive Impact</Th>
                    <Th>Challenges Faced</Th>
                    <Th>Lessons Learned</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <FieldArray name="outcomeOfProject">
                    {({ push, remove }) => (
                      <>
                        {formik.values.outcomeOfProject.map((outcome, index) => (
                          <Tr key={index}>
                            <Td>
                              <Field name={`outcomeOfProject.${index}.averageMonthlyIncome`}>
                                {({ field, form }) => (
                                  <Input type="number" {...field} />
                                )}
                              </Field>
                            </Td>
                            <Td>
                              <Field name={`outcomeOfProject.${index}.annualIncome`}>
                                {({ field, form }) => (
                                  <Input type="number" {...field} />
                                )}
                              </Field>
                            </Td>
                            <Td>
                              <Field name={`outcomeOfProject.${index}.positiveImpact`}>
                                {({ field, form }) => (
                                  <Textarea {...field} />
                                )}
                              </Field>
                            </Td>
                            <Td>
                              <Field name={`outcomeOfProject.${index}.challengesFaced`}>
                                {({ field, form }) => (
                                  <Textarea {...field} />
                                )}
                              </Field>
                            </Td>
                            <Td>
                              <Field name={`outcomeOfProject.${index}.lessonsLearned`}>
                                {({ field, form }) => (
                                  <Textarea {...field} />
                                )}
                              </Field>
                            </Td>
                            <Td>
                              <Button colorScheme="red" onClick={() => remove(index)}>
                                Remove
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                        <Tr>
                          <Td colSpan={5}>
                            <Button onClick={() => push({ averageMonthlyIncome: 0, annualIncome: 0, positiveImpact: '', challengesFaced: '', lessonsLearned: '' })}>
                              Add Row
                            </Button>
                          </Td>
                        </Tr>
                      </>
                    )}
                  </FieldArray>
                </Tbody>
              </Table>


              <Heading as="h2" fontSize="lg" mb={2}>
              Account Statement Table(Reciept and Expenditure)
             </Heading>
              {/* Account Statement Table */}
              <Table variant="simple" mt={6}>
                <Thead>
                  <Tr>
                    <Th>Particulars of Budget Heads</Th>
                    <Th>Amount Approved</Th>
                    <Th>Expenditure</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <FieldArray name="accountStatement">
                    {({ push, remove }) => (
                      <>
                        {formik.values.accountStatement.map((entry, index) => (
                          <Tr key={index}>
                            <Td>
                              <Field name={`accountStatement.${index}.budgetHead`}>
                                {({ field, form }) => (
                                  <Input type="text" {...field} />
                                )}
                              </Field>
                            </Td>
                            <Td>
                              <Field name={`accountStatement.${index}.amountApproved`}>
                                {({ field, form }) => (
                                  <Input type="number" {...field} />
                                )}
                              </Field>
                            </Td>
                            <Td>
                              <Field name={`accountStatement.${index}.expenditure`}>
                                {({ field, form }) => (
                                  <Input type="number" {...field} />
                                )}
                              </Field>
                            </Td>
                            <Td>
                              <Button colorScheme="red" onClick={() => remove(index)}>
                                Remove
                              </Button>
                            </Td>
                          </Tr>
                        ))}
                        <Tr>
                          <Td colSpan={3}>
                            <Button onClick={() => push({ budgetHead: '', amountApproved: 0, expenditure: 0 })}>
                              Add Row
                            </Button>
                          </Td>
                        </Tr>
                      </>
                    )}
                  </FieldArray>
                </Tbody>
              </Table>

              {/* Auto-calculated fields */}
              <FormControl mt={6}>
                <FormLabel>Total Amount Approved (auto-calculated)</FormLabel>
                <Input type="number" value={calculateTotalAmountApproved(formik.values)} readOnly />
              </FormControl>

              <FormControl>
                <FormLabel>Total Expenditure (auto-calculated)</FormLabel>
                <Input type="number" value={calculateTotalExpenditure(formik.values)} readOnly />
              </FormControl>

              

              <Field name="remarks">
                {({ field, form }) => (
                  <FormControl mt={6} isInvalid={form.errors.remarks && form.touched.remarks}>
                    <FormLabel>Remarks if any</FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>{form.errors.remarks}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="photos">
                {({ field, form }) => (
                  <FormControl mt={6} isInvalid={form.errors.photos && form.touched.photos}>
                    <FormLabel>Photos</FormLabel>
                    <Input
                      type="file"
                      multiple
                      onChange={(event) => form.setFieldValue('photos', event.currentTarget.files)}
                      onBlur={field.onBlur}
                    />
                    <FormErrorMessage>{form.errors.photos}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button mt={6} colorScheme="teal" isLoading={formik.isSubmitting} type="submit">
                Submit
              </Button>
            </VStack>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default AnnualSelfEmployment;
