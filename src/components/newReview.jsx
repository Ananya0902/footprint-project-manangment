
import React from 'react';
import '../styles/newSubmission.scss';

const project = {
  // Your project data...
  rojectTitle: "Land and water irrigation innovation",
    projectStatus: "submitted",
    comDate: "12-12-2023",
    inCharge: "someone",
    place: "somwehere",
    province: "north",
    subDate: "12-12-2023",
    goal: "to make lots and lots of money",
};

const ReviewForm = () => {
  return (
    <div className="project-form-container">
      <h1>Project Information</h1>

      {/* Project Information Section */}
      <div className="form-wrapper">
        <h2>Project Details</h2>
        <form>
          {/* Title of the project */}
          <div className="form-section">
            <label className="form-label">Title of the project:</label>
            <input type="text" className="form-input" value={project.projectTitle} required disabled />
          </div>

          {/* Month & year of commencement */}
          <div className="form-section">
            <label className="form-label">Month & year of commencement of the project:</label>
            <input type="date" className="form-input" value={project.comDate} required disabled />
          </div>

          {/* Name of person in charge */}
          <div className="form-section">
            <label className="form-label">Name of person in charge:</label>
            <input type="text" className="form-input" value={project.inCharge} required disabled />
          </div>

          {/* Place */}
          <div className="form-section">
            <label className="form-label">Place:</label>
            <input type="text" className="form-input" value={project.place} required disabled />
          </div>

          {/* Province */}
          <div className="form-section">
            <label className="form-label">Province:</label>
            <input type="text" className="form-input" value={project.province} required disabled />
          </div>

          {/* Date of submission of report */}
          <div className="form-section">
            <label className="form-label">Date of submission of report:</label>
            <input type="date" className="form-input" value={project.subDate} required disabled />
          </div>

          {/* Goal of the project */}
          <div className="form-section">
            <label className="form-label">Goal of the project:</label>
            <textarea rows="4" className="form-textarea" value={project.goal} required disabled />
          </div>

          {/* Activities and Intermediate Outcomes Section */}
          <hr />
          <h2>Activities and Intermediate Outcomes</h2>
          <div className="form-section">
            {/* Objective */}
            <div>
              <label className="form-label">Objective:</label>
              <input type="text" className="form-input" value="become a billionaire" disabled />
            </div>

            {/* Expected Outcome */}
            <div>
              <label className="form-label">Expected Outcome:</label>
              <textarea rows="4" className="form-textarea" value="Become a millionaire" disabled />
            </div>
          </div>

          {/* Tabular Input Area */}
          <hr />
          <h2>Tabular Input Area</h2>
          <div className="form-section">
            <table className="form-table">
              <thead>
                <tr className="table-header">
                  <th>Month</th>
                  <th>Summary of activities undertaken during the four months</th>
                  <th>Qualitative & Quantitative data & intermediate outcomes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="table-cell">
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
          <div className="form-section">
            <label className="form-label">Comment:</label>
            <textarea rows="4" className="form-textarea" required />
          </div>

          {/* Submit Button */}
          <div className="form-section">
            <button type="submit" className="form-button">
              Reviewed
            </button>
            <button type="submit" className="form-button">
              Send back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
