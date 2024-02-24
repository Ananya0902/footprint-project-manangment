// Import necessary libraries and components
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import AuthService from "./AuthService";
import Home from "./components/Auth/home";
import LoginPage from "./components/Auth/login";
import RegisterPage from "./components/Auth/register";
import HealthIndividualOngoing from "./components/HealthIndivualOngoing/healthIndividiualOngoing";
import EducationIndividualOngoing from "./components/EducationIndividualOngoing/educationIndividualOngoing";

import SocialIndividual from "./components/SocialIndividual/socialIndividual";
import EducationGroup from "./components/EducationGroup/educationGroup";
import Common from "./components/CommonGroup/common";
import DevProjectLivlihoodGroup from "./components/DPLG/devProjLivliGroup";
import InstitutionalSkillTrainingForm from "./components/InstiutionalSkillGroup/institutionalSkillGroup";
import MonthlyReportDevelopmentProject from "./components/Reports/MonthlyReportDevelopment";
import ProfilePageApplicant from "./components/Applicant/profileApplicant";
import ProfilePageReviewer from "./components/Reviewer/profileReviewer";
import ProfilePageApprover from "./components/Approver/profileApprover";
import RegisterApproverPage from "./components/Auth/registerApprover";
import DashboardApplicant from "./components/Applicant/dashboardApplicant";
import DashboardReviewer from "./components/Reviewer/dashboardReviewer";
import DashboardApprover from "./components/Approver/dashboardApprover";
import VerifyReviewer from "./components/Approver/verifyReviewer";
import VerifyApplicant from "./components/Reviewer/verifyApplicant";
import IndividualProjects from "./components/Applicant/individualProjects";
import GroupProjects from "./components/Applicant/groupProjects";
import MyProjects from "./components/Applicant/ApplicantMyProjects";
import ProjectsToBeReviewed from "./components/Reviewer/projectsToBeReviewed";
import MyReviewedProject from "./components/Reviewer/MyReviewedProject";
import ProjectsToBeApproved from "./components/Approver/ProjectsToBeApproved";
import ApprovedProjects from "./components/Approver/ApprovedProjects";
import ApprovedProjectsForReviewer from "./components/Reviewer/ApprovedProjectsForReviewer";
import QuaterlyReportDevelopment from "./components/Reports/QuaterlyReportDevelopment";
import ReviewHIO from "./components/HealthIndivualOngoing/ReviewHIO";
import ApproveHIO from "./components/HealthIndivualOngoing/ApproveHIO";
import ReviewEIO from "./components/EducationIndividualOngoing/ReviewEIO";
import ApproveEIO from "./components/EducationIndividualOngoing/ApproveEIO";
import ViewProject from "./components/HealthIndivualOngoing/viewHIOProject";
import NextPhaseForm from "./components/NextPhaseDevelopmentProposal/NextPhaseDevelopmentProject";
import WelfareHomeGroup from "./components/WelfareHealthForChildren/WelfareHomeGroup";
import EducationRuralUrbanTribalGroup from "./components/EducationRuralUrbanTribalGroup/EducationRuralUrbanTribalGroup";
import HIVAffectedOutreach from "./components/HIV/HIVAffectedOutreach";
import AnnualRepEducationIndividual from "./components/Reports/AnnualRepEducationIndividual";
import AnnualSelfEmployment from "./components/Reports/AnnualSelfEmploymentReport";
import BiAnnualLivelihoodIndividual from "./components/Reports/BiAnnualLivlihoodIndividualReport";
import BiAnnualEducationIndividualReport from "./components/Reports/BiAnnualEducationIndividualReport";
import BiAnnualHealthIndividualReport from "./components/Reports/BiAnnualHealthIndividualReport";
import AnnualEducationInstitutionReport from "./components/Reports/AnnualEducationInstitutionReport";
import ReviewEI from "./components/EducationIndividual/ReviewEI";
import ApproveEI from "./components/EducationIndividual/ApproveEI";
import ReviewNPDP from "./components/NextPhaseDevelopmentProposal/ReviewNPDP";
import ApproveNPDP from "./components/NextPhaseDevelopmentProposal/ApproveNPDP";
import ViewNPDP from "./components/NextPhaseDevelopmentProposal/viewNPDP";
import ReviewEduRUTG from "./components/EducationRuralUrbanTribalGroup/ReviewEduRUTG";
import ApproveEduRUTG from "./components/EducationRuralUrbanTribalGroup/ApproveEduRUTG";
import ViewEduRUTG from "./components/EducationRuralUrbanTribalGroup/ViewEduRUTG";
import ViewEI from "./components/EducationIndividual/ViewEI";
import ReviewDPLG from "./components/DPLG/ReviewDPLG";
import ApproveDPLG from "./components/DPLG/ApproveDPLG";
import ReviewWelfareHomeForChildren from "./components/WelfareHealthForChildren/RevieweWelfareHomeForChildren";
import ReviewCG from "./components/CommonGroup/ReviewCG";
import ApproveCG from "./components/CommonGroup/ApproveCG";
import ReviewEG from "./components/EducationGroup/ReviewEG";
import ApproveEG from "./components/EducationGroup/ApproveEG";
import ReviewISG from "./components/InstiutionalSkillGroup/ReviewISG";
import ApproveISG from "./components/InstiutionalSkillGroup/ApproveISG";
import ReviewHIV from "./components/HIV/ReviewHIV";
import ApproveHIV from "./components/HIV/ApproveHIV";
import EditHIV from "./components/HIV/editHIV";
import EditCG from "./components/CommonGroup/editCG";
import EditNPDP from "./components/NextPhaseDevelopmentProposal/editNPDP";
import EditWHCG from "./components/WelfareHealthForChildren/editWHCG";
import EditISG from "./components/InstiutionalSkillGroup/editISG";
import EditDPLG from "./components/DPLG/editDPLG";
import EditEGS from "./components/EducationRuralUrbanTribalGroup/editEGS";
import EditEG from "./components/EducationGroup/editEG";
import ViewCG from "./components/CommonGroup/ViewCG";
import ViewEG from "./components/EducationGroup/ViewEG";
import ViewDPLG from "./components/DPLG/ViewDPLG";
import ViewHIV from "./components/HIV/ViewHIV";
import ViewISG from "./components/InstiutionalSkillGroup/ViewISG";
import ViewWHFC from "./components/WelfareHealthForChildren/ViewWHFC";
import ReviewSocialIndividual from "./components/SocialIndividual/ReviewSocialIndividual";
import ApproveSocialIndividual from "./components/SocialIndividual/ApproveSocialIndividual";
import ApproveWelfareHomeForChildren from "./components/WelfareHealthForChildren/ApproveWelfareHealthForChildren";
import AnnualRepHealthIndividual from "./components/Reports/AnnualRepHealthIndividual";
import RevertedProjects from "./components/Applicant/RevertedProjects";
import ViewSI from "./components/SocialIndividual/viewSI";
import ViewEIO from "./components/EducationIndividualOngoing/ViewEIO";
import EditEducationIndividual from "./components/EducationIndividual/EditEducationIndividual";
import EducationIndividual from "./components/EducationIndividual/educationIndividual";
import AllApplicantsReviewer from "./components/Reviewer/AllApplicantsReviewer";
// const PrivateRoute = ({ path, element }) => {
//   return AuthService.isAuthenticated() ? element : <Navigate to="/login" />;
// };

// App component\
import EmailOtp from "./components/Auth/EmailOtp";
import ForgetPassword from "./components/Auth/ForgetPassword";
import EditSocialIndividual from "./components/SocialIndividual/editSocialIndividual";

// Token checking in protected
// Token expiry - 1 hour
// Login - Timer - 1 ghante - logout
// Local Storage uda diya , reload , UseEffect , LocalStorage Token

// Navbar to be displayed when you are viewing forms , editing forms or creating forms
// Home = Dashboard , Profile

// If approver , reviewer , applicant
// Home Route ,
// Profile Route

const App = () => {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          {/** Category 1 : Unprotected Routes  */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/emailotp" element={<EmailOtp></EmailOtp>}></Route>
          <Route
            path="/forgetpassword"
            element={<ForgetPassword></ForgetPassword>}
          ></Route>
          <Route path="/registerApprover" element={<RegisterApproverPage />}>
            {" "}
          </Route>

          {/** This first section is only accessible to the applciant */}

          {/**Submit forms */}
          <Route path="/common" element={<Common />} />
          <Route
            path="/healthIndividualOngoing"
            element={<HealthIndividualOngoing />}
          />

          <Route
            path="/educationIndividualOngoing"
            element={<EducationIndividualOngoing />}
          />
          <Route
            path="/educationIndividual"
            element={<EducationIndividual />}
          />

          <Route path="/socialIndividual" element={<SocialIndividual />} />
          <Route path="/educationGroup" element={<EducationGroup />} />
          <Route path="/common" element={<Common />} />
          <Route
            path="/devProjLivliGroup"
            element={<DevProjectLivlihoodGroup />}
          />
          <Route
            path="/institutionalSkillGroup"
            element={<InstitutionalSkillTrainingForm />}
          />

          <Route
            path="/nextPhaseDevelopmentProject"
            element={<NextPhaseForm />}
          />

          <Route path="/WelfareHomeGroup" element={<WelfareHomeGroup />} />
          <Route
            path="/HIVAffectedOutreach"
            element={<HIVAffectedOutreach />}
          />

          <Route
            path="/EducationRuralUrbanTribalGroup"
            element={<EducationRuralUrbanTribalGroup />}
          />

          {/**View Forms */}
          {/**Edit Forms */}

          {/**Important - Dashboard of the applicant and related links*/}
          <Route path="/dashboardApplicant" element={<DashboardApplicant />} />

          <Route path="/revertedProjects" element={<RevertedProjects />} />
          <Route
            path="/profileApplicant/:userDetails"
            element={<ProfilePageApplicant />}
          />
          <Route
            path="/individualProjects/:selectedAppostolate"
            element={<IndividualProjects />}
          />
          <Route
            path="/groupProjects/:selectedAppostolate"
            element={<GroupProjects />}
          />
          <Route path="/myProjects" element={<MyProjects />} />

          {/**This second section is only accessible to reviewer */}
          <Route path="/profileReviewer" element={<ProfilePageReviewer />} />
          <Route
            path="/profileApprover/:profile"
            element={<ProfilePageApprover />}
          />
          <Route path="/dashboardReviewer" element={<DashboardReviewer />} />
          <Route path="/dashboardApprover" element={<DashboardApprover />} />
          <Route path="/verifyReviewer" element={<VerifyReviewer />} />
          <Route path="/verifyApplicant" element={<VerifyApplicant />} />

          <Route
            path="/projectsToBeReviewed"
            element={<ProjectsToBeReviewed />}
          />
          <Route
            path="/ProjectsToBeApproved/:profile"
            element={<ProjectsToBeApproved />}
          />
          <Route path="/MyReviewedProject" element={<MyReviewedProject />} />
          <Route path="/ApprovedProjects" element={<ApprovedProjects />} />
          <Route
            path="/ApprovedProjectsForReviewer"
            element={<ApprovedProjectsForReviewer reviewerProvince="north" />}
          />

          <Route path="/ReviewHOI/:project" element={<ReviewHIO />} />
          <Route path="/ReviewEOI/:project" element={<ReviewEIO />} />
          <Route
            path="/ApproveSI/:project"
            element={<ApproveSocialIndividual />}
          />
          <Route path="/ApproveHOI/:project" element={<ApproveHIO />} />
          <Route path="/ApproveEOI/:project" element={<ApproveEIO />} />
          {/* <Route path="/ApproveSIO" element={<ApproveSIO />} /> */}
          <Route
            path="/ReviewWHFC/:project"
            element={<ReviewWelfareHomeForChildren />}
          />
          <Route path="/ViewWHFC/:project" element={<ViewWHFC />} />
          <Route
            path="/ReviewSI/:project"
            element={<ReviewSocialIndividual />}
          />
          <Route path="/ReviewEI/:project" element={<ReviewEI />} />
          <Route path="/ApproveEI/:project" element={<ApproveEI />} />
          <Route
            path="/ApproveWHFC/:project"
            element={<ApproveWelfareHomeForChildren />}
          />
          <Route path="/ViewEI" element={<ViewEI />} />
          <Route path="/ReviewNPDP/:project" element={<ReviewNPDP />} />
          <Route path="/ApproveNPDP/:project" element={<ApproveNPDP />} />
          <Route path="/viewNPDP" element={<ViewNPDP />} />
          <Route path="/ReviewEGS/:project" element={<ReviewEduRUTG />} />
          <Route path="/ApproveEGS/:project" element={<ApproveEduRUTG />} />
          <Route path="/ViewEduRUTG" element={<ViewEduRUTG />} />
          <Route path="/ReviewDPLG/:project" element={<ReviewDPLG />} />
          <Route path="/ApproveDPLG/:project" element={<ApproveDPLG />} />
          <Route path="/ReviewCG/:project" element={<ReviewCG />} />
          <Route path="/ApproveCG/:project" element={<ApproveCG />} />
          <Route path="/ApproveEG/:project" element={<ApproveEG />} />
          <Route path="/ReviewEG/:project" element={<ReviewEG />} />
          <Route path="/ReviewISG/:project" element={<ReviewISG />} />
          <Route path="/ApproveISG/:project" element={<ApproveISG />} />
          <Route path="/ReviewHIV/:project" element={<ReviewHIV />} />
          <Route path="/ApproveHIV/:project" element={<ApproveHIV />} />

          <Route path="/EditHIV/:project" element={<EditHIV />} />
          <Route path="/EditCG/:project" element={<EditCG />} />
          <Route path="/EditNPDP" element={<EditNPDP />} />
          <Route path="/EditWHCG" element={<EditWHCG />} />
          <Route path="/EditISG" element={<EditISG />} />
          <Route path="/EditDPLG" element={<EditDPLG />} />
          <Route path="/EditEGS/:project" element={<EditEGS />} />
          <Route path="/EditSI/:project" element={<EditSocialIndividual />} />
          <Route
            path="/EditEI/:project"
            element={<EditEducationIndividual />}
          />

          <Route path="/EditEG" element={<EditEG />} />

          <Route path="ViewEOI/:project" element={<ViewEIO />} />
          <Route path="/ViewHOI/:project" element={<ViewProject />} />
          <Route path="/ViewCG/:project" element={<ViewCG />} />
          <Route path="/ViewEGS/:project" element={<ViewEduRUTG />} />
          <Route path="/viewNPDP/:project" element={<ViewNPDP />} />
          <Route path="/ViewEI/:project" element={<ViewEI />} />
          <Route path="/ViewEG" element={<ViewEG />} />
          <Route path="/ViewDPLG/:project" element={<ViewDPLG />} />
          <Route path="/ViewHIV/:project" element={<ViewHIV />} />
          <Route path="/ViewSG/:project" element={<ViewISG />} />
          <Route path="/ViewWHFC/:project" element={<ViewWHFC />} />
          <Route path="/ViewSI/:project" element={<ViewSI />} />

          {/**Report routes */}
          <Route
            path="/MonthlyReportDevelopment"
            element={<MonthlyReportDevelopmentProject />}
          />
          <Route
            path="/QuaterlyReportDevelopment"
            element={<QuaterlyReportDevelopment />}
          />
          <Route
            path="/AnnualRepEducationIndividual"
            element={<AnnualRepEducationIndividual />}
          />
          <Route
            path="/AnnualRepHealthIndividual"
            element={<AnnualRepHealthIndividual />}
          />
          <Route
            path="/AnnualSelfEmploymentReport"
            element={<AnnualSelfEmployment />}
          />
          <Route
            path="/BiAnnualLivelihoodIndividualReport"
            element={<BiAnnualLivelihoodIndividual />}
          />
          <Route
            path="/allApplicantsReviewer"
            element={<AllApplicantsReviewer />}
          />
          <Route
            path="/BiAnnualEducationIndividualReport"
            element={<BiAnnualEducationIndividualReport />}
          />
          <Route
            path="/BiAnnualHealthIndividualReport"
            element={<BiAnnualHealthIndividualReport />}
          />
          <Route
            path="/AnnualEducationInstitutionReport"
            element={<AnnualEducationInstitutionReport />}
          />
        </Routes>
      </Router>
    </ChakraProvider>
  );
};

export default App;
