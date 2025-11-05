import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.js'; // Confirmed component exists

const StudentLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F8FF' }}>
      <Sidebar userType="student" /> 
      <main style={{ flexGrow: 1, padding: '24px', backgroundColor: '#FFFFFF' }}>
        {/* Renders StudentDashboard or other nested Student components */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default StudentLayout;