// pages/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. IMPORT ALL COMPONENTS (Using YOUR Confirmed Paths)
// --- Layouts ---
import AdminLayout from './components/layout/AdminLayout.jsx'; 
import StudentLayout from './components/layout/StudentLayout.jsx'; 
import Sidebar from './components/layout/Sidebar.js'; // Ensure Sidebar is used in layouts

// --- Admin Features ---
import AdminLoginPage from './admin_login.html'; // Admin Login UI
import TestSeriesBuilder from './features/admin/TestBuilder/TestSeriesBuilder.jsx'; // CRITICAL: Confirmed to exist

// --- Student Features (Confirmed Paths) ---
import StudentLoginPage from './features/student/Login/StudentLoginPage.jsx';
import StudentDashboard from './features/student/Dashboard/StudentDashboard.jsx'; 


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* ======================================================= */}
        {/* PUBLIC ROUTES */}
        {/* ======================================================= */}
        
        {/* 1. Root Path: Student Login */}
        <Route path="/" element={<StudentLoginPage />} /> 

        {/* 2. Admin Login Path */}
        <Route path="/admin" element={<AdminLoginPage />} /> 


        {/* ======================================================= */}
        {/* PROTECTED ROUTES: STUDENT WORKFLOW */}
        {/* ======================================================= */}
        
        <Route path="/student" element={<StudentLayout />}>
            {/* Index: /student/ (Student Dashboard) */}
            <Route index element={<StudentDashboard />} /> 
            {/* Example: /student/testpanel */}
            <Route path="testpanel" element={<TestPanel />} /> 
        </Route>


        {/* ======================================================= */}
        {/* PROTECTED ROUTES: ADMIN WORKFLOW */}
        {/* ======================================================= */}
        
        <Route path="/admin" element={<AdminLayout />}>
            {/* Index: /admin/ (Admin Landing Page is now Test Builder) */}
            <Route index element={<TestSeriesBuilder />} /> 
            
            {/* Other Admin Routes - You'll build these later */}
            <Route path="reports" element={<ReportsPage />} />
        </Route>


        {/* ======================================================= */}
        {/* 404 CATCH-ALL */}
        {/* ======================================================= */}
        <Route path="*" element={<h1>404 | Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;