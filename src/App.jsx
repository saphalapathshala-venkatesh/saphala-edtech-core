// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. IMPORT ALL YOUR COMPONENTS (Check these names carefully!)
import { Layout } from './components/layout/Sidebar'; // Assuming this holds your overall structure
import StudentLoginPage from './features/student/StudentLoginPage.jsx'; // Your student login component
import AdminLoginPage from './features/admin/AdminLoginPage.jsx';     // *** THIS IS THE CRITICAL COMPONENT ***
import StudentDashboard from './features/student/StudentDashboard.jsx';
import AdminDashboard from './features/admin/AdminDashboard.jsx';
// Import other student/admin feature pages (e.g., TestPanel, FlashcardBuilder)

// 2. Auth Wrapper (A necessary component to protect routes - assuming you have one)
// If you don't have a ProtectedRoute/AuthGuard component, you can skip this import for now.
// import ProtectedRoute from './components/auth/ProtectedRoute.jsx'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ======================================================= */}
        {/* PUBLIC ROUTES (Login Pages) */}
        {/* ======================================================= */}

        {/* The main URL loads the Student Login Page */}
        <Route path="/" element={<StudentLoginPage />} />

        {/* *** PERMANENT FIX FOR ADMIN ROUTE *** */}
        {/* The /admin path MUST load the AdminLoginPage component */}
        <Route path="/admin" element={<AdminLoginPage />} />


        {/* ======================================================= */}
        {/* PROTECTED ROUTES (Requires Login/Role Check) */}
        {/* ======================================================= */}

        {/* // If you have a ProtectedRoute wrapper, it would look like this:
          <Route element={<ProtectedRoute requiredRole="student" />}>
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/test-panel" element={<TestPanel />} />
            // ... other student routes
          </Route>
        */}
        
        {/* Example Protected Student Route (using a generic Layout for structure) */}
        <Route path="/student" element={<Layout type="student" />}>
            <Route index element={<StudentDashboard />} />
            <Route path="revise-plus" element={<FlashcardPanel />} />
            <Route path="tests/:id" element={<TestPanel />} />
        </Route>


        {/* Example Protected Admin Route */}
        <Route path="/admin" element={<Layout type="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="flashcard-builder" element={<FlashcardBuilder />} /> // <-- Need this for content!
            <Route path="users" element={<UserManagementPage />} />
        </Route>

        {/* ======================================================= */}
        {/* CATCH-ALL FOR 404 (Optional but recommended) */}
        {/* ======================================================= */}
        <Route path="*" element={<h1>404: Page Not Found</h1>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;