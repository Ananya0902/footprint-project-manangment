// Import necessary libraries and components
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import AuthService from './AuthService';
import Home from "./components/home";
import LoginPage from "./components/login";
import RegisterPage from "./components/register";
import HealthIndividualOngoing from "./components/healthIndividiualOngoing";
import EducationIndividualOngoing from "./components/educationIndividualOngoing";

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
import HIVAffectedOutreach from "./components/HIVAffectedOutreach";
import AnnualRepEducationIndividual from "./components/AnnualRepEducationIndividual";
import AnnualRepHealthIndividual from "./components/AnnualRepHealthIndividual";
import AnnualSelfEmployment from "./components/AnnualSelfEmploymentReport";
import BiAnnualLivelihoodIndividual from "./components/BiAnnualLivlihoodIndividualReport";
import BiAnnualEducationIndividualReport from "./components/BiAnnualEducationIndividualReport";
import BiAnnualHealthIndividualReport from "./components/BiAnnualHealthIndividualReport";
import AnnualEducationInstitutionReport from "./components/AnnualEducationInstitutionReport";
import ReviewEI from "./components/ReviewEI";
import ApproveEI from "./components/ApproveEI";
import ReviewNPDP from "./components/ReviewNPDP";
import ApproveNPDP from "./components/ApproveNPDP";
import ViewNPDP from "./components/viewNPDP";
import ReviewEduRUTG from "./components/ReviewEduRUTG";
import ApproveEduRUTG from "./components/ApproveEduRUTG";
import ViewEduRUTG from "./components/ViewEduRUTG";
import ViewEI from "./components/ViewEI";
import ReviewDPLG from "./components/ReviewDPLG";
import ApproveDPLG from "./components/ApproveDPLG";
import ReviewWelfareHomeForChildren from "./components/RevieweWelfareHomeForChildren"
import ReviewCG from "./components/ReviewCG";
import ApproveCG from "./components/ApproveCG";
import ReviewEG from "./components/ReviewEG";
import ApproveEG from "./components/ApproveEG";
import ReviewISG from "./components/ReviewISG";
import ApproveISG from "./components/ApproveISG";
import ReviewHIV from "./components/ReviewHIV";
import ApproveHIV from "./components/ApproveHIV";
import EditHIV from "./components/editHIV";
import EditCG from "./components/editCG";
import EditNPDP from "./components/editNPDP";
import EditWHCG from "./components/editWHCG";
import EditISG from "./components/editISG";
import EditDPLG from "./components/editDPLG";
import EditEGS from "./components/editEGS";
import EditEG from "./components/editEG";
import ViewCG from "./components/ViewCG";
import ViewEG from "./components/ViewEG";
import ViewDPLG from "./components/ViewDPLG";
import ViewHIV from "./components/ViewHIV";
import ViewISG from "./components/ViewISG";
import ViewWHCG from "./components/ViewWHCG";
import ReviewSocialIndividual from "./components/ReviewSocialIndividual";


const PrivateRoute = ({ path, element }) => {
  return AuthService.isAuthenticated() ? (
    element
  ) : (
    <Navigate to="/login" />
  );
};




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

          <Route path="/registerApprover" element={<PrivateRoute element={<RegisterApproverPage />} />} />

          <Route path="/healthIndividualOngoing" element={<HealthIndividualOngoing />} />
        
          <Route path="/educationIndividualOngoing" element={<EducationIndividualOngoing />} />
          <Route path="/educationIndividual" element={<EducationIndividual />} />
          
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
          <Route path="/groupProjects/:selectedAppostolate" element={<GroupProjects  />} />
          <Route path="/myProjects" element={<MyProjects/>} />
          <Route path="/projectsToBeReviewed" element={<ProjectsToBeReviewed/>} />
          <Route path="/ProjectsToBeApproved" element={<ProjectsToBeApproved/>} />
          <Route path="/MyReviewedProject" element={<MyReviewedProject/>} />
          <Route path="/ApprovedProjects" element={<ApprovedProjects/>} />
          <Route path="/ApprovedProjectsForReviewer" element={<ApprovedProjectsForReviewer reviewerProvince="north" />} />
          <Route path="/QuaterlyReportDevelopment" element={<QuaterlyReportDevelopment />} />
          <Route path="/ReviewHOI/:project" element={<ReviewHIO />} />
          <Route path="/ReviewEOI/:project" element={<ReviewEIO/>} />
          <Route path="/ReviewSI" element={<ReviewSocialIndividual/>} />
          <Route path="/ApproveHOI/:project" element={<ApproveHIO />} />
          <Route path="/ApproveEOI/:project" element={<ApproveEIO />} />
          {/* <Route path="/ApproveSIO" element={<ApproveSIO />} /> */}
          
          <Route path="/nextPhaseDevelopmentProject" element={<NextPhaseForm/>} /> 

          <Route path="/WelfareHomeGroup" element={<WelfareHomeGroup/>} /> 
          <Route path="/HIVAffectedOutreach" element={<HIVAffectedOutreach/>} /> 

          <Route path="/EducationRuralUrbanTribalGroup" element={<EducationRuralUrbanTribalGroup/>} /> 
          <Route path="/AnnualRepEducationIndividual" element={<AnnualRepEducationIndividual/>} /> 
          <Route path="/AnnualRepHealthIndividual" element={<AnnualRepHealthIndividual/>} /> 
          <Route path="/AnnualSelfEmploymentReport" element={<AnnualSelfEmployment/>} /> 
          <Route path="/BiAnnualLivelihoodIndividualReport" element={<BiAnnualLivelihoodIndividual/>} /> 
          <Route path="/BiAnnualEducationIndividualReport" element={<BiAnnualEducationIndividualReport/>} /> 
          <Route path="/BiAnnualHealthIndividualReport" element={<BiAnnualHealthIndividualReport/>} /> 
          <Route path="/AnnualEducationInstitutionReport" element={<AnnualEducationInstitutionReport/>} />

          <Route path='/ReviewWHFC/:project' element={<ReviewWelfareHomeForChildren/>} />
          <Route path="/ReviewSI/:project" element={<ReviewSocialIndividual/>}/>
          <Route path='/ReviewEI/:project' element={<ReviewEI/>} />          
          <Route path='/ApproveEI' element={<ApproveEI/>} />          
          <Route path='/ViewEI' element={<ViewEI/>} />          
          <Route path='/ReviewNPDP/:project' element={<ReviewNPDP/>} />          
          <Route path='/ApproveNPDP' element={<ApproveNPDP/>} />          
          <Route path='/viewNPDP' element={<ViewNPDP/>} />
          <Route path='/ReviewEGS/:project' element={<ReviewEduRUTG/>} />
          <Route path='/ApproveEduRUTG' element={<ApproveEduRUTG/>} />
          <Route path='/ViewEduRUTG' element={<ViewEduRUTG/>} />
          <Route path='/ReviewDPLG/:project' element={<ReviewDPLG/>} />
          <Route path='/ApproveDPLG' element={<ApproveDPLG/>} />
          <Route path='/ReviewCG/:project' element={<ReviewCG/>} />
          <Route path='/ApproveCG' element={<ApproveCG/>} />
          <Route path='/ApproveEG' element={<ApproveEG/>} />
          <Route path='/ReviewEG/:project' element={<ReviewEG/>} />
          <Route path='/ReviewISG/:project' element={<ReviewISG/>} />
          <Route path='/ApproveISG' element={<ApproveISG/>} />
          <Route path='/ReviewHIV/:project' element={<ReviewHIV/>} />
          <Route path='/ApproveHIV' element={<ApproveHIV/>} />

          <Route path='/EditHIV' element={<EditHIV/>} />
          <Route path='/EditCG' element={<EditCG/>} />
          <Route path='/EditNPDP' element={<EditNPDP/>} />
          <Route path='/EditWHCG' element={<EditWHCG/>} />
          <Route path='/EditISG' element={<EditISG/>} />
          <Route path='/EditDPLG' element={<EditDPLG/>} />
          <Route path='/EditEGS' element={<EditEGS/>} />
          <Route path='/EditEG' element={<EditEG/>} />


          <Route path="/viewHOIProject/:project" element={<ViewProject/>} /> 
          <Route path='/ViewCG' element={<ViewCG/>} />
          <Route path='/ViewEGS' element={<ViewEduRUTG/>} />
          <Route path='/viewNPDP' element={<ViewNPDP/>} />
          <Route path='/ViewEI' element={<ViewEI/>} />          
          <Route path='/ViewEG' element={<ViewEG/>} />          
          <Route path='/ViewDPLG' element={<ViewDPLG/>} />          
          <Route path='/ViewHIV' element={<ViewHIV/>} />          
          <Route path='/ViewISG' element={<ViewISG/>} />          
          <Route path='/ViewWHCG' element={<ViewWHCG/>} />          
                  
       
                 

        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;



