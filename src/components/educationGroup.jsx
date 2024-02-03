import React, { useState } from 'react';
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
} from '@chakra-ui/react';


const EducationGroup= () => {
  const [formData, setFormData] = useState({
    NAMEOFTHESOCIETY: '',  // Name of the Society
    dATEOFSUBMISSION: '', // Date of Submission
    TITLEOFTHEPROJECT: '', // Title of the Project
    address: '', // Address
  
    // Contacts Table
    provincialSuperiorName: '',
    provincialSuperiorCellNumber: '',
    provincialSuperiorEmail: '',
    projectInChargeName: '',
    projectInChargeCellNumber: '',
    projectInChargeEmail: '',
  
    // Overall Project Information
    overallProjectPeriod: '',
    overallProjectBudget: '',
    beneficiariesSupported: '',
    outcomeImpact: '',
    projectGoal: '',
    objectives: [''], // Initial empty objective
  
    // People Details Table
    peopleDetails: [
      // Initial row, you can add more if needed
      { role: '', name: '', cellNumber: '', email: '' },
    ],
  
    // Target Group Information Table
    targetGroupInformation: [
      // Initial row, you can add more if needed
      { serialNo: '', name: '', casteAddress: '', recommendedBy: '', familyBackground: '' },
    ],
  
    // Target Group Studies Table
    targetGroupStudies: [
      // Initial row, you can add more if needed
      { serialNo: '', name: '', studyProposed: '', totalExpense: '', contribution: '', scholarshipEligibility: '', expectedAmount: '' },
    ],
  
    // Other Proposed Activities
    otherActivities: '',
  
    // Monitoring Methods
    monitoringMethods: '',
  
    // Evaluation Process and Responsible Person
    evaluationProcess: '',
  
    // Conclusion
    conclusion: '',
  
    // Signatures
    projectCoordinatorAgreement: false,
    projectCoordinatorAgreementDate: '',
    projectInChargeAgreement: false,
    projectInChargeAgreementDate: '',
    provincialSuperiorAgreement: false,
    provincialSuperiorAgreementDate: '',
  });
  
      const [isSubmitted, setIsSubmitted] = useState(false);
    
      const handleChange = (e, index) => {
        const updatedObjectives = [...formData.objectives];
        updatedObjectives[index] = e.target.value;
    
        setFormData({
          ...formData,
          objectives: updatedObjectives,
        });
      };
    
      const handleAddObjective = () => {
        setFormData({
          ...formData,
          objectives: [...formData.objectives, ''], // Add a new empty objective
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        setIsSubmitted(true);
      };





      const PeopleDetailsTable = () => {
        const [tableData, setTableData] = useState([
          { class: '', totalFemale: '', totalMale: '', total: 0 },
        ]);
      
        const handleInputChange = (index, field, value) => {
          const newData = [...tableData];
          newData[index][field] = value;
      
          // Calculate total for the current row
          if (field === 'totalFemale' || field === 'totalMale' ) {
            newData[index].total = calculateTotal(newData[index].totalFemale, newData[index].totalMale);
          }
      
          setTableData(newData);
        };
      
        const handleAddRow = () => {
          setTableData([...tableData, { class: '', totalFemale: '', totalMale: '', total: 0 }]);
        };
      
        return (
          <Box p={4}>
            <Heading as="h1" size="l" mb={6}>
              People Details Table
            </Heading>
      
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Class</Th>
                  <Th>Total Female</Th>
                  <Th>Total Male</Th>
                  <Th>Total</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tableData.map((row, index) => (
                  <Tr key={index}>
                    <Td>
                      <Input
                        type="number"
                        value={row.class}
                        onChange={(e) => handleInputChange(index, 'class', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="number"
                        value={row.totalFemale}
                        onChange={(e) => handleInputChange(index, 'totalFemale', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="number"
                        value={row.totalMale}
                        onChange={(e) => handleInputChange(index, 'totalMale', e.target.value)}
                      />
                    </Td>
                    <Td>{row.total}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
      
            <Button onClick={handleAddRow}>Add Row</Button>
          </Box>
        );
      };
      
      const calculateTotal = (totalFemale, totalMale) => {
        return parseInt(totalFemale) + parseInt(totalMale);
      };

      const TargetGroupInformationTable = () => {
        const [informationTableData, setInformationTableData] = useState([
          { serialNo: '', name: '', casteAddress: '', recommendedBy: '', familyBackground: '' },
        ]);
      
        const handleInformationInputChange = (index, field, value) => {
          const newData = [...informationTableData];
          newData[index][field] = value;
          setInformationTableData(newData);
        };
      
        const handleAddInformationRow = () => {
          setInformationTableData([
            ...informationTableData,
            { serialNo: '', name: '', casteAddress: '', recommendedBy: '', familyBackground: '' },
          ]);
        };
      
        return (
          <Box p={4}>
            <Heading as="h1" size="l" mb={6}>
              Target Group - Information of the Beneficiaries
            </Heading>
      
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>Name of the Beneficiary</Th>
                  <Th>Caste & Address</Th>
                  <Th>Who Recommended</Th>
                  <Th>Family Background & Need of Support</Th>
                </Tr>
              </Thead>
              <Tbody>
                {informationTableData.map((row, index) => (
                  <Tr key={index}>
                    <Td>
                      <Input
                        type="number"
                        value={row.serialNo}
                        onChange={(e) => handleInformationInputChange(index, 'serialNo', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={row.name}
                        onChange={(e) => handleInformationInputChange(index, 'name', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={row.casteAddress}
                        onChange={(e) => handleInformationInputChange(index, 'casteAddress', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={row.recommendedBy}
                        onChange={(e) => handleInformationInputChange(index, 'recommendedBy', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Textarea
                        value={row.familyBackground}
                        onChange={(e) => handleInformationInputChange(index, 'familyBackground', e.target.value)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
      
            <Button onClick={handleAddInformationRow}>Add Row</Button>
          </Box>
        );
      };
      
      const TargetGroupStudiesTable = () => {
        const [studiesTableData, setStudiesTableData] = useState([
          { serialNo: '', name: '', studyProposed: '', totalExpense: '', contribution: '', scholarshipEligibility: '', expectedAmount: '' },
        ]);
      
        const handleStudiesInputChange = (index, field, value) => {
          const newData = [...studiesTableData];
          newData[index][field] = value;
          setStudiesTableData(newData);
        };
      
        const handleAddStudiesRow = () => {
          setStudiesTableData([
            ...studiesTableData,
            { serialNo: '', name: '', studyProposed: '', totalExpense: '', contribution: '', scholarshipEligibility: '', expectedAmount: '' },
          ]);
        };
      
        return (
          <Box p={4}>
            <Heading as="h1" size="l" mb={6}>
              Target Group - Studies and Finance Details
            </Heading>
      
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>S.No</Th>
                  <Th>Name</Th>
                  <Th>Study Proposed to be Supported</Th>
                  <Th>Total Expense of Studies</Th>
                  <Th>Contribution from Family / Others</Th>
                  <Th>Eligibility of Scholarship</Th>
                  <Th>Expected Amount</Th>
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
                        value={row.studyProposed}
                        onChange={(e) => handleStudiesInputChange(index, 'studyProposed', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="number"
                        value={row.totalExpense}
                        onChange={(e) => handleStudiesInputChange(index, 'totalExpense', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="number"
                        value={row.contribution}
                        onChange={(e) => handleStudiesInputChange(index, 'contribution', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="text"
                        value={row.scholarshipEligibility}
                        onChange={(e) => handleStudiesInputChange(index, 'scholarshipEligibility', e.target.value)}
                      />
                    </Td>
                    <Td>
                      <Input
                        type="number"
                        value={row.expectedAmount}
                        onChange={(e) => handleStudiesInputChange(index, 'expectedAmount', e.target.value)}
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

      <Heading as="h1" size="xl" mb={6} align="center" justifyContent="center">
          Education Group Project Application Form 
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
    value={formData.NAMEOFTHESOCIETY}
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
    value={formData.dATEOFSUBMISSION}
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
    value={formData.TITLEOFTHEPROJECT}
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
    value={formData.address}
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
          value={formData.provincialSuperiorName}
          onChange={handleChange}
          required
        />
      </Td>
      <Td>
        <Input
          type="tel"
          name="provincialSuperiorCellNumber"
          value={formData.provincialSuperiorCellNumber}
          onChange={handleChange}
          required
        />
      </Td>
      <Td>
        <Input
          type="email"
          name="provincialSuperiorEmail"
          value={formData.provincialSuperiorEmail}
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
          value={formData.projectInChargeName}
          onChange={handleChange}
          required
        />
      </Td>
      <Td>
        <Input
          type="tel"
          name="projectInChargeCellNumber"
          value={formData.projectInChargeCellNumber}
          onChange={handleChange}
          required
        />
      </Td>
      <Td>
        <Input
          type="email"
          name="projectInChargeEmail"
          value={formData.projectInChargeEmail}
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
    value={formData.overallProjectPeriod}
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
    value={formData.overallProjectBudget}
    onChange={handleChange}
    required
  />
</FormControl>

{/* Number of Beneficiaries supported in the previous years */}
<FormControl isRequired>
  <FormLabel>Number of Beneficiaries supported in the previous years</FormLabel>
  <Input
    type="number"
    name="beneficiariesSupported"
    value={formData.beneficiariesSupported}
    onChange={handleChange}
    required
  />
</FormControl>

            {/* Outcome / Impact in the lives of the passed-out students */}
            <FormControl isRequired>
              <FormLabel>Outcome / Impact in the lives of the passed-out students</FormLabel>
              <Textarea
                name="outcomeImpact"
                onChange={handleChange}
                value={formData.outcomeImpact}

                required
              />
            </FormControl>

            {/* Goal of the project */}
            <FormControl isRequired>
              <FormLabel>Goal of the project</FormLabel>
              <Textarea
                name="projectGoal"
                onChange={handleChange}
                value={formData.projectGoal}

                required
              />
            </FormControl>
          {/* Objectives of the project */}
          <FormControl isRequired>
              <FormLabel>Objectives of the project</FormLabel>
              <Table variant="simple" mb={4}>
                <Thead>
                  <Tr>
                    <Th>Objective</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {formData.objectives.map((objective, index) => (
                    <Tr key={index}>
                      <Td>
                        <Input
                          type="text"
                          value={objective}
                          onChange={(e) => handleChange(e, index)}
                          required
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Button onClick={handleAddObjective} colorScheme="teal">
                Add Objective
              </Button>
            </FormControl>
            <PeopleDetailsTable/>
            <Heading as="h1" size="xl" mb={6}>
       TARGET GROUP
  </Heading>
            <TargetGroupInformationTable/>
            <TargetGroupStudiesTable />
             {/* Other Proposed Activities */}
<FormControl isRequired>
  <FormLabel>
    Apart from academic studies, what are the other proposed activities for the overall development of the beneficiary individually and as a group?
  </FormLabel>
  <Textarea
    name="otherActivities"
    onChange={handleChange}
    value={formData.otherActivities} 
    required
  />
</FormControl>

{/* Monitoring Methods */}
<FormControl isRequired>
  <FormLabel>
    Propose the methods of monitoring the beneficiary's overall growth and development:
  </FormLabel>
  <Textarea
    name="monitoringMethods"
    onChange={handleChange}
    value={formData.monitoringMethods} 
    required
  />
</FormControl>

{/* Evaluation Process and Responsible Person */}
<FormControl isRequired>
  <FormLabel>
    Mention the process of evaluation of the growth of the beneficiaries and who would be responsible.
  </FormLabel>
  <Textarea
    name="evaluationProcess"
    onChange={handleChange}
    value={formData.evaluationProcess}  
    required
  />
</FormControl>

{/* Conclusion */}
<FormControl isRequired>
  <FormLabel>
    Conclusion
  </FormLabel>
  <Textarea
    name="conclusion"
    onChange={handleChange}
    value={formData.conclusion}  
    required
  />
</FormControl>



            <Heading as="h1" size="xl" mb={6}>
    Signatures
  </Heading>

            {/* Project Coordinator agreement */}
  {/* <FormControl isRequired>
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
  </FormControl> */}

  {/* Project-In-Charge agreement */}
  <FormControl isRequired>
    <Checkbox
      name="projectInChargeAgreement"
      onChange={handleChange}
      size="lg"
      defaultChecked={formData.projectInChargeAgreement}
    >
      The Project-In-Charge agree
    </Checkbox>
    <Input
      type="date"
      name="projectInChargeAgreementDate"
      onChange={handleChange}
      value={formData.projectInChargeAgreementDate} 
      required
    />
  </FormControl>

  {/* Provincial Superior agreement */}
  {/* <FormControl isRequired>
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
           */}
          </VStack>



       {/* Submit Button */}
         <Button colorScheme="blue" type="submit">
            Submit
          </Button>
        </form>
      </Box>
      </ChakraProvider>);


}
export default EducationGroup;