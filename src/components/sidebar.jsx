
import React, { useState } from 'react';


const Sidebar = ({ items }) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const handleToggleCollapse = () => {
    setCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <button className="toggle-button" onClick={handleToggleCollapse}>
        {isCollapsed ? '»' : '«'}
      </button>
      {!isCollapsed && (
        <ul>
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;

