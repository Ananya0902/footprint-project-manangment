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
import authAxios from "../../AuthAxios";

export const ViewDPLG = () => {
  const [formData, setFormData] = useState({
    NAMEOFTHESOCIETY: "",
    dATEOFSUBMISSION: "",
    TITLEOFTHEPROJECT: "",
    address: "",
    provincialSuperiorName: "",
    provincialSuperiorCellNumber: "",
    provincialSuperiorEmail: "",
    projectInChargeName: "",
    projectInChargeCellNumber: "",
    projectInChargeEmail: "",
    projOfIntialProject: "",
    overallProjectPeriod: "",
    overallProjectBudget: "",
    problemAnalysis: "",
    solutionAnalysis: "",
    sustainability: "",
    monitoringProcess: "",
    
    projectInChargeAgreement: false,
    projectInChargeAgreementDate: "",
    provincialSuperiorAgreement: false,
    provincialSuperiorAgreementDate: "",
    projectCoordinatorAgreement:false,
    projectCoordinatorAgreementDate:"",

    // Additional Fields
    commentReviewer: "",
    commentApprover:"",
    amountApprovedByProjectCoordinator:"",

    // Additional Fields
    comment: "",
    logicalFramework: {
      goal: "",
      objectives: [
        {
          objective: "",
          results: [""],
          activities: [
            {
              activity: "",
              verification: "",
              timeframe: Array.from({ length: 12 }).fill(false),
            },
          ],
        },
      ],
    },
  });
  const [studiesTableData, setStudiesTableData] = useState([
    {
      serialNo: "",
      name: "",
      familySituation: "",
      natureOfLivelihood: "",
      requestedAmount: "",
    },
  ]);
  const [budgetData, setBudgetData] = useState([{ budget: "", cost: "" }]);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast();

  const [selectedMonths, setSelectedMonths] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e, index, subIndex) => {
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
    else {
      updatedData[e.target.name] = e.target.value;
    }

    setFormData(updatedData);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here

    
      const req= {
        NameOfSociety: formData.NAMEOFTHESOCIETY,
        DateOfSubmission: formData.dATEOFSUBMISSION,
        TitleOfProject: formData.TITLEOFTHEPROJECT,
        address: formData.address,
        overallProjectPeriod: formData.overallProjectPeriod,
        overallProjectBudget: formData.overallProjectBudget,
        ProjectOfInitialProject: formData.projOfIntialProject,
        problemAnalysis: formData.problemAnalysis,
        solutionAnalysis: formData.solutionAnalysis,
        goal: formData.logicalFramework.goal,
        objectives: formData.logicalFramework.objectives.map(objective => ({
          objective: objective.objective,
          results: objective.results,
          activities: objective.activities.map(activity => ({
            activity: activity.activity,
            verification: activity.verification,
            timeframe: activity.timeframe
          }))
        })),
        sustainability: formData.sustainability,
        monitoringProcess: formData.monitoringProcess,
        budget_cost_table: budgetData.map(item => ({
          budget: item.budget,
          cost: item.cost
        })),
        studies_table_data: studiesTableData.map(item => ({
          serialNo: item.serialNo,
          name: item.name,
          family_situation: item.familySituation,
          nature_livlihood: item.natureOfLivelihood,
          requested_amount: item.requestedAmount
        })),
        project_in_charge_agree: {
          agree: formData.projectInChargeAgreement,
          date: formData.projectInChargeAgreementDate
        }
      };
    
    try{
      setIsLoading((prevLoading) => !prevLoading);
      const response =await authAxios.post("/projects/createDPLG",req)
      setIsLoading((prevLoading) => !prevLoading);
      console.log(response.data);
      if (response.data.success) {
        showToast({
          title: "Successfull form submission",
          status: "success",
          duration: 5000,
        });
      } else {
        showToast({
          title: "Unsuccessful form submission",
          status: "error",
          description: "Please login again session may have expired",
          duration: 5000,
        });
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }


    setIsSubmitted(true);
  };

  const BudgetTable = () => {
    const handleBudgetChange = (index, field, value) => {
      const newData = [...budgetData];
      newData[index][field] = value;
      setBudgetData(newData);
    };

   

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
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.cost}
                    onChange={(e) =>
                      handleBudgetChange(index, "cost", e.target.value)
                    }
                    readOnly
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* <Button onClick={handleAddBudgetRow} mt={4}>
          Add Row
        </Button> */}

        <FormControl>
          <FormLabel>Total Amount</FormLabel>
          <Input type="text" value={calculateTotalAmount()} isReadOnly />
        </FormControl>
      </Box>
    );
  };

  const TargetGroup = () => {
    const handleStudiesInputChange = (index, field, value) => {
      const newData = [...studiesTableData];
      newData[index][field] = value;
      setStudiesTableData(newData);
    };

    const handleAddStudiesRow = () => {
      setStudiesTableData([
        ...studiesTableData,
        {
          serialNo: "",
          name: "",
          familySituation: "",
          natureOfLivelihood: "",
          requestedAmount: "",
        },
      ]);
    };

    return (
      <Box p={4}>
        <Heading as="h1" size="xl" mb={6}>
          Target Group
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>S.No</Th>
              <Th>Name of the Beneficiary</Th>
              <Th>Family situation of the beneficiary</Th>
              <Th>Nature of livelihood to be initiated / strengthened</Th>
              <Th>Amount requested</Th>
            </Tr>
          </Thead>
          <Tbody>
            {studiesTableData.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    type="number"
                    value={row.serialNo}
                    onChange={(e) =>
                      handleStudiesInputChange(
                        index,
                        "serialNo",
                        e.target.value
                      )
                      
                    }readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.name}
                    onChange={(e) =>
                      handleStudiesInputChange(index, "name", e.target.value)
                    }readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.familySituation}
                    onChange={(e) =>
                      handleStudiesInputChange(
                        index,
                        "familySituation",
                        e.target.value
                      )
                    }readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.natureOfLivelihood}
                    onChange={(e) =>
                      handleStudiesInputChange(
                        index,
                        "natureOfLivelihood",
                        e.target.value
                      )
                    }
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.requestedAmount}
                    onChange={(e) =>
                      handleStudiesInputChange(
                        index,
                        "requestedAmount",
                        e.target.value
                      )
                    }
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* <Button onClick={handleAddStudiesRow}>Add Row</Button> */}
      </Box>
    );
  };

  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading
          as="h1"
          size="xl"
          mb={6}
          align="center"
          justifyContent="center"
        >
          Development Project- Livlihood Application Form
        </Heading>

        {isSubmitted && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Form submitted successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <VStack align="start" spacing={4} mb={8}>
            {/* NAME OF THE SOCIETY */}
            <FormControl >
              <FormLabel>NAME OF THE SOCIETY</FormLabel>
              <Input
                type="text"
                name="NAMEOFTHESOCIETY"
                onChange={handleChange}
                value={formData.NAMEOFTHESOCIETY}
                readOnly
              />
            </FormControl>
            {/* DATE OF SUBMISSION */}
            <FormControl >
              <FormLabel>DATE OF SUBMISSION</FormLabel>
              <Input
                type="date"
                name="dATEOFSUBMISSION"
                onChange={handleChange}
                value={formData.dATEOFSUBMISSION}

                readOnly
              />
            </FormControl>
            {/* TITLE OF THE PROJECT */}
            <FormControl >
              <FormLabel>TITLE OF THE PROJECT </FormLabel>
              <Input
                type="text"
                name="TITLEOFTHEPROJECT"
                onChange={handleChange}
                value={formData.TITLEOFTHEPROJECT}

                readOnly
              />
            </FormControl>
            {/* ADDRESS*/}
            <FormControl >
              <FormLabel>ADDRESS</FormLabel>
              <Input
                type="text"
                name="address"
                onChange={handleChange}
                value={formData.address}

                readOnly
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
                {/* Provincial Superior */}
                <Tr>
                  <Td>Provincial Superior</Td>
                  <Td>
                    <Input
                      type="text"
                      name="provincialSuperiorName"
                      onChange={handleChange}
                      value={formData.provincialSuperiorName}

                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="tel"
                      name="provincialSuperiorCellNumber"
                      onChange={handleChange}
                      value={formData.provincialSuperiorCellNumber}

                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="email"
                      name="provincialSuperiorEmail"
                      onChange={handleChange}
                      value={formData.provincialSuperiorEmail}

                      readOnly
                    />
                  </Td>
                </Tr>
                {/* Project In-Charge */}
                <Tr>
                  <Td>Project In-Charge</Td>
                  <Td>
                    <Input
                      type="text"
                      name="projectInChargeName"
                      onChange={handleChange}
                      value={formData.projectInChargeName}

                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="tel"
                      name="projectInChargeCellNumber"
                      onChange={handleChange}
                      value={formData.projectInChargeCellNumber}

                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="email"
                      name="projectInChargeEmail"
                      onChange={handleChange}
                      value={formData.projectInChargeEmail}

                      readOnly
                    />
                  </Td>
                </Tr>
                {/* Project Coordinators */}
                <Tr>
                  <Td>Project Coordinator 1</Td>
                  <Td>Sr. Nirmala Mathew</Td>
                  <Td>Not Available</Td>
                  <Td>micostannsindia@gmail.com</Td>
                </Tr>
                <Tr>
                  <Td>Project Coordinator 2</Td>
                  <Td>Mr. Samuel Imbach</Td>
                  <Td>Not Available</Td>
                  <Td>s.imbach@mission-stanna</Td>
                </Tr>
              </Tbody>
            </Table>
            {/* Overall Project Period */}
            <FormControl >
              <FormLabel>Overall Project Period (in months)</FormLabel>
              <Input
                type="number"
                name="overallProjectPeriod"
                onChange={handleChange}
                value={formData.overallProjectPeriod}

                readOnly
              />
            </FormControl>

            {/* Overall Project Budget */}
            <FormControl >
              <FormLabel>Overall Project Budget</FormLabel>
              <Input
                type="number"
                name="overallProjectBudget"
                onChange={handleChange}
                value={formData.overallProjectBudget}

                readOnly
              />
            </FormControl>
            {/*Mention the progress of the initial project and its success*/}
            <FormControl >
              <FormLabel>
                Mention the progress of the initial project and its success
              </FormLabel>
              <Textarea
                name="projOfIntialProject"
                onChange={handleChange}
                value={formData.projOfIntialProject}

                readOnly
              />
            </FormControl>

            {TargetGroup()}

            {/* Analysis of how the Problems will  be resolved by the Project : */}
            <FormControl >
              <FormLabel>
                Analysis of how the Problems will be resolved by the Project :{" "}
              </FormLabel>
              <Textarea
                name="problemAnalysis"
                onChange={handleChange}
                value={formData.problemAnalysis}

                readOnly
              />
            </FormControl>

            {/* Solution Analysis */}
            <FormControl >
              <FormLabel>Solution Analysis</FormLabel>
              <Textarea
                name="solutionAnalysis"
                onChange={handleChange}
                value={formData.solutionAnalysis}

                readOnly
              />
            </FormControl>

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
            <FormControl >
              <FormLabel>Goal of the Project</FormLabel>
              <Textarea
                name="goal"
                onChange={(e) => handleChange(e)}
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
                  <FormControl >
                    <hr />
                    <FormLabel>Objective {index + 1}</FormLabel>
                    <Textarea
                      name="objective"
                      value={objective.objective}
                      onChange={(e) => handleChange(e, index)}
                      readOnly
                    />
                  </FormControl>

                  {/* Results */}
                  <FormControl >
                    <FormLabel>Results</FormLabel>
                    {objective.results.map((result, subIndex) => (
                      <VStack key={subIndex} align="start" spacing={4} mb={8}>
                        <Textarea
                          name="result"
                          value={result}
                          onChange={(e) => handleChange(e, index, subIndex)}
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
                  <FormControl >
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
                                  handleChange(e, index, subIndex)
                                }
                                readOnly
                              />
                            </Td>
                            <Td>
                              <Textarea
                                name="verification"
                                value={activity.verification}
                                onChange={(e) =>
                                  handleChange(e, index, subIndex)
                                }
                                readOnly
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
                                    }}readOnly
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
            <FormControl >
              <FormLabel>Sustainability of the Project</FormLabel>
              <Textarea
                name="sustainability"
                value={formData.sustainability}
                onChange={(e) => handleChange(e)}
                readOnly
              />
            </FormControl>

            {/* Explain the Monitoring Process of the Project */}
            <FormControl >
              <FormLabel>
                Explain the Monitoring Process of the Project
              </FormLabel>
              <Textarea
                name="monitoringProcess"
                value={formData.monitoringProcess}
                onChange={(e) => handleChange(e)}
                readOnly
              />
            </FormControl>

          {BudgetTable()}

            <Heading as="h1" size="xl" mb={6}>
              Signatures
            </Heading>

           {/* Project-In-Charge agreement */}
           <FormControl>
              <Checkbox
                name="projectInChargeAgreement"
                onChange={handleChange}
                size="lg"
                value={formData.projectInChargeAgreement || ""}
                readOnly
              >
                The Project-In-Charge agree
              </Checkbox>
            </FormControl>

            {/* Provincial Superior agreement */}
            <FormControl>
              <Checkbox
                name="projectInChargeAgreement"
                onChange={handleChange}
                size="lg"
                isChecked={formData.projectInChargeAgreement}
                readOnly
              >
                The Project Incharge agree
              </Checkbox>
              <Input
                type="date"
                name="projectInChargeAgreementDate"
                onChange={handleChange}
                value={formData.projectInChargeAgreementDate.substring(0, 10)}
                readOnly
              />
            </FormControl>
            <FormControl>
              <Checkbox
                name="provincialSuperiorAgreement"
                onChange={handleChange}
                size="lg"
                isChecked={formData.provincialSuperiorAgreement}
                readOnly
              >
                The Provincial Superior agree
              </Checkbox>
              <Input
                type="date"
                name="provincialSuperiorAgreementDate"
                onChange={handleChange}
                value={formData.provincialSuperiorAgreementDate.substring(
                  0,
                  10
                )}
                readOnly
              />
            </FormControl>

            {/* Project Coordinator agreement */}
            <FormControl >
              <Checkbox
                name="projectCoordinatorAgreement"
                onChange={handleChange}
                size="lg"
              >
                The Project Coordinator agree
              </Checkbox>
              <Input
                type="date"
                name="projectCoordinatorAgreementDate"
                onChange={handleChange}
                readOnly
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/* Comment for reviewer */}
            <FormControl>
              <FormLabel>Comment(For Reviewer)</FormLabel>
              <Input
                type="text"
                name="commentReviewer"
                onChange={handleChange}
                value={formData.commentReviewer || ""}
                readOnly
              />
            </FormControl>

            {/* Comment for approver */}
            <FormControl >
              <FormLabel>Comment(For Approver)</FormLabel>
              <Input
                type="text"
                name="commentApprover"
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* Amount Approved by Project Coordinator */}
            <FormControl >
              <FormLabel>Amount Approved by Project Coordinator</FormLabel>
              <Input
                type="number"
                name="amountApprovedByProjectCoordinator"
                onChange={handleChange}
                readOnly
              />
            </FormControl>

          </VStack>
        
        </form>
      </Box>
    </ChakraProvider>
  );
};
export default ViewDPLG;
