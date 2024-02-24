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
} from "@chakra-ui/react";
import authAxios from "../../AuthAxios";

const WelfareHomeGroup = () => {
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectRegion: "",
    institutionName: "",
    overallProjectPeriod: "",
    overallProjectBudget: "",
    presidentOfSocietyName: "",
    presidentOfSocietyEmail: "",
    goalOfInstitution: "",
    rational: "",
    totalChildren: { previousYear: "", presentYear: "" },
    rehabilitatedWithGuardians: { previousYear: "", presentYear: "" },
    shiftedToOtherNGOs: { previousYear: "", presentYear: "" },
    pursuingHigherStudies: { previousYear: "", presentYear: "" },
    settledInLife: { previousYear: "", presentYear: "" },
    settledAndWorking: { previousYear: "", presentYear: "" },
    otherCategory: { previousYear: "", presentYear: "" },
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
    multipleSupport: {
      fundScholarships: {
        girls: { previousYear: "", presentYear: "" },
        boys: { previousYear: "", presentYear: "" },
      },
      tuitionClothing: {
        girls: { previousYear: "", presentYear: "" },
        boys: { previousYear: "", presentYear: "" },
      },
      nutrition: {
        girls: { previousYear: "", presentYear: "" },
        boys: { previousYear: "", presentYear: "" },
      },
      freeResidence: {
        girls: { previousYear: "", presentYear: "" },
        boys: { previousYear: "", presentYear: "" },
      },
    },
    presentSituationinternalChallenges: "",
    presentSituationexternalChallenges: "",
    focusAreasDescription: "",
    monitoringProcess: "",
    sustainability: "",
    staff: "",
    projectInChargeAgreement: "",
    projectInChargeAgreementDate: "",
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
      [category]: [...prevAchievements[category],""],
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // find budget total
    const budgetTotal = {
      costs_last_year: 0,
      budget_current_year: 0,
    };

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
        goal_purpose_of_institution: {
          goal_and_purpose: formData.goalOfInstitution,
          rational: formData.rational,
        },
        statistics_of_passed_out_rehabilitated_children: [
          {
            description: "Total number of children in the institution",
            previous_year: formData.totalChildren.previousYear,
            present_year: formData.totalChildren.presentYear,
          },
          {
            description:
              "Children who are rehabilitated with their guardians/parents",
            previous_year: formData.rehabilitatedWithGuardians.previousYear,
            present_year: formData.rehabilitatedWithGuardians.presentYear,
          },
          {
            description: "Children who are shifted to other NGOs / Govt",
            previous_year: formData.shiftedToOtherNGOs.previousYear,
            present_year: formData.shiftedToOtherNGOs.presentYear,
          },
          {
            description: "Children who are pursuing higher studies outside",
            previous_year: formData.pursuingHigherStudies.previousYear,
            present_year: formData.pursuingHigherStudies.presentYear,
          },
          {
            description:
              "Children who completed the studies and settled down in life (i.e. married etc.)",
            previous_year: formData.settledInLife.previousYear,
            present_year: formData.settledInLife.presentYear,
          },
          {
            description: "Children who are now settled and working",
            previous_year: formData.settledAndWorking.previousYear,
            present_year: formData.settledAndWorking.presentYear,
          },
          {
            description: "Any other category kindly mention",
            previous_year: formData.otherCategory.previousYear,
            present_year: formData.otherCategory.presentYear,
          },
        ],
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
            previous_year: formData.personalSituation.otherAlimentsPreviousYear,
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
        multiple_support_provided_for_integrated_development: [
          {
            form_of_support: "Fund/scholarships",
            gender: "Girls",
            number_previous_year:
              formData.multipleSupport.fundScholarships.girls.previousYear,
            number_present_academic_year:
              formData.multipleSupport.fundScholarships.girls.presentYear,
          },
          {
            form_of_support: "Fund/scholarships",
            gender: "Boys",
            number_previous_year:
              formData.multipleSupport.fundScholarships.boys.previousYear,
            number_present_academic_year:
              formData.multipleSupport.fundScholarships.boys.presentYear,
          },
          {
            form_of_support: "Tuition and clothing",
            gender: "Girls",
            number_previous_year:
              formData.multipleSupport.tuitionClothing.girls.previousYear,
            number_present_academic_year:
              formData.multipleSupport.tuitionClothing.girls.presentYear,
          },
          {
            form_of_support: "Tuition and clothing",
            gender: "Boys",
            number_previous_year:
              formData.multipleSupport.tuitionClothing.boys.previousYear,
            number_present_academic_year:
              formData.multipleSupport.tuitionClothing.boys.presentYear,
          },
          {
            form_of_support: "Nutrition",
            gender: "Girls",
            number_previous_year:
              formData.multipleSupport.nutrition.girls.previousYear,
            number_present_academic_year:
              formData.multipleSupport.nutrition.girls.presentYear,
          },
          {
            form_of_support: "Nutrition",
            gender: "Boys",
            number_previous_year:
              formData.multipleSupport.nutrition.boys.previousYear,
            number_present_academic_year:
              formData.multipleSupport.nutrition.boys.presentYear,
          },
          {
            form_of_support: "Free Residence",
            gender: "Girls",
            number_previous_year:
              formData.multipleSupport.freeResidence.girls.previousYear,
            number_present_academic_year:
              formData.multipleSupport.freeResidence.girls.presentYear,
          },
          {
            form_of_support: "Free Residence",
            gender: "Boys",
            number_previous_year:
              formData.multipleSupport.freeResidence.boys.previousYear,
            number_present_academic_year:
              formData.multipleSupport.freeResidence.boys.presentYear,
          },
        ],
        achievements_of_school_and_college_children: {
          academic_achievements: achievements.academic,
          sport_achievements: achievements.sport,
          other_achievements: achievements.other,
        },
      },
      present_situation_of_inmates: {
        internal_challenges_and_present_difficulties:
          formData.presentSituationexternalChallenges,
        external_challenges_and_present_difficulties:
          formData.presentSituationexternalChallenges,
      },
      focus_areas_in_present_year: formData.focusAreasDescription,
      solution_analysis_logical_framework: formData.logicalFramework,
      staff: formData.staff,
      sustainability: formData.sustainability,
      monitoring_and_evaluation: formData.monitoringProcess,
      budget: {
        budget_particular: budgetRows.map((budget) => {
          budgetTotal.costs_last_year += budget.costsLastYear;
          budgetTotal.budget_current_year += budget.budgetCurrentYear;
          return {
            expense_description: budget.description,
            costs_last_year: budget.costsLastYear,
            budget_current_year: budget.budgetCurrentYear,
          };
        }),
        total: budgetTotal,
      },
    };

    console.log(req);
    try {
      const res = await authAxios.post(
        '/projects/createWHFC/' , req
      );
      console.log(res);
      
    } catch (error) {
      console.log(error)
    }
    setIsSubmitted(true);
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6} align="center">
          Welfare Home for Children - Project Application for Institution
          Project
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
              type="text"
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
                <Td>Project Coordinator India</Td>
                <Td>Sr. Nirmala Mathew</Td>

                <Td>micostannsindia@gmail.com</Td>
              </Tr>
              <Tr>
                <Td>Project Coordinator Luzern, Switzerland</Td>
                <Td>Mr. Samuel Imbach</Td>

                <Td>s.imbach@mission-stanna.ch</Td>
              </Tr>
            </Tbody>
          </Table>
          {/* Key Information Section */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Key Information
          </Heading>

          <FormControl mb={4}>
            <FormLabel>Goal / Purpose of the Institution</FormLabel>
            <Textarea
              name="goalOfInstitution"
              onChange={handleChange}
              value={formData.goalOfInstitution || ""}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>
              Explain in short, what the institution's service is, and how this
              will contribute to achieving your set goal.
            </FormLabel>
            <Textarea
              name="rational"
              onChange={handleChange}
              value={formData.rational || ""}
            />
          </FormControl>

          {/* Statistics Of Passed Out / Rehabilitated Children Till Date Section */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Statistics Of Passed Out / Rehabilitated Children Till Date
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
                <Td>Total number of children in the institution</Td>
                <Td>
                  <Input
                    type="text"
                    data-year="previousYear"
                    name="totalChildren"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "totalChildren")
                    }
                    value={formData.totalChildren.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="totalChildren"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "totalChildren")
                    }
                    value={formData.totalChildren.presentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 2 */}
              <Tr>
                <Td>
                  Children who are rehabilitated with their guardians/parents
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="previousYear"
                    name="rehabilitatedWithGuardians"
                    onChange={(e) =>
                      handleChangeStatisticTable(
                        e,
                        "rehabilitatedWithGuardians"
                      )
                    }
                    value={
                      formData.rehabilitatedWithGuardians.previousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="rehabilitatedWithGuardians"
                    onChange={(e) =>
                      handleChangeStatisticTable(
                        e,
                        "rehabilitatedWithGuardians"
                      )
                    }
                    value={
                      formData.rehabilitatedWithGuardians.presentYear || ""
                    }
                  />
                </Td>
              </Tr>

              {/* Row 3 */}
              <Tr>
                <Td>Children who are shifted to other NGOs / Govt</Td>
                <Td>
                  <Input
                    type="text"
                    data-year="previousYear"
                    name="shiftedToOtherNGOs"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "shiftedToOtherNGOs")
                    }
                    value={formData.shiftedToOtherNGOs.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="shiftedToOtherNGOs"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "shiftedToOtherNGOs")
                    }
                    value={formData.shiftedToOtherNGOs.presentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 4 */}
              <Tr>
                <Td>Children who are pursuing higher studies outside</Td>
                <Td>
                  <Input
                    type="text"
                    data-year="previousYear"
                    name="pursuingHigherStudies"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "pursuingHigherStudies")
                    }
                    value={formData.pursuingHigherStudies.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="pursuingHigherStudies"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "pursuingHigherStudies")
                    }
                    value={formData.pursuingHigherStudies.presentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 5 */}
              <Tr>
                <Td>
                  Children who completed the studies and settled down in life
                  (i.e. married etc.)
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="previousYear"
                    name="settledInLife"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "settledInLife")
                    }
                    value={formData.settledInLife.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="settledInLife"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "settledInLife")
                    }
                    value={formData.settledInLife.presentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 6 */}
              <Tr>
                <Td>Children who are now settled and working</Td>
                <Td>
                  <Input
                    type="text"
                    data-year="previousYear"
                    name="settledAndWorking"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "settledAndWorking")
                    }
                    value={formData.settledAndWorking.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="settledAndWorking"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "settledAndWorking")
                    }
                    value={formData.settledAndWorking.presentYear || ""}
                  />
                </Td>
              </Tr>

              {/* Row 7 */}
              <Tr>
                <Td>Any other category kindly mention</Td>
                <Td>
                  <Input
                    type="text"
                    data-year="previousYear"
                    name="otherCategory"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "otherCategory")
                    }
                    value={formData.otherCategory.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="otherCategory"
                    onChange={(e) =>
                      handleChangeStatisticTable(e, "otherCategory")
                    }
                    value={formData.otherCategory.presentYear || ""}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>

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
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
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
                    type="text"
                    name="kindergartenPreviousYear"
                    onChange={handleChange}
                    value={formData.kindergartenPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
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
                    type="text"
                    name="otherEducationPreviousYear"
                    onChange={handleChange}
                    value={formData.otherEducationPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
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
                    type="text"
                    name="bridgeSchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.bridgeSchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
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
                    type="text"
                    name="primarySchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.primarySchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
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
                    type="text"
                    name="otherEducation610PreviousYear"
                    onChange={handleChange}
                    value={formData.otherEducation610PreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
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
                    type="text"
                    name="secondarySchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.secondarySchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
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
                    type="text"
                    name="highSchoolPreviousYear"
                    onChange={handleChange}
                    value={formData.highSchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
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
                    type="text"
                    name="otherEducation1115PreviousYear"
                    onChange={handleChange}
                    value={formData.otherEducation1115PreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
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
                    type="text"
                    name="undergraduatePreviousYear"
                    onChange={handleChange}
                    value={formData.undergraduatePreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
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
                    type="text"
                    name="technicalVocationalEducationPreviousYear"
                    onChange={handleChange}
                    value={
                      formData.technicalVocationalEducationPreviousYear || ""
                    }
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
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
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

          <Heading as="h2" size="lg" mt={6} mb={4}>
            Multiple Support Provided For Integrated Development Of Students
          </Heading>

          <Table variant="simple" mb={4}>
            <Thead>
              <Tr>
                <Th>Form of Support</Th>
                <Th>Gender</Th>
                <Th>Number Previous Year</Th>
                <Th>Number Present Academic Year</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* Fund/scholarships */}
              <Tr>
                <Td rowSpan="2">Fund/scholarships</Td>
                <Td>Girls</Td>
                <Td>
                  <Input
                    type="text"
                    name="fundScholarshipsGirlsPreviousYear"
                    value={
                      formData.multipleSupport.fundScholarships.girls
                        .previousYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "fundScholarships",
                        "girls",
                        "previousYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="fundScholarshipsGirlsPresentYear"
                    value={
                      formData.multipleSupport.fundScholarships.girls
                        .presentYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "fundScholarships",
                        "girls",
                        "presentYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Boys</Td>
                <Td>
                  <Input
                    type="text"
                    name="fundScholarshipsBoysPreviousYear"
                    value={
                      formData.multipleSupport.fundScholarships.boys
                        .previousYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "fundScholarships",
                        "boys",
                        "previousYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="fundScholarshipsBoysPresentYear"
                    value={
                      formData.multipleSupport.fundScholarships.boys.presentYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "fundScholarships",
                        "boys",
                        "presentYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
              </Tr>

              {/* Tuition and clothing */}
              <Tr>
                <Td rowSpan="2">Tuition and clothing</Td>
                <Td>Girls</Td>
                <Td>
                  <Input
                    type="text"
                    name="tuitionClothingGirlsPreviousYear"
                    value={
                      formData.multipleSupport.tuitionClothing.girls
                        .previousYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "tuitionClothing",
                        "girls",
                        "previousYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="tuitionClothingGirlsPresentYear"
                    value={
                      formData.multipleSupport.tuitionClothing.girls.presentYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "tuitionClothing",
                        "girls",
                        "presentYear"
                      )
                    }
                    style={{ border: "1px solid #ccc, padding: 5px" }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Boys</Td>
                <Td>
                  <Input
                    type="text"
                    name="tuitionClothingBoysPreviousYear"
                    value={
                      formData.multipleSupport.tuitionClothing.boys.previousYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "tuitionClothing",
                        "boys",
                        "previousYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="tuitionClothingBoysPresentYear"
                    value={
                      formData.multipleSupport.tuitionClothing.boys.presentYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "tuitionClothing",
                        "boys",
                        "presentYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
              </Tr>

              {/* Nutrition */}
              <Tr>
                <Td rowSpan="2">Nutrition</Td>
                <Td>Girls</Td>
                <Td>
                  <Input
                    type="text"
                    name="nutritionGirlsPreviousYear"
                    value={
                      formData.multipleSupport.nutrition.girls.previousYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "nutrition",
                        "girls",
                        "previousYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="nutritionGirlsPresentYear"
                    value={formData.multipleSupport.nutrition.girls.presentYear}
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "nutrition",
                        "girls",
                        "presentYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Boys</Td>
                <Td>
                  <Input
                    type="text"
                    name="nutritionBoysPreviousYear"
                    value={formData.multipleSupport.nutrition.boys.previousYear}
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "nutrition",
                        "boys",
                        "previousYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="nutritionBoysPresentYear"
                    value={formData.multipleSupport.nutrition.boys.presentYear}
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "nutrition",
                        "boys",
                        "presentYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
              </Tr>

              {/* Free Residence */}
              <Tr>
                <Td rowSpan="2">Free Residence</Td>
                <Td>Girls</Td>
                <Td>
                  <Input
                    type="text"
                    name="freeResidenceGirlsPreviousYear"
                    value={
                      formData.multipleSupport.freeResidence.girls.previousYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "freeResidence",
                        "girls",
                        "previousYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="freeResidenceGirlsPresentYear"
                    value={
                      formData.multipleSupport.freeResidence.girls.presentYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "freeResidence",
                        "girls",
                        "presentYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
              </Tr>
              <Tr>
                <Td>Boys</Td>
                <Td>
                  <Input
                    type="text"
                    name="freeResidenceBoysPreviousYear"
                    value={
                      formData.multipleSupport.freeResidence.boys.previousYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "freeResidence",
                        "boys",
                        "previousYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="freeResidenceBoysPresentYear"
                    value={
                      formData.multipleSupport.freeResidence.boys.presentYear
                    }
                    onChange={(e) =>
                      handleChangeMultipleSupport(
                        e,
                        "freeResidence",
                        "boys",
                        "presentYear"
                      )
                    }
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Heading as="h2" size="lg" mt={6} mb={4}>
            Achievements Of School And College Children In The Previous Year
          </Heading>

          {/* Academic Achievements */}
          <VStack mb={4}>
            <Heading as="h3" size="md">
              Academic Achievements
            </Heading>
            {achievements.academic.map((achievement, index) => (
              <Input
                key={index}
                type="text"
                value={achievement.description}
                onChange={(e) =>
                  handleAchievementChange("academic", index, e.target.value)
                }
                mb={2}
              />
            ))}
            <Button onClick={() => handleAddAchievement("academic")}>
              Add Academic Achievement
            </Button>
          </VStack>

          {/* Sport Achievements */}
          <VStack mb={4}>
            <Heading as="h3" size="md">
              Sport Achievements
            </Heading>
            {achievements.sport.map((achievement, index) => (
              <Input
                key={index}
                type="text"
                value={achievement.description}
                onChange={(e) =>
                  handleAchievementChange("sport", index, e.target.value)
                }
                mb={2}
              />
            ))}
            <Button onClick={() => handleAddAchievement("sport")}>
              Add Sport Achievement
            </Button>
          </VStack>

          {/* Other Achievements */}
          <VStack mb={4}>
            <Heading as="h3" size="md">
              Any Other Achievements
            </Heading>
            {achievements.other.map((achievement, index) => (
              <Input
                key={index}
                type="text"
                value={achievement.description}
                onChange={(e) =>
                  handleAchievementChange("other", index, e.target.value)
                }
                mb={2}
              />
            ))}
            <Button onClick={() => handleAddAchievement("other")}>
              Add Other Achievement
            </Button>
          </VStack>

          {/* Present Situation of the Inmates */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Present Situation of the Inmates
          </Heading>

          {/* Internal Challenges And Present Difficulties */}
          <Box mb={4}>
            <Heading as="h3" size="md">
              Internal Challenges And Present Difficulties
            </Heading>
            <Textarea
              name="presentSituationinternalChallenges"
              value={formData.presentSituationinternalChallenges}
              onChange={handleChange}
              placeholder="Enter text..."
              size="md"
            />
          </Box>

          {/* External Challenges And Present Difficulties */}
          <Box mb={4}>
            <Heading as="h3" size="md">
              External Challenges And Present Difficulties
            </Heading>
            <Textarea
              name="presentSituationexternalChallenges"
              value={formData.presentSituationexternalChallenges}
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

          {/* Staff Information */}
          <Heading as="h2" size="lg" mt={6} mb={4}>
            Staff
          </Heading>
          <FormControl isRequired>
            <FormLabel>
              Provide an overview of the involved staff. How many sisters are
              working in the institution? How many lay staff members are there?
              What are the roles/jobs of the people? What is their educational
              background? Etc.
            </FormLabel>
            <Textarea
              name="staff"
              value={formData.staff}
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

          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>

            {/* Project-In-Charge agreement */}
            <FormControl isRequired>
              <Checkbox
                name="projectInChargeAgreement"
                onChange={handleChange}
                size="lg"
              >
                The Project-In-Charge agree
              </Checkbox>
              <Input
                type="date"
                name="projectInChargeAgreementDate"
                onChange={handleChange}
                required
              />
            </FormControl>
          </VStack>

          {/* Submit Button */}
          <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default WelfareHomeGroup;
