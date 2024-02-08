import React from "react";
import {
  Box,
  Button,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center,
  Heading,
  VStack,
  HStack,
  FormHelperText,
  Flex,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

const AnnualRepHealthIndividual = () => {
  const initialValues = {
    communityName: "",
    date: "",
    natureOfProject: "",
    reportingPeriodFrom: "",
    reportingPeriodTo: "",
    provincialSuperiorName: "",
    provincialSuperiorContact: "",
    projectInchargeName: "",
    projectInchargeContact: "",
    address: "",
    projectDuration: 0,
    totalAmountSanctioned: 0,
    beneficiaryNameAndAddress: "",
    projectPurposeAndGoal: "",
    projectImplementationDescription: "",
    impactOnBeneficiary: "",
    challengesFaced: "",
    utilizationDetails: [
      {
        budgetHead: "",
        approvedAmount: 0,
        expenditureHead: "",
        expenditureDetails: 0,
      },
    ],
    closingBalance: 0,
    totalApprovedAmount: 0,
    totalExpenditure: 0,
    beneficiaryContribution: "",
    conclusion: "",
    photos: [],
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
      <Center>
        <Heading as="h1" mb={6}>
          ANNUAL REPORT - Health INDIVIDUAL PROJECT
        </Heading>
      </Center>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {(formik) => (
          <Form>
            <VStack spacing={4} align="start">
              <Field name="communityName">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.communityName && form.touched.communityName
                    }
                  >
                    <FormLabel>Name of the Community</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.communityName}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

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

              <Field name="natureOfProject">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.natureOfProject &&
                      form.touched.natureOfProject
                    }
                  >
                    <FormLabel>Nature of the Project</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.natureOfProject}
                    </FormErrorMessage>
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

              <Field name="address">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.address && form.touched.address}
                  >
                    <FormLabel>Address</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="projectDuration">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.projectDuration &&
                      form.touched.projectDuration
                    }
                  >
                    <FormLabel>Duration of the project</FormLabel>
                    <Input type="number" {...field} />
                    <FormErrorMessage>
                      {form.errors.projectDuration}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="totalAmountSanctioned">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.totalAmountSanctioned &&
                      form.touched.totalAmountSanctioned
                    }
                  >
                    <FormLabel>Total amount sanctioned</FormLabel>
                    <Input type="number" {...field} />
                    <FormErrorMessage>
                      {form.errors.totalAmountSanctioned}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="beneficiaryNameAndAddress">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.beneficiaryNameAndAddress &&
                      form.touched.beneficiaryNameAndAddress
                    }
                  >
                    <FormLabel>Name of the Beneficiary & address</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.beneficiaryNameAndAddress}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="projectPurposeAndGoal">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.projectPurposeAndGoal &&
                      form.touched.projectPurposeAndGoal
                    }
                  >
                    <FormLabel>
                      Give brief description of the purpose and goal of the
                      Project
                    </FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.projectPurposeAndGoal}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="projectImplementationDescription">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.projectImplementationDescription &&
                      form.touched.projectImplementationDescription
                    }
                  >
                    <FormLabel>
                      Detailed description of the implementation of the project
                    </FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.projectImplementationDescription}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="impactOnBeneficiary">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.impactOnBeneficiary &&
                      form.touched.impactOnBeneficiary
                    }
                  >
                    <FormLabel>
                      Effect / Impact on the life of the beneficiary
                    </FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.impactOnBeneficiary}
                    </FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="difficultiesOrChallenges">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.difficultiesOrChallenges &&
                      form.touched.difficultiesOrChallenges
                    }
                  >
                    <FormLabel>
                      Are there any difficulties or challenges faced?
                    </FormLabel>
                    <Textarea {...field} />
                    <FormErrorMessage>
                      {form.errors.difficultiesOrChallenges}
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

              <Field name="beneficiaryContribution">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={
                      form.errors.beneficiaryContribution &&
                      form.touched.beneficiaryContribution
                    }
                  >
                    <FormLabel>Contribution of beneficiary if any</FormLabel>
                    <Input type="text" {...field} />
                    <FormErrorMessage>
                      {form.errors.beneficiaryContribution}
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

              <Field name="photos">
                {({ field, form }) => (
                  <FormControl
                    isInvalid={form.errors.photos && form.touched.photos}
                  >
                    <FormLabel>Photos</FormLabel>
                    <Input
                      type="file"
                      multiple
                      onChange={(event) =>
                        form.setFieldValue("photos", event.currentTarget.files)
                      }
                      onBlur={field.onBlur}
                    />
                    <FormErrorMessage>{form.errors.photos}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

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

export default AnnualRepHealthIndividual;
