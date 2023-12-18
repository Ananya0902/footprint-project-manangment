
import React, { useState } from 'react';
import PropTypes from 'prop-types';



//dummy variables and functions which are to implemented through the backend
const userType = "reviewer";
const buttonVal = (userType === "reviewer") ? "Review" : "Edit";

const onButtonPress = () => {
  if(userType === "reviewer")
    ;// onReviewProject({/* clicked project id passed as argument to review page*/})
  else
    ;
    // onEditProject({/* clicked project id passed as argument to edit page */})
}

const SubmissionListPage = ({ submissions, onEditProject }) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const handleFilterClick = (status) => {
    setFilterStatus(status);
  };

  // Check if submissions is defined before filtering
  const filteredSubmissions = submissions
    ? (filterStatus === 'all'
      ? submissions
      : submissions.filter((submission) => submission.projectStatus === filterStatus))
    : [];

  return (
    <div className="submission-list-page">
      <h1>Submission List</h1>
      <div className="filter-container">
        <button onClick={() => handleFilterClick('all')}>All</button>
        <button onClick={() => handleFilterClick('underReview')}>Under Review</button>
        <button onClick={() => handleFilterClick('reviewed')}>Reviewed</button>
        <button onClick={() => handleFilterClick('underApproval')}>Under Approval</button>
        <button onClick={() => handleFilterClick('approved')}>Approved</button>
      </div>
      <ul className="submission-list">
        {filteredSubmissions.map((submission, index) => (
          <li key={index} className="submission-item">
            <div className="project-info">
              <p>Project Title: {submission.projectTitle}</p>
              <p>Project Status: {submission.projectStatus}</p>
            </div>
            <button onClick={() => onButtonPress(submission.id)}>{buttonVal}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

SubmissionListPage.propTypes = {
  submissions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      projectTitle: PropTypes.string.isRequired,
      projectStatus: PropTypes.string.isRequired,
    })
  ),
  onEditProject: PropTypes.func.isRequired,
};

export default SubmissionListPage;

