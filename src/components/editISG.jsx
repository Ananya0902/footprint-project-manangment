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

export const EditISG = () => {
  const showToast = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [budgetData, setBudgetData] = useState([{ budget: "", cost: "" }]);
  const [formData, setFormData] = useState({
    basicInformation: {
      NAMEOFTHESOCIETY: "",
      dATEOFSUBMISSION: "",
      TITLEOFTHEPROJECT: "",
      address: "",
      provincialSuperior: {
        name: "",
        cellNumber: "",
        email: "",
      },
      projectInCharge: {
        name: "",
        cellNumber: "",
        email: "",
      },
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
    budgetDetails: [{ budget: "", cost: "" }],
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
    if (name.includes("signatures")) {
      updatedData.signatures[name.split(".")[1]] = value;
    } else if (
      name.includes("provincialSuperior") ||
      name.includes("projectInCharge")
    ) {
      const [field, role] = name.split(".");
      updatedData.basicInformation[role][field] = value;
    } else if (name.includes("budgetDetails")) {
      const [field, dataIndex] = name.split(".");
      updatedData.budgetDetails[dataIndex][field] = value;
    } else if (name.includes("objective")) {
      updatedData.logicalFramework.objectives[index].objective = value;
    } else if (name.includes("result")) {
      updatedData.logicalFramework.objectives[index].results[subIndex] = value;
    } else if (name.includes("activity")) {
      console.log(e.target.name, e.target.value);
      updatedData.logicalFramework.objectives[index].activities[subIndex][
        "activity"
      ] = value;
    } else if (name.includes("verification")) {
      console.log(e.target.name, e.target.value);
      updatedData.logicalFramework.objectives[index].activities[subIndex][
        "verification"
      ] = value;
    } else {
      updatedData.basicInformation[name] = value;
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
    const req = {
      basicInformation: {
        NameOfSociety: formData.basicInformation.NAMEOFTHESOCIETY,
        DateOfSubmission: formData.basicInformation.dATEOFSUBMISSION,
        TitleOfProject: formData.basicInformation.TITLEOFTHEPROJECT,
        address: formData.basicInformation.address,
        provincialSuperior: {
          name: formData.basicInformation.provincialSuperior.name,
          cellNumber: formData.basicInformation.provincialSuperior.cellNumber,
          email: formData.basicInformation.provincialSuperior.email,
        },
        projectInCharge: {
          name: formData.basicInformation.projectInCharge.name,
          cellNumber: formData.basicInformation.projectInCharge.cellNumber,
          email: formData.basicInformation.projectInCharge.email,
        },
        overallProjectPeriod: formData.basicInformation.overallProjectPeriod,
        overallProjectBudget: formData.basicInformation.overallProjectBudget,
        numberOfBeneficiaries: formData.basicInformation.numberOfBeneficiaries,
        residentialVillages: formData.basicInformation.residentialVillages,
        selectionCriteriaAndProfile:
          formData.basicInformation.selectionCriteriaAndProfile,
        descriptionOfBeneficiary:
          formData.basicInformation.descriptionOfBeneficiary,
        problemAnalysis: formData.basicInformation.problemAnalysis,
        solutionAnalysis: formData.basicInformation.solutionAnalysis,
      },
      logicalFramework: {
        goal: formData.logicalFramework.goal,
        objectives: formData.logicalFramework.objectives.map((objective) => ({
          objective: objective.objective,
          results: objective.results,
          activities: objective.activities.map((activity) => ({
            activity: activity.activity,
            timeframe: activity.timeframe,
            verification: activity.verification,
          })),
        })),
      },
      sustainability: formData.sustainability,
      monitoringProcess: formData.monitoringProcess,
      evaluationMethodology: formData.evaluationMethodology,
      budgetDetails: budgetData.map((item) => ({
        budget: item.budget,
        cost: item.cost,
      })),
      signatures: {
        projectCoordinatorAgreement:
          formData.signatures.projectCoordinatorAgreement,
        projectCoordinatorAgreementDate:
          formData.signatures.projectCoordinatorAgreementDate,
        projectInChargeAgreement: formData.signatures.projectInChargeAgreement,
        projectInChargeAgreementDate:
          formData.signatures.projectInChargeAgreementDate,
        provincialSuperiorAgreement:
          formData.signatures.provincialSuperiorAgreement,
        provincialSuperiorAgreementDate:
          formData.signatures.provincialSuperiorAgreementDate,
      },
    };
    try {
      setIsLoading(true);
      const res = await authAxios.post("/projects/createISG");
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
      const newData = [...budgetData];
      newData[index][field] = value;
      setBudgetData(newData);
    };

    // Function to add a new row for budget details
    const handleAddBudgetRow = () => {
      setBudgetData([...budgetData, { budget: "", cost: "" }]);
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
                    type="text"
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
                required
              />
            </FormControl>
            {/* Provincial Superior */}
            <FormControl isRequired>
              <FormLabel>Provincial Superior Name</FormLabel>
              <Input
                type="text"
                name="basicInformation.provincialSuperior.name"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Provincial Superior Cell Number</FormLabel>
              <Input
                type="tel"
                name="basicInformation.provincialSuperior.cellNumber"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Provincial Superior Email</FormLabel>
              <Input
                type="email"
                name="basicInformation.provincialSuperior.email"
                onChange={handleChange}
                required
              />
            </FormControl>
            {/* Project In-Charge */}
            <FormControl isRequired>
              <FormLabel>Project In-Charge Name</FormLabel>
              <Input
                type="text"
                name="basicInformation.projectInCharge.name"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Project In-Charge Cell Number</FormLabel>
              <Input
                type="tel"
                name="basicInformation.projectInCharge.cellNumber"
                onChange={handleChange}
                required
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Project In-Charge Email</FormLabel>
              <Input
                type="email"
                name="basicInformation.projectInCharge.email"
                onChange={handleChange}
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
                required
              />
            </FormControl>
            {/* Residential Villages of the Beneficiaries */}
            <FormControl isRequired>
              <FormLabel>Residential Villages of the Beneficiaries</FormLabel>
              <Textarea
                name="basicInformation.residentialVillages"
                onChange={handleChange}
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
                required
              />
            </FormControl>
            {/* Solution Analysis */}
            <FormControl isRequired>
              <FormLabel>Solution Analysis</FormLabel>
              <Textarea
                name="basicInformation.solutionAnalysis"
                onChange={handleChange}
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
                            <FormControl isRequired>
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
                required
              />
            </FormControl>
            {/* Methodology of Evaluation */}
            <FormControl isRequired>
              <FormLabel>Methodology of Evaluation</FormLabel>
              <Textarea
                name="evaluationMethodology"
                onChange={handleChange}
                required
              />
            </FormControl>
            {/* Budget Table */}
            <BudgetTable />
            {/* Signatures */}
            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>
            {/* Project Coordinator agreement */}
            <FormControl isRequired>
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
            </FormControl>
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
            <FormControl isRequired>
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

export default EditISG;
