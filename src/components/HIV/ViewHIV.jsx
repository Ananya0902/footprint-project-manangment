import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
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
import { useParams } from "react-router-dom";

const ViewHIV = () => {
  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  console.log(projectData);
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
    challengesFaced: projectData.challenges_faced_by_the_benificiary || "",
    focusAreasDescription: projectData.focus_areas_in_present_year || "",
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
      provincialSuperior: {
        name: projectData.mailing_list.provincial_superior.ref.name,
        email: projectData.mailing_list.provincial_superior.ref.email,
        contact: projectData.mailing_list.provincial_superior.ref.mobile,
        agree: projectData.mailing_list.provincial_superior.agree || false,
        date: projectData.mailing_list.provincial_superior.date || "",
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

    project_coordinators: projectData.mailing_list.project_coordinators,
    commentReviewer: projectData.mailing_list.provincial_superior.comment,
    amountApproved: projectData.amount_approved,
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

  const handleAddAchievement = (category) => {
    setAchievements((prevAchievements) => ({
      ...prevAchievements,
      [category]: [...prevAchievements[category], ""],
    }));
  };

  const handleAchievementChange = (category, index, value) => {
    setAchievements((prevAchievements) => {
      const updatedAchievements = [...prevAchievements[category]];
      updatedAchievements[index] = value;
      return { ...prevAchievements, [category]: updatedAchievements };
    });
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
  const handleChangeMultipleSupport = (e, category, gender, year) => {
    setFormData((prevData) => ({
      ...prevData,
      multipleSupport: {
        ...prevData.multipleSupport,
        [category]: {
          ...prevData.multipleSupport[category],
          [gender]: {
            ...prevData.multipleSupport[category][gender],
            [year]: e.target.value,
          },
        },
      },
    }));
  };
  console.log(projectData);
  const handleChangeStatisticTable = (e, category) => {
    const year = e.target.getAttribute("data-year");
    const value = e.target.value;

    setFormData((prevData) => ({
      ...prevData,
      [category]: {
        ...prevData[category],
        [year]: value,
      },
    }));
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

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6} align="center">
          HIV Affect Outreach Application Form
        </Heading>

        <form onSubmit={() => {}}>
          {/* Project Information */}

          <FormControl mb={4}>
            <FormLabel>Project Title</FormLabel>
            <Input
              type="text"
              name="projectTitle"
              onChange={handleChange}
              value={formData.projectTitle || ""}
              readOnly
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
              readOnly
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Institution Name</FormLabel>
            <Input
              type="text"
              name="institutionName"
              onChange={handleChange}
              value={formData.institutionName || ""}
              readOnly
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Overall Project Period</FormLabel>
            <Input
              type="text"
              name="overallProjectPeriod"
              onChange={handleChange}
              value={formData.overallProjectPeriod || ""}
              readOnly
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Overall Project Budget</FormLabel>
            <Input
              type="text"
              name="overallProjectBudget"
              onChange={handleChange}
              value={formData.overallProjectBudget || ""}
              readOnly
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
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="email"
                    name="presidentOfSocietyEmail"
                    onChange={handleChange}
                    value={formData.presidentOfSocietyEmail || ""}
                    readOnly
                  />
                </Td>
              </Tr>
              {/* Row 2 */}
              <Tr>
                <Td>Project Incharge</Td>
                <Td>
                  <Input
                    type="text"
                    name="mailingList.projectInCharge.name"
                    onChange={handleChange}
                    value={formData.mailingList.projectInCharge.name || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="email"
                    name="mailingList.projectInCharge.email"
                    onChange={handleChange}
                    value={formData.mailingList.projectInCharge.email || ""}
                    readOnly
                  />
                </Td>
              </Tr>
              {/* Row 3 */}
              <Tr>
                <Td>Provincial Superior</Td>
                <Td>
                  <Input
                    type="text"
                    name="mailingList.provincialSuperior.name"
                    onChange={handleChange}
                    value={formData.mailingList.provincialSuperior.name || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="email"
                    name="mailingList.provincialSuperior.email"
                    onChange={handleChange}
                    value={formData.mailingList.provincialSuperior.email || ""}
                    readOnly
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
              name="Support Programmes Till Date"
              onChange={handleChange}
              value={formData.supportProgrammesTillDate || ""}
              readOnly
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
                    type="text"
                    name="bridgeEducationPreviousYear"
                    onChange={handleChange}
                    value={formData.bridgeEducation.previousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="bridgeEducationPresentYear"
                    onChange={handleChange}
                    value={formData.bridgeEducation.presentYear || ""}
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 2 */}
              <Tr>
                <Td>Kindergarten</Td>
                <Td>
                  <Input
                    type="text"
                    name="kindergartenPreviousYear"
                    onChange={handleChange}
                    value={formData.kindergarten.previousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="kindergartenPresentYear"
                    onChange={handleChange}
                    value={formData.kindergarten.presentYear || ""}
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 3 */}
              <Tr>
                <Td>Other:</Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducationPreviousYear"
                    onChange={handleChange}
                    value={formData.otherEducation.previousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducationPresentYear"
                    onChange={handleChange}
                    value={formData.otherEducation.presentYear || ""}
                    readOnly
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
                    type="text"
                    name="bridgeSchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.bridgeSchool.previousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="bridgeSchoolPresentYear"
                    onChange={handleChange}
                    value={formData.bridgeSchool.presentYear || ""}
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 2 */}
              <Tr>
                <Td>Primary School</Td>
                <Td>
                  <Input
                    type="text"
                    name="primarySchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.primarySchool.previousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="primarySchoolPresentYear"
                    onChange={handleChange}
                    value={formData.primarySchool.presentYear || ""}
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 3 */}
              <Tr>
                <Td>Other</Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation610PreviousYear"
                    onChange={handleChange}
                    value={formData.otherEducation610.previousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation610PresentYear"
                    onChange={handleChange}
                    value={formData.otherEducation610.presentYear || ""}
                    readOnly
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
                    type="text"
                    name="secondarySchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.secondarySchool.previousYear}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="secondarySchoolPresentYear"
                    onChange={handleChange}
                    value={formData.secondarySchool.presentYear || ""}
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 2 */}
              <Tr>
                <Td>High School</Td>
                <Td>
                  <Input
                    type="text"
                    name="highSchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.highSchool.previousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="highSchoolPresentYear"
                    onChange={handleChange}
                    value={formData.highSchool.presentYear || ""}
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 3 */}
              <Tr>
                <Td>Other</Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation1115PreviousYear"
                    onChange={handleChange}
                    value={formData.otherEducation1115.previousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation1115PresentYear"
                    onChange={handleChange}
                    value={formData.otherEducation1115.presentYear || ""}
                    readOnly
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
                    type="text"
                    name="undergraduate.previousYear"
                    onChange={handleChange}
                    value={formData.undergraduate.previousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="undergraduatePresentYear"
                    onChange={handleChange}
                    value={formData.undergraduate.presentYear || ""}
                    readOnly
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Technical/Vocational education</Td>
                <Td>
                  <Input
                    type="text"
                    name="technicalVocationalEducation.previousYear"
                    onChange={handleChange}
                    value={
                      formData.technicalVocationalEducation.previousYear || ""
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="technicalVocationalEducationPresentYear"
                    onChange={handleChange}
                    value={
                      formData.technicalVocationalEducation.presentYear || ""
                    }
                    readOnly
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Bridge School</Td>
                <Td>
                  <Input
                    type="text"
                    name="youth16AndAbovebridgeSchool.previousYear"
                    onChange={handleChange}
                    value={
                      formData.youth16AndAbovebridgeSchool.previousYear || ""
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="youth16AndAbovebridgeSchoolPresentYear"
                    onChange={handleChange}
                    value={
                      formData.youth16AndAbovebridgeSchool.presentYear || ""
                    }
                    readOnly
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Other</Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation16Above.previousYear"
                    onChange={handleChange}
                    value={formData.otherEducation16Above.previousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation16AbovePresentYear"
                    onChange={handleChange}
                    value={formData.otherEducation16Above.presentYear || ""}
                    readOnly
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
                    type="text"
                    name="childrenWithParents.previousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "childrenWithParents",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation.childrenWithParents
                        .previousYear || ""
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="childrenWithParentsPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "childrenWithParents",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation.childrenWithParents
                        .presentYear || ""
                    }
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 2 */}
              <Tr>
                <Td>Semi-orphans (living with relatives)</Td>
                <Td>
                  <Input
                    type="text"
                    name="semiOrphansPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "semiOrphans",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation.semiOrphans.previousYear || ""
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="semiOrphansPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "semiOrphans",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation.semiOrphans.presentYear || ""
                    }
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 3 */}
              <Tr>
                <Td>Orphans</Td>
                <Td>
                  <Input
                    type="text"
                    name="orphansPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "orphans",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation.orphans.previousYear || ""
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="orphansPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(e, "orphans", "PresentYear")
                    }
                    value={formData.personalSituation.orphans.presentYear || ""}
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 4 */}
              <Tr>
                <Td>HIV-infected/affected</Td>
                <Td>
                  <Input
                    type="text"
                    name="hivInfectedAffectedPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "hivInfectedAffected",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation.hivInfectedAffected
                        .previousYear || ""
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="hivInfectedAffectedPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "hivInfectedAffected",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation.hivInfectedAffected
                        .presentYear || ""
                    }
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 5 */}
              <Tr>
                <Td>Differently-abled children</Td>
                <Td>
                  <Input
                    type="text"
                    name="differentlyAbledChildrenPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "differentlyAbledChildren",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation.differentlyAbledChildren
                        .previousYear || ""
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="differentlyAbledChildrenPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "differentlyAbledChildren",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation.differentlyAbledChildren
                        .presentYear || ""
                    }
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 6 */}
              <Tr>
                <Td>Parents in conflict</Td>
                <Td>
                  <Input
                    type="text"
                    name="parentsInConflictPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "parentsInConflict",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation.parentsInConflict
                        .previousYear || ""
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="parentsInConflictPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "parentsInConflict",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation.parentsInConflict
                        .presentYear || ""
                    }
                    readOnly
                  />
                </Td>
              </Tr>

              {/* Row 7 */}
              <Tr>
                <Td>Other aliments</Td>
                <Td>
                  <Input
                    type="text"
                    name="otherAlimentsPreviousYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "otherAliments",
                        "PreviousYear"
                      )
                    }
                    value={
                      formData.personalSituation.otherAliments.previousYear ||
                      ""
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherAlimentsPresentYear"
                    onChange={(e) =>
                      handleChangePersonalSituation(
                        e,
                        "otherAliments",
                        "PresentYear"
                      )
                    }
                    value={
                      formData.personalSituation.otherAliments.presentYear || ""
                    }
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
              name="challengesFacedByTheBenificiary"
              value={formData.challengesFaced}
              onChange={handleChange}
              placeholder="Enter text..."
              size="md"
              readOnly
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
              readOnly
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
          <FormControl>
            <FormLabel>Goal of the Project</FormLabel>
            <Textarea
              name="goal"
              value={formData.logicalFramework.goal}
              onChange={(e) => handleChangeObjective(e)}
              readOnly
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
                    readOnly
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
                        readOnly
                      />
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
                              readOnly
                            />
                          </Td>
                          <Td>
                            <Textarea
                              name="verification"
                              value={activity.verification}
                              onChange={(e) =>
                                handleChangeObjective(e, index, subIndex)
                              }
                              readOnly
                            />
                          </Td>
                          <Td>
                            <Textarea
                              name="indicator"
                              value={activity.indicator}
                              onChange={(e) =>
                                handleChangeObjective(e, index, subIndex)
                              }
                              readOnly
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
                                  readOnly
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

                  {/* <Button
                    onClick={() => handleAddActivity(index)}
                    colorScheme="teal"
                  >
                    Add Activity
                  </Button> */}
                </FormControl>

                {/* <Button
                  onClick={handleAddObjective}
                  colorScheme="purple"
                  ml="auto"
                >
                  Add Objective
                </Button> */}
                <hr />
              </VStack>
            </Box>
          ))}
          {/* Sustainability of the Project */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Sustainability of the Project
          </Heading>
          <FormControl>
            <FormLabel>
              Describe the applied strategies to ensure the results and impact
              are long-lasting.
            </FormLabel>
            <Textarea
              name="sustainability"
              value={formData.sustainability}
              onChange={(e) => handleChange(e)}
              readOnly
            />
          </FormControl>

          {/* Explain the Monitoring Process of the Project */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Monitoring & Evaluation
          </Heading>
          <FormControl>
            <FormLabel>
              Description of the steering and evaluation of the project
              (procedures, interval and responsibilities)
            </FormLabel>
            <Textarea
              name="monitoringProcess"
              value={formData.monitoringAndEvaluation}
              onChange={(e) => handleChange(e)}
              readOnly
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
              {budgetRows.map((row, index) => {
                return (
                  <Tr key={index}>
                    <Td>
                      <Input type="text" value={row.description} readOnly />
                    </Td>
                    <Td>
                      <Input type="number" value={row.costsLastYear} readOnly />
                    </Td>
                    <Td>
                      <Input
                        type="number"
                        value={row.budgetCurrentYear}
                        readOnly
                      />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
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

          <Heading as="h1" size="xl" mb={6}>
            Signatures
          </Heading>

          {/* Project-In-Charge agreement */}
          <FormControl>
            Project-In Charge Agree
            <Input
              type="date"
              name="projectInChargeAgreementDate"
              onChange={handleChange}
              value={formData.mailingList.projectInCharge.date.substring(0, 10)}
              readOnly
            />
          </FormControl>

          {/* Provincial Superior agreement */}
          <FormControl isRequired>
            <Checkbox
              name="provincialSuperiorAgreement"
              onChange={handleChange}
              isChecked={formData.mailingList.projectInCharge.agree}
              readOnly
              size="lg"
            >
              The Provincial Superior agree
            </Checkbox>
            <Input
              type="date"
              name="provincialSuperiorAgreementDate"
              onChange={handleChange}
              value={formData.mailingList.projectInCharge.date?.substring(
                0,
                10
              )}
              readOnly
            />
          </FormControl>

          <FormControl>
            <FormLabel>Comment(For Reviewer)</FormLabel>
            <Input
              type="text"
              name="commentReviewer"
              value={formData.commentReviewer}
              onChange={handleChange}
              readOnly
            />
          </FormControl>

          {/* project coordinator agreement */}
          <FormControl>
            <FormLabel>Project coordinator</FormLabel>
            {formData.project_coordinators.map((a) => (
              <VStack key={a.id}>
                <FormControl>
                  <Input
                    type="text"
                    name="projectCoordinatorName"
                    onChange={handleChange}
                    value={a.ref.name}
                    readOnly
                  />
                  <FormLabel>comment by project coordinator</FormLabel>

                  <Input
                    type="text"
                    name="comment"
                    onChange={handleChange}
                    value={a.comment}
                    readOnly
                  />

                  <Checkbox
                    name="agreement"
                    onChange={handleChange}
                    isChecked={a.agree}
                    readOnly
                    size="lg"
                  >
                    The project coordinator agrees
                  </Checkbox>
                  <Input
                    type="date"
                    name="date"
                    onChange={handleChange}
                    value={a.date?.substring(0, 10)}
                    readOnly
                  />
                </FormControl>
              </VStack>
            ))}
          </FormControl>

          {/* <FormControl>
            <FormLabel>Comment(For Approver)</FormLabel>
            <Input
              type="text"
              name="commentApprover"
              value={formData.commentApprover}
              onChange={handleChange}
            />
          </FormControl> */}

          <FormControl isRequired>
            <FormLabel>Amount Approved by Coordinator</FormLabel>
            <Input
              type="number"
              name="amountApproved"
              value={formData.amountApproved}
              onChange={handleChange}
              required
            />
          </FormControl>

          {/* Print Button */}
          <Button
            onClick={() => window.print()}
            colorScheme="blue"
            type="submit"
          >
            Print
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default ViewHIV;
