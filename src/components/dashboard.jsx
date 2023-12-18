// components/Dashboard.js
import React from 'react';
// import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar';
import '../styles/sidebar.scss';
import Dashcontent from '../components/dashcontent';
import '../styles/dashcontent.scss';

const items = ['My Profile', 'My Submissions', 'New Submission'];

const Dashboard = () => {
  return (
    <>
    <div className="container">
    <Sidebar items={items}/>
    {/* <div className='dash'>
      <h2>Dashboard</h2>
      <div className="box">
        <Link to="/user-details">User Details</Link>
      </div>
      <div className="box">Other Box 1</div>
      <div className="box">Other Box 2</div>
      <div className="box">Other Box 3</div>
    </div> */}
<Dashcontent />
    </div>
    
    </>
  );
};

export default Dashboard;
