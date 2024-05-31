// src/Navbar.jsx
import React, { useState } from 'react';

const Navbar = () => {
  const [active, setActive] = useState('');

  const handleNavClick = (section) => {
    setActive(section);
  };

  return (
    <nav className="bg-purple-800 p-4">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold text-lg">
          KANBAN BOARD
        </div>
        <ul className="flex space-x-4 text-white">
          <li 
            className={`cursor-pointer ${active === 'signin' ? 'font-bold' : ''}`} 
            onClick={() => handleNavClick('signin')}
          >
            Sign In
          </li>
          <li 
            className={`cursor-pointer ${active === 'pending' ? 'font-bold' : ''}`} 
            onClick={() => handleNavClick('pending')}
          >
            Pending
          </li>
          <li 
            className={`cursor-pointer ${active === 'inprogress' ? 'font-bold' : ''}`} 
            onClick={() => handleNavClick('inprogress')}
          >
            In Progress
          </li>
          <li 
            className={`cursor-pointer ${active === 'completed' ? 'font-bold' : ''}`} 
            onClick={() => handleNavClick('completed')}
          >
            Completed
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
