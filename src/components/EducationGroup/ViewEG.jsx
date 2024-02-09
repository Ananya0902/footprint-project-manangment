import React, { useState, useEffect } from "react";
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
import authAxios from "../../AuthAxios";
import { useParams } from "react-router-dom";

const ViewEG = () => {
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
    commentReviewer: "",
    commentApprover: "",
    amountApprovedByProjectCoordinator: "",
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

  // Assuming projectData is the fetched data
  const projectData = JSON.parse(decodeURIComponent(useParams().project));

  useEffect(() => {
    // Check if projectData is available
    if (projectData) {
      setFormData({
        ...formData,
        NAMEOFTHESOCIETY: projectData.NameOfSociety || "",
        dATEOFSUBMISSION: projectData.DateOfSubmission || "",
        TITLEOFTHEPROJECT: projectData.TitleOfProject || "",
        address: projectData.address || "",

        // Contacts Table
        provincialSuperiorName: projectData.provincialSuperiorName || "",
        provincialSuperiorCellNumber:
          projectData.provincialSuperiorCellNumber || "",
        provincialSuperiorEmail: projectData.provincialSuperiorEmail || "",
        projectInChargeName: projectData.projectInChargeName || "",
        projectInChargeCellNumber: projectData.projectInChargeCellNumber || "",
        projectInChargeEmail: projectData.projectInChargeEmail || "",

        // Overall Project Information
        overallProjectPeriod: projectData.OverallProjectPeriod || "",
        overallProjectBudget: projectData.OverallProjectBudget || "",
        beneficiariesSupported: projectData.beneficiariesSupported || "",
        outcomeImpact: projectData.outcomeImpact || "",
        projectGoal: projectData.goal || "", // Assuming 'goal' is the correct key
        objectives: projectData.objectives || [""],

        // Other Proposed Activities
        otherActivities: projectData.otherActivities || "",

        // Monitoring Methods
        monitoringMethods: projectData.monitoringMethods || "",

        // Evaluation Process and Responsible Person
        evaluationProcess: projectData.evaluationProcess || "",

        // Conclusion
        conclusion: projectData.conclusion || "",

        // Signatures
        projectCoordinatorAgreement:
          projectData.project_in_charge_agree?.agree || false,
        projectCoordinatorAgreementDate:
          projectData.project_in_charge_agree?.date || "",
        projectInChargeAgreement:
          projectData.project_in_charge_agree?.agree || false,
        projectInChargeAgreementDate:
          projectData.project_in_charge_agree?.date || "",
        provincialSuperiorAgreement:
          projectData.provincial_superior_agree?.agree || false,
        provincialSuperiorAgreementDate:
          projectData.provincial_superior_agree?.date || "",
        commentReviewer: projectData.commentReviewer || "",
        amountApprovedByProjectCoordinator:
          projectData.amountApprovedByProjectCoordinator || "",
        projectCoordinators: projectData.project_coordinators,
      });
      // Assuming projectData has the same structure as studiesTableData and informationTableData
      setStudiesTableData(projectData.targetGroupStudies || []);
      setInformationTableData(projectData.targetGroupInformation || []);
      setTableData(projectData.peopleDetails || []);
    }
  }, [projectData]);

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

        <form>
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
            <FormControl>
              <Checkbox
                name="provincialSuperiorAgreement"
                onChange={handleChange}
                size="lg"
                readOnly
              >
                The Provincial Superior agree
              </Checkbox>
            </FormControl>

            {/* Project Coordinator agreement */}
            <FormControl>
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

            <FormControl isRequired>
              {formData.projectCoordinators.map((projectCoordinator, index) => (
                <Box borderWidth={1} p={4} mt={4}>
                  <FormLabel>{`Project Coordinator - ${index + 1}`}</FormLabel>
                  <Input
                    name="projectCoordinatorName"
                    type="text"
                    value={projectCoordinator.ref.name}
                    readOnly
                  />
                  <FormLabel>{`Email`}</FormLabel>
                  <Input
                    name="projectCoordinatorEmail"
                    type="text"
                    value={projectCoordinator.ref.email}
                    readOnly
                  />
                  <FormLabel>{`Comment`}</FormLabel>
                  <Input
                    name="projectCoordinatorComment"
                    type="text"
                    value={projectCoordinator.comment}
                    readOnly
                  />
                  <FormLabel>{`Agree`}</FormLabel>
                  <Checkbox
                    name="projectCoordinatorAgree"
                    type="text"
                    isChecked={projectCoordinator.agree}
                    readOnly
                  />
                  <Input
                    name="prjectCoordinatorDate"
                    type="date"
                    value={projectCoordinator.date.substring(0, 10)}
                    readOnly
                  />
                </Box>
              ))}
            </FormControl>

            {/* Amount Approved by Project Coordinator */}
            <FormControl>
              <FormLabel>Amount Approved by Project Coordinator</FormLabel>
              <Input
                type="number"
                name="amountApprovedByProjectCoordinator"
                value={formData.amountApprovedByProjectCoordinator}
              />
            </FormControl>
          </VStack>
          <Button
            type="submit"
            colorScheme="blue"
            onClick={() => {
              window.print();
            }}
          >
            Print
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};
export default ViewEG;
