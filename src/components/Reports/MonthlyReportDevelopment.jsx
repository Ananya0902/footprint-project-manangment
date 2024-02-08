import React, { useState } from "react";

import {
  ChakraProvider,
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
} from "@chakra-ui/react";

const MonthlyReportDevelopmentProject = () => {
  const [formData, setFormData] = useState({
    title: "",
    personInCharge: "",
    place: "",
    province: "",
    activityPeriod: "",
    submissionDate: "",
    mainGoal: "",
    objectives: [
      {
        objective: "",
        outcome: "",
        activities: [{ date: "", activityDescription: "", statistics: "" }],
      },
    ],
    planOfAction: [
      {
        plannedWork: "",
        date: "",
      },
    ],
    accountStatementMonth: "",
    projectTitle: "",
    amountSanctioned: "",
    duration: "",
    sanctionedDate: "",
    // reciept array 
    receipts: [],
    // payments array
    payments: [],
    remark: "",
  });

  const handleChange = (e, index, type) => {
    const updatedData = { ...formData };
    if (type === "objective") {
      updatedData.objectives[index][e.target.name] = e.target.value;
    } else if (type === "activity") {
      const { name, value } = e.target;
      const [activityIndex, key] = name.split("-");
      updatedData.objectives[index].activities[activityIndex][key] = value;
    } else if (type === "plan") {
      updatedData.planOfAction[index][e.target.name] = e.target.value;
    } else if (type === "receipts") {
      const { name, value } = e.target;
      updatedData.receipts[index][name.split("-")[0]] = value;
      
    } else if (type === "payments") {
      const { name, value } = e.target;
      updatedData.payments[index][name] = parseFloat(value);
      updatedData.payments[index].totalExpenditure =
        (updatedData.payments[index].expenditureLastMonth) +
        (updatedData.payments[index].expenditureThisMonth) 
    } else {
      updatedData[e.target.name] = e.target.value;
    }

    setFormData(updatedData);
  };

  const handleActivityChange = (e, objectiveIndex, activityIndex) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      const updatedData = { ...prevData };
      updatedData.objectives[objectiveIndex].activities[activityIndex][
        name.split("-")[0]
      ] = value;
  
      // Therer was an issue with rerendering because array untill changed completely does not trigger a state change as the value remain same 
      // hence there was need for this update field and some duplication of code 
      const updatedActivities = [...updatedData.objectives[objectiveIndex].activities];
      updatedData.objectives[objectiveIndex].activities = updatedActivities;
  
      console.log("Changed Data", updatedData, value);
      return updatedData;
    });
  };

  const handlePlanChange = (e, planIndex) => {
    const updatedData = { ...formData };

    const { name, value } = e.target;
    updatedData.planOfAction[planIndex][name] = value;

    setFormData(updatedData);
  };

  const handleAddObjective = () => {
    const updatedData = { ...formData };
    updatedData.objectives.push({
      objective: "",
      outcome: "",
      activities: [],
    });
    setFormData(updatedData);
  };

  const handleAddActivityRow = (index) => {
    const updatedData = { ...formData };
    updatedData.objectives[index].activities.push({
      date: "",
      activityDescription: "",
      statistics: "",
    });
    setFormData(updatedData);
  };

  const handleAddPlanRow = () => {
    const updatedData = { ...formData };
    updatedData.planOfAction.push({
      plannedWork: "",
      date: "",
    });
    setFormData(updatedData);
  };

  const handleAddPaymentsOrRecieptsRow = (type) => {
    const updatedData = { ...formData };

    if (type === "receipts") {
      updatedData.receipts.push({ budgetHead: "", amount: 0 });
    } else if (type === "payments") {
      updatedData.payments.push({
        expenditureLastMonth: 0,
        expenditureThisMonth: 0,
        totalExpenditure: 0,
      });
    }

    setFormData(updatedData);
  };

  const calculateReceiptsTotal = () => {
    return formData.receipts.reduce(
      (total, receipt) => total + parseFloat(receipt.amount) || 0,
      0
    );
  };

  const calculatePaymentsTotal = () => {
    return formData.payments.reduce(
      (total, payment) => total + parseFloat(payment.totalExpenditure) || 0,
      0
    );
  };

  const calculateTotalExpenditureLastMonth = () => {
    return formData.payments.reduce(
      (total, payment) => total + parseFloat(payment.expenditureLastMonth) || 0,
      0
    );
  };

  const calculateTotalExpenditureThisMonth = () => {
    return formData.payments.reduce(
      (total, payment) => total + parseFloat(payment.expenditureThisMonth) || 0,
      0
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <ChakraProvider>
      <Box  p={8}>
        <Heading as="h1" size="xl" mb={6}>
          Monthly Report Development Project
        </Heading>

        <form onSubmit={handleSubmit}>
          <VStack align="start" spacing={4} mb={8}>
            {/* Title of the Project */}
            <FormControl isRequired mb={4}>
              <FormLabel>Title of the Project</FormLabel>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>

            {/* Name of Person in Charge */}
            <FormControl isRequired mb={4}>
              <FormLabel>Name of Person in Charge</FormLabel>
              <Input
                type="text"
                name="personInCharge"
                value={formData.personInCharge}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>

            {/* Place */}
            <FormControl isRequired mb={4}>
              <FormLabel>Place</FormLabel>
              <Input
                type="text"
                name="place"
                value={formData.place}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>

            {/* Province */}
            <FormControl isRequired mb={4}>
              <FormLabel>Province</FormLabel>
              <Select
                name="province"
                value={formData.province}
                onChange={(e) => handleChange(e)}
                required
              >
                <option value="north">North</option>
                <option value="south">South</option>
                <option value="central">Central</option>
              </Select>
            </FormControl>

            {/* Activity Period */}
            <FormControl isRequired mb={4}>
              <FormLabel>Activity Period</FormLabel>
              <Input
                type="text"
                name="activityPeriod"
                value={formData.activityPeriod}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>

            {/* Date of Submission of Report */}
            <FormControl isRequired mb={4}>
              <FormLabel>Date of Submission of Report</FormLabel>
              <Input
                type="date"
                name="submissionDate"
                value={formData.submissionDate}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>

            {/* Main Goal of the Project */}
            <FormControl isRequired mb={4}>
              <FormLabel>Main Goal of the Project</FormLabel>
              <Textarea
                name="mainGoal"
                value={formData.mainGoal}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>
            <Heading as="h1" size="xl" mb={6}>
          Objectives:-
        </Heading>

            {formData.objectives.map((objective, index) => (
              <Box key={index} mb={8}>
                {/* Objective */}
                <FormControl isRequired mb={4}>
                  <FormLabel>Objective {index + 1}</FormLabel>
                  <Textarea
                    name="objective"
                    value={objective.objective}
                    onChange={(e) => handleChange(e, index, "objective")}
                    required
                  />
                </FormControl>

                {/* Outcome */}
                <FormControl isRequired mb={4}>
                  <FormLabel>Outcome</FormLabel>
                  <Textarea
                    name="outcome"
                    value={objective.outcome}
                    onChange={(e) => handleChange(e, index, "objective")}
                    required
                  />
                </FormControl>

                {/* Activity Table */}
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Date</Th>
                      <Th>Activities Undertaken</Th>
                      <Th>Statistics / Data on Intermediate Outcomes</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {objective.activities.map((activity, activityIndex) => (
                      <Tr key={activityIndex}>
                        <Td>
                          <Input
                            type="date"
                            name={`date-${activityIndex}`}
                            value={activity.date}
                            onChange={(e) => {
                              console.log(activity.date);
                              return handleActivityChange(
                                e,
                                index,
                                activityIndex
                              );
                            }}
                            required
                          />
                        </Td>
                        <Td>
                          <Input
                            name={`activityDescription-${activityIndex}`}
                            value={formData.objectives[index].activities[activityIndex].activityDescription}
                            onChange={(e) => {
                              console.log(activity.activityDescription);
                              return handleActivityChange(
                                e,
                                index,
                                activityIndex
                              );
                            }}
                            required
                          />
                        </Td>
                        <Td>
                          <Textarea
                            name={`statistics-${activityIndex}`}
                            value={activity.statistics}
                            onChange={(e) => {
                              console.log(activity.statistics);
                              return handleActivityChange(
                                e,
                                index,
                                activityIndex
                              );
                            }}
                            required
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                {/* Add Activity Row Button */}
                <Button
                  onClick={() => handleAddActivityRow(index)}
                  colorScheme="teal"
                  mt={4}
                >
                  Add Activity Row
                </Button>
              </Box>
            ))}

            {/* Add Objective Button */}
            <Button onClick={handleAddObjective} colorScheme="purple" ml="auto">
              Add Objective
            </Button>

            <Heading as="h2" size="lg" mb={4}>
              PLAN OF ACTION OF NEXT MONTH
            </Heading>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Planned Work / Activity</Th>
                  <Th>Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {formData.planOfAction.map((plan, planIndex) => (
                  <Tr key={planIndex}>
                    <Td>
                      <Textarea
                        name="plannedWork"
                        value={plan.plannedWork}
                        onChange={(e) => handlePlanChange(e, planIndex)}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        type="date"
                        name="date"
                        value={plan.date}
                        onChange={(e) => handlePlanChange(e, planIndex)}
                        required
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            <Button onClick={handleAddPlanRow} colorScheme="teal" mt={4}>
              Add Plan Row
            </Button>

            {/* Account Statement Table */}
            <Heading as="h2" size="lg" mb={4}>
              ACCOUNT STATEMENT OF THE PROJECT FOR THE MONTH OF
              <Input
                type="text"
                name="accountStatementMonth"
                value={formData.accountStatementMonth}
                onChange={(e) => handleChange(e)}
                required
              />
            </Heading>

            {/* Project Details */}
            <FormControl isRequired mb={4}>
              <FormLabel>Title of the Project</FormLabel>
              <Input
                type="text"
                name="projectTitle"
                value={formData.projectTitle}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Amount Sanctioned (Rs)</FormLabel>
              <Input
                type="number"
                name="amountSanctioned"
                value={formData.amountSanctioned}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Duration</FormLabel>
              <Input
                type="text"
                name="duration"
                value={formData.duration}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>
            <FormControl isRequired mb={4}>
              <FormLabel>Sanctioned Date</FormLabel>
              <Input
                type="date"
                name="sanctionedDate"
                value={formData.sanctionedDate}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>


            {/* Receipts Table */}
            <Table variant="simple" mb={8}>
              <Thead>
                <Tr>
                  <Th>RECEIPTS</Th>
                  <Th>Particulars of Budget Heads</Th>
                  <Th>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                {formData.receipts.map((receipt, index) => (
                  <Tr key={index}>
                    <Td>Receipt {index + 1}</Td>
                    <Td>
                      <Input
                        type="text"
                        name={`budgetHead-${index}`}
                        value={receipt.budgetHead}
                        onChange={(e) => handleChange(e, index, "receipts")}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        type="number"
                        name={`amount-${index}`}
                        value={receipt.amount}
                        onChange={(e) => handleChange(e, index, "receipts")}
                        required
                      />
                    </Td>
                  </Tr>
                ))}
                <Tr>
                  <Td>Total Receipts</Td>
                  <Td></Td>
                  <Td>{calculateReceiptsTotal()}</Td>
                </Tr>
              </Tbody>
            </Table>
            <Button
              onClick={() => handleAddPaymentsOrRecieptsRow("receipts")}
              colorScheme="teal"
              mr={4}
            >
              Add Row
            </Button>

            {/* Payments Table */}
            <Table variant="simple" mb={8}>
              <Thead>
                <Tr>
                  <Th>PAYMENTS</Th>
                  <Th>Expenditure Details Up to Last Month</Th>
                  <Th>Expenditure Details of This Month</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {formData.payments.map((payment, index) => (
                  <Tr key={index}>
                    <Td>Payment {index + 1}</Td>
                    <Td>
                      <Input
                        type="number"
                        name="expenditureLastMonth"
                        value={payment.expenditureLastMonth}
                        onChange={(e) => handleChange(e, index , "payments")}
                        required
                      />
                    </Td>
                    <Td>
                      <Input
                        type="number"
                        name="expenditureThisMonth"
                        value={payment.expenditureThisMonth}
                        onChange={(e) => handleChange(e, index , "payments")}
                        required
                      />
                    </Td>
                    <Td>
                        {
                        payment.totalExpenditure
                        }
                    </Td>
                  </Tr>
                ))}
                <Tr>
                  <Td>Total Payments</Td>
                  <Td>{calculateTotalExpenditureLastMonth()}</Td>
                  <Td>{calculateTotalExpenditureThisMonth()}</Td>
                  <Td>{calculatePaymentsTotal()}</Td>
                </Tr>
              </Tbody>
            </Table>

            {/* Add Row Button */}

            <Button onClick={() => handleAddPaymentsOrRecieptsRow("payments")} colorScheme="teal">
              Add Row
            </Button>

            {/* Closing and Opening Balance */}
            <Table variant="simple" mb={8}>
              <Thead>
                <Tr>
                  <Th></Th>
                  <Th>Closing Balance</Th>
                  <Th>Opening Balance</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>Expenditure Details Up to Last Month</Td>
                  <Td>
                    <Input
                      type="number"
                      name="closingBalanceLastMonth"
                      value={formData.closingBalanceLastMonth}
                      onChange={() => {}}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      name="openingBalanceLastMonth"
                      value={formData.openingBalanceLastMonth}
                      onChange={() => {}}
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td>Expenditure Details of This Month</Td>
                  <Td>
                    <Input
                      type="number"
                      name="closingBalanceThisMonth"
                      value={formData.closingBalanceThisMonth}
                      // onChange={() => {}}
                    />
                  </Td>
                  <Td>
                    <Input
                      type="number"
                      name="openingBalanceThisMonth"
                      value={formData.openingBalanceThisMonth}
                      // onChange={() => {}}
                    />
                  </Td>
                </Tr>
              </Tbody>
            </Table>

            {/* Remark */}
            <FormControl isRequired mb={4}>
              <FormLabel>Remark</FormLabel>
              <Textarea
                name="remark"
                value={formData.remark}
                onChange={(e) => handleChange(e)}
                required
              />
            </FormControl>
             {/* Submit Button */}
          
          </VStack>
          <Button colorScheme="blue" type="submit" mt={4}>
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default MonthlyReportDevelopmentProject;
