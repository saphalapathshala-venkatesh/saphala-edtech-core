import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.js'; // Confirmed component exists

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F0F0F0' }}>
      {/* The Sidebar will show Admin Menu links (Test Builder, Reports, etc.) */}
      <Sidebar userType="admin" /> 
      <main style={{ flexGrow: 1, padding: '24px', backgroundColor: '#FFFFFF' }}>
        <h1 style={{color: '#4A148C', fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '20px'}}>
            Welcome, Admin. Content Creation Portal
        </h1>
        {/* Renders TestSeriesBuilder or other nested Admin components */}
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;