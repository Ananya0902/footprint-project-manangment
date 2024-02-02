// QuaterlyReportDevelopment.jsx
import React, { useState } from 'react';
import {
  ChakraProvider,
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  Button,
  VStack,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';


const QuaterlyReportDevelopment = () => {
  const [formData, setFormData] = useState({
    periodStartDate: '',
    periodEndDate: '',
    projectTitle: '',
    commencementDate: '',
    personInCharge: '',
    place: '',
    province: '',
    goal: '',
    submissionDate: '',
    activitiesSection: {
      objectives: '',
      outcome: '',
      activityTable: [
        { month: '', summary: '', data: '' },
        // Add more rows as needed
      ],
      notHappenTable: [
        { reason: '', explanation: '' },
        // Add more rows as needed
      ],
      projectChangesTable: [
        { changes: '', explanations: '' },
      ],
      lessonsLearnedTable: [
        { lessons: '', differences: '' },
      ],
    },
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

    const handleChange = (field, value) => {
     setFormData((prevData) => ({
       ...prevData,
       [field]: value,
     }));
   };
  
  


  const handleAddRow = (tableType) => {
    setFormData((prevData) => {
      const newTable = {
        activityTable: { month: '', summary: '', data: '' },
        notHappenTable: { reason: '', explanation: '' },
        projectChangesTable: { changes: '', explanations: '' },
        lessonsLearnedTable: { lessons: '', differences: '' },
      };
  
      return {
        ...prevData,
        activitiesSection: {
          ...prevData.activitiesSection,
          [tableType]: [
            ...prevData.activitiesSection[tableType],
            newTable[tableType],
          ],
        },
      };
    });
  };
  const handleAddActivitiesSection = () => {
    setFormData((prevData) => ({
      ...prevData,
      activitiesSection: {
        objectives: '',
        outcome: '',
        activityTable: [
          { month: '', summary: '', data: '' },
          // Add more rows as needed
        ],
        notHappenTable: [
          { reason: '', explanation: '' },
          // Add more rows as needed
        ],
        projectChangesTable: [
          { changes: '', explanations: '' },
        ],
        lessonsLearnedTable: [
          { lessons: '', differences: '' },
        ],
      },
    }));
  };
  
  

  const handleDeleteRow = (tableType, index) => {
    setFormData((prevData) => ({
      ...prevData,
      activitiesSection: {
        ...prevData.activitiesSection,
        [tableType]: prevData.activitiesSection[tableType].filter((_, i) => i !== index),
      },
    }));
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

  const handleSubmit = () => {
    // Implement logic to submit the form data
    console.log('Form Data Submitted:', formData);
  };

  return (
    <ChakraProvider>
      <Box  p={8}>
        <Heading as="h1" size="xl" mb={6} textAlign="center" color="black.500">
          TRACKING DEVELOPMENT PROJECT - QUARTERLY PROGRESS REPORT
        </Heading>
        <VStack spacing={6} align="start">
          <FormControl id="period">
            <FormLabel>Period</FormLabel>
            <Input
              type="text"
              placeholder="Start Date"
              value={formData.periodStartDate}
              onChange={(e) => handleChange('periodStartDate', e.target.value)}
            />
            <Input
              type="text"
              placeholder="End Date"
              value={formData.periodEndDate}
              onChange={(e) => handleChange('periodEndDate', e.target.value)}
            />
          </FormControl>

          <FormControl id="projectTitle">
            <FormLabel>Project Title</FormLabel>
            <Input
              type="text"
              value={formData.projectTitle}
              onChange={(e) => handleChange('projectTitle', e.target.value)}
            />
          </FormControl>

          <FormControl id="commencementDate">
            <FormLabel>Commencement Date</FormLabel>
            <Input
              type="text"
              placeholder="Month & Year"
              value={formData.commencementDate}
              onChange={(e) => handleChange('commencementDate', e.target.value)}
            />
          </FormControl>

          <FormControl id="personInCharge">
            <FormLabel>Name of Person in Charge</FormLabel>
            <Input
              type="text"
              value={formData.personInCharge}
              onChange={(e) => handleChange('personInCharge', e.target.value)}
            />
          </FormControl>

          <FormControl id="place">
            <FormLabel>Place</FormLabel>
            <Input
              type="text"
              value={formData.place}
              onChange={(e) => handleChange('place', e.target.value)}
            />
          </FormControl>

          <FormControl id="province">
            <FormLabel>Province</FormLabel>
            <Select
              value={formData.province}
              onChange={(e) => handleChange('province', e.target.value)}
            >
              <option value="north">North</option>
              <option value="south">South</option>
              <option value="central">Central</option>
            </Select>
          </FormControl>

          <FormControl id="submissionDate">
            <FormLabel>Date of Submission</FormLabel>
            <Input
              type="text"
              value={formData.submissionDate}
              onChange={(e) => handleChange('submissionDate', e.target.value)}
            />
          </FormControl>
          <FormControl id="goal">
            <FormLabel>Goal of the Project</FormLabel>
            <Textarea
              value={formData.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
            />
          </FormControl>
          <Heading as="h2" size="lg" mb={4} color="black.500">
            Activities and Intermediate Outcomes
          </Heading>
         <Box border="1px solid #ccc" borderRadius="lg" p={4} mb={8}  >
          <FormControl id="objectives">
            <FormLabel>Objectives</FormLabel>
            <Textarea
              value={formData.activitiesSection.objectives}
              onChange={(e) => handleChange('activitiesSection.objectives', e.target.value)}
            />
          </FormControl>

          <FormControl id="outcome">
            <FormLabel>Outcome</FormLabel>
            <Textarea
              value={formData.activitiesSection.outcome}
              onChange={(e) => handleChange('activitiesSection.outcome', e.target.value)}
            />
          </FormControl>

          {/* table 1 */}
          <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Month</Th>
              <Th>Summary of Activities</Th>
              <Th>Qualitative & Quantitative Data & Intermediate Outcomes</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {formData.activitiesSection.activityTable.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    type="text"
                    value={row.month}
                    onChange={(e) => handleChange(`activitiesSection.activityTable[${index}].month`, e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.summary}
                    onChange={(e) => handleChange(`activitiesSection.activityTable[${index}].summary`, e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.data}
                    onChange={(e) => handleChange(`activitiesSection.activityTable[${index}].data`, e.target.value)}
                  />
                </Td>
                <Td>
                  <IconButton
                    aria-label="Delete Row"
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteRow('activityTable', index)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button colorScheme="teal" mt={4} onClick={() => handleAddRow('activityTable')}>
          Add Row
        </Button>

        {/* table 2 */}

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>What did not happen?</Th>
              <Th>Explain why some activities could not be undertaken</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {formData.activitiesSection.notHappenTable.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Input
                    type="text"
                    value={row.reason}
                    onChange={(e) => handleChange(`activitiesSection.notHappenTable[${index}].reason`, e.target.value)}
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.explanation}
                    onChange={(e) => handleChange(`activitiesSection.notHappenTable[${index}].explanation`, e.target.value)}
                  />
                </Td>
                <Td>
                  <IconButton
                    aria-label="Delete Row"
                    icon={<DeleteIcon />}
                    onClick={() => handleDeleteRow('notHappenTable', index)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        <Button colorScheme="teal" mt={4} onClick={() => handleAddRow('notHappenTable')}>
          Add Row
        </Button>

{/* table 3 */}

        <Table variant="simple">
  <Thead>
    <Tr>
      <Th>Have you made any changes in the project?</Th>
      <Th>Explain why the changes were needed</Th>
      <Th></Th>
    </Tr>
  </Thead>
  <Tbody>
    {formData.activitiesSection.projectChangesTable.map((row, index) => (
      <Tr key={index}>
        <Td>
          <Input
            type="text"
            value={row.changes}
            onChange={(e) => handleChange(`projectChangesTable[${index}].changes`, e.target.value)}
          />
        </Td>
        <Td>
          <Textarea
            value={row.explanations}
            onChange={(e) => handleChange(`projectChangesTable[${index}].explanations`, e.target.value)}
          />
        </Td>
        <Td>
          <IconButton
            aria-label="Delete Row"
            icon={<DeleteIcon />}
            onClick={() => handleDeleteRow('projectChangesTable', index)}
          />
        </Td>
      </Tr>
    ))}
  </Tbody>
</Table>

<Button colorScheme="teal" mt={4} onClick={() => handleAddRow('projectChangesTable')}>
  Add Row
</Button>
  

  {/* table 4 */}
<Table variant="simple">
  <Thead>
    <Tr>
      <Th>What are the lessons learnt?</Th>
      <Th>What will be done differently because of the learnings?</Th>
      <Th></Th>
    </Tr>
  </Thead>
  <Tbody>
    {formData.activitiesSection.lessonsLearnedTable.map((row, index) => (
      <Tr key={index}>
        <Td>
          <Textarea
            value={row.lessons}
            onChange={(e) => handleChange(`lessonsLearnedTable[${index}].lessons`, e.target.value)}
          />
        </Td>
        <Td>
          <Textarea
            value={row.differences}
            onChange={(e) => handleChange(`lessonsLearnedTable[${index}].differences`, e.target.value)}
          />
        </Td>
        <Td>
          <IconButton
            aria-label="Delete Row"
            icon={<DeleteIcon />}
            onClick={() => handleDeleteRow('lessonsLearnedTable', index)}
          />
        </Td>
      </Tr>
    ))}
  </Tbody>
</Table>

<Button colorScheme="teal" mt={4} onClick={() => handleAddRow('lessonsLearnedTable')}>
  Add Row
</Button>
</Box>

<Button colorScheme="green" mt={4} ml="auto" onClick={() =>handleAddActivitiesSection()}>
Add Objectives
</Button>



{/* account table */}

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

 </VStack>
        {/* submit button */}
          <Button colorScheme="blue" mt={4} onClick={handleSubmit}>
            Submit
          </Button>
      </Box>
    </ChakraProvider>
  );
};

export default QuaterlyReportDevelopment;
