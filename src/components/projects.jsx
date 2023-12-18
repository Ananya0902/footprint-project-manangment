
import React from 'react';
import PropTypes from 'prop-types';

const ApprovedProjectsPage = ({ approvedProjects }) => {
  return (
    <div className="approved-projects-page">
      <h1>All Approved Projects</h1>
      <ul className="approved-projects-list">
        {approvedProjects && approvedProjects.length > 0 ? (
          approvedProjects.map((project, index) => (
            <li key={index} className="project-item">
              <p>Project Title: {project.projectTitle}</p>
              <p>Project Description: {project.projectDescription}</p>
              <p>Approval Date: {project.approvalDate}</p>
            </li>
          ))
        ) : (
          <p>No approved projects available.</p>
        )}
      </ul>
    </div>
  );
};

ApprovedProjectsPage.propTypes = {
  approvedProjects: PropTypes.arrayOf(
    PropTypes.shape({
      projectTitle: PropTypes.string.isRequired,
      projectDescription: PropTypes.string.isRequired,
      approvalDate: PropTypes.string.isRequired,
    })
  ),
};

export default ApprovedProjectsPage;
