import React, { useState } from "react";

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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react";
import authAxios from "../../AuthAxios";
import { useParams } from "react-router-dom";

const EditHIV = () => {
  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  console.log(projectData);
  const showToast = useToast();
  const [budgetRows, setBudgetRows] = useState(
    projectData.budget.budget_particular.map((item) => ({
      description: item.expense_description || "",
      costsLastYear: item.costs_last_year || "",
      budgetCurrentYear: item.budget_current_year || "",
    }))
  );
  const [formData, setFormData] = useState({
    projectInCharge: projectData.mailing_list.project_in_charge.ref,
    projectTitle: projectData.project_title || "",
    projectRegion: projectData.general_information.project_region || "",
    institutionName: projectData.general_information.institution_name || "",
    overallProjectPeriod:
      projectData.general_information.overall_project_period || "",
    overallProjectBudget:
      projectData.general_information.overall_project_budget || "",
    presidentOfSocietyName:
      projectData.mailing_list.president_of_the_society.name || "",
    presidentOfSocietyEmail:
      projectData.mailing_list.president_of_the_society.email || "",
    supportProgrammesTillDate:
      projectData.key_information.support_programmes_till_date || "",
    bridgeEducation: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[0]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[0]
          .present_academic_year || "",
    },
    kindergarten: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[1]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[1]
          .present_academic_year || "",
    },
    otherEducation: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[2]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[2]
          .present_academic_year || "",
    },
    bridgeSchool: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[3]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[3]
          .present_academic_year || "",
    },
    primarySchool: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[4]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[4]
          .present_academic_year || "",
    },
    otherEducation610: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[5]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[5]
          .present_academic_year || "",
    },
    secondarySchool: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[6]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[6]
          .present_academic_year || "",
    },
    highSchool: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[7]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[7]
          .present_academic_year || "",
    },
    otherEducation1115: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[8]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[8]
          .present_academic_year || "",
    },
    undergraduate: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[9]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[9]
          .present_academic_year || "",
    },
    technicalVocationalEducation: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[10]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[10]
          .present_academic_year || "",
    },
    youth16AndAbovebridgeSchool: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[11]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[11]
          .present_academic_year || "",
    },
    otherEducation16Above: {
      previousYear:
        projectData.key_information.age_profile_of_children_and_youth[12]
          .previous_year || "",
      presentYear:
        projectData.key_information.age_profile_of_children_and_youth[12]
          .present_academic_year || "",
    },

    personalSituation: {
      childrenWithParents: {
        previousYear:
          projectData.key_information.personal_situation_of_children_youth[0]
            .previous_year || "",
        presentYear:
          projectData.key_information.personal_situation_of_children_youth[0]
            .present_academic_year || "",
      },
      semiOrphans: {
        previousYear:
          projectData.key_information.personal_situation_of_children_youth[1]
            .previous_year || "",
        presentYear:
          projectData.key_information.personal_situation_of_children_youth[1]
            .present_academic_year || "",
      },
      orphans: {
        previousYear:
          projectData.key_information.personal_situation_of_children_youth[2]
            .previous_year || "",
        presentYear:
          projectData.key_information.personal_situation_of_children_youth[2]
            .present_academic_year || "",
      },
      hivInfectedAffected: {
        previousYear:
          projectData.key_information.personal_situation_of_children_youth[3]
            .previous_year || "",
        presentYear:
          projectData.key_information.personal_situation_of_children_youth[3]
            .present_academic_year || "",
      },
      differentlyAbledChildren: {
        previousYear:
          projectData.key_information.personal_situation_of_children_youth[4]
            .previous_year || "",
        presentYear:
          projectData.key_information.personal_situation_of_children_youth[4]
            .present_academic_year || "",
      },
      parentsInConflict: {
        previousYear:
          projectData.key_information.personal_situation_of_children_youth[5]
            .previous_year || "",
        presentYear:
          projectData.key_information.personal_situation_of_children_youth[5]
            .present_academic_year || "",
      },
      otherAliments: {
        previousYear:
          projectData.key_information.personal_situation_of_children_youth[6]
            .previous_year || "",
        presentYear:
          projectData.key_information.personal_situation_of_children_youth[6]
            .present_academic_year || "",
      },
    },
    economicBackground: {
      agriculturalLabour:
        projectData.key_information.economic_background_of_parents[0].number ||
        0,
      marginalFarmers:
        projectData.key_information.economic_background_of_parents[1].number ||
        0,
      parentsSelfEmployed:
        projectData.key_information.economic_background_of_parents[2].number ||
        0,
      parentsInformalSector:
        projectData.key_information.economic_background_of_parents[3].number ||
        0,
      anyOther:
        projectData.key_information.economic_background_of_parents[4].number ||
        0,
    },
    challengesFacedByTheBenificiary:
      projectData.challenges_faced_by_the_benificiary || "",
    focusAreasInPresentYear: projectData.focus_areas_in_present_year || "",
    monitoringAndEvaluation: projectData.monitoring_and_evaluation || "",
    sustainability: projectData.sustainability || "",
    mailingList: {
      projectInCharge: {
        name: projectData.mailing_list.project_in_charge.ref.name,
        email: projectData.mailing_list.project_in_charge.ref.email,
        contact: projectData.mailing_list.project_in_charge.ref.mobile,
        agree: projectData.mailing_list.project_in_charge.agree || false,
        date: projectData.mailing_list.project_in_charge.date || "",
      },
    },
    logicalFramework: {
      goal: projectData.solution_analysis_logical_framework.goal || "",
      objectives: [
        {
          objective:
            projectData.solution_analysis_logical_framework.objectives[0]
              .objective || "",
          results: projectData.solution_analysis_logical_framework.objectives[0]
            .results || [""],
          activities: projectData.solution_analysis_logical_framework
            .objectives[0].activities || [{}],
        },
      ],
    },
  });

  console.log(formData);

  // Update the state with the modified formDataCopy
  const achievementsCopy = {}; // Create a copy of achievements to avoid direct mutation

  // Assuming projectData contains academic, sport, and other achievements arrays
  achievementsCopy.academic = projectData.academic || [];
  achievementsCopy.sport = projectData.sport || [];
  achievementsCopy.other = projectData.other || [];

  // Update the state with the modified achievementsCopy
  // Map budget data to budgetRows

  // Update the state with the modified budgetRowsCopy
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [achievements, setAchievements] = useState({
    achievementsCopy,
  });

  // State to manage dynamic rows in the budget table

  console.log(budgetRows);

  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle changes in the budget table
  const handleBudgetChange = (index, field, value) => {
    const updatedRows = [...budgetRows];
    updatedRows[index][field] = value;
    setBudgetRows(updatedRows);
  };

  // Function to add a new row to the budget table
  const handleAddBudgetRow = () => {
    setBudgetRows([
      ...budgetRows,
      { description: "", costsLastYear: "", budgetCurrentYear: "" },
    ]);
  };

  // Function to calculate total costs for last year and current year
  const calculateTotalCosts = (field) => {
    return budgetRows
      .reduce((total, row) => total + parseFloat(row[field]) || 0, 0)
      .toFixed(2);
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
      indicator: "",
      timeframe: Array.from({ length: 12 }).fill(false), // Initialize a new array for the timeframe
    });
    setFormData(updatedData);
  };

  const handleChangePersonalSituation = (e, category, year) => {
    setFormData((prevData) => ({
      ...prevData,
      personalSituation: {
        ...prevData.personalSituation,
        [`${category}${year}`]: e.target.value,
      },
    }));
  };

  const handleChangeEconomicBackground = (e, field) => {
    const updatedData = { ...formData };
    updatedData.economicBackground[field] = e.target.value;
    setFormData(updatedData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
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
    } else if (e.target.name === "indicator") {
      updatedData.logicalFramework.objectives[index].activities[
        subIndex
      ].indicator = e.target.value;
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = {
        project_title: formData.projectTitle,
        general_information: {
          project_region: formData.projectRegion,
          institution_name: formData.institutionName,
          overall_project_period: formData.overallProjectPeriod,
          overall_project_budget: formData.overallProjectBudget,
        },
        mailing_list: {
          president_of_the_society: {
            name: formData.presidentOfSocietyName,
            email: formData.presidentOfSocietyEmail,
          },
        },
        key_information: {
          support_programmes_till_date: formData.supportProgrammesTillDate,
          age_profile_of_children_and_youth: [
            {
              age_category: "Children below 5 years",
              education: "Bridge education",
              present_academic_year: formData.bridgeEducationPresentYear,
              previous_year: formData.bridgeEducationPreviousYear,
            },
            {
              age_category: "Children below 5 years",
              education: "Kindergarten",
              present_academic_year: formData.kindergartenPresentYear,
              previous_year: formData.kindergartenPreviousYear,
            },
            {
              age_category: "Children below 5 years",
              education: "Other",
              present_academic_year: formData.otherEducationPresentYear,
              previous_year: formData.otherEducationPreviousYear,
            },
            {
              age_category: "Children between 6 to 10 years",
              education: "Bridge School",
              present_academic_year: formData.bridgeSchoolPresentYear,
              previous_year: formData.bridgeSchoolPreviousYear,
            },
            {
              age_category: "Children between 6 to 10 years",
              education: "Primary School",
              present_academic_year: formData.primarySchoolPresentYear,
              previous_year: formData.primarySchoolPreviousYear,
            },
            {
              age_category: "Children between 6 to 10 years",
              education: "Other",
              present_academic_year: formData.otherEducation610PresentYear,
              previous_year: formData.otherEducation610PreviousYear,
            },
            {
              age_category: "Youth between 11 to 15 years old",
              education: "Secondary School",
              present_academic_year: formData.secondarySchoolPresentYear,
              previous_year: formData.secondarySchoolPreviousYear,
            },
            {
              age_category: "Youth between 11 to 15 years old",
              education: "High School",
              present_academic_year: formData.highSchoolPresentYear,
              previous_year: formData.highSchoolPreviousYear,
            },
            {
              age_category: "Youth between 11 to 15 years old",
              education: "Other",
              present_academic_year: formData.otherEducation1115PresentYear,
              previous_year: formData.otherEducation1115PreviousYear,
            },
            {
              age_category: "Youth 16 and above",
              education: "Undergraduate",
              present_academic_year: formData.undergraduatePresentYear,
              previous_year: formData.undergraduatePreviousYear,
            },
            {
              age_category: "Youth 16 and above",
              education: "Technical/Vocational Education",
              present_academic_year:
                formData.technicalVocationalEducationPresentYear,
              previous_year: formData.technicalVocationalEducationPreviousYear,
            },
            {
              age_category: "Youth 16 and above",
              education: "Other",
              present_academic_year: formData.otherEducation16AbovePresentYear,
              previous_year: formData.otherEducation16AbovePreviousYear,
            },
            {
              age_category: "Youth 16 and above",
              education: "Bridge School",
              present_academic_year:
                formData.youth16AndAbovebridgeSchoolPresentYear,
              previous_year: formData.youth16AndAbovebridgeSchoolPreviousYear,
            },
          ],
          personal_situation_of_children_youth: [
            {
              description: "Children/students with parents",
              previous_year:
                formData.personalSituation.childrenWithParentsPreviousYear,
              present_academic_year:
                formData.personalSituation.childrenWithParentsPresentYear,
            },
            {
              description: "Semi-orphans (living with relatives)",
              previous_year: formData.personalSituation.semiOrphansPreviousYear,
              present_academic_year:
                formData.personalSituation.semiOrphansPresentYear,
            },
            {
              description: "Orphans",
              previous_year: formData.personalSituation.orphansPreviousYear,
              present_academic_year:
                formData.personalSituation.orphansPresentYear,
            },
            {
              description: "HIV-infected/affected",
              previous_year:
                formData.personalSituation.hivInfectedAffectedPreviousYear,
              present_academic_year:
                formData.personalSituation.hivInfectedAffectedPresentYear,
            },
            {
              description: "Differently-abled children",
              previous_year:
                formData.personalSituation.differentlyAbledChildrenPreviousYear,
              present_academic_year:
                formData.personalSituation.differentlyAbledChildrenPresentYear,
            },
            {
              description: "Parents in conflict",
              previous_year:
                formData.personalSituation.parentsInConflictPreviousYear,
              present_academic_year:
                formData.personalSituation.parentsInConflictPresentYear,
            },
            {
              description: "Other aliments",
              previous_year:
                formData.personalSituation.otherAlimentsPreviousYear,
              present_academic_year:
                formData.personalSituation.otherAlimentsPresentYear,
            },
          ],
          economic_background_of_parents: [
            {
              description: "Agricultural Labour",
              number: formData.economicBackground.agriculturalLabour,
            },
            {
              description:
                "Marginal farmers (Number of parents with less than two and half acres of land)",
              number: formData.economicBackground.marginalFarmers,
            },
            {
              description: "Parents self-employed",
              number: formData.economicBackground.parentsSelfEmployed,
            },
            {
              description: "Parents working in the informal sector",
              number: formData.economicBackground.parentsInformalSector,
            },
            {
              description: "Any other",
              number: formData.economicBackground.anyOther,
            },
          ],
        },
        challenges_faced_by_the_benificiary: formData.challengesFaced,
        focus_areas_in_present_year: formData.focusAreasDescription,
        solution_analysis_logical_framework: formData.logicalFramework,
        sustainability: formData.sustainability,
        monitoring_and_evaluation: formData.monitoringProcess,
        budget: {
          budget_particular: budgetRows.map((budget) => {
            return {
              expense_description: budget.description,
              costs_last_year: budget.costsLastYear,
              budget_current_year: budget.budgetCurrentYear,
            };
          }),
          total: {
            costs_last_year: calculateTotalCosts("costsLastYear"),
            budget_current_year: calculateTotalCosts("budgetCurrentYear"),
          },
        },
      };

      const res = await authAxios.put("/projects/editHIV", {
        project_number: projectData.project_number,
        ...req,
      });
      console.log(res);
      if (res.data.success) {
        showToast({
          title: "Review succesful",
          duration: 5000,
          status: "success",
        });
      } else {
        showToast({
          title: "Review unsuccesful",
          description: res.data.message,
          duration: 5000,
          status: "error",
        });
      }
    } catch (e) {
      console.log(e);

      showToast({
        title: "Review unsuccesful",
        duration: 5000,
        status: "error",
      });
    }
  };

   return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6} align="center">
          HIV Affect Outreach Application Form
        </Heading>

        {isSubmitted && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Form submitted successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Project Information */}

          <FormControl mb={4}>
            <FormLabel>Project Title</FormLabel>
            <Input
              type="text"
              name="projectTitle"
              onChange={handleChange}
              value={formData.projectTitle || ""}
            />
          </FormControl>

          {/* General Information */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            General Information
          </Heading>

          <FormControl mb={4}>
            <FormLabel>Project Region</FormLabel>
            <Input
              type="text"
              name="projectRegion"
              onChange={handleChange}
              value={formData.projectRegion || ""}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Institution Name</FormLabel>
            <Input
              type="text"
              name="institutionName"
              onChange={handleChange}
              value={formData.institutionName || ""}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Overall Project Period</FormLabel>
            <Input
              type="text"
              name="overallProjectPeriod"
              onChange={handleChange}
              value={formData.overallProjectPeriod || ""}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Overall Project Budget</FormLabel>
            <Input
              type="number"
              name="overallProjectBudget"
              onChange={handleChange}
              value={formData.overallProjectBudget || ""}
            />
          </FormControl>

          {/* Mailing List Section */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Mailing List
          </Heading>

          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th>Role</Th>
                <Th>Name</Th>
                <Th>Email</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Row 1 */}
              <Tr>
                <Td>President of the Society</Td>
                <Td>
                  <Input
                    type="text"
                    name="presidentOfSocietyName"
                    onChange={handleChange}
                    value={formData.presidentOfSocietyName || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="email"
                    name="presidentOfSocietyEmail"
                    onChange={handleChange}
                    value={formData.presidentOfSocietyEmail || ""}
                  />
                </Td>
              </Tr>

              {/* Project Coordinators */}
              <Tr>
                <Td>Project Coordinator 1</Td>
                <Td>Sr. Nirmala Mathew</Td>

                <Td>micostannsindia@gmail.com</Td>
              </Tr>
              <Tr>
                <Td>Project Coordinator 2</Td>
                <Td>Mr. Samuel Imbach</Td>

                <Td>s.imbach@mission-stanna</Td>
              </Tr>
            </Tbody>
          </Table>
          {/* Key Information Section */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Key Information
          </Heading>

          <FormControl mb={4}>
            <FormLabel>Support Programmes Till Date</FormLabel>
            <Textarea
              name="supportProgrammesTillDate"
              onChange={handleChange}
              value={formData.supportProgrammesTillDate || ""}
            />
          </FormControl>

          {/* Age Profile Of Children And Youth Presently In The Institution */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Age Profile Of Children And Youth Presently In The Institution
          </Heading>

          {/* Children below 5 years */}
          <Heading as="h4" size="md" mt={6} mb={4}>
            Children below 5 years :-
          </Heading>

          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th>Education</Th>
                <Th>Previous Year</Th>
                <Th>Present Academic Year</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Row 1 */}
              <Tr>
                <Td>Bridge education</Td>
                <Td>
                  <Input
                    type="number"
                    name="bridgeEducationPreviousYear"
                    onChange={handleChange}
                    value={formData.bridgeEducationPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="bridgeEducationPresentYear"
                    onChange={handleChange}
                    value={formData.bridgeEducationPresentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 2 */}
              <Tr>
                <Td>Kindergarten</Td>
                <Td>
                  <Input
                    type="number"
                    name="kindergartenPreviousYear"
                    onChange={handleChange}
                    value={formData.kindergartenPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="kindergartenPresentYear"
                    onChange={handleChange}
                    value={formData.kindergartenPresentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 3 */}
              <Tr>
                <Td>Other:</Td>
                <Td>
                  <Input
                    type="number"
                    name="otherEducationPreviousYear"
                    onChange={handleChange}
                    value={formData.otherEducationPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="otherEducationPresentYear"
                    onChange={handleChange}
                    value={formData.otherEducationPresentYear || ""}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>

          {/* Children between 6 to 10 years */}
          <Heading as="h4" size="md" mb={2}>
            Children between 6 to 10 years:-
          </Heading>
          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th>Education</Th>
                <Th>Previous Year</Th>
                <Th>Present Academic Year</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Row 1 */}
              <Tr>
                <Td>Bridge School</Td>
                <Td>
                  <Input
                    type="number"
                    name="bridgeSchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.bridgeSchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="bridgeSchoolPresentYear"
                    onChange={handleChange}
                    value={formData.bridgeSchoolPresentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 2 */}
              <Tr>
                <Td>Primary School</Td>
                <Td>
                  <Input
                    type="number"
                    name="primarySchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.primarySchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="primarySchoolPresentYear"
                    onChange={handleChange}
                    value={formData.primarySchoolPresentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 3 */}
              <Tr>
                <Td>Other</Td>
                <Td>
                  <Input
                    type="number"
                    name="otherEducation610PreviousYear"
                    onChange={handleChange}
                    value={formData.otherEducation610PreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="otherEducation610PresentYear"
                    onChange={handleChange}
                    value={formData.otherEducation610PresentYear || ""}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>

          {/* Youth between 11 to 15 years old */}
          <Heading as="h3" size="md" mb={2}>
            Youth between 11 to 15 years old:-
          </Heading>
          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th>Education</Th>
                <Th>Previous Year</Th>
                <Th>Present Academic Year</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Row 1 */}
              <Tr>
                <Td>Secondary School</Td>
                <Td>
                  <Input
                    type="number"
                    name="secondarySchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.secondarySchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="secondarySchoolPresentYear"
                    onChange={handleChange}
                    value={formData.secondarySchoolPresentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 2 */}
              <Tr>
                <Td>High School</Td>
                <Td>
                  <Input
                    type="number"
                    name="highSchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.highSchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="highSchoolPresentYear"
                    onChange={handleChange}
                    value={formData.highSchoolPresentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 3 */}
              <Tr>
                <Td>Other</Td>
                <Td>
                  <Input
                    type="number"
                    name="otherEducation1115PreviousYear"
                    onChange={handleChange}
                    value={formData.otherEducation1115PreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="otherEducation1115PresentYear"
                    onChange={handleChange}
                    value={formData.otherEducation1115PresentYear || ""}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>

          {/* Youth 16 and above */}
          <Heading as="h3" size="md" mb={2}>
            Youth 16 and above:-
          </Heading>
          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th>Education</Th>
                <Th>Previous Year</Th>
                <Th>Present Academic Year</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>Undergraduate</Td>
                <Td>
                  <Input
                    type="number"
                    name="undergraduatePreviousYear"
                    onChange={handleChange}
                    value={formData.undergraduatePreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="undergraduatePresentYear"
                    onChange={handleChange}
                    value={formData.undergraduatePresentYear || ""}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Technical/Vocational education</Td>
                <Td>
                  <Input
                    type="number"
                    name="technicalVocationalEducationPreviousYear"
                    onChange={handleChange}
                    value={
                      formData.technicalVocationalEducationPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="technicalVocationalEducationPresentYear"
                    onChange={handleChange}
                    value={
                      formData.technicalVocationalEducationPresentYear || ""
                    }
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Bridge School</Td>
                <Td>
                  <Input
                    type="number"
                    name="youth16AndAbovebridgeSchoolPreviousYear"
                    onChange={handleChange}
                    value={
                      formData.youth16AndAbovebridgeSchoolPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="youth16AndAbovebridgeSchoolPresentYear"
                    onChange={handleChange}
                    value={
                      formData.youth16AndAbovebridgeSchoolPresentYear || ""
                    }
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Other</Td>
                <Td>
                  <Input
                    type="number"
                    name="otherEducation16AbovePreviousYear"
                    onChange={handleChange}
                    value={formData.otherEducation16AbovePreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="otherEducation16AbovePresentYear"
                    onChange={handleChange}
                    value={formData.otherEducation16AbovePresentYear || ""}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>

          {/* Personal Situation Of The Children/Youth */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Personal Situation Of The Children/Youth
          </Heading>

          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th>Description</Th>
                <Th>Previous Year</Th>
                <Th>Present Academic Year</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Row 1 */}
              <Tr>
                <Td>Children/students with parents</Td>
                <Td>
                  <Input
                    type="number"
                    name="childrenWithParentsPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "childrenWithParents",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation
                        .childrenWithParentsPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="childrenWithParentsPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "childrenWithParents",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation
                        .childrenWithParentsPresentYear || ""
                    }
                  />
                </Td>
              </Tr>

              {/* Row 2 */}
              <Tr>
                <Td>Semi-orphans (living with relatives)</Td>
                <Td>
                  <Input
                    type="number"
                    name="semiOrphansPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "semiOrphans",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation.semiOrphansPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="semiOrphansPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "semiOrphans",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation.semiOrphansPresentYear || ""
                    }
                  />
                </Td>
              </Tr>

              {/* Row 3 */}
              <Tr>
                <Td>Orphans</Td>
                <Td>
                  <Input
                    type="number"
                    name="orphansPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "orphans",
                        "PreviousYear"
                      )
                    }
                    value={formData.personalSituation.orphansPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="orphansPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(e, "orphans", "PresentYear")
                    }
                    value={formData.personalSituation.orphansPresentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 4 */}
              <Tr>
                <Td>HIV-infected/affected</Td>
                <Td>
                  <Input
                    type="number"
                    name="hivInfectedAffectedPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "hivInfectedAffected",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation
                        .hivInfectedAffectedPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="hivInfectedAffectedPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "hivInfectedAffected",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation
                        .hivInfectedAffectedPresentYear || ""
                    }
                  />
                </Td>
              </Tr>

              {/* Row 5 */}
              <Tr>
                <Td>Differently-abled children</Td>
                <Td>
                  <Input
                    type="number"
                    name="differentlyAbledChildrenPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "differentlyAbledChildren",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation
                        .differentlyAbledChildrenPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="differentlyAbledChildrenPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "differentlyAbledChildren",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation
                        .differentlyAbledChildrenPresentYear || ""
                    }
                  />
                </Td>
              </Tr>

              {/* Row 6 */}
              <Tr>
                <Td>Parents in conflict</Td>
                <Td>
                  <Input
                    type="number"
                    name="parentsInConflictPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "parentsInConflict",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation
                        .parentsInConflictPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="parentsInConflictPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "parentsInConflict",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation.parentsInConflictPresentYear ||
                      ""
                    }
                  />
                </Td>
              </Tr>

              {/* Row 7 */}
              <Tr>
                <Td>Other aliments</Td>
                <Td>
                  <Input
                    type="number"
                    name="otherAlimentsPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "otherAliments",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation.otherAlimentsPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="otherAlimentsPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "otherAliments",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation.otherAlimentsPresentYear || ""
                    }
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>

          {/* Economic Background Of Parents */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Economic Background Of Parents
          </Heading>

          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th>Description</Th>
                <Th>Number</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Row 1 */}
              <Tr>
                <Td>Agricultural Labour</Td>
                <Td>
                  <Input
                    type="number"
                    name="agriculturalLabour"
                    onChange={(e) =>
                      handleChangeEconomicBackground(e, "agriculturalLabour")
                    }
                    value={formData.economicBackground.agriculturalLabour || ""}
                  />
                </Td>
              </Tr>

              {/* Row 2 */}
              <Tr>
                <Td>
                  Marginal farmers (Number of parents with less than two and a
                  half acres of land)
                </Td>
                <Td>
                  <Input
                    type="number"
                    name="marginalFarmers"
                    onChange={(e) =>
                      handleChangeEconomicBackground(e, "marginalFarmers")
                    }
                    value={formData.economicBackground.marginalFarmers || ""}
                  />
                </Td>
              </Tr>

              {/* Row 3 */}
              <Tr>
                <Td>Parents self-employed</Td>
                <Td>
                  <Input
                    type="number"
                    name="parentsSelfEmployed"
                    onChange={(e) =>
                      handleChangeEconomicBackground(e, "parentsSelfEmployed")
                    }
                    value={
                      formData.economicBackground.parentsSelfEmployed || ""
                    }
                  />
                </Td>
              </Tr>

              {/* Row 4 */}
              <Tr>
                <Td>Parents working in the informal sector</Td>
                <Td>
                  <Input
                    type="number"
                    name="parentsInformalSector"
                    onChange={(e) =>
                      handleChangeEconomicBackground(e, "parentsInformalSector")
                    }
                    value={
                      formData.economicBackground.parentsInformalSector || ""
                    }
                  />
                </Td>
              </Tr>

              {/* Row 5 */}
              <Tr>
                <Td>Any other</Td>
                <Td>
                  <Input
                    type="number"
                    name="anyOther"
                    onChange={(e) =>
                      handleChangeEconomicBackground(e, "anyOther")
                    }
                    value={formData.economicBackground.anyOther || ""}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>

          {/* Challenges Faced By the benificiary */}
          <Box mb={4}>
            <Heading as="h3" size="md">
              Challenges Faced By The Benificiary
            </Heading>
            <Textarea
              name="challengesFaced"
              value={formData.challengesFaced}
              onChange={handleChange}
              placeholder="Enter text..."
              size="md"
            />
          </Box>
          {/* Focus Areas in the Present Year */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Focus Areas in the Present Year
          </Heading>

          {/* Main Areas for Growth/Development */}
          <Box mb={4}>
            <Heading as="h3" size="md">
              What are the main areas you want to focus on for
              growth/development of the institution and children? Explain why
              you want to focus on these areas and what you intend to achieve.
            </Heading>
            <Textarea
              name="focusAreasDescription"
              value={formData.focusAreasDescription}
              onChange={handleChange}
              placeholder="Enter text..."
              size="md"
            />
          </Box>

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
          <FormControl isRequired>
            <FormLabel>Goal of the Project</FormLabel>
            <Textarea
              name="goal"
              onChange={(e) => handleChangeObjective(e)}
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
                <FormControl isRequired>
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
                <FormControl isRequired>
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
                      <Button
                        onClick={() => handleAddResult(index)}
                        colorScheme="teal"
                      >
                        Add Result
                      </Button>
                    </VStack>
                  ))}
                </FormControl>

                {/* Activities and Means of Verification */}
                <FormControl isRequired>
                  <FormLabel>Activities and Means of Verification</FormLabel>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Activity</Th>
                        <Th>Means of Verification</Th>
                        <Th>Indicators</Th>
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
                            <Textarea
                              name="indicator"
                              value={activity.indicator}
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
                              {activity.timeframe.map((value, monthIndex) => (
                                <Checkbox
                                  key={monthIndex}
                                  isChecked={value}
                                  onChange={() => {
                                    setSelectedMonths([]);
                                    activity.timeframe[monthIndex] =
                                      !activity.timeframe[monthIndex];
                                    console.log(activity.timeframe);
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
                <hr />
              </VStack>
            </Box>
          ))}
          {/* Sustainability of the Project */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Sustainability of the Project
          </Heading>
          <FormControl isRequired>
            <FormLabel>
              Describe the applied strategies to ensure the results and impact
              are long-lasting.
            </FormLabel>
            <Textarea
              name="sustainability"
              value={formData.sustainability}
              onChange={(e) => handleChange(e)}
              required
            />
          </FormControl>

          {/* Explain the Monitoring Process of the Project */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Monitoring & Evaluation
          </Heading>
          <FormControl isRequired>
            <FormLabel>
              Description of the steering and evaluation of the project
              (procedures, interval and responsibilities)
            </FormLabel>
            <Textarea
              name="monitoringProcess"
              value={formData.monitoringProcess}
              onChange={(e) => handleChange(e)}
              required
            />
          </FormControl>

          <Heading as="h2" size="lg" mt={6} mb={4}>
            Budget
          </Heading>

          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th>Description of Expense</Th>
                <Th>Costs Last Year</Th>
                <Th>Budget Current Year</Th>
              </Tr>
            </Thead>
            <Tbody>
              {budgetRows.map((row, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      type="text"
                      value={row.description}
                      onChange={(e) =>
                        handleBudgetChange(index, "description", e.target.value)
                      }
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      value={row.costsLastYear}
                      onChange={(e) =>
                        handleBudgetChange(
                          index,
                          "costsLastYear",
                          e.target.value
                        )
                      }
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      value={row.budgetCurrentYear}
                      onChange={(e) =>
                        handleBudgetChange(
                          index,
                          "budgetCurrentYear",
                          e.target.value
                        )
                      }
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Add row button */}
          <Button colorScheme="teal" onClick={handleAddBudgetRow}>
            Add Expense
          </Button>

          {/* Total Costs */}

          <FormControl>
            <FormLabel>Total Costs Last Year</FormLabel>
            <Input value={calculateTotalCosts("costsLastYear")} isReadOnly />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Total Budget Current Year</FormLabel>
            <Input
              value={calculateTotalCosts("budgetCurrentYear")}
              isReadOnly
            />
          </FormControl>

          {/* Submit Button */}
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default EditHIV;
