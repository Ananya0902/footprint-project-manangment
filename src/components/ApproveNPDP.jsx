import React from "react";
import { Formik, Form, Field, FieldArray } from "formik";
import {
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  Box,
} from "@chakra-ui/react";
import authAxios from "../AuthAxios.js";

const ApproveNPDP = () => {
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
        commentReviewer:"nothing",
        commentApprover:"",
      }}
      onSubmit={async (values) => {
        console.log(values);
        try {
          const res = await authAxios.post("projects/createNPDP", values);
          console.log(res);
        } catch (error) {
          console.log(error);
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
            <FormControl id="phase"  mb={4}>
              <FormLabel>Phase</FormLabel>
              <Field as={Input} name="phase" readOnly />
            </FormControl>

            <FormControl id="society_name"  mb={4}>
              <FormLabel>Society Name</FormLabel>
              <Field as={Input} name="society_name" readOnly />
            </FormControl>

            <FormControl id="project_title"  mb={4}>
              <FormLabel>Project Title</FormLabel>
              <Field as={Input} name="project_title" readOnly />
            </FormControl>

            <FormControl id="project_highlights"  mb={4}>
              <FormLabel>Project Highlights</FormLabel>
              <Field as={Input} name="project_highlights" readOnly />
            </FormControl>

            <Heading size="md" mb={6} justifyContent="center" pt="8">
              Key Data of The Project
            </Heading>

            <FormControl id="project_area" >
              <FormLabel>Project Area</FormLabel>
              <Field
                name="key_data_of_project.project_area"
                as={Input}
                readOnly
              />
            </FormControl>

            <FormControl id="project_area_description">
              <FormLabel>Project Area(Description)</FormLabel>
              <Field
                name="key_data_of_project.project_area_description"
                as={Textarea}
                placeholder="Is the project area of the previous phase or are new villages taken up ( Full details of the villages to be enclosed as annexure)"
                readOnly
              />
            </FormControl>

            <FormControl id="sister_in_charge" >
              <FormLabel>Sister in Charge</FormLabel>
              <Field
                name="key_data_of_project.sister_in_charge"
                as={Input}
                readOnly
              />
            </FormControl>

            <FormControl id="overall_project_budget" >
              <FormLabel>Overall Project Budget</FormLabel>
              <Field
                type="number"
                name="key_data_of_project.overall_project_budget"
                as={Input}
                readOnly
              />
            </FormControl>

            <Heading size="base" mb={6} justifyContent="center" pt={8}>
              Own Contribution
            </Heading>
            <Box pl="4">
              <FormControl id="total_budget" >
                <FormLabel>Total Budget</FormLabel>
                <Field
                  name="key_data_of_project.own_contribution.total_budget"
                  as={Input}
                  readOnly
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
                              readOnly
                            />
                          </FormControl>
                          <FormControl>
                            <FormLabel>Budget Spent</FormLabel>
                            <Field
                              name={`key_data_of_project.own_contribution.budget_spent_previous_phases.${index}.budget`}
                              as={Input}
                              type="number"
                              readOnly
                            />
                          </FormControl>
                          {/* <Button
                            mt="4"
                            type="button"
                            onClick={() => arrayHelpers.remove(index)}
                            readOnly
                          >
                            Remove
                          </Button> */}
                        </Box>
                      )
                    )}
                    {/* <Button
                      type="button"
                      onClick={() =>
                        arrayHelpers.push({ phase: "", budget: 0 })
                      }
                      mb="4"
                      readOnly
                    >
                      Add Phase
                    </Button> */}
                  </Box>
                )}
              </FieldArray>

              <FormControl id="budget_allocated_next_phase" >
                <FormLabel>Budget Allocated for Next Phase</FormLabel>
                <Field
                  name="key_data_of_project.own_contribution.budget_allocated_next_phase"
                  as={Input}
                  readOnly
                />
              </FormControl>
            </Box>

            <Heading size="md" mb={6} justifyContent="center" pt="8">
  Objectives Section
</Heading>

<FormControl id="goal_and_objectives.project_goal"  mb={4}>
  <FormLabel>Project Goal</FormLabel>
  <Field
    as={Textarea}
    name="goal_and_objectives.project_goal"
    readOnly
  />
</FormControl>

{/* Objectives */}
<FieldArray name="goal_and_objectives.objectives">
  {(arrayHelpers) => (
    <div>
      {values.goal_and_objectives.objectives.map((objective, index) => (
        <Box key={index} mb={6} borderWidth={2} p={4}>
          <FormControl
            id={`goal_and_objectives.objectives.${index}.objective`}
            
            mb={4}
          >
            <FormLabel>{`Objective ${index + 1}`}</FormLabel>
            <Field
              as={Textarea}
              name={`goal_and_objectives.objectives.${index}.objective`}
              readOnly
            />
          </FormControl>

          <FormControl
            id={`goal_and_objectives.objectives.${index}.results_outcome_previous_phases`}
            
            mb={4}
          >
            <FormLabel>Results Outcome Previous Phases</FormLabel>
            <Field
              as={Textarea}
              name={`goal_and_objectives.objectives.${index}.results_outcome_previous_phases`}
              readOnly
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
                        
                      >
                        <FormLabel>{`Activity ${activityIndex + 1}`}</FormLabel>
                        <Field
                          as={Input}
                          name={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.activity`}
                          readOnly
                        />
                      </FormControl>

                      <FormControl
                        id={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.period`}
                        
                        mb={4}
                      >
                        <FormLabel>Period</FormLabel>
                        <Field
                          as="select"
                          name={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.period`}
                          placeholder="Select Period"
                          readOnly
                        >
                          <option value="Daily">Daily</option>
                          <option value="Weekly">Weekly</option>
                          <option value="Monthly">Monthly</option>
                          <option value="Quarterly">Quarterly</option>
                          <option value="Annually">Annually</option>
                        </Field>
                      </FormControl>

                      <FormControl
                        id={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.schedule`}
                        
                        mb={4}
                      >
                        <FormLabel>Schedule</FormLabel>
                        <Field
                          as={Input}
                          name={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.schedule`}
                          readOnly
                        />
                      </FormControl>

                      <FormControl
                        id={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.incharge`}
                        
                      >
                        <FormLabel>In Charge</FormLabel>
                        <Field
                          as={Input}
                          name={`goal_and_objectives.objectives.${index}.activities_next_phase.${activityIndex}.timetable.incharge`}
                          readOnly
                        />
                      </FormControl>

                      {/* <Button
                        onClick={() =>
                          activityArrayHelpers.remove(activityIndex)
                        }
                        mb={4}
                        mt={4}
                        readOnly
                      >
                        Remove Activity
                      </Button> */}
                    </div>
                  )
                )}
                {/* <Button
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
                  readOnly
                >
                  Add Activity
                </Button> */}
              </Box>
            )}
          </FieldArray>

          {/* <Button
            onClick={() => arrayHelpers.remove(index)}
            mb={4}
            mt={4}
            readOnly
          >
            Remove Objective
          </Button> */}
        </Box>
      ))}
      {/* <Button
        onClick={() =>
          arrayHelpers.push({
            results_outcome_previous_phases: "",
            activities_next_phase: [],
          })
        }
        mb={4}
        ml={4}
        readOnly
      >
        Add Objective
      </Button> */}
    </div>
  )}
</FieldArray>

<FormControl id="beneficiaries_and_contribution"  mb={12}>
  <Heading size="md" mb={4} mt={4}>
    Beneficiaries And Contribution
  </Heading>
  <FieldArray name="beneficiaries_and_contribution">
    {(arrayHelper) => (
      <Box>
        {values.beneficiaries_and_contribution.map(
          (beneficiary, index) => (
            <Box borderWidth={1} p="2" key={index}>
              <FormControl
                id={`beneficiaries_and_contribution.${index}.beneficiary_name`}
                
              >
                <FormLabel>{`Beneficiary ${index + 1}`}</FormLabel>
                <Field
                  name={`beneficiaries_and_contribution.${index}.beneficiary_name`}
                  as={Input}
                  readOnly
                />
              </FormControl>
              <FormControl
                id={`beneficiaries_and_contribution.${index}.contribution`}
                
              >
                <FormLabel>Contribution</FormLabel>
                <Field
                  name={`beneficiaries_and_contribution.${index}.contribution`}
                  as={Input}
                  readOnly
                />
              </FormControl>
              {/* <Button
                mt="4"
                onClick={() => {
                  arrayHelper.remove(index);
                }}
                readOnly
              >
                Remove Beneficiary
              </Button> */}
            </Box>
          )
        )}
        {/* <Button
          mt={4}
          onClick={() => {
            arrayHelper.push({
              beneficiary_name: "",
              contribution: 0,
            });
          }}
          readOnly
        >
          Add Beneficiary
        </Button> */}
      </Box>
    )}
  </FieldArray>
</FormControl>

<FormControl id="monitoring_reporting_evaluation"  mb={4}>
  <FormLabel>Monitoring, Reporting, and Evaluation</FormLabel>
  <Field as={Textarea} name="monitoring_reporting_evaluation" readOnly />
</FormControl>

            {/* Budget */}
<FieldArray name="budget">
  {(arrayHelpers) => (
    <div>
      {values.budget.map((budgetItem, index) => (
        <Box key={index} mb={6} borderWidth={1} p={2}>
          <FormControl
            id={`budget.${index}.description_of_expense`}
            
            mb={4}
          >
            <FormLabel>Description of Expense</FormLabel>
            <Field
              as={Input}
              name={`budget.${index}.description_of_expense`}
              readOnly
            />
          </FormControl>

          <FormControl
            id={`budget.${index}.cost_last_year`}
            
            mb={4}
          >
            <FormLabel>Cost Last Year</FormLabel>
            <Field
              as={Input}
              type="number"
              name={`budget.${index}.cost_last_year`}
              readOnly
            />
          </FormControl>

          <FormControl
            id={`budget.${index}.budget_current_year`}
            
            mb={4}
          >
            <FormLabel>Budget Current Year</FormLabel>
            <Field
              as={Input}
              type="number"
              name={`budget.${index}.budget_current_year`}
              readOnly
            />
          </FormControl>

          {/* <Button
            onClick={() => arrayHelpers.remove(index)}
            mb={4}
            readOnly
          >
            Remove
          </Button> */}
        </Box>
      ))}
      {/* <Button
        onClick={() =>
          arrayHelpers.push({
            description_of_expense: "",
            cost_last_year: 0,
            budget_current_year: 0,
          })
        }
        mb={4}
        readOnly
      >
        Add Budget Item
      </Button> */}
    </div>
  )}
</FieldArray>


            {/* Conclusion */}
            <FormControl id="conclusion"  mb={4}>
              <FormLabel>Conclusion</FormLabel>
              <Field as={Textarea} name="conclusion" readOnly/>
            </FormControl>


            {/* Comment(for Reviewer) */}
            <FormControl id="comment"  mb={4}>
              <FormLabel>Comment(for Reviewer)</FormLabel>
              <Field as={Textarea} name="commentReviewer" readOnly/>
            </FormControl>

            {/* Comment(for Approver) */}
            <FormControl id="comment" isRequired mb={4}>
              <FormLabel>Comment(for Approver)</FormLabel>
              <Field as={Textarea} name="commentApprover"/>
            </FormControl>

            <Button mt={4} colorScheme="teal" mx={3} type="submit">
              Submit
            </Button>
            <Button mt={4} colorScheme="red"  mx={3} type="submit">
              Decline
            </Button>
          </Form>
        </Box>
      )}
    </Formik>
  );
};

export default ApproveNPDP;
