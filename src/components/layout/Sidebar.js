// File: src/components/layout/Sidebar.jsx (UPDATED and FINALIZED)

import React, { useState } from 'react';
import { NavLink } from 'react-router-dom'; 
import { useTheme } from '../../core/hooks/useTheme'; 

const Sidebar = () => {
    const { themeClass } = useTheme();
    const [isTestBuilderOpen, setIsTestBuilderOpen] = useState(false);
    const [isReportsOpen, setIsReportsOpen] = useState(false); 

    const getThemeStyles = () => {
        // Theme variables applied via themeClass (e.g., Dynamic Glass)
        return { 
            backgroundColor: 'var(--color-sidebar-bg)', 
            color: 'var(--color-text-light)' 
        };
    };

    return (
        <div className={`sidebar-container ${themeClass}`} style={getThemeStyles()}>
            <div className="sidebar-header">
                {/*  */}
                <h3>Saphala Admin</h3>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/admin/dashboard" className="nav-item">Dashboard</NavLink>
                
                {/* 1. Test Builder Parent Menu */}
                <div className="nav-item has-submenu" onClick={() => setIsTestBuilderOpen(!isTestBuilderOpen)}>
                    Test Builder {isTestBuilderOpen ? '▲' : '▼'}
                </div>
                
                {isTestBuilderOpen && (
                    <div className="submenu">
                        <NavLink to="/admin/test-builder/series" className="submenu-item">Create Test Series</NavLink>
                        <NavLink to="/admin/test-builder/objective" className="submenu-item">Create Objective Test</NavLink>
                        <NavLink to="/admin/test-builder/subjective" className="submenu-item">Create Subjective Test</NavLink>
                    </div>
                )}

                {/* 2. Reports Parent Menu */}
                <div className="nav-item has-submenu" onClick={() => setIsReportsOpen(!isReportsOpen)}>
                    Reports {isReportsOpen ? '▲' : '▼'}
                </div>
                
                {isReportsOpen && (
                    <div className="submenu">
                        <NavLink to="/admin/reports/sales" className="submenu-item">Sales & Revenue</NavLink>
                        <NavLink to="/admin/reports/user-analytics" className="submenu-item">User Analytics</NavLink>
                        <NavLink to="/admin/reports/test-usage" className="submenu-item">Test Usage & Attempts</NavLink>
                    </div>
                )}
                
                {/* 3. Management Links (Requested) */}
                <NavLink to="/admin/users" className="nav-item">Users</NavLink>
                <NavLink to="/admin/coupons" className="nav-item">Coupons</NavLink>
                
                {/* Future: Course Management, Content Bank... */}

            </nav>
        </div>
    );
};

export default Sidebar;