
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';



const ReviewsListPage = ({ reviews }) => {
  const [selectedReview, setSelectedReview] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    
    setFilteredReviews(
      filterStatus === 'all'
        ? reviews || [] // Ensure reviews is defined or default to an empty array
        : (reviews || []).filter((review) => review.projectStatus === filterStatus)
    );
  }, [filterStatus, reviews]);

  const handleProjectTitleClick = (reviewId) => {
    // Toggle the selected review on click
    setSelectedReview((prevSelectedReview) =>
      prevSelectedReview === reviewId ? null : reviewId
    );
  };

  return (
    <div className="reviews-list-page">
      <h1>Reviews List</h1>
      <div className="filter-container">
        <button onClick={() => setFilterStatus('all')}>All</button>
        <button onClick={() => setFilterStatus('underApproval')}>Under Approval</button>
        <button onClick={() => setFilterStatus('approved')}>Approved</button>
      </div>
      <ul className="reviews-list">
        {filteredReviews.map((review) => (
          <li key={review.id} className="review-item">
            <div className="project-info">
              <p
                onClick={() => handleProjectTitleClick(review.id)}
                className="project-title"
              >
                Project Title: {review.projectTitle}
              </p>
              {selectedReview === review.id && (
                <div className="comments">
                  <p>Comments by Reviewer: {review.reviewerComments}</p>
                </div>
              )}
              <button type="submit">Approve</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReviewsListPage.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      projectTitle: PropTypes.string.isRequired,
      reviewerComments: PropTypes.string.isRequired,
      projectStatus: PropTypes.oneOf(['underApproval', 'approved']).isRequired,
    })
  ),
};

export default ReviewsListPage;

