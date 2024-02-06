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
import authAxios from "../AuthAxios";

export const InstitutionalSkillTrainingForm = () => {
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [budgetData, setBudgetData] = useState([{ budget: 0, cost: 0 }]);
  const [formData, setFormData] = useState({
    basicInformation: {
      NAMEOFTHESOCIETY: "",
      dATEOFSUBMISSION: "",
      TITLEOFTHEPROJECT: "",
      address: "",

      overallProjectPeriod: "",
      overallProjectBudget: "",
      numberOfBeneficiaries: "",
      residentialVillages: "",
      selectionCriteriaAndProfile: "",
      descriptionOfBeneficiary: "",
      problemAnalysis: "",
      solutionAnalysis: "",
    },
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
    sustainability: "",
    monitoringProcess: "",
    evaluationMethodology: "",
    signatures: {
      projectCoordinatorAgreement: false,
      projectCoordinatorAgreementDate: "",
      projectInChargeAgreement: false,
      projectInChargeAgreementDate: "",
      provincialSuperiorAgreement: false,
      provincialSuperiorAgreementDate: "",
    },
  });
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e, index, subIndex) => {
    const { name, value } = e.target;
    const updatedData = { ...formData };
    console.log(name, value);
    console.log(formData);
    if (name.includes("signatures")) {
      updatedData.signatures[name.split(".")[1]] = value;
    } else if (
      name.includes("provincialSuperior") ||
      name.includes("projectInCharge")
    ) {
      const [field, role] = name.split(".");
      updatedData.basicInformation[role][field] = value;
    } else if (name.includes("objective")) {
      updatedData.logicalFramework.objectives[index].objective = value;
    } else if (name.includes("result")) {
      updatedData.logicalFramework.objectives[index].results[subIndex] = value;
    } else if (name.includes("activity")) {
      console.log(e.target.name, e.target.value);
      updatedData.logicalFramework.objectives[index].activities[subIndex][
        "activity"
      ] = value;
    } else if (name.includes("logicalFramework")) {
      updatedData.logicalFramework[name.split(".")[1]] = value;
    } else if (name.includes("verification")) {
      updatedData.logicalFramework.objectives[index].activities[subIndex][
        "verification"
      ] = value;
    } else if (name.includes("basicInformation")) {
      updatedData.basicInformation[name.split(".")[1]] = value;
    } else {
      updatedData[name] = value;
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
      timeframe: Array.from({ length: 12 }).fill(false),
    });
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("inside handle submit");

    try {
      const req = {
        NameOfSociety: formData.basicInformation.NAMEOFTHESOCIETY,
        DateOfSubmission: formData.basicInformation.dATEOFSUBMISSION,
        TitleOfProject: formData.basicInformation.TITLEOFTHEPROJECT,
        address: formData.basicInformation.address,
        OverallProjectPeriod: parseInt(
          formData.basicInformation.overallProjectPeriod
        ),
        OverallProjectBudget: parseInt(
          formData.basicInformation.overallProjectBudget
        ),
        NumberOfBeneficiaries: parseInt(
          formData.basicInformation.numberOfBeneficiaries
        ),
        ResidentialVillages: formData.basicInformation.residentialVillages,
        SelectionCriteriaAndProfile:
          formData.basicInformation.selectionCriteriaAndProfile,
        DescriptionOfBeneficiary:
          formData.basicInformation.descriptionOfBeneficiary,
        problemAnalysis: formData.basicInformation.problemAnalysis,
        solutionAnalysis: formData.basicInformation.solutionAnalysis,
        goal: formData.logicalFramework.goal,
        objectives: formData.logicalFramework.objectives.map((objective) => ({
          objective: objective.objective,
          results: objective.results,
          activities: objective.activities,
        })),
        sustainability: formData.sustainability,
        monitoringProcess: formData.monitoringProcess,
        evaluationMethodology: formData.evaluationMethodology,
        budgetData: budgetData.map((budgetDetail) => ({
          budget: parseInt(budgetDetail.budget),
          cost: parseInt(budgetDetail.cost),
        })),
        project_in_charge_agree: {
          agree: formData.signatures.projectInChargeAgreement,
        },
      };
      // Now you can use this requestObject for validation or further processing
      setIsLoading(true);
      const res = await authAxios.post("/projects/createISG", req);
      console.log(res);
      setIsLoading(false);
      if (res.data.success) {
        setIsSubmitted(true);
        showToast({
          title: "Submitted the form succeesfully",
          status: "success",
          duration: 5000,
        });
      } else {
        showToast({
          title: "Unsuccessful submission",
          status: "error",
          duration: 5000,
        });
        showToast({
          title: "Unsuccessful submission",
          status: "error",
          duration: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      showToast({
        title: "Unsuccessful submission",
        status: "error",
        duration: 5000,
      });
    }
  };

  const BudgetTable = () => {
    // Function to handle changes in budget data
    const handleBudgetChange = (index, field, value) => {
      console.log(budgetData);
      const newData = [...budgetData];
      newData[index][field] = value;
      setBudgetData(newData);
    };

    // Function to add a new row for budget details
    const handleAddBudgetRow = () => {
      setBudgetData([...budgetData, { budget: 0, cost: 0 }]);
    };

    // Function to calculate the total amount
    const calculateTotalAmount = () => {
      return budgetData.reduce(
        (total, row) => total + parseFloat(row.cost) || 0,
        0
      );
    };

    return (
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6}>
          Budget Details
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Budget</Th>
              <Th>Cost</Th>
            </Tr>
          </Thead>
          <Tbody>
            {budgetData.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    type="number"
                    value={row.budget}
                    onChange={(e) =>
                      handleBudgetChange(index, "budget", e.target.value)
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.cost}
                    onChange={(e) =>
                      handleBudgetChange(index, "cost", e.target.value)
                    }
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button onClick={handleAddBudgetRow} mt={4}>
          Add Row
        </Button>

        <FormControl>
          <FormLabel>Total Amount</FormLabel>
          <Input type="text" value={calculateTotalAmount()} isReadOnly />
        </FormControl>
      </Box>
    );
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6}>
          Institutional Skill Training Application Form
        </Heading>

        {isSubmitted && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Form submitted successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack align="start" spacing={4} mb={8}>
            {/* Basic Information */}
            {/* NAME OF THE SOCIETY */}
            <FormControl isRequired>
              <FormLabel>NAME OF THE SOCIETY</FormLabel>
              <Input
                type="text"
                name="basicInformation.NAMEOFTHESOCIETY"
                onChange={handleChange}
                value={formData.basicInformation.NAMEOFTHESOCIETY}
                required
              />
            </FormControl>
            {/* DATE OF SUBMISSION */}
            <FormControl isRequired>
              <FormLabel>DATE OF SUBMISSION</FormLabel>
              <Input
                type="date"
                name="basicInformation.dATEOFSUBMISSION"
                onChange={handleChange}
                value={formData.basicInformation.dATEOFSUBMISSION}
                required
              />
            </FormControl>
            {/* TITLE OF THE PROJECT */}
            <FormControl isRequired>
              <FormLabel>TITLE OF THE PROJECT</FormLabel>
              <Input
                type="text"
                name="basicInformation.TITLEOFTHEPROJECT"
                onChange={handleChange}
                value={formData.basicInformation.TITLEOFTHEPROJECT}
                required
              />
            </FormControl>
            {/* ADDRESS */}
            <FormControl isRequired>
              <FormLabel>ADDRESS</FormLabel>
              <Input
                type="text"
                name="basicInformation.address"
                onChange={handleChange}
                value={formData.basicInformation.address}
                required
              />
            </FormControl>

            {/* Overall Project Period */}
            <FormControl isRequired>
              <FormLabel>Overall Project Period (in months)</FormLabel>
              <Input
                type="number"
                name="basicInformation.overallProjectPeriod"
                onChange={handleChange}
                value={formData.basicInformation.overallProjectPeriod}
                required
              />
            </FormControl>
            {/* Overall Project Budget */}
            <FormControl isRequired>
              <FormLabel>Overall Project Budget</FormLabel>
              <Input
                type="number"
                name="basicInformation.overallProjectBudget"
                onChange={handleChange}
                value={formData.basicInformation.overallProjectBudget}
                required
              />
            </FormControl>
            {/* Target Group */}
            {/* Number of Beneficiaries */}
            <FormControl isRequired>
              <FormLabel>Number of Beneficiaries</FormLabel>
              <Input
                type="number"
                name="basicInformation.numberOfBeneficiaries"
                onChange={handleChange}
                value={formData.basicInformation.numberOfBeneficiaries}
                required
              />
            </FormControl>
            {/* Residential Villages of the Beneficiaries */}
            <FormControl isRequired>
              <FormLabel>Residential Villages of the Beneficiaries</FormLabel>
              <Textarea
                name="basicInformation.residentialVillages"
                onChange={handleChange}
                value={formData.basicInformation.residentialVillages}
                required
              />
            </FormControl>
            {/* Selection Criteria and Profile of the Target Group */}
            <FormControl isRequired>
              <FormLabel>
                Selection Criteria and Profile of the Target Group
              </FormLabel>
              <Textarea
                name="basicInformation.selectionCriteriaAndProfile"
                onChange={handleChange}
                value={formData.basicInformation.selectionCriteriaAndProfile}
                required
              />
            </FormControl>
            {/* Intervention Logic */}
            {/* Brief description of the beneficiaries and the problems they are facing */}
            <FormControl isRequired>
              <FormLabel>
                Brief description of the beneficiaries and the problems they are
                facing
              </FormLabel>
              <Textarea
                name="basicInformation.descriptionOfBeneficiary"
                onChange={handleChange}
                value={formData.basicInformation.descriptionOfBeneficiary}
                required
              />
            </FormControl>
            {/* Analysis of the Problem to be resolved by the Project */}
            <FormControl isRequired>
              <FormLabel>
                Analysis of the Problem to be resolved by the Project
              </FormLabel>
              <Textarea
                name="basicInformation.problemAnalysis"
                onChange={handleChange}
                value={formData.basicInformation.problemAnalysis}
                required
              />
            </FormControl>
            {/* Solution Analysis */}
            <FormControl isRequired>
              <FormLabel>Solution Analysis</FormLabel>
              <Textarea
                name="basicInformation.solutionAnalysis"
                onChange={handleChange}
                value={formData.basicInformation.solutionAnalysis}
                required
              />
            </FormControl>
            {/* Logical Framework */}
            <Heading as="h1" size="xl" mb={6}>
              Logical Framework
            </Heading>
            {/* Goal of the Project */}
            <FormControl isRequired>
              <FormLabel>Goal of the Project</FormLabel>
              <Textarea
                name="logicalFramework.goal"
                onChange={handleChange}
                required
              />
            </FormControl>
            {/* Objectives */}
            <Heading as="h1" size="l" mb={6}>
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
                {/* Objective */}
                <FormControl isRequired>
                  <FormLabel>Objective {index + 1}</FormLabel>
                  <Textarea
                    name={`objective.${index}`}
                    value={objective.objective}
                    onChange={(e) => handleChange(e, index)}
                    required
                  />
                </FormControl>
                {/* Results */}
                <FormControl isRequired>
                  <FormLabel>Results</FormLabel>
                  {objective.results.map((result, subIndex) => (
                    <Box key={subIndex}>
                      <Textarea
                        name={`result.${index}.${subIndex}`}
                        value={result}
                        onChange={(e) => handleChange(e, index, subIndex)}
                        required
                      />
                      <Button
                        onClick={() => handleAddResult(index)}
                        colorScheme="teal"
                      >
                        Add Result
                      </Button>
                    </Box>
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
                      </Tr>
                    </Thead>
                    <Tbody>
                      {objective.activities.map((activity, subIndex) => (
                        <Tr key={subIndex}>
                          <Td>
                            <Textarea
                              name={`activity.${index}.${subIndex}`}
                              value={activity.activity}
                              onChange={(e) => handleChange(e, index, subIndex)}
                              required
                            />
                          </Td>
                          <Td>
                            <Textarea
                              name={`verification.${index}.${subIndex}`}
                              value={activity.verification}
                              onChange={(e) => handleChange(e, index, subIndex)}
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
                  mt={3}
                >
                  Add Objective
                </Button>
                <hr />
              </Box>
            ))}
            {/* Sustainability of the Project */}
            <FormControl isRequired>
              <FormLabel>Sustainability of the Project</FormLabel>
              <Textarea
                name="sustainability"
                onChange={handleChange}
                value={formData.sustainability}
                required
              />
            </FormControl>
            {/* Explain the Monitoring Process of the Project */}
            <FormControl isRequired>
              <FormLabel>
                Explain the Monitoring Process of the Project
              </FormLabel>
              <Textarea
                name="monitoringProcess"
                onChange={handleChange}
                value={formData.monitoringProcess}
                required
              />
            </FormControl>
            {/* Methodology of Evaluation */}
            <FormControl isRequired>
              <FormLabel>Methodology of Evaluation</FormLabel>
              <Textarea
                name="evaluationMethodology"
                onChange={handleChange}
                value={formData.evaluationMethodology}
                required
              />
            </FormControl>
            {/* Budget Table */}
            {BudgetTable()}
            {/* Signatures */}
            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>
            {/* Project Coordinator agreement */}
            {/* <FormControl isRequired>
              <Checkbox
                name="signatures.projectCoordinatorAgreement"
                onChange={handleChange}
                size="lg"
              >
                The Project Coordinator agrees
              </Checkbox>
              <Input
                type="date"
                name="signatures.projectCoordinatorAgreementDate"
                onChange={handleChange}
                required
              />
            </FormControl> */}
            {/* Project-In-Charge agreement */}
            <FormControl isRequired>
              <Checkbox
                name="signatures.projectInChargeAgreement"
                onChange={handleChange}
                value={formData.signatures.projectInChargeAgreement}
                size="lg"
              >
                The Project-In-Charge agrees
              </Checkbox>
              <Input
                type="date"
                name="signatures.projectInChargeAgreementDate"
                onChange={handleChange}
                value={formData.signatures.projectInChargeAgreementDate}
                required
              />
            </FormControl>
            {/* Provincial Superior agreement */}
            {/* <FormControl isRequired>
              <Checkbox
                name="signatures.provincialSuperiorAgreement"
                onChange={handleChange}
                size="lg"
              >
                The Provincial Superior agrees
              </Checkbox>
              <Input
                type="date"
                name="signatures.provincialSuperiorAgreementDate"
                onChange={handleChange}
                required
              />
            </FormControl> */}
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

export default InstitutionalSkillTrainingForm;
