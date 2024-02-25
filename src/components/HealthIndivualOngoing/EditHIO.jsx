import React, { useState } from "react";
import { useParams } from "react-router-dom";
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
  Alert,
  AlertIcon,
  Table,
  useDisclosure , 
  ModalContent,
  ModalOverlay,
  Modal,
  ModalBody,
  CircularProgress,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  useToast,
} from "@chakra-ui/react";
import authAxios from "../../AuthAxios";
import cloudAxios from "../../CloudAxios";

const EditHIO = () => {
  const [open , onOpen , onClose] = useDisclosure(); 
  const showToast = useToast();
  const projectData = JSON.parse(decodeURIComponent(useParams().project));
  const projectInchargeData = projectData.applicant;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    natureOfIllness: projectData.illness_nature,
    photographFile: projectData.photograph_benificary,
    beneficiaryName: projectData.name,
    presentEarningMember: projectData.present_earning_member,
    beneficiaryAddress: projectData.address,
    aadharCardNo: projectData.aadhar_no,
    gender: projectData.gender,
    beneficiaryEmail: projectData.email,
    dob: projectData.DOB,
    beneficiaryContact: projectData.mobile,
    guardianName: projectData.father,
    numberOfChildren: projectData.no_of_children,
    language: projectData.language,
    religion: projectData.religion,
    casteTribe: projectData.caste,
    natureOfIllnessBeneficiary: projectData.nature_illness,
    projectSupportDuration: projectData.past_project_duration,
    healthSituationDetails: projectData.more_details_about_health,
    familySituationDetails: projectData.present_situation_family,
    accessToSupport: projectData.Govt_or_other_support,
    amountAndNatureOfSupport: projectData.nature_of_support,
    amountReceivedFromProject: projectData.previous_amount_received,
    totalAmountSpent: projectData.previous_total_amount,
    totalExpense: projectData.present_health_total_expense,
    familyContribution: projectData.present_health_family_contribute,
    totalAmountRequested: projectData.present_health_amount_requested,
    aadharCardFile: projectData.aadhar_img,
    requestLetterFile: projectData.request_letter_img,
    treatmentRecordFile: projectData.treatment_record_img,
    beneficiaryAgreement: projectData.benificary_agree.agree,
    projectInChargeAgreement: projectData.project_in_charge_agree.agree,
    otherDocumentsFile: projectData.other_supporting_docs_img,
    projectInChargeName: projectInchargeData.name,
    projectInChargeContact: projectInchargeData.mobile,
    projectInChargeEmail: projectInchargeData.email,
    // benificiaryAgreement: pro
    beneficiaryAgreementDate: projectData.benificary_agree.date,
    projectInChargeAgreementDate: projectData.project_in_charge_agree.date,
    provincialSuperiorAgreement: false,
    provincialSuperiorAgreementDate: null,
    comment: "",
  });
  console.log(formData);
  const [tableData, setTableData] = useState(
    projectData.present_earning_member.map((member) => {
      return {
        familyMember: member.family_member,
        natureOfWork: member.nature_of_work,
        monthlyIncome: member.monthly_income,
      };
    })
  );
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) =>
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.files[0],
    }));

  const handleImageUpload = async (file) => {
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET);
      const response = await cloudAxios.post("/", form);
      const imgData = response.data;
      return imgData.secure_url;
    } catch (error) {
      showToast({
        title: "Error uploading image to cloudinary",
        description: error,
        duration: 5000,
      });
    }
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading((prevLoading) => !prevLoading);
      const photographUrl =
        formData.photographFile instanceof File
          ? await handleImageUpload(formData.photographFile)
          : formData.photographFile;
      const aadharCardUrl =
        formData.aadharCardFile instanceof File
          ? await handleImageUpload(formData.aadharCardFile)
          : formData.aadharCardFile;
      const requestLetterUrl = formData.requestLetterFile
        ? await handleImageUpload(formData.requestLetterFile)
        : formData.requestLetterFile;
      const treatmentRecordUrl = formData.treatmentRecordFile
        ? await handleImageUpload(formData.treatmentRecordFile)
        : formData.treatmentRecordFile;
      const otherDocumentsUrl = formData.otherDocumentsFile
        ? await handleImageUpload(formData.otherDocumentsFile)
        : formData.otherDocumentsFile;

      const res = await authAxios.put("/projects/editHOI", {
        illness_nature: formData.natureOfIllness,
        photograph_benificary: photographUrl,
        name: formData.beneficiaryName,
        present_earning_member: tableData.map((tableEntry) => {
          return {
            family_member: tableEntry.familyMember,
            nature_of_work: tableEntry.natureOfWork,
            monthly_income: tableEntry.monthlyIncome,
          };
        }), // You need to add this field in your form
        address: formData.beneficiaryAddress,
        aadhar_no: formData.aadharCardNo,
        gender: formData.gender,
        email: formData.beneficiaryEmail,
        DOB: formData.dob,
        mobile: formData.beneficiaryContact,
        father: formData.guardianName,
        no_of_children: formData.numberOfChildren,
        language: formData.language,
        religion: formData.religion,
        caste: formData.casteTribe,
        nature_illness: formData.natureOfIllnessBeneficiary,
        past_project_duration: formData.projectSupportDuration,
        more_details_about_health: formData.healthSituationDetails,
        present_situation_family: formData.familySituationDetails,
        Govt_or_other_support: formData.accessToSupport,
        nature_of_support: formData.amountAndNatureOfSupport,
        previous_amount_received: formData.amountReceivedFromProject,
        previous_total_amount: formData.totalAmountSpent,
        present_health_total_expense: formData.totalExpense,
        present_health_family_contribute: formData.familyContribution,
        present_health_amount_requested: formData.totalAmountRequested,
        aadhar_img: aadharCardUrl,
        request_letter_img: requestLetterUrl,
        treatment_record_img: treatmentRecordUrl,
        benificary_agree: { agree: formData.beneficiaryAgreement.checked },
        project_in_charge_agree: {
          agree: formData.projectInChargeAgreement.checked,
        },
        other_supporting_docs_img: otherDocumentsUrl,
      });
      setIsLoading((prevLoading) => !prevLoading);
      if (res.data.success) {
        setIsSubmitted(true);
        showToast({
          title: "Successfully updated the document",
          status: "success",
          duration: 5000,
        });
      } else {
        showToast({
          title: "Unable to update the document",
          description: res.data.message ?? "",
          status: "error",
          duration: 5000,
        });
        console.log(res.data);
      }
    } catch (e) {
      console.log(e);
      showToast({
        title: "Error ",
        status: "error",
        duration: 5000,
      });
    }
  };

  const DynamicTable = () => {
    // const [tableData, setTableData] = useState([
    //   { familyMember: '', natureOfWork: '', monthlyIncome: '' },
    // ]);

    const handleDeleteRow = (index) => {
      const newData = [...tableData];
      newData.splice(index, 1);
      setTableData(newData);
    };

    const handleAddRow = () => {
      setTableData((prevData) => [
        ...prevData,
        { familyMember: "", natureOfWork: "", monthlyIncome: 0 },
      ]);
    };

    return (
      <Box p={4}>
        <Heading as="h1" size="l" mb={6}>
          Who are the present earning members of the family
        </Heading>

        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Family Member</Th>
              <Th>Type/Nature of Work</Th>
              <Th>Monthly Income</Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData.map((row, index) => (
              <Tr key={index}>
                <Td>
                  <Input type="text" value={row.familyMember} isRequired />
                </Td>
                <Td>
                  <Input type="text" value={row.natureOfWork} isRequired />
                </Td>
                <Td>
                  <Input type="number" value={row.monthlyIncome} isRequired />
                </Td>
                <Td>
                  <Button
                    colorScheme="red"
                    onClick={() => handleDeleteRow(index)}
                  >
                    Delete
                  </Button>
                </Td>
              </Tr>
            ))}
            <Button colorScheme="blue" onClick={handleAddRow}></Button>
          </Tbody>
        </Table>
      </Box>
    );
  };

  return (
    <ChakraProvider>
      {isLoading && (
        <>
          <Modal isOpen={true} onClose={onClose}>
            <ModalOverlay />

            <ModalContent>
              <ModalBody
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {/* Use CircularProgress directly as the content */}
                <CircularProgress
                  isIndeterminate
                  color="green.400"
                  thickness="4px"
                  size="60px"
                />
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      )}
      <Box p={4}>
        <Heading
          as="h1"
          size="xl"
          mb={6}
          align="center"
          justifyContent="center"
        >
          Health individual Ongoing Project Application Form
        </Heading>

        {isSubmitted && (
          <Alert status="success" mb={4}>
            <AlertIcon />
            Form submitted successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          {/* Part 1: Provincial Superior Details */}
          <VStack align="start" spacing={4} mb={8}>
            {/* Nature of Illness */}
            <FormControl>
              <FormLabel>Nature of Illness</FormLabel>
              <Input
                type="text"
                name="natureOfIllness"
                onChange={handleChange}
                value={formData.natureOfIllness || ""}
                required
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/*Personal Information of the Beneficiary */}
            <Heading as="h1" size="xl" mb={6}>
              Personal Information of the Beneficiary
            </Heading>
            {/* Photograph (URL) */}
            <FormControl>
              <FormLabel>Photograph</FormLabel>
              <Box>
                {formData.photographFile && (
                  <Box>
                    <strong>Uploaded File:</strong>{" "}
                    {formData.photographFile?.name ??
                      formData.photographFile.split("/")[
                        formData.photographFile.split("/").length - 1
                      ]}
                  </Box>
                )}
                <Input
                  type="file"
                  name="photographFile"
                  onChange={handleImageChange}
                  accept="image/*"
                />
                <Image
                  mx="auto"
                  boxSize="50%"
                  objectFit="contain"
                  src={
                    formData.photographFile instanceof File
                      ? URL.createObjectURL(formData.photographFile)
                      : formData.photographFile
                  }
                  alt="Photograph File"
                />
              </Box>
            </FormControl>

            {/* Name */}
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                name="beneficiaryName"
                onChange={handleChange}
                value={formData.beneficiaryName || ""}
                required
              />
            </FormControl>

            {/* Contact */}
            <FormControl>
              <FormLabel>Contact</FormLabel>
              <Input
                type="tel"
                name="beneficiaryContact"
                onChange={handleChange}
                value={formData.beneficiaryContact || ""}
                required
              />
            </FormControl>

            {/* Email */}
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="beneficiaryEmail"
                onChange={handleChange}
                value={formData.beneficiaryEmail || ""}
                required
              />
            </FormControl>

            {/* Address */}
            <FormControl>
              <FormLabel>Address</FormLabel>
              <Textarea
                name="beneficiaryAddress"
                onChange={handleChange}
                value={formData.beneficiaryAddress || ""}
                required
              />
            </FormControl>

            {/* Aadhar Card No. */}
            <FormControl>
              <FormLabel>Aadhar Card No.</FormLabel>
              <Input
                type="text"
                name="aadharCardNo"
                onChange={handleChange}
                value={formData.aadharCardNo || ""}
                required
              />
            </FormControl>

            {/* Gender */}
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <Select
                name="gender"
                onChange={handleChange}
                value={formData.gender || ""}
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </Select>
            </FormControl>

            {/* Date of Birth */}
            <FormControl>
              <FormLabel>Date of Birth</FormLabel>
              <Input
                type="date"
                name="dob"
                onChange={handleChange}
                value={formData.dob || ""}
                required
              />
            </FormControl>

            {/* Name of Father/Husband/Legal Guardian */}
            <FormControl>
              <FormLabel>Name of Father/Husband/Legal Guardian</FormLabel>
              <Input
                type="text"
                name="guardianName"
                onChange={handleChange}
                value={formData.guardianName || ""}
                required
              />
            </FormControl>

            {/* Number of Children */}
            <FormControl>
              <FormLabel>Number of Children</FormLabel>
              <Input
                type="number"
                name="numberOfChildren"
                onChange={handleChange}
                value={formData.numberOfChildren}
                required
              />
            </FormControl>

            {/* Language */}
            <FormControl>
              <FormLabel>Language</FormLabel>
              <Input
                type="text"
                name="language"
                onChange={handleChange}
                value={formData.language || ""}
                required
              />
            </FormControl>

            {/* Religion */}
            <FormControl>
              <FormLabel>Religion</FormLabel>
              <Input
                type="text"
                name="religion"
                onChange={handleChange}
                value={formData.religion || ""}
                required
              />
            </FormControl>

            {/* Caste / Tribe */}
            <FormControl>
              <FormLabel>Caste / Tribe</FormLabel>
              <Input
                type="text"
                name="casteTribe"
                onChange={handleChange}
                value={formData.casteTribe || ""}
                required
              />
            </FormControl>
          </VStack>

          <VStack align="start" spacing={4} mb={8}>
            {/* Questions on Health Situation */}

            <Heading as="h1" size="xl" mb={6}>
              Questions on health situation
            </Heading>

            {/* Nature of Illness of the Beneficiary */}
            <FormControl>
              <FormLabel>Nature of Illness of the Beneficiary</FormLabel>
              <Textarea
                name="natureOfIllness"
                onChange={handleChange}
                value={formData.natureOfIllnessBeneficiary || ""}
                required
              />
            </FormControl>

            {/* Duration of Project Support */}
            <FormControl>
              <FormLabel>
                Since how many years the project support is given
              </FormLabel>
              <Input
                type="text"
                name="projectSupportDuration"
                onChange={handleChange}
                value={formData.projectSupportDuration || ""}
                required
              />
            </FormControl>

            {/* Present Health Situation Details */}
            <FormControl>
              <FormLabel>
                Please write down more details about the present health
                situation of the beneficiary. e.g., improvement
              </FormLabel>
              <Textarea
                name="healthSituationDetails"
                onChange={handleChange}
                value={formData.healthSituationDetails || ""}
                required
              />
            </FormControl>

            {/* Present Family Situation */}
            <FormControl>
              <FormLabel>
                Give information about the present situation of the family
              </FormLabel>
              <Textarea
                name="familySituationDetails"
                onChange={handleChange}
                value={formData.familySituationDetails || ""}
                required
              />
            </FormControl>

            <DynamicTable />

            {/* Access to Government or Other Support */}
            <FormControl>
              <FormLabel>
                Does the beneficiary able to access Government or other support
                in the previous year?
              </FormLabel>
              <Select
                name="accessToSupport"
                onChange={handleChange}
                value={formData.accessToSupport || ""}
                required
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </Select>
            </FormControl>

            {/* Amount and Nature of Support */}
            <FormControl>
              <FormLabel>If yes, the amount and nature of support </FormLabel>
              <Textarea
                name="amountAndNatureOfSupport"
                onChange={handleChange}
                value={formData.amountAndNatureOfSupport || ""}
                required
              />
            </FormControl>

            {/* Amount received previously from the project */}
            <FormControl>
              <FormLabel>Amount received previously from the project</FormLabel>
              <Input
                type="number"
                name="amountReceivedFromProject"
                onChange={handleChange}
                value={formData.amountReceivedFromProject || ""}
                required
              />
            </FormControl>

            {/* Total amount spent */}
            <FormControl>
              <FormLabel>Total amount spent</FormLabel>
              <Input
                type="number"
                name="totalAmountSpent"
                onChange={handleChange}
                value={formData.totalAmountSpent || ""}
                required
              />
            </FormControl>
          </VStack>

          {/* Information on present Health Cost – Budget details*/}
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Information on present Health Cost – Budget details
            </Heading>

            {/* Total Expense */}
            <FormControl>
              <FormLabel>Total Expense</FormLabel>
              <Input
                type="number"
                name="totalExpense"
                onChange={handleChange}
                value={formData.totalExpense || ""}
                required
              />
            </FormControl>

            {/* How much can the family contribute? */}
            <FormControl>
              <FormLabel>How much can the family contribute?</FormLabel>
              <Input
                type="number"
                name="familyContribution"
                onChange={handleChange}
                value={formData.familyContribution || ""}
                required
              />
            </FormControl>

            {/* Total amount requested */}
            <FormControl>
              <FormLabel>Total amount requested</FormLabel>
              <Input
                type="number"
                name="totalAmountRequested"
                onChange={handleChange}
                value={formData.totalAmountRequested || ""}
                required
              />
            </FormControl>
          </VStack>
          <VStack align="start" spacing={4} mb={8}>
            <Heading as="h1" size="xl" mb={6}>
              Documents Required
            </Heading>

            {/* Aadhar Card */}
            <FormControl isRequired>
              <FormLabel>Aadhar Card</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={
                  formData.aadharCardFile instanceof File
                    ? URL.createObjectURL(formData.aadharCardFile)
                    : formData.aadharCardFile
                }
                alt="Aadhar Card File"
              />
              <Input
                type="file"
                name="aadharCardFile"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>

            {/* Request Letter */}
            <FormControl isRequired>
              <FormLabel>Request Letter</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={
                  formData.requestLetterFile instanceof File
                    ? URL.createObjectURL(formData.requestLetterFile)
                    : formData.requestLetterFile
                }
                alt="Request Letter"
              />
              <Input
                type="file"
                name="requestLetterFile"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>

            {/* Treatment record of previous year (one proof) */}
            <FormControl isRequired>
              <FormLabel>
                Treatment record of previous year (one proof)
              </FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={
                  formData.treatmentRecordFile instanceof File
                    ? URL.createObjectURL(formData.treatmentRecordFile)
                    : formData.treatmentRecordFile
                }
                alt="Treatment Record"
              />
              <Input
                type="file"
                name="treatmentRecordFile"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>

            {/* Other Supporting Documents */}
            <FormControl isRequired>
              <FormLabel>Other Supporting Documents</FormLabel>
              <Image
                mx="auto"
                boxSize="50%"
                objectFit="contain"
                src={
                  formData.otherDocumentsFile instanceof File
                    ? URL.createObjectURL(formData.otherDocumentsFile)
                    : formData.otherDocumentsFile
                }
                alt="Other supporting docs"
              />
              <Input
                type="file"
                name="otherDocumentsFile"
                accept="image/*"
                onChange={handleImageChange}
              />
            </FormControl>
          </VStack>
          <Button
            colorScheme="red"
            mx="3"
            type="submit"
            flex={1}
            onClick={() => {
              formData.projectInChargeAgreement = true;
              formData.beneficiaryAgreement = true;
            }}
          >
            Revert
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default EditHIO;
