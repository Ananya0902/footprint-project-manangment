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
import authAxios from "../AuthAxios";
import {useParams} from "react-router-dom";

const ReviewHIV = () => {
  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  console.log(projectData);
  const showToast = useToast();
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectRegion: "",
    institutionName: "",
    overallProjectPeriod: "",
    overallProjectBudget: "",
    presidentOfSocietyName: "",
    presidentOfSocietyEmail: "",
    projectInCharge: {
      name: '',
      email: '',
      mobile: 0,
    },
    supportProgrammesTillDate: "",
    bridgeEducationPreviousYear: "",
    bridgeEducationPresentYear: "",
    kindergartenPreviousYear: "",
    kindergartenPresentYear: "",
    otherEducationPreviousYear: "",
    otherEducationPresentYear: "",
    bridgeSchoolPreviousYear: "",
    bridgeSchoolPresentYear: "",
    primarySchoolPreviousYear: "",
    primarySchoolPresentYear: "",
    otherEducation610PreviousYear: "",
    otherEducation610PresentYear: "",
    secondarySchoolPreviousYear: "",
    secondarySchoolPresentYear: "",
    highSchoolPreviousYear: "",
    highSchoolPresentYear: "",
    otherEducation1115PreviousYear: "",
    otherEducation1115PresentYear: "",
    undergraduatePreviousYear: "",
    undergraduatePresentYear: "",
    technicalVocationalEducationPreviousYear: "",
    technicalVocationalEducationPresentYear: "",
    youth16AndAbovebridgeSchoolPreviousYear: "",
    youth16AndAbovebridgeSchoolPresentYear: "",
    otherEducation16AbovePreviousYear: "",
    otherEducation16AbovePresentYear: "",
    personalSituation: {
      childrenWithParentsPreviousYear: "",
      childrenWithParentsPresentYear: "",
      semiOrphansPreviousYear: "",
      semiOrphansPresentYear: "",
      orphansPreviousYear: "",
      orphansPresentYear: "",
      hivInfectedAffectedPreviousYear: "",
      hivInfectedAffectedPresentYear: "",
      differentlyAbledChildrenPreviousYear: "",
      differentlyAbledChildrenPresentYear: "",
      parentsInConflictPreviousYear: "",
      parentsInConflictPresentYear: "",
      otherAlimentsPreviousYear: "",
      otherAlimentsPresentYear: "",
    },
    economicBackground: {
      agriculturalLabour: "",
      marginalFarmers: "",
      parentsSelfEmployed: "",
      parentsInformalSector: "",
      anyOther: "",
    },

    challengesFaced: "",
    focusAreasDescription: "",
    monitoringProcess: "",
    sustainability: "",
    projectInChargeAgreement: false,
    projectInChargeAgreementDate: "",
    provincialSuperiorAgreement: false,
    provincialSuperiorAgreementDate: "",
    comment: "",
    logicalFramework: {
      goal: "",
      objectives: [
        {
          objective: "",
          results: [""],
          activities: [],
        },
      ],
    },
  });
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [achievements, setAchievements] = useState({
    academic: [],
    sport: [],
    other: [],
  });
  // State to manage dynamic rows in the budget table
  const [budgetRows, setBudgetRows] = useState([
    { description: "", costsLastYear: "", budgetCurrentYear: "" },
  ]);

  const formDataCopy = { ...formData }; // Create a copy of formData to avoid direct mutation
  
  formDataCopy.projectInCharge = projectData.mailing_list.project_in_charge.ref ; 
  formDataCopy.projectTitle = projectData.project_title || "";
  formDataCopy.projectRegion =
    projectData.general_information.project_region || "";
  formDataCopy.institutionName =
    projectData.general_information.institution_name || "";
  formDataCopy.overallProjectPeriod =
    projectData.general_information.overall_project_period || "";
  formDataCopy.overallProjectBudget =
    projectData.general_information.overall_project_budget || "";
  formDataCopy.presidentOfSocietyName =
    projectData.mailing_list.president_of_the_society.name || "";
  formDataCopy.presidentOfSocietyEmail =
    projectData.mailing_list.president_of_the_society.email || "";
  formDataCopy.supportProgrammesTillDate =
    projectData.key_information.support_programmes_till_date || "";
  formDataCopy.bridgeEducationPreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[0]
      .previous_year || "";
  formDataCopy.bridgeEducationPresentYear =
    projectData.key_information.age_profile_of_children_and_youth[0]
      .present_academic_year || "";
  formDataCopy.kindergartenPreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[1]
      .previous_year || "";
  formDataCopy.kindergartenPresentYear =
    projectData.key_information.age_profile_of_children_and_youth[1]
      .present_academic_year || "";
  formDataCopy.otherEducationPreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[2]
      .previous_year || "";
  formDataCopy.otherEducationPresentYear =
    projectData.key_information.age_profile_of_children_and_youth[2]
      .present_academic_year || "";
  formDataCopy.bridgeSchoolPreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[3]
      .previous_year || "";
  formDataCopy.bridgeSchoolPresentYear =
    projectData.key_information.age_profile_of_children_and_youth[3]
      .present_academic_year || "";
  formDataCopy.primarySchoolPreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[4]
      .previous_year || "";
  formDataCopy.primarySchoolPresentYear =
    projectData.key_information.age_profile_of_children_and_youth[4]
      .present_academic_year || "";
  formDataCopy.otherEducation610PreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[5]
      .previous_year || "";
  formDataCopy.otherEducation610PresentYear =
    projectData.key_information.age_profile_of_children_and_youth[5]
      .present_academic_year || "";
  formDataCopy.secondarySchoolPreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[6]
      .previous_year || "";
  formDataCopy.secondarySchoolPresentYear =
    projectData.key_information.age_profile_of_children_and_youth[6]
      .present_academic_year || "";
  formDataCopy.highSchoolPreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[7]
      .previous_year || "";
  formDataCopy.highSchoolPresentYear =
    projectData.key_information.age_profile_of_children_and_youth[7]
      .present_academic_year || "";
  formDataCopy.otherEducation1115PreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[8]
      .previous_year || "";
  formDataCopy.otherEducation1115PresentYear =
    projectData.key_information.age_profile_of_children_and_youth[8]
      .present_academic_year || "";
  formDataCopy.undergraduatePreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[9]
      .previous_year || "";
  formDataCopy.undergraduatePresentYear =
    projectData.key_information.age_profile_of_children_and_youth[9]
      .present_academic_year || "";
  formDataCopy.technicalVocationalEducationPreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[10]
      .previous_year || "";
  formDataCopy.technicalVocationalEducationPresentYear =
    projectData.key_information.age_profile_of_children_and_youth[10]
      .present_academic_year || "";
  formDataCopy.youth16AndAbovebridgeSchoolPreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[11]
      .previous_year || "";
  formDataCopy.youth16AndAbovebridgeSchoolPresentYear =
    projectData.key_information.age_profile_of_children_and_youth[11]
      .present_academic_year || "";
  formDataCopy.otherEducation16AbovePreviousYear =
    projectData.key_information.age_profile_of_children_and_youth[12]
      .previous_year || "";
  formDataCopy.otherEducation16AbovePresentYear =
    projectData.key_information.age_profile_of_children_and_youth[12]
      .present_academic_year || "";
  formDataCopy.personalSituation.childrenWithParentsPreviousYear =
    projectData.key_information.personal_situation_of_children_youth[0]
      .previous_year || "";
  formDataCopy.personalSituation.childrenWithParentsPresentYear =
    projectData.key_information.personal_situation_of_children_youth[0]
      .present_academic_year || "";
  formDataCopy.personalSituation.semiOrphansPreviousYear =
    projectData.key_information.personal_situation_of_children_youth[1]
      .previous_year || "";
  formDataCopy.personalSituation.semiOrphansPresentYear =
    projectData.key_information.personal_situation_of_children_youth[1]
      .present_academic_year || "";
  formDataCopy.personalSituation.orphansPreviousYear =
    projectData.key_information.personal_situation_of_children_youth[2]
      .previous_year || "";
  formDataCopy.personalSituation.orphansPresentYear =
    projectData.key_information.personal_situation_of_children_youth[2]
      .present_academic_year || "";
  formDataCopy.personalSituation.hivInfectedAffectedPreviousYear =
    projectData.key_information.personal_situation_of_children_youth[3]
      .previous_year || "";
  formDataCopy.personalSituation.hivInfectedAffectedPresentYear =
    projectData.key_information.personal_situation_of_children_youth[3]
      .present_academic_year || "";
  formDataCopy.personalSituation.differentlyAbledChildrenPreviousYear =
    projectData.key_information.personal_situation_of_children_youth[4]
      .previous_year || "";
  formDataCopy.personalSituation.differentlyAbledChildrenPresentYear =
    projectData.key_information.personal_situation_of_children_youth[4]
      .present_academic_year || "";
  formDataCopy.personalSituation.parentsInConflictPreviousYear =
    projectData.key_information.personal_situation_of_children_youth[5]
      .previous_year || "";
  formDataCopy.personalSituation.parentsInConflictPresentYear =
    projectData.key_information.personal_situation_of_children_youth[5]
      .present_academic_year || "";
  formDataCopy.personalSituation.otherAlimentsPreviousYear =
    projectData.key_information.personal_situation_of_children_youth[6]
      .previous_year || "";
  formDataCopy.personalSituation.otherAlimentsPresentYear =
    projectData.key_information.personal_situation_of_children_youth[6]
      .present_academic_year || "";
  formDataCopy.economicBackground.agriculturalLabour =
    projectData.key_information.economic_background_of_parents[0].number || "";
  formDataCopy.economicBackground.marginalFarmers =
    projectData.key_information.economic_background_of_parents[1].number || "";
  formDataCopy.economicBackground.parentsSelfEmployed =
    projectData.key_information.economic_background_of_parents[2].number || "";
  formDataCopy.economicBackground.parentsInformalSector =
    projectData.key_information.economic_background_of_parents[3].number || "";
  formDataCopy.economicBackground.anyOther =
    projectData.key_information.economic_background_of_parents[4].number || "";
  formDataCopy.challengesFaced =
    projectData.challenges_faced_by_the_benificiary || "";
  formDataCopy.focusAreasDescription =
    projectData.focus_areas_in_present_year || "";
  formDataCopy.monitoringProcess = projectData.monitoring_and_evaluation || "";
  formDataCopy.sustainability = projectData.sustainability || "";
  formDataCopy.projectInChargeAgreement =
    projectData.mailing_list.project_in_charge.agree || false;
  formDataCopy.projectInChargeAgreementDate =
    projectData.mailing_list.project_in_charge.date || "";
  formDataCopy.provincialSuperiorAgreement =
    projectData.mailing_list.provincial_superior.agree || false;
  formDataCopy.provincialSuperiorAgreementDate =
    projectData.mailing_list.provincial_superior.date || "";
  formDataCopy.comment =
    projectData.mailing_list.provincial_superior.comment || "";
  formDataCopy.logicalFramework.goal =
    projectData.solution_analysis_logical_framework.goal || "";
  formDataCopy.logicalFramework.objectives[0].objective =
    projectData.solution_analysis_logical_framework.objectives[0].objective ||
    "";
  formDataCopy.logicalFramework.objectives[0].results = projectData
    .solution_analysis_logical_framework.objectives[0].results || [""];
  formDataCopy.logicalFramework.objectives[0].activities = projectData
    .solution_analysis_logical_framework.objectives[0].activities || [{}];

  // Update the state with the modified formDataCopy
  setFormData(formDataCopy);
  const achievementsCopy = { ...achievements }; // Create a copy of achievements to avoid direct mutation

  // Assuming projectData contains academic, sport, and other achievements arrays
  achievementsCopy.academic = projectData.academic || [];
  achievementsCopy.sport = projectData.sport || [];
  achievementsCopy.other = projectData.other || [];

  // Update the state with the modified achievementsCopy
  setAchievements(achievementsCopy);
  // Map budget data to budgetRows
  const budgetRowsCopy = projectData.budget.budget_particular.map((item) => ({
    description: item.expense_description || "",
    costsLastYear: item.costs_last_year || "",
    budgetCurrentYear: item.budget_current_year || "",
  }));

  // Update the state with the modified budgetRowsCopy
  setBudgetRows(budgetRowsCopy);

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

  const handleSubmit = async () => {
    try {
      const res = await authAxios.put("/projects/editHIVReviewer", {
        comment: formData.provincialSuperiorComment,
        agree: formData.provinciaalSuperiorAgreement,
        project_number: projectData.project_number,
      });
      if (res.data.success) {
        showToast({
          title: "Review succesful",
          duration: 5000,
          status: "success",
        });
      } else {
        showToast({
          title: "Review unsuccesful",
          duration: 5000,
          status: "error",
        });
      }
    } catch (e) {
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
                    value={formData.bridgeEducationPreviousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="bridgeEducationPresentYear"
                    onChange={handleChange}
                    value={formData.bridgeEducationPresentYear || ""}
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
                    value={formData.kindergartenPreviousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="kindergartenPresentYear"
                    onChange={handleChange}
                    value={formData.kindergartenPresentYear || ""}
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
                    value={formData.otherEducationPreviousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducationPresentYear"
                    onChange={handleChange}
                    value={formData.otherEducationPresentYear || ""}
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
                    value={formData.bridgeSchoolPreviousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="bridgeSchoolPresentYear"
                    onChange={handleChange}
                    value={formData.bridgeSchoolPresentYear || ""}
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
                    value={formData.primarySchoolPreviousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="primarySchoolPresentYear"
                    onChange={handleChange}
                    value={formData.primarySchoolPresentYear || ""}
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
                    value={formData.otherEducation610PreviousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation610PresentYear"
                    onChange={handleChange}
                    value={formData.otherEducation610PresentYear || ""}
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
                    value={formData.secondarySchoolPreviousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="secondarySchoolPresentYear"
                    onChange={handleChange}
                    value={formData.secondarySchoolPresentYear || ""}
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
                    value={formData.highSchoolPreviousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="highSchoolPresentYear"
                    onChange={handleChange}
                    value={formData.highSchoolPresentYear || ""}
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
                    value={formData.otherEducation1115PreviousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation1115PresentYear"
                    onChange={handleChange}
                    value={formData.otherEducation1115PresentYear || ""}
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
                    name="undergraduatePreviousYear"
                    onChange={handleChange}
                    value={formData.undergraduatePreviousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="undergraduatePresentYear"
                    onChange={handleChange}
                    value={formData.undergraduatePresentYear || ""}
                    readOnly
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Technical/Vocational education</Td>
                <Td>
                  <Input
                    type="text"
                    name="technicalVocationalEducationPreviousYear"
                    onChange={handleChange}
                    value={
                      formData.technicalVocationalEducationPreviousYear || ""
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
                      formData.technicalVocationalEducationPresentYear || ""
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
                    name="youth16AndAbovebridgeSchoolPreviousYear"
                    onChange={handleChange}
                    value={
                      formData.youth16AndAbovebridgeSchoolPreviousYear || ""
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
                      formData.youth16AndAbovebridgeSchoolPresentYear || ""
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
                    name="otherEducation16AbovePreviousYear"
                    onChange={handleChange}
                    value={formData.otherEducation16AbovePreviousYear || ""}
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation16AbovePresentYear"
                    onChange={handleChange}
                    value={formData.otherEducation16AbovePresentYear || ""}
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
                      formData.personalSituation
                        .childrenWithParentsPresentYear || ""
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
                      formData.personalSituation.semiOrphansPreviousYear || ""
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
                      formData.personalSituation.semiOrphansPresentYear || ""
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
                    value={formData.personalSituation.orphansPreviousYear || ""}
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
                    value={formData.personalSituation.orphansPresentYear || ""}
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
                      formData.personalSituation
                        .hivInfectedAffectedPreviousYear || ""
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
                      formData.personalSituation
                        .hivInfectedAffectedPresentYear || ""
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
                      formData.personalSituation
                        .differentlyAbledChildrenPreviousYear || ""
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
                      formData.personalSituation
                        .differentlyAbledChildrenPresentYear || ""
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
                      formData.personalSituation
                        .parentsInConflictPreviousYear || ""
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
                      formData.personalSituation.parentsInConflictPresentYear ||
                      ""
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
                      formData.personalSituation.otherAlimentsPreviousYear || ""
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
                      formData.personalSituation.otherAlimentsPresentYear || ""
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
              value={formData.monitoringProcess}
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
              {budgetRows.map((row, index) => (
                <Tr key={index}>
                  <Td>
                    <Input
                      type="text"
                      value={row.description}
                      onChange={(e) =>
                        handleBudgetChange(index, "description", e.target.value)
                      }
                      readOnly
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
                      readOnly
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
                      readOnly
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Add row button */}
          {/* <Button colorScheme="teal" onClick={handleAddBudgetRow}>
            Add Expense
          </Button> */}

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

          <Heading as="h1" size="xl" mb={6}>
            Signatures
          </Heading>

          {/* Project-In-Charge agreement */}
          <FormControl>
            <Checkbox
              name="projectInChargeAgreement"
              onChange={handleChange}
              size="lg"
              defaultChecked={formData.projectInChargeAgreement}
              readOnly
            >
              The Project-In-Charge agree
            </Checkbox>
            <Input
              type="date"
              name="projectInChargeAgreementDate"
              onChange={handleChange}
              value={formData.projectInChargeAgreementDate}
              readOnly
            />
          </FormControl>

          {/* Provincial Superior agreement */}
          <FormControl isRequired>
            <Checkbox
              name="provincialSuperiorAgreement"
              onChange={handleChange}
              value={formData.provincialSuperiorAgreement}
              size="lg"
            >
              The Provincial Superior agree
            </Checkbox>
            <Input
              type="date"
              name="provincialSuperiorAgreementDate"
              onChange={handleChange}
              value={formData.provincialSuperiorAgreementDate}
              required
            />
          </FormControl>
          {/* Comment */}
          <FormControl isRequired>
            <FormLabel>Comment(For Reviewer)</FormLabel>
            <Input
              type="text"
              name="comment"
              onChange={handleChange}
              required
            />
          </FormControl>

          {/* Submit Button */}
          <Button
            colorScheme="blue"
            mx={3}
            type="submit"
            onClick={() => (formData.provincialSuperiorAgreement = true)}
          >
            Submit
          </Button>
          {/* decline Button */}
          <Button colorScheme="red" mx={3} type="submit">
            Decline
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default ReviewHIV;
