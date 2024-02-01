// Import necessary libraries and components
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import HealthIndividualOngoing from "./components/healthIndividiualOngoing";
import EducationIndividualOngoing from "./components/educationIndividualOngoing";
import SocialIndividualOngoing from "./components/socialIndividualOngoing";
import HealthIndividual from "./components/healthIndividual";
import EducationIndividual from "./components/educationIndividual";
import SocialIndividual from "./components/socialIndividual";
import EducationGroup from "./components/educationGroup";
import Common from "./components/common";
import DevProjectLivlihoodGroup from "./components/devProjLivliGroup";
import InstitutionalSkillTrainingForm from "./components/institutionalSkillGroup";
import MonthlyReportDevelopmentProject from "./components/MonthlyReportDevelopment";
import ProfilePageApplicant from "./components/profileApplicant";
import ProfilePageReviewer from "./components/profileReviewer";
import ProfilePageApprover from "./components/profileApprover";
import RegisterApproverPage from "./components/registerApprover";
import DashboardApplicant from "./components/dashboardApplicant";
import DashboardReviewer from "./components/dashboardReviewer";
import DashboardApprover from "./components/dashboardApprover";
import VerifyReviewer from "./components/verifyReviewer";
import VerifyApplicant from "./components/verifyApplicant";
import IndividualProjects from "./components/individualProjects";
import GroupProjects from "./components/groupProjects";
import MyProjects from "./components/myProjects";
import ProjectsToBeReviewed from "./components/projectsToBeReviewed";
import MyReviewedProject from "./components/MyReviewedProject";
import ProjectsToBeApproved from "./components/ProjectsToBeApproved";
import ApprovedProjects from "./components/ApprovedProjects";
import ApprovedProjectsForReviewer from "./components/ApprovedProjectsForReviewer";
import QuaterlyReportDevelopment from "./components/QuaterlyReportDevelopment";
import ReviewHIO from "./components/ReviewHIO";
import ApproveHIO from "./components/ApproveHIO";
import ReviewEIO from "./components/ReviewEIO";
import ApproveEIO from "./components/ApproveEIO";
import ViewProject from './components/viewHIOProject'
import NextPhaseForm from './components/NextPhaseDevelopmentProject'
import WelfareHomeGroup from "./components/WelfareHomeGroup";
import EducationRuralUrbanTribalGroup from "./components/EducationRuralUrbanTribalGroup";


// App component
const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/common" element={<Common />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/registerApprover" element={<RegisterApproverPage />} />
          <Route path="/healthIndividualOngoing" element={<HealthIndividualOngoing />} />
          <Route path="/healthIndividual" element={<HealthIndividual/>} />
          <Route path="/educationIndividualOngoing" element={<EducationIndividualOngoing />} />
          <Route path="/educationIndividual" element={<EducationIndividual />} />
          <Route path="/socialIndividualOngoing" element={<SocialIndividualOngoing />} />
          <Route path="/socialIndividual" element={<SocialIndividual />} />
          <Route path="/educationGroup" element={<EducationGroup />} />
          <Route path="/common" element={<Common />} />
          <Route path="/devProjLivliGroup" element={<DevProjectLivlihoodGroup />} />
          <Route path="/institutionalSkillGroup" element={<InstitutionalSkillTrainingForm />} />
          <Route path="/MonthlyReportDevelopment" element={<MonthlyReportDevelopmentProject />} />
          <Route path="/profileApplicant/:userDetails" element={<ProfilePageApplicant />} />
          <Route path="/profileReviewer" element={<ProfilePageReviewer />} />
          <Route path="/profileApprover" element={<ProfilePageApprover />} />
          <Route path="/registerApprover" element={<RegisterApproverPage />} />
          <Route path="/dashboardApplicant" element={<DashboardApplicant />} />
          <Route path="/dashboardReviewer" element={<DashboardReviewer />} />
          <Route path="/dashboardApprover" element={<DashboardApprover />} />
          <Route path="/verifyReviewer" element={<VerifyReviewer />} />
          <Route path="/verifyApplicant" element={<VerifyApplicant />} />
          <Route path="/individualProjects/:selectedAppostolate" element={<IndividualProjects/>} />
          <Route path="/groupProjects" element={<GroupProjects selectedApostolate="social" />} />
          <Route path="/myProjects" element={<MyProjects/>} />
          <Route path="/projectsToBeReviewed" element={<ProjectsToBeReviewed/>} />
          <Route path="/ProjectsToBeApproved" element={<ProjectsToBeApproved/>} />
          <Route path="/MyReviewedProject" element={<MyReviewedProject/>} />
          <Route path="/ApprovedProjects" element={<ApprovedProjects/>} />
          <Route path="/ApprovedProjectsForReviewer" element={<ApprovedProjectsForReviewer reviewerProvince="north" />} />
          <Route path="/QuaterlyReportDevelopment" element={<QuaterlyReportDevelopment />} />
          <Route path="/ReviewHIO/:project" element={<ReviewHIO />} />
          <Route path="/ReviewEIO/:project" element={<ReviewEIO/>} />
          {/* <Route path="/ReviewSIO" element={<ReviewSIO/>} /> */}
          <Route path="/ApproveHIO/:project" element={<ApproveHIO />} />
          <Route path="/ApproveEIO/:project" element={<ApproveEIO />} />
          {/* <Route path="/ApproveSIO" element={<ApproveSIO />} /> */}
          <Route path="/viewProject/:project" element={<ViewProject/>} /> 
          <Route path="/nextPhaseDevelopmentProject" element={<NextPhaseForm/>} /> 

          <Route path="/WelfareHomeGroup" element={<WelfareHomeGroup/>} /> 
          <Route path="/EducationRuralUrbanTribalGroup" element={<EducationRuralUrbanTribalGroup/>} /> 

        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;



