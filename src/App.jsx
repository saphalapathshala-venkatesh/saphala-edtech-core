// File: src/App.jsx (MINIMAL WORKING VERSION to fix 500 Error)

import React, { useState, createContext, useContext } from 'react';
// We must use HashRouter instead of BrowserRouter to avoid server path issues on initial setup
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

// --- MOCK THEME & CONTEXT ---
const THEMES = {
    'light-modern': { primary: '#4A148C', bg: '#F5F5F5', text: '#333333' },
    'dynamic-glass-dark': { primary: '#6A1B9A', bg: '#1A0033', text: '#E0F7FA' },
};
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
    const [themeId, setThemeId] = useState('light-modern'); 
    const theme = THEMES[themeId];
    const themeClass = themeId; 
    
    // Function to toggle between our two mock themes
    const toggleTheme = () => {
        setThemeId(prev => prev === 'light-modern' ? 'dynamic-glass-dark' : 'light-modern');
    };

    return (
        <ThemeContext.Provider value={{ theme, themeId, setThemeId, themeClass, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
const useTheme = () => useContext(ThemeContext);


// --- MOCK COMPONENT: LOGIN (The actual working UI) ---
const Login = () => {
    const { theme, themeClass, toggleTheme } = useTheme();
    
    return (
        <div 
            className={`login-page ${themeClass}`} 
            style={{ 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                backgroundColor: theme.bg,
                color: theme.text
            }}
        >
            <div 
                style={{
                    padding: '40px', 
                    borderRadius: '15px', 
                    backgroundColor: themeClass.includes('dark') ? '#2C0059' : '#FFFFFF', 
                    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
                    color: theme.text
                }}
            >
                <h2>Saphala PrepEdge Login</h2>
                <p>Status: Initial Setup Successful!</p>
                <p>Current Theme: {themeClass}</p>
                
                <div style={{marginTop: '20px'}}>
                    <input type="text" placeholder="Username" style={{display: 'block', padding: '8px', marginBottom: '10px'}} />
                    <input type="password" placeholder="Password" style={{display: 'block', padding: '8px', marginBottom: '20px'}} />
                    
                    <button style={{backgroundColor: theme.primary, color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer'}} 
                        onClick={() => console.log('Login Initiated')}
                    >
                        Log In
                    </button>

                    <button 
                        onClick={toggleTheme} 
                        style={{marginLeft: '10px', padding: '10px 15px', background: theme.text, color: theme.bg, border: 'none', borderRadius: '5px', cursor: 'pointer'}} 
                    >
                        Toggle Theme
                    </button>
                    
                    <p style={{marginTop: '15px', color: theme.text}}>
                        <Link to="/admin/dashboard" style={{color: theme.primary}}>Go to Admin Demo</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

// --- MOCK PROTECTED PAGE ---
const ProtectedPage = ({ title }) => {
    const { theme } = useTheme();
    return (
        <div style={{ padding: '20px', backgroundColor: theme.bg, color: theme.text, minHeight: '100vh' }}>
            <h1>{title}</h1>
            <p>This is a protected route. Routing is verified.</p>
            <Link to="/">← Back to Login</Link>
        </div>
    );
};


// --- 3. MAIN APPLICATION COMPONENT & ROUTES ---
const App = () => (
    <ThemeProvider>
        <Router>
            <Routes>
                {/* ONBOARDING ROUTES */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                
                {/* ADMIN ROUTES */}
                <Route path="/admin/dashboard" element={<ProtectedPage title="Admin Dashboard" />} />
                <Route path="/admin/users" element={<ProtectedPage title="Admin User Management" />} />

                {/* STUDENT ROUTES */}
                <Route path="/student/dashboard" element={<ProtectedPage title="Student Dashboard" />} />
                
                {/* FALLBACK ROUTE */}
                <Route path="*" element={<ProtectedPage title="404 - Page Not Found" />} />
            </Routes>
        </Router>
    </ThemeProvider>
);

export default App;