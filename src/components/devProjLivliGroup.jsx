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
} from "@chakra-ui/react";

export const DevProjectLivlihoodGroup = () => {
  const [formData, setFormData] = useState({
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
    }else{
      const name = e.target.name; 
      const value = e.target.value ;  

      
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    setIsSubmitted(true);
  };




  const BudgetTable = () => {
    const [budgetData, setBudgetData] = useState([
      { budget: '', cost: '' },
    ]);
  
    const handleBudgetChange = (index, field, value) => {
      const newData = [...budgetData];
      newData[index][field] = value;
      setBudgetData(newData);
    };
  
    const handleAddBudgetRow = () => {
      setBudgetData([...budgetData, { budget: '', cost: '' }]);
    };
  
    const calculateTotalAmount = () => {
      return budgetData.reduce((total, row) => total + parseFloat(row.cost) || 0, 0);
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
                    onChange={(e) => handleBudgetChange(index, 'budget', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.cost}
                    onChange={(e) => handleBudgetChange(index, 'cost', e.target.value)}
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
            <FormLabel >Total Amount</FormLabel>
            <Input type="text" value={calculateTotalAmount()} isReadOnly />
          </FormControl>
        </Box>
    );
  };

  const TargetGroup = () => {
    const [studiesTableData, setStudiesTableData] = useState([
      { serialNo: '', name: '', familySituation: '', natureOfLivelihood: '', requestedAmount: ''  },
    ]);
  
    const handleStudiesInputChange = (index, field, value) => {
      const newData = [...studiesTableData];
      newData[index][field] = value;
      setStudiesTableData(newData);
    };
  
    const handleAddStudiesRow = () => {
      setStudiesTableData([
        ...studiesTableData,
        { serialNo: '', name: '', familySituation: '', natureOfLivelihood: '', requestedAmount: '' },
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
                    onChange={(e) => handleStudiesInputChange(index, 'serialNo', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleStudiesInputChange(index, 'name', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.familySituation}
                    onChange={(e) => handleStudiesInputChange(index, 'familySituation', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.natureOfLivelihood}
                    onChange={(e) => handleStudiesInputChange(index, 'natureOfLivelihood', e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.requestedAmount}
                    onChange={(e) => handleStudiesInputChange(index, 'requestedAmount', e.target.value)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
  
        <Button onClick={handleAddStudiesRow}>Add Row</Button>
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
            <FormControl isRequired>
              <FormLabel>NAME OF THE SOCIETY</FormLabel>
              <Input
                type="text"
                name="NAMEOFTHESOCIETY"
                onChange={handleChange}
                required
              />
            </FormControl>
            {/* DATE OF SUBMISSION */}
            <FormControl isRequired>
              <FormLabel>DATE OF SUBMISSION</FormLabel>
              <Input
                type="date"
                name="dATEOFSUBMISSION"
                onChange={handleChange}
                required
              />
            </FormControl>
            {/* TITLE OF THE PROJECT */}
            <FormControl isRequired>
              <FormLabel>TITLE OF THE PROJECT </FormLabel>
              <Input
                type="text"
                name="TITLEOFTHEPROJECT "
                onChange={handleChange}
                required
              />
            </FormControl>
            {/* ADDRESS*/}
            <FormControl isRequired>
              <FormLabel>ADDRESS</FormLabel>
              <Input
                type="text"
                name="address"
                onChange={handleChange}
                required
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
                      required
                    />
                  </Td>
                  <Td>
                    <Input
                      type="tel"
                      name="provincialSuperiorCellNumber"
                      onChange={handleChange}
                      required
                    />
                  </Td>
                  <Td>
                    <Input
                      type="email"
                      name="provincialSuperiorEmail"
                      onChange={handleChange}
                      required
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
                      required
                    />
                  </Td>
                  <Td>
                    <Input
                      type="tel"
                      name="projectInChargeCellNumber"
                      onChange={handleChange}
                      required
                    />
                  </Td>
                  <Td>
                    <Input
                      type="email"
                      name="projectInChargeEmail"
                      onChange={handleChange}
                      required
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
            <FormControl isRequired>
              <FormLabel>Overall Project Period (in months)</FormLabel>
              <Input
                type="number"
                name="overallProjectPeriod"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Overall Project Budget */}
            <FormControl isRequired>
              <FormLabel>Overall Project Budget</FormLabel>
              <Input
                type="number"
                name="overallProjectBudget"
                onChange={handleChange}
                required
              />
            </FormControl>
            {/*Mention the progress of the initial project and its success*/}
            <FormControl isRequired>
              <FormLabel>Mention the progress of the initial project and its success</FormLabel>
              <Textarea name="projOfIntialProject" onChange={handleChange} required />
            </FormControl>

            <TargetGroup/>

            {/* Analysis of how the Problems will  be resolved by the Project : */}
            <FormControl isRequired>
              <FormLabel>Analysis of how the Problems will  be resolved by the Project : </FormLabel>
              <Textarea
                name="problemAnalysis"
                onChange={handleChange}
                required
              />
            </FormControl>

            {/* Solution Analysis */}
            <FormControl isRequired>
              <FormLabel>Solution Analysis</FormLabel>
              <Textarea
                name="solutionAnalysis"
                onChange={handleChange}
                required
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
            <FormControl isRequired>
              <FormLabel>Goal of the Project</FormLabel>
              <Textarea
                name="goal"
                onChange={(e) => handleChange(e)}
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
                 <Box key={index} border="1px solid #ccc" borderRadius="lg" p={4} mb={8}>
              <VStack key={index} align="start" spacing={4} mb={8}>
                {/* Objective */}
                <FormControl isRequired>
                    <hr />
                  <FormLabel>Objective {index + 1}</FormLabel>
                  <Textarea
                    name="objective"
                    value={objective.objective}
                    onChange={(e) => handleChange(e, index)}
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
                        onChange={(e) => handleChange(e, index, subIndex)}
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
                      </Tr>
                    </Thead>
                    <Tbody>
                      {objective.activities.map((activity, subIndex) => (
                        <Tr key={subIndex}>
                          <Td>
                            <Textarea
                              name="activity"
                              value={activity.activity}
                              onChange={(e) => handleChange(e, index, subIndex)}
                              required
                            />
                          </Td>
                          <Td>
                            <Textarea
                              name="verification"
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

                <Button onClick={handleAddObjective} colorScheme="purple"  ml="auto">
                  Add Objective
                </Button>
                <hr />
                
              </VStack>
              </Box>
            ))}
                {/* Sustainability of the Project */}
        <FormControl isRequired>
          <FormLabel>Sustainability of the Project</FormLabel>
          <Textarea
            name="sustainability"
            value={formData.sustainability}
            onChange={(e) => handleChange(e)}
            required
          />
        </FormControl>

        {/* Explain the Monitoring Process of the Project */}
        <FormControl isRequired>
          <FormLabel>Explain the Monitoring Process of the Project</FormLabel>
          <Textarea
            name="monitoringProcess"
            value={formData.monitoringProcess}
            onChange={(e) => handleChange(e)}
            required
          />
        </FormControl>

<BudgetTable/>

<Heading as="h1" size="xl" mb={6}>
    Signatures
  </Heading>

            {/* Project Coordinator agreement */}
  <FormControl isRequired>
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
      required
    />
  </FormControl>

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

  {/* Provincial Superior agreement */}
  <FormControl isRequired>
    <Checkbox
      name="provincialSuperiorAgreement"
      onChange={handleChange}
      size="lg"
    >
      The Provincial Superior agree
    </Checkbox>
    <Input
      type="date"
      name="provincialSuperiorAgreementDate"
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
export default DevProjectLivlihoodGroup;