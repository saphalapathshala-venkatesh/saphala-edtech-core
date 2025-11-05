// src/App.jsx

import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import ONLY the components you have confirmed exist
import AdminLoginPage from './features/admin/AdminLoginPage.jsx';     
import AdminDashboard from './features/admin/AdminDashboard.jsx';
import FlashcardBuilder from './features/admin/FlashcardBuilder.jsx';
// Import your layout component if you use one
import DashboardLayout from './components/layout/DashboardLayout.jsx'; 

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Both root and /admin MUST go to the Admin Login page for now */}
        <Route path="/" element={<AdminLoginPage />} />
        <Route path="/admin" element={<AdminLoginPage />} /> 

        {/* WORKING ADMIN ROUTES (The only functional part of the app) */}
        <Route path="/admin" element={<DashboardLayout userType="admin" />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="flashcard-builder" element={<FlashcardBuilder />} /> // <-- YOUR PRIORITY
        </Route>

        {/* CATCH-ALL 404 */}
        <Route path="*" element={<div>404: Not Found</div>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;