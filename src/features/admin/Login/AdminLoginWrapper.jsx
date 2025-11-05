import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Note: You must integrate the JSX content from your admin_login.html here.
// For now, this is a placeholder containing the essential login logic.
const AdminLoginWrapper = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const form = document.getElementById('admin-login-form');
        
        const handleLogin = (e) => {
            e.preventDefault();
            // Simulating successful auth, which should happen through Firebase in the real app
            // In a complete app, successful login sets the user role and token.
            
            alert("SUCCESS! Authenticated. Redirecting to Admin Dashboard...");
            // CRITICAL FIX: Redirect to the Admin root path (which loads Test Builder)
            navigate('/admin', { replace: true }); 
        };

        if (form) {
            form.addEventListener('submit', handleLogin);
        }

        return () => {
            if (form) {
                form.removeEventListener('submit', handleLogin);
            }
        };
    }, [navigate]);

    return (
        <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#1A0033', minHeight: '100vh' }}>
            {/* The actual JSX/HTML for the Admin Login form goes here */}
            <h1 style={{color: '#BBDEFB'}}>Saphala PrepEdge Admin Login</h1>
            <p style={{color: '#E0F7FA'}}>Please replace this placeholder with the JSX content from your admin_login.html file.</p>
            <form id="admin-login-form" style={{marginTop: '20px'}}>
                <input id="admin-email" type="email" placeholder="Email" style={{display: 'block', margin: '10px auto', padding: '10px'}} />
                <input id="admin-password" type="password" placeholder="Password" style={{display: 'block', margin: '10px auto', padding: '10px'}} />
                <button type="submit" style={{padding: '10px 30px', backgroundColor: '#6A1B9A', color: 'white', borderRadius: '5px'}}>Secure Log In</button>
            </form>
        </div>
    );
};

export default AdminLoginWrapper;