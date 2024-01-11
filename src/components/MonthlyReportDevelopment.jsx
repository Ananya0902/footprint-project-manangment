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
                activities: [ {
                    date: "",
                    activityDescription: "",
                    statistics: "",
                }],
            },
        ],
        planOfAction: [ {
            plannedWork: "",
            date: "",
        },],
    });
    
    
      const handleChange = (e, index) => {
        const updatedData = { ...formData };
    
        if (e.target.name === "objective") {
          updatedData.objectives[index].objective = e.target.value;
        } else if (e.target.name === "outcome") {
          updatedData.objectives[index].outcome = e.target.value;
        }
    
        setFormData(updatedData);
      };
    
      const handleActivityChange = (e, objectiveIndex, activityIndex) => {
        const updatedData = { ...formData };
    
        const { name, value } = e.target;
        updatedData.objectives[objectiveIndex].activities[activityIndex][name] = value;
    
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
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log("Form submitted:", formData);
      };

      const handleAddPlanRow = () => {
        const updatedData = { ...formData };
        // Assuming you have a separate property for the plan in your formData
        updatedData.planOfAction.push({
          plannedWork: "",
          date: "",
        });
        setFormData(updatedData);
      };
      const handlePlanChange = (e, planIndex) => {
        const updatedData = { ...formData };
      
        const { name, value } = e.target;
        updatedData.planOfAction[planIndex][name] = value;
      
        setFormData(updatedData);
      };

  return (
    <ChakraProvider>
      <Box p={4}>
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
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </FormControl>

          {/* Province */}
          <FormControl isRequired mb={4}>
            <FormLabel>Province</FormLabel>
            <Select
              name="province"
              value={formData.province}
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
              required
            />
          </FormControl>

          {/* Main Goal of the Project */}
          <FormControl isRequired mb={4}>
            <FormLabel>Main Goal of the Project</FormLabel>
            <Textarea
              name="mainGoal"
              value={formData.mainGoal}
              onChange={handleChange}
              required
            />
          </FormControl>
          <FormLabel>Objectives:-</FormLabel>

          {formData.objectives.map((objective, index) => (
            <Box key={index} mb={8}>
              {/* Objective */}
              <FormControl isRequired mb={4}>
                <FormLabel>Objective {index + 1}</FormLabel>
                <Textarea
                  name="objective"
                  value={objective.objective}
                  onChange={(e) => handleChange(e, index)}
                  required
                />
              </FormControl>

              {/* Outcome */}
              <FormControl isRequired mb={4}>
                <FormLabel>Outcome</FormLabel>
                <Textarea
                  name="outcome"
                  value={objective.outcome}
                  onChange={(e) => handleChange(e, index)}
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
                          name="date"
                          value={activity.date}
                          onChange={(e) =>
                            handleActivityChange(e, index, activityIndex)
                          }
                          required
                        />
                      </Td>
                      <Td>
                        <Textarea
                          name="activityDescription"
                          value={activity.activityDescription}
                          onChange={(e) =>
                            handleActivityChange(e, index, activityIndex)
                          }
                          required
                        />
                      </Td>
                      <Td>
                        <Textarea
                          name="statistics"
                          value={activity.statistics}
                          onChange={(e) =>
                            handleActivityChange(e, index, activityIndex)
                          }
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
          <Button onClick={handleAddObjective} colorScheme="purple"  ml="auto">
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
                          onChange={(e) =>
                            handlePlanChange(e, planIndex)
                          }
                          required
                        />
                      </Td>
                      <Td>
                        <Input
                          type="date"
                          name="date"
                          value={plan.date}
                          onChange={(e) =>
                            handlePlanChange(e, planIndex)
                          }
                          required
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Button
                onClick={handleAddPlanRow}
                colorScheme="teal"
                mt={4}
              >
                Add Plan Row
              </Button>
          </VStack>
          {/* Submit Button */}
          <Button colorScheme="blue" type="submit" mt={4}>
            Submit
          </Button>
        </form>
      </Box>
    </ChakraProvider>
  );
};

export default MonthlyReportDevelopmentProject;
