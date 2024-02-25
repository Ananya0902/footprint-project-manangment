import React from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field, FieldArray } from "formik";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import authAxios from "../../AuthAxios.js";

const NextPhaseForm = () => {
  const navigate= useNavigate();
  const showToast = useToast();
  return (
    
    <Formik
      initialValues={{
        phase: "",
        society_name: "",
        project_title: "",
        project_highlights: "",
        key_data_of_project: {
          project_area: "",
          project_area_description: "",
          sister_in_charge: "",
          overall_project_budget: "",
          own_contribution: {
            total_budget: 0,
            budget_spent_previous_phases: [
              {
                phase: "",
                budget: 0,
              },
            ],
            budget_allocated_next_phase: 0,
          },
        },
        goal_and_objectives: {
          project_goal: "",
          objectives_previous: [],
          objectives: [
            {
              objective: "",
              results_outcome_previous_phases: "",
              activities_next_phase: [],
            },
          ],
        },
        beneficiaries_and_contribution: [
          { beneficiary_name: "", contribution: 0 },
        ],
        monitoring_reporting_evaluation: "",
        budget: [
          {
            description_of_expense: "",
            cost_last_year: 0,
            budget_current_year: 0,
          },
        ],
        conclusion: "",
      }}
      onSubmit={async (values) => {
        console.log(values);
        try {
          const res = await authAxios.post("projects/createNPDP", values);
          
          if (res.data.success) {
            showToast({
              title: "Successful submission",
              duration: 5000,
              status: "success",
            });navigate("/dashboardApplicant")
          } else {
            showToast({
              title: "Unsuccessful submission",
              duration: 5000,
              status: "error",
            });
          }
        } catch (e) {
          
          showToast({
            title: "Unsuccessful submission",
            duration: 5000,
            status: "error",
          });
        }
      }}
    >
      {({ values }) => (
        <Box p="4">
          <Form>
            <Heading
              as="h1"
              mb={6}
              justifyContent="center"
              pt="8"
              align="center"
            >
              Next Phase of Development Proposal
            </Heading>
            {/* Add form fields here */}
            <FormControl id="phase" isRequired mb={4}>
              <FormLabel>Phase</FormLabel>
              <Field as={Input} name="phase" />
            </FormControl>

            <FormControl id="society_name" isRequired mb={4}>
              <FormLabel>Society Name</FormLabel>
              <Field as={Input} name="society_name" />
            </FormControl>

            <FormControl id="project_title" isRequired mb={4}>
              <FormLabel>Project Title</FormLabel>
              <Field as={Input} name="project_title" />
            </FormControl>

            <FormControl id="project_hightlights" isRequired mb={4}>
              <FormLabel>Project Highlights</FormLabel>
              <Field as={Input} name="project_highlights" />
            </FormControl>

            <Heading size="md" mb={6} justifyContent="center" pt="8">
              Key Data of The Project
            </Heading>

            <FormControl id="project_area" isRequired>
              <FormLabel>Project Area</FormLabel>
              <Field name="key_data_of_project.project_area" as={Input} />
            </FormControl>

            <FormControl id="project_area_description">
              <FormLabel>Project Area(Description)</FormLabel>
              <Field
                name="key_data_of_project.project_area_description"
                as={Textarea}
                placeholder="Is the project area of the previous phase or are new villages taken up ( Full details of the villages to be enclosed as annexure)"
              />
            </FormControl>

            <FormControl id="sister_in_charge" isRequired>
              <FormLabel>Sister in Charge</FormLabel>
              <Field name="key_data_of_project.sister_in_charge" as={Input} />
            </FormControl>

            <FormControl id="overall_project_budget" isRequired>
              <FormLabel>Overall Project Budget</FormLabel>
              <Field
                type="number"
                name="key_data_of_project.overall_project_budget"
                as={Input}
              />
            </FormControl>
            {/* Contacts Table */}
            <Table variant="simple" mb={4}>
              <Thead>
                <Tr>
                  <Th>Role</Th>
                  <Th>Name</Th>
                  <Th>Cell Number</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Project Coordinators */}
                <Tr>
                  <Td>Project Coordinator India</Td>
                  <Td>Sr. Nirmala Mathew</Td>
                  <Td>Not Available</Td>
                  <Td>micostannsindia@gmail.com</Td>
                </Tr>
                <Tr>
                  <Td>Project Coordinator Luzern, Switzerland</Td>
                  <Td>Mr. Samuel Imbach</Td>
                  <Td>Not Available</Td>
                  <Td>s.imbach@mission-stanna.ch</Td>
                </Tr>
              </Tbody>
            </Table>
            <Heading size="base" mb={6} justifyContent="center" pt={8}>
              Own Contribution
            </Heading>
            <Box pl="4">
              <FormControl id="total_budget" isRequired>
                <FormLabel>Total Budget</FormLabel>
                <Field
                  name="key_data_of_project.own_contribution.total_budget"
                  as={Input}
                />
              </FormControl>

              {/* Budget Spent Previous Phases */}
              <FieldArray name="key_data_of_project.own_contribution.budget_spent_previous_phases">
                {(arrayHelpers) => (
                  <Box>
                    {values.key_data_of_project.own_contribution.budget_spent_previous_phases.map(
                      (budget, index) => (
                        <Box borderWidth={1} mt="4" mb="4" key={index} p="2">
                          <FormControl>
                            <FormLabel>Phase</FormLabel>
                            <Field
                              name={`key_data_of_project.own_contribution.budget_spent_previous_phases.${index}.phase`}
                              as={Input}
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Budget Spent</FormLabel>
                            <Field
                              name={`key_data_of_project.own_contribution.budget_spent_previous_phases.${index}.budget`}
                              as={Input}
                              type="number"
                            />
                          </FormControl>
                          <Button
                            mt="4"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                          >
                            Remove
                          </Button>
                        </Box>
                      )
                    )}
                    <Button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({ phase: "", budget: 0 })
                      }
                      mb="4"
                    >
                      Add Phase
                    </Button>
                  </Box>
                )}
              </FieldArray>

              <FormControl id="budget_allocated_next_phase" isRequired>
                <FormLabel>Budget Allocated for Next Phase</FormLabel>
                <Field
                  name="key_data_of_project.own_contribution.budget_allocated_next_phase"
                  as={Input}
                />
              </FormControl>
            </Box>

            <Heading size="md" mb={6} justifyContent="center" pt="8">
              Goal and Objective
            </Heading>
          
            <FormControl
              id="goal_and_objectives.project_goal"
              isRequired
              mb={4}
            >
              <FormLabel>Project Goal</FormLabel>
              <Field as={Textarea} name="goal_and_objectives.project_goal" />
            </FormControl>

            {/* Objectives */}
            <FieldArray name="goal_and_objectives.objectives">
              {(arrayHelpers) => (
                <div>
                  {values.goal_and_objectives.objectives.map(
                    (objective, index) => (
                      <Box key={index} mb={6} borderWidth={2} p={4}>
                        <FormControl
                          id={`goal_and_objectives.objectives.${index}.objective`}
                          isRequired
                          mb={4}
                        >
                          <FormLabel>{`Objective ${index + 1}`}</FormLabel>
                          <Field
                            as={Textarea}
                            name={`goal_and_objectives.objectives.${index}.objective`}
                          />
                        </FormControl>

                        <FormControl
                          id={`goal_and_objectives.objectives.${index}.results_outcome_previous_phases`}
                          isRequired
                          mb={4}
                        >
                          <FormLabel>Results Outcome Previous Phases</FormLabel>
                          <Field
                            as={Textarea}
                            name={`goal_and_objectives.objectives.${index}.results_outcome_previous_phases`}
                          />
                        </FormControl>

                        {/* Activities */}
                        <FieldArray
                          name={`goal_and_objectives.objectives.${index}.activities_next_phase`}
                        >
                          {(activityArrayHelpers) => (
                            <Box mb={4} p={4} borderWidth={1}>
                              {objective.activities_next_phase.map(
                                (activity, activityIndex) => (
                                  <div key={activityIndex} mb={4}>
                                    <FormControl
                                      id={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.activity`}
                                      isRequired
                                    >
                                      <FormLabel>{`Activity ${
                                        activityIndex + 1
                                      }`}</FormLabel>
                                      <Field
                                        as={Input}
                                        name={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.activity`}
                                      />
                                    </FormControl>

                                    <FormControl
                                      id={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.period`}
                                      isRequired
                                      mb={4}
                                    >
                                      <FormLabel>Period</FormLabel>
                                      <Field
                                        as="select"
                                        name={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.period`}
                                        placeholder="Select Period"
                                      >
                                        <option value="Daily">Daily</option>
                                        <option value="Weekly">Weekly</option>
                                        <option value="Monthly">Monthly</option>
                                        <option value="Quarterly">
                                          Quarterly
                                        </option>
                                        <option value="Annually">
                                          Annually
                                        </option>
                                      </Field>
                                    </FormControl>

                                    <FormControl
                                      id={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.schedule`}
                                      isRequired
                                      mb={4}
                                    >
                                      <FormLabel>Schedule</FormLabel>
                                      <Field
                                        as={Input}
                                        name={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.schedule`}
                                      />
                                    </FormControl>

                                    <FormControl
                                      id={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.incharge`}
                                      isRequired
                                    >
                                      <FormLabel>In Charge</FormLabel>
                                      <Field
                                        as={Input}
                                        name={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.incharge`}
                                      />
                                    </FormControl>

                                    <Button
                                      onClick={() =>
                                        activityArrayHelpers.remove(
                                          activityIndex
                                        )
                                      }
                                      mb={4}
                                      mt={4}
                                    >
                                      Remove Activity
                                    </Button>
                                  </div>
                                )
                              )}
                              <Button
                                onClick={() =>
                                  activityArrayHelpers.push({
                                    activity: "",
                                    timetable: {
                                      period: "",
                                      schedule: "",
                                      incharge: "",
                                    },
                                  })
                                }
                                mb={4}
                              >
                                Add Activity
                              </Button>
                            </Box>
                          )}
                        </FieldArray>

                        <Button
                          onClick={() => arrayHelpers.remove(index)}
                          mb={4}
                          mt={4}
                        >
                          Remove Objective
                        </Button>
                      </Box>
                    )
                  )}
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        results_outcome_previous_phases: "",
                        activities_next_phase: [],
                      })
                    }
                    mb={4}
                    ml={4}
                  >
                    Add Objective
                  </Button>
                </div>
              )}
            </FieldArray>

            <FormControl id="beneficiaries_and_contribution" isRequired mb={12}>
              <Heading size="md" mb={4} mt={4}>
                Benificiaries And Contribution
              </Heading>
              <FieldArray name="beneficiaries_and_contribution">
                {(arrayHelper) => (
                  <Box>
                    {values.beneficiaries_and_contribution.map(
                      (benificiaries, index) => (
                        <Box borderWidth={1} p="2" key={index}>
                          <FormControl
                            id={`beneficiaries_and_contribution.${index}.beneficiary_name`}
                            isRequired
                          >
                            <FormLabel>{`Beneficiary ${index + 1}`}</FormLabel>
                            <Field
                              name={`beneficiaries_and_contribution.${index}.beneficiary_name`}
                              as={Input}
                            />
                          </FormControl>
                          <FormControl
                            id={`beneficiaries_and_contribution.${index}.contribution`}
                            isRequired
                          >
                            <FormLabel>Contribution</FormLabel>
                            <Field
                              name={`beneficiaries_and_contribution.${index}.contribution`}
                              as={Input}
                              type="number"
                            />
                          </FormControl>

                          <Button
                            mt="4"
                            onClick={() => {
                              arrayHelper.remove(index);
                            }}
                          >
                            Remove Benefeciary
                          </Button>
                        </Box>
                      )
                    )}
                    <Button
                      mt={4}
                      onClick={() => {
                        arrayHelper.push({
                          beneficiary_name: "",
                          contribution: 0,
                        });
                      }}
                    >
                      Add Beneficiary
                    </Button>
                  </Box>
                )}
              </FieldArray>
            </FormControl>

            <FormControl id="monitoring_reporting_evaluation" isRequired mb={4}>
              <FormLabel>Monitoring, Reporting, and Evaluation</FormLabel>
              <Field as={Textarea} name="monitoring_reporting_evaluation" />
            </FormControl>

            {/* Budget */}
            <FieldArray name="budget">
              {(arrayHelpers) => (
                <div>
                  {values.budget.map((budgetItem, index) => (
                    <Box key={index} mb={6} borderWidth={1} p={2}>
                      <FormControl
                        id={`budget.${index}.description_of_expense`}
                        isRequired
                        mb={4}
                      >
                        <FormLabel>Description of Expense</FormLabel>
                        <Field
                          as={Input}
                          name={`budget.${index}.description_of_expense`}
                        />
                      </FormControl>

                      <FormControl
                        id={`budget.${index}.cost_last_year`}
                        isRequired
                        mb={4}
                      >
                        <FormLabel>Cost Last Year</FormLabel>
                        <Field
                          as={Input}
                          type="number"
                          name={`budget.${index}.cost_last_year`}
                        />
                      </FormControl>

                      <FormControl
                        id={`budget.${index}.budget_current_year`}
                        isRequired
                        mb={4}
                      >
                        <FormLabel>Budget Current Year</FormLabel>
                        <Field
                          as={Input}
                          type="number"
                          name={`budget.${index}.budget_current_year`}
                        />
                      </FormControl>

                      <Button onClick={() => arrayHelpers.remove(index)} mb={4}>
                        Remove
                      </Button>
                    </Box>
                  ))}
                  <Button
                    onClick={() =>
                      arrayHelpers.push({
                        description_of_expense: "",
                        cost_last_year: 0,
                        budget_current_year: 0,
                      })
                    }
                    mb={4}
                  >
                    Add Budget Item
                  </Button>
                </div>
              )}
            </FieldArray>

            {/* Conclusion */}
            <FormControl id="conclusion" isRequired mb={4}>
              <FormLabel>Conclusion</FormLabel>
              <Field as={Textarea} name="conclusion" />
            </FormControl>

            <Button mt={4} colorScheme="teal" type="submit">
              Submit
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default NextPhaseForm;
