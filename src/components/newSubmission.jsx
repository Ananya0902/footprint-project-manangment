import React from 'react';
import '../styles/newSubmission.scss';

const handleNewSubmission = () => {
  // logic to send the data through the post route to the server 
  // and store in the database
  // backend function implemented accordingly
}

const ProjectForm = () => {
  return (
    <div className="project-form-container">
      <h1>Project Information</h1>

      {/* Project Information Section */}
      <div className="form-wrapper">
        <h2>Project Details</h2>
        <form>
          <div className="form-section">
            <label className="form-label">Title of the project:</label>
            <input type="text" className="form-input" required />
          </div>

          <div className="form-section">
            <label className="form-label">Month & year of commencement of the project:</label>
            <input type="date" className="form-input" required />
          </div>

          <div className="form-section">
            <label className="form-label">Name of person in charge:</label>
            <input type="text" className="form-input" required />
          </div>

          <div className="form-section">
            <label className="form-label">Place:</label>
            <input type="text" className="form-input" required />
          </div>

          <div className="form-section">
            <label className="form-label">Province:</label>
            <input type="text" className="form-input" required />
          </div>

          <div className="form-section">
            <label className="form-label">Date of submission of report:</label>
            <input type="date" className="form-input" required />
          </div>

          <div className="form-section">
            <label className="form-label">Goal of the project:</label>
            <textarea rows="4" className="form-textarea" required />
          </div>

          {/* Activities and Intermediate Outcomes Section */}
          <hr />
          <h2>Activities and Intermediate Outcomes</h2>
          <div className="form-section">
            {/* Objective */}
            <div>
              <label className="form-label">Objective:</label>
              <input type="text" className="form-input" />
            </div>

            {/* Expected Outcome */}
            <div>
              <label className="form-label">Expected Outcome:</label>
              <textarea rows="4" className="form-textarea" />
            </div>
          </div>

          {/* Tabular Input Area */}
          <hr />
          <h2>Tabular Input Area</h2>
          <div className="form-section">
            <div className="tab">
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
                {/* Add more rows as needed */}
              </tbody>
            </table>
            <hr />
            <table className="form-table">
              <thead>
                <tr className="table-header">
                  <th>What did not happen?</th>
                  <th>Explain why some activities could not be undertaken.</th>
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
                
                </tr>
                <tr className="table-cell">
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  
                </tr>
                <tr className="table-cell">
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  
                </tr>
                <tr className="table-cell">
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
            <table className="form-table">
              <thead>
                <tr className="table-header">
                  <th>Have you made any changes in the project such as new activities or modified the activities contextually?</th>
                  <th>Explain why the changes were needed.</th>
                  
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
                  
                </tr>
                <tr className="table-cell">
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  
                </tr>
                <tr className="table-cell">
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                 
                </tr>
                <tr className="table-cell">
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
            <table className="form-table">
              <thead>
                <tr className="table-header">
                  <th>What are the lessons learnt?</th>
                  <th>What will be done differently bc of the learnings?</th>
                  
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
                  
                </tr>
                <tr className="table-cell">
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  
                </tr>
                <tr className="table-cell">
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                 
                </tr>
                <tr className="table-cell">
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
            <hr />
            <h2>Outlook</h2>
            <table className="form-table">
              <thead>
                <tr className="table-header">
                  <th>Date</th>
                  <th>Plan for next month</th>
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
                
                </tr>
                <tr className="table-cell">
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  
                </tr>
                <tr className="table-cell">
                  <td>
                    <input type="text" />
                  </td>
                  <td>
                    <input type="text" />
                  </td>
                  
                </tr>
                <tr className="table-cell">
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
          </div>

          {/* Submit Button */}
          <div className="form-section">
            <button type="submit" className="form-button" onClick={handleNewSubmission}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;

