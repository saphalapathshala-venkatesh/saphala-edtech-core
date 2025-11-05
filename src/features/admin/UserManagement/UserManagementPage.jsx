// File: src/features/admin/UserManagement/UserManagementPage.jsx (UPDATED and FINALIZED)

import React, { useState } from 'react';
import { Button, InputGroup, Select, Table, Modal } from '../../../components/common';
import { useTheme } from '../../../core/hooks/useTheme'; 

// --- Mock Data simulating DB structure with Session/Device Info ---
const mockUsers = [
    { 
        id: 1, name: 'Ravi Teja', email: 'ravi@example.com', status: 'Trial User', enrollment: 'UPSC', 
        totalPaid: 0, courses: [{name: 'UPSC Foundation', paid: 0}], 
        webDeviceId: 'chrome-desktop-a8b3', mobileDeviceId: 'android-samsung-k9l1', 
        resetCount: 1, lastReset: '2025-08-15' 
    },
    { 
        id: 2, name: 'Priya Sharma', email: 'priya@example.com', status: 'Paid User', enrollment: 'IBPS', 
        totalPaid: 12500, courses: [{name: 'IBPS PO Full', paid: 12500}], 
        webDeviceId: 'safari-mac-x7y4', mobileDeviceId: null, 
        resetCount: 0, lastReset: '2025-11-01' 
    },
    { 
        id: 3, name: 'Vamsi Krishna', email: 'vamsi@example.com', status: 'Blocked', enrollment: 'SSC', 
        totalPaid: 2000, courses: [{name: 'SSC CGL Tier 1', paid: 2000}], 
        webDeviceId: 'firefox-win-c2d1', mobileDeviceId: 'android-samsung-k9l1',
        resetCount: 3, lastReset: '2025-10-25'
    }
];

// --- Mock Data for Activity Log ---
const mockActivityLog = [
    { timestamp: '2025-11-04 10:30 PM', event: 'Test Submitted: UPSC Mock 1', ip: '192.168.1.101' },
    { timestamp: '2025-11-04 09:45 PM', event: 'New Login (Web)', ip: '192.168.1.101' },
    { timestamp: '2025-11-04 09:40 PM', event: 'Session Terminated (New Mobile Login)', ip: '203.0.113.5' },
    { timestamp: '2025-11-03 07:00 AM', event: 'Flashcard Session Completed (Polity)', ip: '203.0.113.5' },
    { timestamp: '2025-10-30 02:15 PM', event: 'Device Reset Initiated (Self-Service)', ip: '10.0.0.8' },
];

const UserManagementPage = () => {
    const { themeClass } = useTheme();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [viewDetailsUser, setViewDetailsUser] = useState(null);

    // --- Action Handlers for Security ---

    const handleBlockUser = (userId, status) => {
        console.log(`ACTION: ${status === 'Blocked' ? 'Unblocking' : 'Blocking'} User ID: ${userId}`);
    };
    
    const handleDeleteUser = (userId) => {
        if(window.confirm("WARNING: Permanently delete user?")) {
            console.log(`ACTION: Permanently Deleting User ID: ${userId}`);
        }
    };

    const handleResetPassword = (email) => {
        console.log(`ACTION: Initiating Password Reset for: ${email}`);
    };

    const handleForceLogout = (userId) => {
        console.log(`ACTION: Terminating All Sessions for User ID: ${userId}`);
    };

    const handleAdminDeviceReset = (userId) => {
        if(window.confirm("CONFIRM: Admin reset device counter? This bypasses the 3-month limit.")) {
            console.log(`ACTION: Admin Reset Device Counter for User ID: ${userId}`);
        }
    };

    // --- User Details Modal Renderer ---
    const renderUserDetailsModal = (user) => {
        const [activeTab, setActiveTab] = useState('Account');

        return (
            <Modal 
                title={`Details for ${user.name}`} 
                onClose={() => setViewDetailsUser(null)}
                className={themeClass}
            >
                {/* Tab Navigation */}
                <div className="modal-tabs">
                    <Button small primary={activeTab === 'Account'} onClick={() => setActiveTab('Account')}>Account & Purchases</Button>
                    <Button small primary={activeTab === 'Activity'} onClick={() => setActiveTab('Activity')}>Activity Log</Button>
                </div>

                {/* Account Tab Content */}
                {activeTab === 'Account' && (
                    <div className="user-details-content">
                        <h4>Account & Enrollment</h4>
                        <p><strong>Status:</strong> {user.status}</p>
                        <p><strong>Total Paid:</strong> ₹ {user.totalPaid.toLocaleString('en-IN')}</p>
                        <p><strong>Courses:</strong> {user.courses.map(c => c.name).join(', ')}</p>
                        <Button small secondary>Edit Email/Phone</Button> {/* Placeholder for edit functionality */}
                        
                        <h4 className="mt-4">Security & Devices</h4>
                        <p><strong>Web Device ID:</strong> {user.webDeviceId || 'N/A'}</p>
                        <p><strong>Mobile Device ID:</strong> {user.mobileDeviceId || 'N/A'}</p>
                        <p><strong>Device Reset Count (3M):</strong> {user.resetCount} of 2 allowed</p>
                        <p><strong>Last Reset:</strong> {user.lastReset}</p>

                        <div className="mt-4 security-actions">
                            <Button small onClick={() => handleForceLogout(user.id)}>Force Log Out All</Button>
                            <Button small onClick={() => handleAdminDeviceReset(user.id)} secondary>
                                Admin Device Reset
                            </Button>
                        </div>
                    </div>
                )}

                {/* Activity Log Tab Content (NEW) */}
                {activeTab === 'Activity' && (
                    <div className="activity-log-content">
                        <h4>User Activity Audit Trail</h4>
                        <Table 
                            data={mockActivityLog} // In production, this data would be fetched for the specific user
                            columns={[
                                { header: 'Timestamp', accessor: 'timestamp' },
                                { header: 'Event', accessor: 'event' },
                                { header: 'IP Address', accessor: 'ip' },
                            ]} 
                        />
                        <p className="note">Shows the last 50 system activities for auditing purposes.</p>
                    </div>
                )}
                
            </Modal>
        );
    };


    // --- Filtering and Display Logic for Main Table ---
    const filteredUsers = mockUsers.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                              user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = filterStatus === 'All' || user.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const columns = [
        { header: 'Name', accessor: 'name' },
        { header: 'Email', accessor: 'email' },
        { header: 'Status', accessor: 'status' },
        { header: 'Enrollment', accessor: 'enrollment' },
        { header: 'Last Login', accessor: 'lastLogin' },
        { header: 'Resets (3M)', accessor: 'resetCount' },
        { header: 'Actions', render: (user) => (
            <>
                {/* Block/Unblock */}
                <Button small danger={user.status !== 'Blocked'} onClick={() => handleBlockUser(user.id, user.status)}>
                    {user.status === 'Blocked' ? 'Unblock' : 'Block'}
                </Button>
                {/* View Details/Purchases */}
                <Button small secondary onClick={() => setViewDetailsUser(user)}>Details</Button>
                {/* Admin Password Reset */}
                <Button small onClick={() => handleResetPassword(user.email)} secondary>Reset Pass</Button>
            </>
        )}
    ];

    return (
        <div className={`user-management-page ${themeClass}`}>
            <h2>User Management Console</h2>
            
            {/* Filter and Search Controls */}
            <div className="filter-controls">
                <InputGroup 
                    label="Search User" 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Name or Email"
                />
                <Select 
                    label="Filter by Status" 
                    options={['All', 'Trial User', 'Paid User', 'Blocked']} 
                    value={filterStatus} 
                    onChange={(e) => setFilterStatus(e.target.value)} 
                />
            </div>

            <Table data={filteredUsers} columns={columns} />

            {/* Render the Details Modal if a user is selected */}
            {viewDetailsUser && renderUserDetailsModal(viewDetailsUser)}
        </div>
    );
};

export default UserManagementPage;