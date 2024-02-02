import React from "react";
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
} from "@chakra-ui/react";
import { Field, FieldArray, Form, Formik } from "formik";

const AnnualEducationInstitutionReport = () => {
  const initialValues = {
    date: "",
    reportingPeriodFrom: "",
    reportingPeriodTo: "",
    projectTitle: "",
    institutionName: "",
    provincialSuperiorName: "",
    projectInchargeName: "",
    province: "",
    place: "",
    beneficiariesStatistics: "",
    projectGoal: "",
    projectObjectives: "",
    beneficiaryTable: [
      {
        sn: 1,
        name: "",
        presentStudy: "",
        changesInLife: "",
      },
    ],
    opportunitiesAndParticipation: "",
    challengesFaced: "",
    statementOfAccount: [
      {
        slNo: 1,
        beneficiary: "",
        yearOfStudy: 0,
        amountSanctioned: 0,
        amountUtilized: 0,
        remarks: "",
      },
    ],
    discontinuedStudentsDetails: "",
    changesInAmountDistribution: "",
    concludingRemarks: "",
    groupPhotos: null,
  };

  const onSubmit = (values) => {
    // Implement your submission logic here
    console.log(values);
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={6}>
      INSTITUTIONAL EDUCATION- ANNUAL REPORTING FORMAT
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

              <Field name="projectTitle">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.projectTitle && form.touched.projectTitle
                    }
                  >
                    <FormLabel>Title of the Project</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.projectTitle}
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
                    <FormLabel>Name of the Institution / Address</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.institutionName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

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

              <Field name="province">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.province && form.touched.province}
                  >
                    <FormLabel>Province</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>{form.errors.province}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="place">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.place && form.touched.place}
                  >
                    <FormLabel>Place</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>{form.errors.place}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="beneficiariesStatistics">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.beneficiariesStatistics &&
                      form.touched.beneficiariesStatistics
                    }
                  >
                    <FormLabel>
                      Statistics of beneficiaries in the project
                    </FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.beneficiariesStatistics}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="projectGoal">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.projectGoal && form.touched.projectGoal
                    }
                  >
                    <FormLabel>Goal of the Project</FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.projectGoal}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="projectObjectives">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.projectObjectives &&
                      form.touched.projectObjectives
                    }
                  >
                    <FormLabel>Objectives of the Project</FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.projectObjectives}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Beneficiary Table */}
              <Box mt={6}>
                <Heading as="h2" fontSize="lg" mb={2}>
                  Beneficiary Table
                </Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Sn.</Th>
                      <Th>Name</Th>
                      <Th>Present Study</Th>
                      <Th>
                        Changes seen in the life of the student/progress in
                        studies his / her overall development
                      </Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {formik.values.beneficiaryTable.map(
                      (beneficiary, index) => (
                        <Tr key={index}>
                          <Td>{beneficiary.sn}</Td>
                          <Td>
                            <Field name={`beneficiaryTable.${index}.name`}>
                              {({ field, form }) => (
                                <Input
                                  type="text"
                                  placeholder="Name"
                                  {...field}
                                />
                              )}
                            </Field>
                          </Td>
                          <Td>
                            <Field
                              name={`beneficiaryTable.${index}.presentStudy`}
                            >
                              {({ field, form }) => (
                                <Input
                                  type="text"
                                  placeholder="Present Study"
                                  {...field}
                                />
                              )}
                            </Field>
                          </Td>
                          <Td>
                            <Field
                              name={`beneficiaryTable.${index}.changesInLife`}
                            >
                              {({ field, form }) => (
                                <Input
                                  type="text"
                                  placeholder="Changes in Life"
                                  {...field}
                                />
                              )}
                            </Field>
                          </Td>
                        </Tr>
                      )
                    )}
                  </Tbody>
                </Table>

                <Button
                  mt={2}
                  colorScheme="teal"
                  onClick={() =>
                    formik.setValues({
                      ...formik.values,
                      beneficiaryTable: [
                        ...formik.values.beneficiaryTable,
                        {
                          sn: formik.values.beneficiaryTable.length + 1,
                          name: "",
                          presentStudy: "",
                          changesInLife: "",
                        },
                      ],
                    })
                  }
                >
                  Add Row
                </Button>
              </Box>

              <Field name="opportunitiesAndParticipation">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.opportunitiesAndParticipation &&
                      form.touched.opportunitiesAndParticipation
                    }
                  >
                    <FormLabel>
                      Mention the Other opportunities given and participation of
                      the project students apart from their academic studies
                    </FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.opportunitiesAndParticipation}
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
                    <FormLabel>
                      What are the challenges, difficulties, problems etc faced
                      in the implementation of the project.{" "}
                    </FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.challengesFaced}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              {/* Statement of Account Table */}
              <Box mt={6}>
                <Heading as="h2" fontSize="lg" mb={2}>
                  Statement of Account
                </Heading>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Sl.No.</Th>
                      <Th>Beneficiary</Th>
                      <Th>Present Year of Study</Th>
                      <Th>Amount Sanctioned</Th>
                      <Th>Amount Utilised</Th>
                      <Th>Remarks</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <FieldArray name="statementOfAccount">
                      {({ push, remove }) => (
                        <>
                          {formik.values.statementOfAccount.map(
                            (account, index) => (
                              <Tr key={index}>
                                <Td>{account.slNo}</Td>
                                <Td>
                                  <Field
                                    name={`statementOfAccount.${index}.beneficiary`}
                                  >
                                    {({ field }) => (
                                      <Input
                                        type="text"
                                        placeholder="Beneficiary"
                                        {...field}
                                      />
                                    )}
                                  </Field>
                                </Td>
                                <Td>
                                  <Field
                                    name={`statementOfAccount.${index}.yearOfStudy`}
                                  >
                                    {({ field }) => (
                                      <Input
                                        type="number"
                                        placeholder="Year of Study"
                                        {...field}
                                      />
                                    )}
                                  </Field>
                                </Td>
                                <Td>
                                  <Field
                                    name={`statementOfAccount.${index}.amountSanctioned`}
                                  >
                                    {({ field }) => (
                                      <Input
                                        type="number"
                                        placeholder="Amount Sanctioned"
                                        {...field}
                                      />
                                    )}
                                  </Field>
                                </Td>
                                <Td>
                                  <Field
                                    name={`statementOfAccount.${index}.amountUtilised`}
                                  >
                                    {({ field }) => (
                                      <Input
                                        type="number"
                                        placeholder="Amount Utilised"
                                        {...field}
                                      />
                                    )}
                                  </Field>
                                </Td>
                                <Td>
                                  <Field
                                    name={`statementOfAccount.${index}.remarks`}
                                  >
                                    {({ field }) => (
                                      <Input
                                        type="text"
                                        placeholder="Remarks"
                                        {...field}
                                      />
                                    )}
                                  </Field>
                                </Td>
                                <Td>
                                  <Button
                                    colorScheme="red"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </Td>

                                <Td>
                                  <Button
                                    colorScheme="red"
                                    onClick={() => remove(index)}
                                  >
                                    Remove
                                  </Button>
                                </Td>
                              </Tr>
                            )
                          )}
                          <Button
                            mt={2}
                            colorScheme="teal"
                            onClick={() =>
                              push({
                                slNo:
                                  formik.values.statementOfAccount.length + 1,
                                beneficiary: "",
                                yearOfStudy: "",
                                amountSanctioned: "",
                                amountUtilised: "",
                                remarks: "",
                              })
                            }
                          >
                            Add Row
                          </Button>
                        </>
                      )}
                    </FieldArray>
                  </Tbody>
                </Table>
              </Box>

              <Field name="studentsDiscontinuedStudies">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.studentsDiscontinuedStudies &&
                      form.touched.studentsDiscontinuedStudies
                    }
                  >
                    <FormLabel>
                      Have any students discontinued the studies? Give details.
                    </FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.studentsDiscontinuedStudies}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="changesInAmountDistribution">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.changesInAmountDistribution &&
                      form.touched.changesInAmountDistribution
                    }
                  >
                    <FormLabel>
                      Have you made any changes in allotting in the distribution
                      of the amount allotted to each student? If so, why? Give
                      explanation.
                    </FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.changesInAmountDistribution}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="concludingRemarks">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.concludingRemarks &&
                      form.touched.concludingRemarks
                    }
                  >
                    <FormLabel>Concluding remarks</FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.concludingRemarks}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="beneficiariesGroupPhoto">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.beneficiariesGroupPhoto &&
                      form.touched.beneficiariesGroupPhoto
                    }
                  >
                    <FormLabel>
                      Group photos of the beneficiaries in uniform
                    </FormLabel>
                    <Input
                      type="file"
                      onChange={(event) =>
                        form.setFieldValue(
                          "beneficiariesGroupPhoto",
                          event.currentTarget.files[0]
                        )
                      }
                      onBlur={field.onBlur}
                    />
                    <FormErrorMessage>
                      {form.errors.beneficiariesGroupPhoto}
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

export default AnnualEducationInstitutionReport;
