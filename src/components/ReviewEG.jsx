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
  useToast,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";
import authAxios from "../AuthAxios";
import { useParams } from "react-router-dom";

const ReviewEG = () => {
  const projectData = JSON.parse(decodeURIComponent(useParams().project));

  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToast;
  const [formData, setFormData] = useState({
    NAMEOFTHESOCIETY: "", // Name of the Society
    dATEOFSUBMISSION: "", // Date of Submission
    TITLEOFTHEPROJECT: "", // Title of the Project
    address: "", // Address

    // Contacts Table
    provincialSuperiorName: "",
    provincialSuperiorCellNumber: "",
    provincialSuperiorEmail: "",
    projectInChargeName: "",
    projectInChargeCellNumber: "",
    projectInChargeEmail: "",

    // Overall Project Information
    overallProjectPeriod: "",
    overallProjectBudget: "",
    beneficiariesSupported: "",
    outcomeImpact: "",
    projectGoal: "",
    objectives: [""], // Initial empty objective

    // Target Group Information Table is there

    // Target Group Studies Table is there already

    // Other Proposed Activities
    otherActivities: "",

    // Monitoring Methods
    monitoringMethods: "",

    // Evaluation Process and Responsible Person
    evaluationProcess: "",

    // Conclusion
    conclusion: "",

    // Signatures
    projectCoordinatorAgreement: false,
    projectCoordinatorAgreementDate: "",
    projectInChargeAgreement: false,
    projectInChargeAgreementDate: "",
    provincialSuperiorAgreement: false,
    provincialSuperiorAgreementDate: "",
    comment: "",
  });
  const [studiesTableData, setStudiesTableData] = useState([
    {
      serialNo: "",
      name: "",
      studyProposed: "",
      totalExpense: "",
      contribution: "",
      scholarshipEligibility: "",
      expectedAmount: "",
    },
  ]);

  const [informationTableData, setInformationTableData] = useState([
    {
      serialNo: "",
      name: "",
      casteAddress: "",
      recommendedBy: "",
      familyBackground: "",
    },
  ]);
  const [tableData, setTableData] = useState([
    { class: "", totalFemale: "", totalMale: "", total: 0 },
  ]);

  // Populate formData from req
  const updatedFormData = {
    NAMEOFTHESOCIETY: projectData.NameOfSociety || "",
    dATEOFSUBMISSION: projectData.DateOfSubmission || "",
    TITLEOFTHEPROJECT: projectData.TitleOfProject || "",
    address: projectData.address || "",
    projectInChargeName: projectData.applicant.name || "",
    projectInChargeCellNumber: projectData.applicant.mobile || "",
    projectInChargeEmail: projectData.applicant.email || "",
    overallProjectPeriod: projectData.OverallProjectPeriod || "",
    overallProjectBudget: projectData.OverallProjectBudget || "",
    beneficiariesSupported: projectData.beneficiariesSupported || "",
    outcomeImpact: projectData.outcomeImpact || "",
    projectGoal: projectData.goal || "",
    objectives: projectData.objectives || [""],
    otherActivities: projectData.otherActivities || "",
    monitoringMethods: projectData.monitoringMethods || "",
    evaluationProcess: projectData.evaluationProcess || "",
    conclusion: projectData.conclusion || "",
    projectInChargeAgreement:
      projectData.project_in_charge_agree.agree || false,
    projectInChargeAgreementDate:
      projectData.project_in_charge_agree.date || "",
  };

  // Populate studiesTableData from req
  const updatedStudiesTableData = projectData.targetGroupStudies.map((row) => ({
    serialNo: row.serialNo || "",
    name: row.name || "",
    studyProposed: row.studyProposed || "",
    totalExpense: row.totalExpense || "",
    contribution: row.contribution || "",
    scholarshipEligibility: row.scholarshipEligibility || "",
    expectedAmount: row.expectedAmount || "",
  }));

  // Populate informationTableData from req
  const udpatedInformationTableData = projectData.targetGroupInformation.map(
    (row) => ({
      serialNo: row.serialNo || "",
      name: row.name || "",
      casteAddress: row.casteAddress || "",
      recommendedBy: row.recommendedBy || "",
      familyBackground: row.familyBackground || "",
    })
  );

  // Populate tableData from req
  const updatedTableData = projectData.peopleDetails.map((row) => ({
    class: row.class || "",
    totalFemale: row.totalFemale || "",
    totalMale: row.totalMale || "",
    total: row.total || 0,
  }));

  setFormData(updatedFormData);
  setTableData(updatedTableData);
  setStudiesTableData(updatedStudiesTableData);
  setInformationTableData(udpatedInformationTableData);

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e, index) => {
    console.log(e.target.value);
    const { name, value } = e.target;

    if (name === "objectives") {
      const updatedObjectives = [...formData.objectives];
      updatedObjectives[index] = value;

      setFormData({
        ...formData,
        objectives: updatedObjectives,
      });
    } else {
      formData[name] = value;
      setFormData({ ...formData });
    }
  };

  const handleAddObjective = () => {
    setFormData({
      ...formData,
      objectives: [...formData.objectives, ""], // Add a new empty objective
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Add your form submission logic here

    try {
      const res = authAxios.post("/editEGReviewer", {
        projectID: projectData._id,
        comment_box_provincial_superior: formData.comment,
        provincial_superior_agree: formData.provincialSuperiorAgreement,
      });
      setIsLoading(false);
      if (res.data.success) {
        showToast({
          title: "Successful submission",
          duration: 5000,
          status: "success",
        });
        setIsSubmitted(true);
      } else {
        showToast({
          title: "Unsuccessful submission",
          duration: 5000,
          status: "error",
        });
      }
    } catch (e) {
      setIsLoading(false);
      showToast({
        title: "Unsuccessful submission",
        duration: 5000,
        status: "error",
      });
    }

    // Now you can use this request object to send data to your server for validation.
  };

  const PeopleDetailsTable = () => {
    const handleInputChange = (index, field, value) => {
      const newData = [...tableData];
      newData[index][field] = value;

      // Calculate total for the current row
      if (field === "totalFemale" || field === "totalMale") {
        newData[index].total = calculateTotal(
          parseInt(newData[index].totalFemale) || 0,
          parseInt(newData[index].totalMale) || 0
        );
      }
      console.log(tableData);
      setTableData(newData);
    };

    const handleAddRow = () => {
      setTableData([
        ...tableData,
        { class: "", totalFemale: "", totalMale: "", total: 0 },
      ]);
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
                    onChange={(e) =>
                      handleInputChange(index, "class", e.target.value)
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.totalFemale}
                    onChange={(e) =>
                      handleInputChange(index, "totalFemale", e.target.value)
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.totalMale}
                    onChange={(e) =>
                      handleInputChange(index, "totalMale", e.target.value)
                    }
                    readOnly
                  />
                </Td>
                <Td>{row.total}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>

        {/* <Button onClick={handleAddRow}>Add Row</Button> */}
      </Box>
    );
  };

  const calculateTotal = (totalFemale, totalMale) => {
    return parseInt(totalFemale) + parseInt(totalMale);
  };

  const TargetGroupInformationTable = () => {
    const handleInformationInputChange = (index, field, value) => {
      const newData = [...informationTableData];
      newData[index][field] = value;
      setInformationTableData(newData);
    };

    const handleAddInformationRow = () => {
      setInformationTableData([
        ...informationTableData,
        {
          serialNo: informationTableData.length + 1,
          name: "",
          casteAddress: "",
          recommendedBy: "",
          familyBackground: "",
        },
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
                  <Input type="number" value={row.serialNo} readOnly />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.name}
                    onChange={(e) =>
                      handleInformationInputChange(
                        index,
                        "name",
                        e.target.value
                      )
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.casteAddress}
                    onChange={(e) =>
                      handleInformationInputChange(
                        index,
                        "casteAddress",
                        e.target.value
                      )
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.recommendedBy}
                    onChange={(e) =>
                      handleInformationInputChange(
                        index,
                        "recommendedBy",
                        e.target.value
                      )
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Textarea
                    value={row.familyBackground}
                    onChange={(e) =>
                      handleInformationInputChange(
                        index,
                        "familyBackground",
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

        {/* <Button onClick={handleAddInformationRow}>Add Row</Button> */}
      </Box>
    );
  };

  const TargetGroupStudiesTable = () => {
    const handleStudiesInputChange = (index, field, value) => {
      const newData = [...studiesTableData];
      newData[index][field] = value;
      setStudiesTableData(newData);
    };

    const handleAddStudiesRow = () => {
      setStudiesTableData([
        ...studiesTableData,
        {
          serialNo: studiesTableData.length + 1,
          name: "",
          studyProposed: "",
          totalExpense: "",
          contribution: "",
          scholarshipEligibility: "",
          expectedAmount: "",
        },
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
                  <Input type="number" value={row.serialNo} readOnly />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.name}
                    onChange={(e) =>
                      handleStudiesInputChange(index, "name", e.target.value)
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.studyProposed}
                    onChange={(e) =>
                      handleStudiesInputChange(
                        index,
                        "studyProposed",
                        e.target.value
                      )
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.totalExpense}
                    onChange={(e) =>
                      handleStudiesInputChange(
                        index,
                        "totalExpense",
                        e.target.value
                      )
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.contribution}
                    onChange={(e) =>
                      handleStudiesInputChange(
                        index,
                        "contribution",
                        e.target.value
                      )
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="text"
                    value={row.scholarshipEligibility}
                    onChange={(e) =>
                      handleStudiesInputChange(
                        index,
                        "scholarshipEligibility",
                        e.target.value
                      )
                    }
                    readOnly
                  />
                </Td>
                <Td>
                  <Input
                    type="number"
                    value={row.expectedAmount}
                    onChange={(e) =>
                      handleStudiesInputChange(
                        index,
                        "expectedAmount",
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
            <FormControl>
              <FormLabel>NAME OF THE SOCIETY</FormLabel>
              <Input
                type="text"
                name="NAMEOFTHESOCIETY"
                value={formData.NAMEOFTHESOCIETY}
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* DATE OF SUBMISSION */}
            <FormControl>
              <FormLabel>DATE OF SUBMISSION</FormLabel>
              <Input
                type="date"
                name="dATEOFSUBMISSION"
                value={formData.dATEOFSUBMISSION}
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* TITLE OF THE PROJECT */}
            <FormControl>
              <FormLabel>TITLE OF THE PROJECT </FormLabel>
              <Input
                type="text"
                name="TITLEOFTHEPROJECT"
                value={formData.TITLEOFTHEPROJECT}
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* ADDRESS*/}
            <FormControl>
              <FormLabel>ADDRESS</FormLabel>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
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
                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="tel"
                      name="provincialSuperiorCellNumber"
                      value={formData.provincialSuperiorCellNumber}
                      onChange={handleChange}
                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="email"
                      name="provincialSuperiorEmail"
                      value={formData.provincialSuperiorEmail}
                      onChange={handleChange}
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
                      value={formData.projectInChargeName}
                      onChange={handleChange}
                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="tel"
                      name="projectInChargeCellNumber"
                      value={formData.projectInChargeCellNumber}
                      onChange={handleChange}
                      readOnly
                    />
                  </Td>
                  <Td>
                    <Input
                      type="email"
                      name="projectInChargeEmail"
                      value={formData.projectInChargeEmail}
                      onChange={handleChange}
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
            <FormControl>
              <FormLabel>Overall Project Period (in months)</FormLabel>
              <Input
                type="number"
                name="overallProjectPeriod"
                value={formData.overallProjectPeriod}
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* Overall Project Budget */}
            <FormControl>
              <FormLabel>Overall Project Budget</FormLabel>
              <Input
                type="number"
                name="overallProjectBudget"
                value={formData.overallProjectBudget}
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* Number of Beneficiaries supported in the previous years */}
            <FormControl>
              <FormLabel>
                Number of Beneficiaries supported in the previous years
              </FormLabel>
              <Input
                type="number"
                name="beneficiariesSupported"
                value={formData.beneficiariesSupported}
                onChange={handleChange}
                readOnly
              />
            </FormControl>

            {/* Outcome / Impact in the lives of the passed-out students */}
            <FormControl>
              <FormLabel>
                Outcome / Impact in the lives of the passed-out students
              </FormLabel>
              <Textarea
                name="outcomeImpact"
                onChange={handleChange}
                value={formData.outcomeImpact}
                readOnly
              />
            </FormControl>

            {/* Goal of the project */}
            <FormControl>
              <FormLabel>Goal of the project</FormLabel>
              <Textarea
                name="projectGoal"
                onChange={handleChange}
                value={formData.projectGoal}
                readOnly
              />
            </FormControl>
            {/* Objectives of the project */}
            <FormControl>
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
                          readOnly
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              {/* <Button onClick={handleAddObjective} colorScheme="teal">
                Add Objective
              </Button> */}
            </FormControl>
            {PeopleDetailsTable()}
            <Heading as="h1" size="xl" mb={6}>
              TARGET GROUP
            </Heading>
            {TargetGroupInformationTable()}
            {TargetGroupStudiesTable()}
            {/* Other Proposed Activities */}
            <FormControl>
              <FormLabel>
                Apart from academic studies, what are the other proposed
                activities for the overall development of the beneficiary
                individually and as a group?
              </FormLabel>
              <Textarea
                name="otherActivities"
                onChange={handleChange}
                value={formData.otherActivities}
                readOnly
              />
            </FormControl>

            {/* Monitoring Methods */}
            <FormControl>
              <FormLabel>
                Propose the methods of monitoring the beneficiary's overall
                growth and development:
              </FormLabel>
              <Textarea
                name="monitoringMethods"
                onChange={handleChange}
                value={formData.monitoringMethods}
                readOnly
              />
            </FormControl>

            {/* Evaluation Process and Responsible Person */}
            <FormControl>
              <FormLabel>
                Mention the process of evaluation of the growth of the
                beneficiaries and who would be responsible.
              </FormLabel>
              <Textarea
                name="evaluationProcess"
                onChange={handleChange}
                value={formData.evaluationProcess}
                readOnly
              />
            </FormControl>

            {/* Conclusion */}
            <FormControl>
              <FormLabel>Conclusion</FormLabel>
              <Textarea
                name="conclusion"
                onChange={handleChange}
                value={formData.conclusion}
                readOnly
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
          </VStack>

          {/* Submit Button */}
          <Button
            colorScheme="blue"
            mx={3}
            type="submit"
            onClick={() => (formData.provincialSuperiorAgreement = true)}
          >
            Accept
          </Button>
          {/* decline Button */}
          <Button colorScheme="red" mx={3} type="submit"      
            onClick={() => (formData.provincialSuperiorAgreement = false)}
>
            Revert
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};
export default ReviewEG;
