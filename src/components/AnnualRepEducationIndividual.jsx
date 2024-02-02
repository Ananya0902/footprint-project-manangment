import React from 'react';
import { Box, Button, Input, Textarea, FormControl, FormLabel, FormErrorMessage, Table, Thead, Tbody, Tr, Th, Td, Center, Heading, VStack, HStack, FormHelperText, Flex } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';

const AnnualRepEducationIndividual = () => {
  const initialValues = {
    date: '',
    reportingPeriodFrom: '',
    reportingPeriodTo: '',
    projectSupportedBy: '',
    communityName: '',
    projectNature: '',
    beneficiary: '',
    schoolAndClass: '',
    address: '',
    familySituation: '',
    academicProgress: '',
    difficultiesFacedByStudent: '',
    challengesInImplementation: '',
    statementOfExpenditure: [{ description: '', payments: '' }],
    totalPayment: '',
    conclusion: '',
    photos: [],
  };

  // Custom function to calculate the total payment
const calculateTotalPayment = (statementOfExpenditure) => {
    return statementOfExpenditure.reduce((total, exp) => total + Number(exp.payments), 0);
  };

  const onSubmit = (values) => {
    // Implement your submission logic here
    console.log(values);
  };

  return (
    <Box p={4}>
      <Center>
        <Heading as="h1" mb={6}>
          ANNUAL REPORT – INDIVIDUAL EDUCATIONAL PROJECT
        </Heading>
      </Center>

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

              <HStack spacing={4}>
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
              </HStack>

              <Field name="projectSupportedBy">
    {({ field, form }) => (
      <FormControl isInvalid={form.errors.projectSupportedBy && form.touched.projectSupportedBy}>
        <FormLabel>Project Supported by</FormLabel>
        <Input type="text" {...field} />
        <FormErrorMessage>{form.errors.projectSupportedBy}</FormErrorMessage>
      </FormControl>
    )}
  </Field>

  <Field name="communityName">
    {({ field, form }) => (
      <FormControl isInvalid={form.errors.communityName && form.touched.communityName}>
        <FormLabel>Name of the Community</FormLabel>
        <Input type="text" {...field} />
        <FormErrorMessage>{form.errors.communityName}</FormErrorMessage>
      </FormControl>
    )}
  </Field>

  <Field name="projectNature">
    {({ field, form }) => (
      <FormControl isInvalid={form.errors.projectNature && form.touched.projectNature}>
        <FormLabel>Nature of the Project</FormLabel>
        <Input type="text" {...field} />
        <FormErrorMessage>{form.errors.projectNature}</FormErrorMessage>
      </FormControl>
    )}
  </Field>

  <Field name="beneficiary">
    {({ field, form }) => (
      <FormControl isInvalid={form.errors.beneficiary && form.touched.beneficiary}>
        <FormLabel>Name of the Beneficiary / Student</FormLabel>
        <Input type="text" {...field} />
        <FormErrorMessage>{form.errors.beneficiary}</FormErrorMessage>
      </FormControl>
    )}
  </Field>

  <Field name="schoolAndClass">
    {({ field, form }) => (
      <FormControl isInvalid={form.errors.schoolAndClass && form.touched.schoolAndClass}>
        <FormLabel>Name of the school and class</FormLabel>
        <Input type="text" {...field} />
        <FormErrorMessage>{form.errors.schoolAndClass}</FormErrorMessage>
      </FormControl>
    )}
  </Field>

  <Field name="address">
    {({ field, form }) => (
      <FormControl isInvalid={form.errors.address && form.touched.address}>
        <FormLabel>Address of the student</FormLabel>
        <Input type="text" {...field} />
        <FormErrorMessage>{form.errors.address}</FormErrorMessage>
      </FormControl>
    )}
  </Field>


  <Field name="familySituation">
    {({ field, form }) => (
      <FormControl isInvalid={form.errors.familySituation && form.touched.familySituation}>
        <FormLabel>Family situation of the student and why we have decided to support the student?</FormLabel>
        <Textarea {...field} />
        <FormErrorMessage>{form.errors.familySituation}</FormErrorMessage>
      </FormControl>
    )}
  </Field>

  <Field name="academicProgress">
    {({ field, form }) => (
      <FormControl isInvalid={form.errors.academicProgress && form.touched.academicProgress}>
        <FormLabel>Detailed description of the progress of the student academically and other overall development</FormLabel>
        <Textarea {...field} />
        <FormErrorMessage>{form.errors.academicProgress}</FormErrorMessage>
      </FormControl>
    )}
  </Field>

  <Field name="difficultiesFacedByStudent">
    {({ field, form }) => (
      <FormControl isInvalid={form.errors.difficultiesFacedByStudent && form.touched.difficultiesFacedByStudent}>
        <FormLabel>Difficulties or challenges faced if any by the student?</FormLabel>
        <Textarea {...field} />
        <FormErrorMessage>{form.errors.difficultiesFacedByStudent}</FormErrorMessage>
      </FormControl>
    )}
  </Field>

  <Field name="challengesInImplementation">
    {({ field, form }) => (
      <FormControl isInvalid={form.errors.challengesInImplementation && form.touched.challengesInImplementation}>
        <FormLabel>Challenges faced in implementation of this support by the Community / In-charge.</FormLabel>
        <Textarea {...field} />
        <FormErrorMessage>{form.errors.challengesInImplementation}</FormErrorMessage>
      </FormControl>
    )}
  </Field>

                     {/* Statement of Expenditure Table */}
        <Box mt={6}>
          <Heading as="h2" fontSize="lg" mb={2}>
            STATEMENT OF EXPENDITURE
          </Heading>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Description</Th>
                <Th>Payments</Th>
              </Tr>
            </Thead>
            <Tbody>
              {formik.values.statementOfExpenditure.map((exp, index) => (
                <Tr key={index}>
                  <Td>
                    <Field name={`statementOfExpenditure.${index}.description`}>
                      {({ field, form }) => (
                        <Input type="text" {...field} />
                      )}
                    </Field>
                  </Td>
                  <Td>
                    <Field name={`statementOfExpenditure.${index}.payments`}>
                      {({ field, form }) => (
                        <Input type="number" {...field} />
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
            onClick={() => formik.setValues({
              ...formik.values,
              statementOfExpenditure: [
                ...formik.values.statementOfExpenditure,
                { description: '', payments: '' },
              ],
            })}
          >
            Add Row
          </Button>
        </Box>

        {/* Auto-calculated Total of Payment */}
        <FormControl>
          <FormLabel>Total of Payment (auto-calculated)</FormLabel>
          <Input
            type="number"
            value={calculateTotalPayment(formik.values.statementOfExpenditure)}
            readOnly
          />
        </FormControl>

        <Field name="conclusion">
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.conclusion && form.touched.conclusion}>
              <FormLabel>Conclusion</FormLabel>
              <Textarea {...field} />
              <FormErrorMessage>{form.errors.conclusion}</FormErrorMessage>
            </FormControl>
          )}
        </Field>

        <Field name="photos">
  {({ field, form }) => (
    <FormControl isInvalid={form.errors.photos && form.touched.photos}>
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

export default AnnualRepEducationIndividual;
