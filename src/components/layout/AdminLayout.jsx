// src/components/layout/AdminLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import your existing Sidebar component

const AdminLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar userType="admin" />
      <main style={{ flexGrow: 1, padding: '20px' }}>
        {/* The Outlet renders the nested route component (e.g., TestSeriesBuilder) */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;