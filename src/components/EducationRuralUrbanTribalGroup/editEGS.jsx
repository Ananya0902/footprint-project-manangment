import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Alert,
  AlertIcon,
  Checkbox,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import authAxios from "../../AuthAxios";

const ReviewEduRUTG = () => {
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  console.log(projectData);
  const [formData, setFormData] = useState({
    projectRegion:
      projectData.general_information.provincial_superior.ref.nameOfProvince,
    projectTitle: projectData.project_title || "",
    projectInchargeName:
      projectData.general_information.project_incharge.ref.name,
    projectInchargeEmail:
      projectData.general_information.project_incharge.ref.name,
    projectInchargeAgreement: true,
    presentProjectYear: projectData.present_project_year ?? "",
    projectNumber: projectData.project_number,
    address: projectData.general_information?.full_address ?? "",
    overallProjectPeriod:
      projectData.general_information?.overall_project_period || "",
    overallProjectBudget:
      projectData.general_information?.overall_project_budget || "",
    targetGroup: projectData.project_summary.target_group.map(
      (beneficiary) => ({
        name: beneficiary.name || "",
        caste: beneficiary.caste || "",
        occupationOfParents: beneficiary.occupation_of_parents || "",
        familyBackgroundAndNeedOfSupport:
          beneficiary.family_background_and_need_of_support || "",
        classOfStudyOrInstitution:
          beneficiary.class_of_study_or_name_of_institution || "",
        eligibilityOfScholarshipAndExpectedAmount:
          beneficiary.eligibility_of_scholarship_and_expected_amount || "",
        contributionFromFamily: beneficiary.contribution_from_family || "",
      })
    ),
    logicalFramework: {
      goal:
        projectData.project_summary?.solution_analysis_logical_framework
          ?.goal || "",
      objectives:
        projectData.project_summary?.solution_analysis_logical_framework?.objectives.map(
          (objective) => ({
            objective: objective.objective || "",
            results: [objective.results_and_outcomes], // Assuming it's a string
            activities: objective.activities.map((activity) => ({
              activity: activity.activity || "",
              months:
                activity.months.length < 12
                  ? [
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                      false,
                    ]
                  : activity.months,
              verification: activity.means_of_verification || "",
            })),
          })
        ) || [],
    },
    projectSummary: {
      projectLocation:
        projectData.project_summary?.project_location_geographical_area || "",
      workOfSisters:
        projectData.project_summary
          ?.work_of_sisters_of_st_anns_in_the_project_area || "",
      socioEconomicConditions:
        projectData.project_summary
          ?.general_socio_economic_conditions_of_the_beneficiaries || "",
      identifiedProblems:
        projectData.project_summary?.problems_identified_and_consequences || "",
      needOfProject: projectData.project_summary?.need_of_the_project || "",

      sustainability: projectData.project_summary?.sustainability || "",
      monitoringProcess:
        projectData.project_summary?.monitoring_process_of_the_project || "",
      evaluation: projectData.project_summary?.mode_of_evaluation || "",
    },
    budget: {
      expenses:
        projectData.project_summary?.budget?.expenses.map((expense) => ({
          description: expense.description || "",
          costs: expense.costs || 0,
        })) || [],
      total: projectData.project_summary?.budget?.total || 0,
    },
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  console.log(formData);
  // Populate formData from req

  const handleSubmit = async (e) => {
    // Send requestBody to the backend
    e.preventDefault();
    console.log("inside handle submit");

    const req = {
      project_title: formData.projectTitle,
      project_number: formData.projectNumber,
      general_information: {
        full_address: formData.address,
        overall_project_period: formData.overallProjectPeriod,
        overall_project_budget: parseInt(formData.overallProjectBudget), // Assuming it's a number
      },

      project_summary: {
        project_location_geographical_area:
          formData.projectSummary.projectLocation,
        work_of_sisters_of_st_anns_in_the_project_area:
          formData.projectSummary.workOfSisters,
        general_socio_economic_conditions_of_the_beneficiaries:
          formData.projectSummary.socioEconomicConditions,
        problems_identified_and_consequences:
          formData.projectSummary.identifiedProblems,
        need_of_the_project: formData.projectSummary.needOfProject,

        target_group: formData.targetGroup.map((target) => ({
          name: target.name,
          caste: target.caste,
          occupation_of_parents: target.occupationOfParents,
          family_background_and_need_of_support:
            target.familyBackgroundAndNeedOfSupport,
          class_of_study_or_name_of_institution:
            target.classOfStudyOrInstitution,
          eligibility_of_scholarship_and_expected_amount:
            target.eligibilityOfScholarshipAndExpectedAmount,
          contribution_from_family: target.contributionFromFamily,
        })),
        solution_analysis_logical_framework: {
          goal: formData.logicalFramework.goal,
          objectives: formData.logicalFramework.objectives.map((objective) => ({
            objective: objective.objective,
            results_and_outcomes: objective.results.join(","), // Assuming it's a string
            activities: objective.activities.map((activity) => ({
              activity: activity.activity,
              months: activity.months,
              means_of_verification: activity.verification,
            })),
          })),
        },
        sustainability: formData.sustainability,
        monitoring_process_of_the_project: formData.monitoringProcess,
        mode_of_evaluation: formData.evaluation,
        budget: {
          expenses: formData.budget.expenses.map((item) => ({
            description: item.description,
            costs: parseInt(item.costs), // Assuming it's a number
          })),
          total: parseInt(calculateTotalCosts("cost")) ?? 0, // Should be calculated
        },
      },
    };

    try {
      const res = await authAxios.put("/projects/editEGSApplicant", req);
      setIsLoading(false);
      if (res.data.success) {
        showToast({
          title: "Successful submission",
          duration: 5000,
          status: "success",
        });
        setIsSubmitted(true);
      } else {
        showToast({
          title: "Unsuccessful submission",
          duration: 5000,
          status: "error",
        });
      }
      console.log(res);
    } catch (e) {
      console.log(e);

      setIsLoading(false);
      showToast({
        title: "Unsuccessful submission",
        duration: 5000,
        status: "error",
      });
    }

    // Handle form submission logic here
    console.log("Form submitted with data:", formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProjectSummaryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      projectSummary: { ...prevData.projectSummary, [name]: value },
    }));
  };

  const handleTargetGroupChange = (index, field, value) => {
    const updatedTargetGroup = [...formData.targetGroup];
    updatedTargetGroup[index][field] = value;
    setFormData((prevData) => ({
      ...prevData,
      targetGroup: updatedTargetGroup,
    }));
  };

  const handleAddTargetGroupRow = () => {
    const updatedTargetGroup = [...formData.targetGroup];
    updatedTargetGroup.push({
      sn: updatedTargetGroup.length + 1,
      name: "",
      caste: "",
      occupationOfParents: "",
      familyBackgroundAndNeedOfSupport: "",
      classOfStudyOrInstitution: "",
      eligibilityOfScholarshipAndExpectedAmount: "",
      contributionFromFamily: "",
    });
    setFormData((prevData) => ({
      ...prevData,
      targetGroup: updatedTargetGroup,
    }));
  };

  const handleChangeObjective = (e, index, subIndex) => {
    const updatedData = { ...formData };

    if (e.target.name === "goal") {
      updatedData.logicalFramework.goal = e.target.value;
    } else if (e.target.name === "objective") {
      updatedData.logicalFramework.objectives[index].objective = e.target.value;
    } else if (e.target.name === "result") {
      updatedData.logicalFramework.objectives[index].results[subIndex] =
        e.target.value;
    } else if (e.target.name === "activity") {
      updatedData.logicalFramework.objectives[index].activities[
        subIndex
      ].activity = e.target.value;
    } else if (e.target.name === "verification") {
      updatedData.logicalFramework.objectives[index].activities[
        subIndex
      ].verification = e.target.value;
    }

    setFormData(updatedData);
  };

  const handleAddObjective = () => {
    const updatedData = { ...formData };
    updatedData.logicalFramework.objectives.push({
      objective: "",
      results: [""],
      activities: [],
    });
    setFormData(updatedData);
  };

  const handleAddResult = (index) => {
    const updatedData = { ...formData };
    updatedData.logicalFramework.objectives[index].results.push("");
    setFormData(updatedData);
  };

  const handleAddActivity = (index) => {
    const updatedData = { ...formData };
    updatedData.logicalFramework.objectives[index].activities.push({
      activity: "",
      verification: "",
      timeframe: Array.from({ length: 12 }).fill(false), // Initialize a new array for the timeframe
    });
    setFormData(updatedData);
  };
  const handleBudgetChange = (index, field, value) => {
    console.log(field, value);
    const updatedBudgetExpenses = [...formData.budget.expenses];

    updatedBudgetExpenses[index][field] = value;
    console.log(formData.budget.expenses);
    setFormData((prevData) => ({
      ...prevData,
      budget: { expenses: updatedBudgetExpenses },
    }));
  };

  const handleAddBudgetRow = () => {
    const updatedBudgetExpenses = [...formData.budget.expenses];
    updatedBudgetExpenses.push({
      description: "",
      costs: 0,
    });
    setFormData((prevData) => ({
      ...prevData,
      budget: { expenses: updatedBudgetExpenses },
    }));
  };

  const calculateTotalCosts = (field) => {
    return formData.budget.expenses
      .reduce((total, row) => total + parseFloat(row[field] || 0), 0)
      .toFixed(2);
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h2" size="lg">
          Education Rural Urban Tribal Group
        </Heading>

        {isSubmitted && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Form submitted successfully!
          </Alert>
        )}

        <VStack spacing={4} align="start" p={4}>
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            {/* Project Information */}

            <FormControl mb={4}>
              <FormLabel>Project Title</FormLabel>
              <Input
                type="text"
                name="projectTitle"
                onChange={handleChange}
                value={formData.projectTitle || ""}
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Project Region</FormLabel>
              <Input
                type="text"
                name="projectRegion"
                onChange={handleChange}
                value={formData.projectRegion || ""}
                required
              />
            </FormControl>

            {/* General Information */}
            <Heading as="h2" size="lg" mt={6} mb={4}>
              General Information
            </Heading>

            <FormControl mb={4}>
              <FormLabel>Overall Project Period</FormLabel>
              <Input
                type="text"
                name="overallProjectPeriod"
                onChange={handleChange}
                value={formData.overallProjectPeriod || ""}
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Overall Project Budget</FormLabel>
              <Input
                type="text"
                name="overallProjectBudget"
                onChange={handleChange}
                value={formData.overallProjectBudget || ""}
                required
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Full Address</FormLabel>
              <Input
                type="text"
                name="address"
                onChange={handleChange}
                value={formData.address || ""}
                required
              />
            </FormControl>

            <Table variant="simple" mb={4}>
              <Thead>
                <Tr>
                  <Th>Role</Th>
                  <Th>Name</Th>
                  <Th>Email</Th>
                </Tr>
              </Thead>
              <Tbody>
                {/* Row 1*/}

                {/* Project Coordinators */}
                <Tr>
                  <Td>Project Coordinator India</Td>
                  <Td>Sr. Nirmala Mathew</Td>

                  <Td>micostannsindia@gmail.com</Td>
                </Tr>
                <Tr>
                  <Td>Project Coordinator Switzerland</Td>
                  <Td>Mr. Samuel Imbach</Td>

                  <Td>s.imbach@mission-stanna</Td>
                </Tr>
              </Tbody>
            </Table>

            {/* Project Summary */}
            <Heading as="h2" size="lg" mt={6} mb={4}>
              Project Summary
            </Heading>

            <FormControl mb={4}>
              <FormLabel>Project Location - Geographical Area</FormLabel>
              <Textarea
                name="projectLocation"
                onChange={handleProjectSummaryChange}
                value={formData.projectSummary.projectLocation || ""}
                isrequired
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                Work of Sisters of St.Ann’s in the project area
              </FormLabel>
              <Textarea
                name="workOfSisters"
                onChange={handleProjectSummaryChange}
                value={formData.projectSummary.workOfSisters || ""}
                isrequired
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>
                General Socio Economic conditions of the Beneficiaries
              </FormLabel>
              <Textarea
                name="socioEconomicConditions"
                onChange={handleProjectSummaryChange}
                value={formData.projectSummary.socioEconomicConditions || ""}
                isrequired
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Problems identified and Consequences</FormLabel>
              <Textarea
                name="identifiedProblems"
                onChange={handleProjectSummaryChange}
                value={formData.projectSummary.identifiedProblems || ""}
                isrequired
              />
            </FormControl>

            <FormControl mb={4}>
              <FormLabel>Need of the project</FormLabel>
              <Textarea
                name="needOfProject"
                onChange={handleProjectSummaryChange}
                value={formData.projectSummary.needOfProject || ""}
                isrequired
              />
            </FormControl>

            {/* <FormControl mb={4}>
              <FormLabel>
                Identification of the Beneficiaries (how are the beneficiaries
                selected)
              </FormLabel>
              <Textarea
                name="beneficiarySelection"
                onChange={handleProjectSummaryChange}
                value={formData.projectSummary.beneficiarySelection || ""}
                isrequired
              />
            </FormControl> */}

            {/* Target Group Table */}
            <Heading as="h2" size="lg" mt={6} mb={4}>
              Target Group
            </Heading>

            <Table variant="simple" mb={4}>
              <Thead>
                <Tr>
                  <Th>Sn.</Th>
                  <Th>Name of the beneficiary</Th>
                  <Th>Caste</Th>
                  <Th>Occupation of parents</Th>
                  <Th>Family Background and need of support</Th>
                  <Th>Class of study/Name of the institution</Th>
                  <Th>Eligibility of scholarship & expected amount</Th>
                  <Th>Contribution from family</Th>
                </Tr>
              </Thead>
              <Tbody>
                {formData.targetGroup.map((row, index) => (
                  <Tr key={index}>
                    <Td>{row.sn}</Td>
                    <Td>
                      <Input
                        type="text"
                        name={`targetGroup[${index}].name`}
                        onChange={(e) =>
                          handleTargetGroupChange(index, "name", e.target.value)
                        }
                        value={row.name}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        name={`targetGroup[${index}].caste`}
                        onChange={(e) =>
                          handleTargetGroupChange(
                            index,
                            "caste",
                            e.target.value
                          )
                        }
                        value={row.caste}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        name={`targetGroup[${index}].occupationOfParents`}
                        onChange={(e) =>
                          handleTargetGroupChange(
                            index,
                            "occupationOfParents",
                            e.target.value
                          )
                        }
                        value={row.occupationOfParents}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        name={`targetGroup[${index}].familyBackgroundAndNeedOfSupport`}
                        onChange={(e) =>
                          handleTargetGroupChange(
                            index,
                            "familyBackgroundAndNeedOfSupport",
                            e.target.value
                          )
                        }
                        value={row.familyBackgroundAndNeedOfSupport}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        name={`targetGroup[${index}].classOfStudyOrInstitution`}
                        onChange={(e) =>
                          handleTargetGroupChange(
                            index,
                            "classOfStudyOrInstitution",
                            e.target.value
                          )
                        }
                        value={row.classOfStudyOrInstitution}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        name={`targetGroup[${index}].eligibilityOfScholarshipAndExpectedAmount`}
                        onChange={(e) =>
                          handleTargetGroupChange(
                            index,
                            "eligibilityOfScholarshipAndExpectedAmount",
                            e.target.value
                          )
                        }
                        value={row.eligibilityOfScholarshipAndExpectedAmount}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        name={`targetGroup[${index}].contributionFromFamily`}
                        onChange={(e) =>
                          handleTargetGroupChange(
                            index,
                            "contributionFromFamily",
                            e.target.value
                          )
                        }
                        value={row.contributionFromFamily}
                        required
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Add Row Button */}
            <Button onClick={handleAddTargetGroupRow} colorScheme="teal">
              Add Row
            </Button>

            {/* Logical Framework */}

            <Heading
              as="h1"
              size="xl"
              mb={6}
              align="center"
              justifyContent="center"
            >
              logical Framework
            </Heading>
            <FormControl>
              <FormLabel>Goal of the Project</FormLabel>
              <Textarea
                name="goal"
                value={formData.logicalFramework.goal}
                required
              />
            </FormControl>

            {/* Objectives */}

            <Heading
              as="h1"
              size="l"
              mb={6}
              align="center"
              justifyContent="center"
            >
              Objectives:-
            </Heading>
            {formData.logicalFramework.objectives.map((objective, index) => (
              <Box
                key={index}
                border="1px solid #ccc"
                borderRadius="lg"
                p={4}
                mb={8}
              >
                <VStack key={index} align="start" spacing={4} mb={8}>
                  {/* Objective */}
                  <FormControl>
                    <hr />
                    <FormLabel>Objective {index + 1}</FormLabel>
                    <Textarea
                      name="objective"
                      value={objective.objective}
                      onChange={(e) => handleChangeObjective(e, index)}
                      required
                    />
                  </FormControl>

                  {/* Results */}
                  <FormControl>
                    <FormLabel>Results</FormLabel>
                    {objective.results.map((result, subIndex) => (
                      <VStack key={subIndex} align="start" spacing={4} mb={8}>
                        <Textarea
                          name="result"
                          value={result}
                          onChange={(e) =>
                            handleChangeObjective(e, index, subIndex)
                          }
                          required
                        />
                        {/* <Button
                          onClick={() => handleAddResult(index)}
                          colorScheme="teal"
                        >
                          Add Result
                        </Button> */}
                      </VStack>
                    ))}
                  </FormControl>

                  {/* Activities and Means of Verification */}
                  <FormControl>
                    <FormLabel>Activities and Means of Verification</FormLabel>
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Activity</Th>
                          <Th>Means of Verification</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {objective.activities.map((activity, subIndex) => (
                          <Tr key={subIndex}>
                            <Td>
                              <Textarea
                                name="activity"
                                value={activity.activity}
                                onChange={(e) =>
                                  handleChangeObjective(e, index, subIndex)
                                }
                                required
                              />
                            </Td>
                            <Td>
                              <Textarea
                                name="verification"
                                value={activity.verification}
                                onChange={(e) =>
                                  handleChangeObjective(e, index, subIndex)
                                }
                                required
                              />
                            </Td>
                            <Td>
                              {/* Timeframe */}
                              <FormControl>
                                <FormLabel>Timeframe</FormLabel>
                                {activity.months.map((value, monthIndex) => (
                                  <Checkbox
                                    key={monthIndex}
                                    isChecked={value}
                                    onChange={(e) => {
                                      setFormData((prevData) => {
                                        prevData.logicalFramework.objectives[
                                          index
                                        ].activities[subIndex].months[
                                          monthIndex
                                        ] = !activity.months[monthIndex];
                                        return {
                                          ...prevData,
                                        };
                                      });
                                    }}
                                  >
                                    {new Date(2024, monthIndex).toLocaleString(
                                      "default",
                                      { month: "long" }
                                    )}
                                  </Checkbox>
                                ))}
                              </FormControl>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>

                    <Button
                      onClick={() => handleAddActivity(index)}
                      colorScheme="teal"
                    >
                      Add Activity
                    </Button>
                  </FormControl>

                  <Button
                    onClick={handleAddObjective}
                    colorScheme="purple"
                    ml="auto"
                  >
                    Add Objective
                  </Button>
                </VStack>
              </Box>
            ))}

            {/* Sustainability of the Project */}
            <FormControl>
              <FormLabel>Sustainability of the Project</FormLabel>
              <Textarea
                name="sustainability"
                value={formData.projectSummary.sustainability}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>

            {/* Explain the Monitoring Process of the Project */}
            <FormControl>
              <FormLabel>
                Explain the Monitoring Process of the Project
              </FormLabel>
              <Textarea
                name="monitoringProcess"
                value={formData.projectSummary.monitoringProcess}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>

            {/* Mode of Evaluation */}
            <FormControl>
              <FormLabel>Mode of Evaluation</FormLabel>
              <Textarea
                name="evaluation"
                value={formData.projectSummary.evaluation}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>

            {/* Budget Section */}
            <Heading as="h2" size="lg" mt={6} mb={4}>
              Budget
            </Heading>

            <Table variant="simple" mb={4}>
              <Thead>
                <Tr>
                  <Th>Description of Expense</Th>
                  <Th>Costs</Th>
                </Tr>
              </Thead>
              <Tbody>
                {formData.budget.expenses.map((row, index) => (
                  <Tr key={index}>
                    <Td>
                      <Input
                        type="text"
                        onChange={(e) =>
                          handleBudgetChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        name={`description`}
                        value={row.description}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        onChange={(e) =>
                          handleBudgetChange(
                            index,
                            e.target.name,
                            e.target.value
                          )
                        }
                        type="number"
                        name={`costs`}
                        value={row.costs}
                        required
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {/* Add Row Button */}
            <Button onClick={handleAddBudgetRow} colorScheme="teal">
              Add Expense
            </Button>

            {/* Calculate Total Cost */}
            <Heading as="h3" size="md" mb={5}>
              Total Cost: {calculateTotalCosts("costs")}
            </Heading>

            <Button
              colorScheme="blue"
              mx={3}
              type="submit"
              onClick={() => {
                formData.projectInchargeAgreement = true;
              }}
            >
              Confirm Edit
            </Button>
          </form>
        </VStack>
        {/* Submit Button */}
      </Box>
    </ChakraProvider>
  );
};

export default ReviewEduRUTG;
