// src/features/admin/Login/AdminLoginPage.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// NOTE: This component replaces the static admin_login.html file
const AdminLoginPage = () => {
    const navigate = useNavigate();
    
    // Theme colors and styling should be imported/defined here or in a CSS module
    // For simplicity, we'll embed the core UI structure here.

    // This runs the logic when the component loads
    useEffect(() => {
        const handleLogin = (e) => {
            e.preventDefault();
            const email = document.getElementById('admin-email').value.trim().toLowerCase();
            const password = document.getElementById('admin-password').value;
            const ADMIN_EMAIL = 'admin@saphala.com';
            
            if (email === ADMIN_EMAIL && password === 'saphala123') { // Assuming static password check
                // SUCCESS PATH: Clean redirection to the Admin Dashboard (Test Builder)
                alert("SUCCESS! Authenticated as Admin. Redirecting to Test Builder...");
                navigate('/admin'); // This redirects to the index route of /admin, which is Test Builder

            } else {
                alert("Login Failed: Invalid credentials.");
            }
        };

        const form = document.getElementById('admin-login-form');
        if (form) {
            form.addEventListener('submit', handleLogin);
        }

        // Cleanup the event listener when the component is unmounted
        return () => {
            if (form) {
                form.removeEventListener('submit', handleLogin);
            }
        };
    }, [navigate]);

    return (
        // 1. **CRITICAL:** Paste the entire HTML content (<body> contents) here, 
        //    converting `class` to `className` and `for` to `htmlFor`.
        <div className="flex flex-col items-center justify-center min-h-screen" style={{backgroundColor: '#1A0033'}}>
            {/* Header, Login Card, etc. JSX derived from your HTML goes here */}
            
            {/* Example: Admin Login Card */}
            <div className="admin-login-card w-full max-w-sm">
                <form id="admin-login-form">
                    <h3 className="text-2xl font-bold mb-6 text-center">Admin Login</h3>
                    
                    <label htmlFor="admin-email" className="block text-sm font-medium mb-1">Admin Email</label>
                    <input id="admin-email" type="email" className="w-full p-3 mb-4 rounded border-2" placeholder="admin@saphala.com" />
                    
                    <label htmlFor="admin-password" className="block text-sm font-medium mb-1">Password</label>
                    <input id="admin-password" type="password" className="w-full p-3 mb-6 rounded border-2" placeholder="Enter password" />

                    <button type="submit" className="w-full p-3 rounded-xl font-bold btn-primary">
                        Secure Log In
                    </button>
                </form>
            </div>
            
            {/* Link back to student login */}
            <p><a href="/" style={{color: '#BBDEFB', marginTop: '10px', display: 'block'}}>← Go to Student Login</a></p>
        </div>
    );
};

export default AdminLoginPage;