import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header';
import Home from './components/home';
import Footer from './components/footer';
import Contact from './components/contact';
import Login from './components/login';
import Register from './components/register';
import Learn from './components/learn';
import Dashboard from './components/dashboard';
import ProfilePage from './components/profile';
import SubmissionListPage from './components/submissionlist';
import ReviewsListPage from './components/reviewlist';
import ApprovedProjectsPage from './components/projects';
import ProjectForm from './components/newSubmission';
import ReviewForm from './components/newReview';
import ApproveForm from './components/newApprove';
// import Spacer from './components/spacer';

import './styles/app.scss';
import './styles/header.scss';
import './styles/home.scss';
import './styles/footer.scss';
import './styles/contact.scss';
import './styles/login.scss';
// import './styles/register.scss';
import './styles/learn.scss';
import './styles/dashboard.scss';
import './styles/profile.scss';
import './styles/submissionlist.scss';
import './styles/reviewlist.scss';
import './styles/projects.scss';
import EmailVerificationPage from './components/EmailVerificationPage';

//import './styles/newSubmission.scss'



const reviews = [
  {
    id: "001",
    projectStatus: "approved",
    projectTitle: "Water farming",
    reviewerComments: "Good, well done",
  },
  {
    id: "002",
    projectStatus: "approved",
    projectTitle: "Land farming",
    reviewerComments: "Good, well done",
  },
  {
    id: "003",
    projectStatus: "approved",
    projectTitle: "Home farming",
    reviewerComments: "Good, well done",
  },
  {
    id: "004",
    projectStatus: "underApproval",
    projectTitle: "Land farming",
    reviewerComments: "Good, well done",
  }
];



const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/submissionlist" element={<SubmissionListPage submissions={reviews}/>} />
        <Route path="/reviewlist" element={<ReviewsListPage reviews={reviews}/>} />
        <Route path="/projects" element={<ApprovedProjectsPage/>} />
        <Route path="/newSubmission" element={<ProjectForm/>} />
        <Route path="/newReview" element={<ReviewForm/>} />
        <Route path="/newApprove" element={<ApproveForm/>} />
        <Route path="/EmailVerificationPage" element={<EmailVerificationPage/>} />
      </Routes>
      {/* <Spacer gap={100} /> */}
      <Footer />
    </Router>
  );
};

export default App;


