

import React from 'react';
import '../styles/newapprove.scss';

const ApproveForm = () => {
  return (
    <div className="new-approve-form-container">
      <h1>Project Budget Form</h1>

      {/* Project Information Section */}
      <div className="new-approve-form-section">
        <h2>Project Details</h2>
        <form>
          <div>
            <label>Title of the project:</label>
            <input type="text" required />
          </div>
          <div>
            <label>Amount Sanctioned (in Rupees):</label>
            <input type="number" required />
          </div>
          <div>
            <label>Duration:</label>
            <input type="text" required />
          </div>
          <div>
            <label>Sanctioned date:</label>
            <input type="date" required />
          </div>

          {/* Tabular Input Area */}
          <hr />
          <h2>Budget and Expenditure Details</h2>
          <div>
            <table className="new-approve-table">
              <thead>
                <tr>
                  <th colSpan="2">BUDGET APPROVED AS PER THE PROJECT PROPOSAL</th>
                  <th colSpan="3">EXPENDITURE DETAILS</th>
                </tr>
                <tr>
                  <th>Particulars of budget heads</th>
                  <th>Amount approved</th>
                  <th>Expenditure details upto last month</th>
                  <th>Expenditure details of this month</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {[...Array(12)].map((_, index) => (
                  <tr key={index}>
                    <td><input type="text" /></td>
                    <td><input type="number" /></td>
                    <td><input type="number" /></td>
                    <td><input type="number" /></td>
                    <td><input type="number" /></td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2">Total Amount</td>
                  <td colSpan="3"><input type="number" /></td>
                </tr>
                <tr>
                  <td colSpan="2">Closing Balance</td>
                  <td colSpan="3"><input type="number" /></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="form-section">
            <label className="form-label">Comment:</label>
            <textarea rows="4" className="form-textarea" required />
          </div>
          {/* Submit Button */}
          <div>
            <button type="submit">Approved</button>
            <button type="submit">Send back to reviewer</button>
            <button type="submit">Send back to applicant</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApproveForm;
