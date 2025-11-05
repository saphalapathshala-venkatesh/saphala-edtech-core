import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// --- Layouts and Wrappers (NEWLY CREATED) ---
import AdminLayout from '../components/layout/AdminLayout.jsx'; 
import StudentLayout from '../components/layout/StudentLayout.jsx'; 
import AdminLoginWrapper from '../features/admin/Login/AdminLoginWrapper.jsx';

// --- Admin Features (CONFIRMED) ---
import TestSeriesBuilder from '../features/admin/TestBuilder/TestSeriesBuilder.jsx'; 

// --- Student Features (CONFIRMED TO EXIST LOCALLY) ---
import StudentLoginPage from '../features/student/Login/StudentLoginPage.jsx';
import StudentDashboard from '../features/student/Dashboard/StudentDashboard.jsx'; 
import PostTestReport from '../features/student/TestPanel/PostTestReport.jsx';
import TestPanel from '../features/student/TestPanel/TestPanel.jsx';

// Placeholder for other admin routes
const ReportsPage = () => <h1>Admin Reports Coming Soon</h1>;


function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        {/* ======================================================= */}
        {/* PUBLIC ROUTES: LOGIN PAGES */}
        {/* ======================================================= */}
        
        {/* Root Path: Student Login (Default Landing Page) */}
        <Route path="/" element={<StudentLoginPage />} /> 

        {/* Dedicated Admin Login Path (Must load the Login Wrapper) */}
        <Route path="/admin-login" element={<AdminLoginWrapper />} /> 
        

        {/* ======================================================= */}
        {/* PROTECTED ROUTES: STUDENT WORKFLOW */}
        {/* ======================================================= */}
        
        <Route path="/student" element={<StudentLayout />}>
            {/* Index: /student/ (Student Dashboard) */}
            <Route index element={<StudentDashboard />} /> 
            
            {/* Nested Routes for Tests */}
            <Route path="test-panel/:id" element={<TestPanel />} /> 
            <Route path="report/:id" element={<PostTestReport />} />
        </Route>


        {/* ======================================================= */}
        {/* PROTECTED ROUTES: ADMIN WORKFLOW (CLEAN LANDING) */}
        {/* ======================================================= */}
        
        <Route path="/admin" element={<AdminLayout />}>
            {/* CRITICAL FIX: Admin root loads the Test Builder immediately */}
            <Route index element={<TestSeriesBuilder />} /> 
            
            {/* Other Admin Routes */}
            <Route path="reports" element={<ReportsPage />} />
        </Route>


        {/* ======================================================= */}
        {/* 404 CATCH-ALL (Must be the last route) */}
        {/* ======================================================= */}
        <Route path="*" element={<h1>404 | Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;