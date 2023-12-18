
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';


const MyProfilePage = () => {
  const inputRef = useRef(null); // Declare inputRef

  // Initialize state unconditionally
  const [editing, setEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleSaveClick = () => {
    // Validate and save the edited user details
    // For simplicity, let's assume validation is successful
    setEditing(false);
  };

  const handleCancelClick = () => {
    setEditing(false);
    setEditedUser({}); // Reset editedUser to an empty object
  };

  const handlePasswordEditClick = () => {
    // Implement logic for editing password
    // For simplicity, let's assume it opens a modal for password change
    alert('Implement logic for editing password');
  };

  const handlePasswordChange = () => {
    // Implement logic for changing the password
    // For simplicity, let's assume validation is successful
    setPasswordError('');
    alert('Password changed successfully');
  };

  const handlePhotoChange = (e) => {
    const selectedFile = e.target.files[0];
    // Handle the selected file as needed, such as uploading it to a server or updating the state
    console.log('Selected file:', selectedFile);
  };

  // Dummy profile data
  const dummyProfile = {
    profilePhoto: '..assets/back.jpg',
    name: 'xyz',
    email: 'xyz@example.com',
    province: 'Sample Province',
  };

  return (
    <div className="my-profile-page">
      <h1>My Profile</h1>
      <div className="profile-details">
        <div className="profile-photo" onClick={() => inputRef.current.click()}>
          <label htmlFor="fileInput">Click to Change Photo</label>
          <img src={editedUser.profilePhoto || dummyProfile.profilePhoto} alt="Profile" />
          <input
            type="file"
            id="fileInput"
            ref={inputRef} // Attach inputRef to the file input
            style={{ display: 'none' }}
            onChange={handlePhotoChange}
          />
        </div>

        <div className="user-details">
          <div className="detail">
            <label>Name:</label>
            {editing ? (
              <input
                type="text"
                value={editedUser.name || dummyProfile.name}
                onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
              />
            ) : (
              <p>{editedUser.name || dummyProfile.name}</p>
            )}
            {editing && (
              <button onClick={handleSaveClick}>Save</button>
            )}
          </div>
          <div className="detail">
            <label>Email:</label>
            <p>{editedUser.email || dummyProfile.email}</p>
          </div>
          <div className="detail">
            <label>Province:</label>
            {editing ? (
              <input
                type="text"
                value={editedUser.province || dummyProfile.province}
                onChange={(e) => setEditedUser({ ...editedUser, province: e.target.value })}
              />
            ) : (
              <p>{editedUser.province || dummyProfile.province}</p>
            )}
            {editing && (
              <button onClick={handleSaveClick}>Save</button>
            )}
          </div>
          {!editing && (
            <button onClick={handlePasswordEditClick}>Change Password</button>
          )}
        </div>
      </div>

      {editing && (
        <div className="password-edit">
          <label>Current Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handlePasswordChange}>Change Password</button>
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>
      )}
    </div>
  );
};

MyProfilePage.propTypes = {
  user: PropTypes.shape({
    profilePhoto: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
  }),
};

export default MyProfilePage;







