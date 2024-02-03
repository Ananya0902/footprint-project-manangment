import React, { useEffect, useState } from "react";
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
import authAxios from "../AuthAxios";

const ReviewWelfareHomeForChildren = () => {
  // form details
  const [isSubmitted, setIsSubmitted] = useState(false);
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
  // academic achievement
  const [achievements, setAchievements] = useState({
    academic: [],
    sport: [],
    other: [],
  });
  // budget rows
  const [budgetRows, setBudgetRows] = useState([
    { description: "", costsLastYear: "", budgetCurrentYear: "" },
  ]);

  useEffect(() => {
    const getDetails = async () => {
      // Assuming res contains the response from the GET API
      // Parse the response and set the state variables

      const res = await authAxios.get("/getAllWHFC");

      // Parsing the response and setting the state variables
      setFormData({
        projectTitle: res.project_title || "",
        projectRegion: res.general_information.project_region || "",
        institutionName: res.general_information.institution_name || "",
        overallProjectPeriod:
          res.general_information.overall_project_period || "",
        overallProjectBudget:
          res.general_information.overall_project_budget || "",
        presidentOfSocietyName:
          res.mailing_list.president_of_the_society.name || "",
        presidentOfSocietyEmail:
          res.mailing_list.president_of_the_society.email || "",
        goalOfInstitution:
          res.key_information.goal_purpose_of_institution.goal_and_purpose ||
          "",
        rational:
          res.key_information.goal_purpose_of_institution.rational || "",
        totalChildren: {
          previousYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[0]
              .previous_year || "",
          presentYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[0]
              .present_year || "",
        },
        rehabilitatedWithGuardians: {
          previousYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[1]
              .previous_year || "",
          presentYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[1]
              .present_year || "",
        },
        shiftedToOtherNGOs: {
          previousYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[2]
              .previous_year || "",
          presentYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[2]
              .present_year || "",
        },
        pursuingHigherStudies: {
          previousYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[3]
              .previous_year || "",
          presentYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[3]
              .present_year || "",
        },
        settledInLife: {
          previousYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[4]
              .previous_year || "",
          presentYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[4]
              .present_year || "",
        },
        settledAndWorking: {
          previousYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[5]
              .previous_year || "",
          presentYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[5]
              .present_year || "",
        },
        otherCategory: {
          previousYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[6]
              .previous_year || "",
          presentYear:
            res.key_information
              .statistics_of_passed_out_rehabilitated_children[6]
              .present_year || "",
        },
        bridgeEducationPreviousYear:
          res.key_information.age_profile_of_children_and_youth[0]
            .previous_year || "",
        bridgeEducationPresentYear:
          res.key_information.age_profile_of_children_and_youth[0]
            .present_academic_year || "",
        kindergartenPreviousYear:
          res.key_information.age_profile_of_children_and_youth[1]
            .previous_year || "",
        kindergartenPresentYear:
          res.key_information.age_profile_of_children_and_youth[1]
            .present_academic_year || "",
        otherEducationPreviousYear:
          res.key_information.age_profile_of_children_and_youth[2]
            .previous_year || "",
        otherEducationPresentYear:
          res.key_information.age_profile_of_children_and_youth[2]
            .present_academic_year || "",
        bridgeSchoolPreviousYear:
          res.key_information.age_profile_of_children_and_youth[3]
            .previous_year || "",
        bridgeSchoolPresentYear:
          res.key_information.age_profile_of_children_and_youth[3]
            .present_academic_year || "",
        primarySchoolPreviousYear:
          res.key_information.age_profile_of_children_and_youth[4]
            .previous_year || "",
        primarySchoolPresentYear:
          res.key_information.age_profile_of_children_and_youth[4]
            .present_academic_year || "",
        otherEducation610PreviousYear:
          res.key_information.age_profile_of_children_and_youth[5]
            .previous_year || "",
        otherEducation610PresentYear:
          res.key_information.age_profile_of_children_and_youth[5]
            .present_academic_year || "",
        secondarySchoolPreviousYear:
          res.key_information.age_profile_of_children_and_youth[6]
            .previous_year || "",
        secondarySchoolPresentYear:
          res.key_information.age_profile_of_children_and_youth[6]
            .present_academic_year || "",
        highSchoolPreviousYear:
          res.key_information.age_profile_of_children_and_youth[7]
            .previous_year || "",
        highSchoolPresentYear:
          res.key_information.age_profile_of_children_and_youth[7]
            .present_academic_year || "",
        otherEducation1115PreviousYear:
          res.key_information.age_profile_of_children_and_youth[8]
            .previous_year || "",
        otherEducation1115PresentYear:
          res.key_information.age_profile_of_children_and_youth[8]
            .present_academic_year || "",
        undergraduatePreviousYear:
          res.key_information.age_profile_of_children_and_youth[9]
            .previous_year || "",
        undergraduatePresentYear:
          res.key_information.age_profile_of_children_and_youth[9]
            .present_academic_year || "",
        technicalVocationalEducationPreviousYear:
          res.key_information.age_profile_of_children_and_youth[10]
            .previous_year || "",
        technicalVocationalEducationPresentYear:
          res.key_information.age_profile_of_children_and_youth[10]
            .present_academic_year || "",
        otherEducation16AbovePreviousYear:
          res.key_information.age_profile_of_children_and_youth[11]
            .previous_year || "",
        otherEducation16AbovePresentYear:
          res.key_information.age_profile_of_children_and_youth[11]
            .present_academic_year || "",
        youth16AndAbovebridgeSchoolPreviousYear:
          res.key_information.age_profile_of_children_and_youth[12]
            .previous_year || "",
        youth16AndAbovebridgeSchoolPresentYear:
          res.key_information.age_profile_of_children_and_youth[12]
            .present_academic_year || "",
        personalSituation: {
          childrenWithParentsPreviousYear:
            res.key_information.personal_situation_of_children_youth[0]
              .previous_year || "",
          childrenWithParentsPresentYear:
            res.key_information.personal_situation_of_children_youth[0]
              .present_academic_year || "",
          semiOrphansPreviousYear:
            res.key_information.personal_situation_of_children_youth[1]
              .previous_year || "",
          semiOrphansPresentYear:
            res.key_information.personal_situation_of_children_youth[1]
              .present_academic_year || "",
          orphansPreviousYear:
            res.key_information.personal_situation_of_children_youth[2]
              .previous_year || "",
          orphansPresentYear:
            res.key_information.personal_situation_of_children_youth[2]
              .present_academic_year || "",
          hivInfectedAffectedPreviousYear:
            res.key_information.personal_situation_of_children_youth[3]
              .previous_year || "",
          hivInfectedAffectedPresentYear:
            res.key_information.personal_situation_of_children_youth[3]
              .present_academic_year || "",
          differentlyAbledChildrenPreviousYear:
            res.key_information.personal_situation_of_children_youth[4]
              .previous_year || "",
          differentlyAbledChildrenPresentYear:
            res.key_information.personal_situation_of_children_youth[4]
              .present_academic_year || "",
          parentsInConflictPreviousYear:
            res.key_information.personal_situation_of_children_youth[5]
              .previous_year || "",
          parentsInConflictPresentYear:
            res.key_information.personal_situation_of_children_youth[5]
              .present_academic_year || "",
          otherAlimentsPreviousYear:
            res.key_information.personal_situation_of_children_youth[6]
              .previous_year || "",
          otherAlimentsPresentYear:
            res.key_information.personal_situation_of_children_youth[6]
              .present_academic_year || "",
        },
        economicBackground: {
          agriculturalLabour:
            res.key_information.economic_background_of_parents[0].number || "",
          marginalFarmers:
            res.key_information.economic_background_of_parents[1].number || "",
          parentsSelfEmployed:
            res.key_information.economic_background_of_parents[2].number || "",
          parentsInformalSector:
            res.key_information.economic_background_of_parents[3].number || "",
          anyOther:
            res.key_information.economic_background_of_parents[4].number || "",
        },
        multipleSupport: {
          fundScholarships: {
            girls: {
              previousYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[0]
                  .number_previous_year || "",
              presentYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[0]
                  .number_present_academic_year || "",
            },
            boys: {
              previousYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[1]
                  .number_previous_year || "",
              presentYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[1]
                  .number_present_academic_year || "",
            },
          },
          tuitionClothing: {
            girls: {
              previousYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[2]
                  .number_previous_year || "",
              presentYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[2]
                  .number_present_academic_year || "",
            },
            boys: {
              previousYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[3]
                  .number_previous_year || "",
              presentYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[3]
                  .number_present_academic_year || "",
            },
          },
          nutrition: {
            girls: {
              previousYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[4]
                  .number_previous_year || "",
              presentYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[4]
                  .number_present_academic_year || "",
            },
            boys: {
              previousYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[5]
                  .number_previous_year || "",
              presentYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[5]
                  .number_present_academic_year || "",
            },
          },
          freeResidence: {
            girls: {
              previousYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[6]
                  .number_previous_year || "",
              presentYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[6]
                  .number_present_academic_year || "",
            },
            boys: {
              previousYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[7]
                  .number_previous_year || "",
              presentYear:
                res.key_information
                  .multiple_support_provided_for_integrated_development[7]
                  .number_present_academic_year || "",
            },
          },
        },
        presentSituationinternalChallenges:
          res.present_situation_of_inmates
            .internal_challenges_and_present_difficulties || "",
        presentSituationexternalChallenges:
          res.present_situation_of_inmates
            .external_challenges_and_present_difficulties || "",
        focusAreasDescription: res.focus_areas_in_present_year || "",
        monitoringProcess: res.monitoring_and_evaluation || "",
        sustainability: res.sustainability || "",
        staff: res.staff || "",
        projectInChargeAgreement: res.projectInChargeAgreement || "",
        projectInChargeAgreementDate: res.projectInChargeAgreementDate || "",
        logicalFramework: {
          goal: res.solution_analysis_logical_framework.goal || "",
          objectives: res.solution_analysis_logical_framework.objectives.map(
            (objective) => ({
              objective: objective.objective || "",
              results: objective.results || [""],
              activities: objective.activities || [],
            })
          ),
        },
      });

      // Populating budgetRows
      const budgetRowsData = res.budget.budget_particular.map((budgetItem) => ({
        description: budgetItem.expense_description || "",
        costsLastYear: budgetItem.costs_last_year || "",
        budgetCurrentYear: budgetItem.budget_current_year || "",
      }));
      setBudgetRows(budgetRowsData);

      // Populating achievements
      setAchievements({
        academic:
          res.achievements_of_school_and_college_children
            .academic_achievements || [],
        sport:
          res.achievements_of_school_and_college_children.sport_achievements ||
          [],
        other:
          res.achievements_of_school_and_college_children.other_achievements ||
          [],
      });
    };
    getDetails();

    return () => {};
  }, []);

  const calculateTotalCosts = (field) => {
    return budgetRows
      .reduce((total, row) => total + parseFloat(row[field]) || 0, 0)
      .toFixed(2);
  };

  const handleSubmit = async () => {};

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
              readOnly
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
              readOnly
              value={formData.projectRegion || ""}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Institution Name</FormLabel>
            <Input
              type="text"
              name="institutionName"
              readOnly
              value={formData.institutionName || ""}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Overall Project Period</FormLabel>
            <Input
              type="text"
              name="overallProjectPeriod"
              readOnly
              value={formData.overallProjectPeriod || ""}
            />
          </FormControl>

          <FormControl mb={4}>
            <FormLabel>Overall Project Budget</FormLabel>
            <Input
              type="text"
              name="overallProjectBudget"
              readOnly
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
                    readOnly
                    value={formData.presidentOfSocietyName || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="email"
                    name="presidentOfSocietyEmail"
                    readOnly
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
            <FormLabel>Goal / Purpose of the Institution</FormLabel>
            <Textarea
              name="goalOfInstitution"
              readOnly
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
              readOnly
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
                    readOnly
                    value={formData.totalChildren.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="totalChildren"
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
                    value={formData.shiftedToOtherNGOs.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="shiftedToOtherNGOs"
                    readOnly
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
                    readOnly
                    value={formData.pursuingHigherStudies.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="pursuingHigherStudies"
                    readOnly
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
                    readOnly
                    value={formData.settledInLife.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="settledInLife"
                    readOnly
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
                    readOnly
                    value={formData.settledAndWorking.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="settledAndWorking"
                    readOnly
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
                    readOnly
                    value={formData.otherCategory.previousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    data-year="presentYear"
                    name="otherCategory"
                    readOnly
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
                    readOnly
                    value={formData.bridgeEducationPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="bridgeEducationPresentYear"
                    readOnly
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
                    readOnly
                    value={formData.kindergartenPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="kindergartenPresentYear"
                    readOnly
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
                    readOnly
                    value={formData.otherEducationPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducationPresentYear"
                    readOnly
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
                    readOnly
                    value={formData.bridgeSchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="bridgeSchoolPresentYear"
                    readOnly
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
                    readOnly
                    value={formData.primarySchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="primarySchoolPresentYear"
                    readOnly
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
                    readOnly
                    value={formData.otherEducation610PreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation610PresentYear"
                    readOnly
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
                    readOnly
                    value={formData.secondarySchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="secondarySchoolPresentYear"
                    readOnly
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
                    readOnly
                    value={formData.highSchoolPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="highSchoolPresentYear"
                    readOnly
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
                    readOnly
                    value={formData.otherEducation1115PreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation1115PresentYear"
                    readOnly
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
                    readOnly
                    value={formData.undergraduatePreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="undergraduatePresentYear"
                    readOnly
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
                    readOnly
                    value={
                      formData.technicalVocationalEducationPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="technicalVocationalEducationPresentYear"
                    readOnly
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
                    readOnly
                    value={
                      formData.youth16AndAbovebridgeSchoolPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="youth16AndAbovebridgeSchoolPresentYear"
                    readOnly
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
                    readOnly
                    value={formData.otherEducation16AbovePreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherEducation16AbovePresentYear"
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
                    value={
                      formData.personalSituation.semiOrphansPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="semiOrphansPresentYear"
                    readOnly
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
                    readOnly
                    value={formData.personalSituation.orphansPreviousYear || ""}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="orphansPresentYear"
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
                    value={
                      formData.personalSituation.otherAlimentsPreviousYear || ""
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="otherAlimentsPresentYear"
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="nutritionGirlsPresentYear"
                    value={formData.multipleSupport.nutrition.girls.presentYear}
                    readOnly
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
                    readOnly
                    style={{ border: "1px solid #ccc", padding: "5px" }}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    name="nutritionBoysPresentYear"
                    value={formData.multipleSupport.nutrition.boys.presentYear}
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                    readOnly
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
                readOnly
                mb={2}
              />
            ))}
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
                readOnly
                mb={2}
              />
            ))}
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
                readOnly
                mb={2}
              />
            ))}
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
              readOnly
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
              readOnly
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
              readOnly
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
            <Textarea name="goal" readOnly required />
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
                    readOnly
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
                        readOnly
                        required
                      />
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
                              readOnly
                              required
                            />
                          </Td>
                          <Td>
                            <Textarea
                              name="verification"
                              value={activity.verification}
                              readOnly
                              required
                            />
                          </Td>
                          <Td>
                            <Textarea
                              name="indicator"
                              value={activity.indicator}
                              readOnly
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

                  <Button colorScheme="teal">Add Activity</Button>
                </FormControl>

                <Button colorScheme="purple" ml="auto">
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
            <Textarea name="staff" value={formData.staff} required />
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
                    <Input type="text" value={row.description} />
                  </Td>
                  <Td>
                    <Input type="number" value={row.costsLastYear} />
                  </Td>
                  <Td>
                    <Input type="number" value={row.budgetCurrentYear} />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Total Costs */}

          <FormControl>
            <FormLabel>Total Costs Last Year</FormLabel>
            <Input value={calculateTotalCosts("costsLastYear")} readOnly />
          </FormControl>
          <FormControl mt={2}>
            <FormLabel>Total Budget Current Year</FormLabel>
            <Input isReadOnly />
          </FormControl>

          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>

            {/* Project-In-Charge agreement */}
            <FormControl isRequired>
              <Checkbox name="projectInChargeAgreement" size="lg">
                The Project-In-Charge agree
              </Checkbox>
              <Input type="date" name="projectInChargeAgreementDate" required />
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

export default ReviewWelfareHomeForChildren; 