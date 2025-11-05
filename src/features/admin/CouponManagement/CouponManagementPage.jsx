// File: src/features/admin/CouponManagement/CouponManagementPage.jsx (FINALIZED)

import React, { useState } from 'react';
import { Button, InputGroup, Select, Table, Checkbox, DateTimeInput } from '../../../components/common';
import { useTheme } from '../../../core/hooks/useTheme'; 

// --- Mock Data & Options ---
const mockCoupons = [
    { code: 'LAUNCH25', type: 'Percentage', value: 25, uses: 150, maxUses: 200, isMultiUse: true, validityFrom: '2025-11-01', validityTo: '2026-01-30', target: 'UPSC Foundation', status: 'Active' },
    { code: 'FREEDAY14', type: 'Fixed Amount', value: 1000, uses: 500, maxUses: 500, isMultiUse: false, validityFrom: '2025-11-01', validityTo: '2025-12-31', target: 'All Courses', status: 'Expired' },
    { code: 'UPSC1000', type: 'Fixed Amount', value: 1000, uses: 12, maxUses: 50, isMultiUse: true, validityFrom: '2026-03-01', validityTo: '2026-03-31', target: 'SSC CGL Course', status: 'Active' }
];

const discountTypes = ['Percentage (%)', 'Fixed Amount (₹)', 'Free Trial (Days)'];
const targetOptions = ['All Courses', 'UPSC Foundation', 'IBPS PO Mock Series', 'SSC CGL Course'];

const CouponManagementPage = () => {
    const { themeClass } = useTheme();
    const [coupons, setCoupons] = useState(mockCoupons);
    const [newCoupon, setNewCoupon] = useState({
        code: '', type: 'Percentage (%)', value: 0, 
        maxUses: 100, isMultiUse: true, // Default to Multi-Use
        validityFrom: '', validityTo: '', 
        isActive: true, target: 'All Courses'
    });

    const handleCreateCoupon = () => {
        // Validation check
        if (!newCoupon.code || newCoupon.value <= 0 || !newCoupon.validityFrom || !newCoupon.validityTo) {
            alert('Please fill in code, value, and validity dates.');
            return;
        }
        
        const finalCoupon = { 
            ...newCoupon, 
            id: Date.now(), 
            uses: 0,
            status: newCoupon.isActive ? 'Active' : 'Inactive'
        };
        
        setCoupons(prev => [...prev, finalCoupon]);
        console.log('New Coupon Created:', finalCoupon);
        // Add API call to save coupon here
    };

    const handleStatusToggle = (code) => {
        // API call to toggle the coupon's active status
        setCoupons(prev => prev.map(c => 
            c.code === code ? { ...c, status: c.status === 'Active' ? 'Inactive' : 'Active' } : c
        ));
        console.log(`Toggled status for coupon: ${code}`);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewCoupon(prev => ({ 
            ...prev, 
            [name]: type === 'checkbox' ? checked : (name === 'value' || name === 'maxUses' ? Number(value) : value) 
        }));
    };

    // --- Table Columns ---
    const columns = [
        { header: 'Code', accessor: 'code' },
        { header: 'Type/Value', render: (c) => c.type === 'Percentage (%)' ? `${c.value}%` : `₹${c.value}` },
        { header: 'Usage Type', render: (c) => c.isMultiUse ? 'Multi-Use (1 per user)' : 'Single-Use' },
        { header: 'Uses/Max', render: (c) => `${c.uses} / ${c.maxUses}` },
        { header: 'Validity', render: (c) => `${c.validityFrom} to ${c.validityTo}` },
        { header: 'Applies To', accessor: 'target' },
        { header: 'Status', accessor: 'status' },
        { header: 'Actions', render: (c) => (
            <>
                <Button small onClick={() => handleStatusToggle(c.code)} secondary>
                    {c.status === 'Active' ? 'Deactivate' : 'Activate'}
                </Button>
                <Button small danger>Delete</Button>
            </>
        )}
    ];

    return (
        <div className={`coupon-management-page ${themeClass}`}>
            <h2>Coupon Management</h2>

            {/* --- Coupon Creation Form --- */}
            <div className="creation-form-card">
                <h3>Create New Coupon</h3>
                <InputGroup label="Coupon Code" name="code" value={newCoupon.code} onChange={handleChange} />
                <Select label="Discount Type" name="type" options={discountTypes} value={newCoupon.type} onChange={handleChange} />
                <InputGroup label="Discount Value" type="number" name="value" value={newCoupon.value} onChange={handleChange} min="1" />
                
                {/* Single-Use / Multi-Use Toggle */}
                <div className="toggle-group">
                    <Checkbox label="Multi-Use (1 per user)" name="isMultiUse" checked={newCoupon.isMultiUse} onChange={handleChange} />
                    {!newCoupon.isMultiUse && <p className="note-small">This coupon can be used only once globally.</p>}
                </div>

                {/* Validity Period */}
                <div className="validity-dates">
                    <DateTimeInput label="Valid From Date" name="validityFrom" value={newCoupon.validityFrom} onChange={handleChange} />
                    <DateTimeInput label="Valid To Date" name="validityTo" value={newCoupon.validityTo} onChange={handleChange} />
                </div>
                
                <InputGroup label="Max Uses (Total Count)" name="maxUses" type="number" value={newCoupon.maxUses} onChange={handleChange} min="1" />
                
                {/* Target Course/Product - Essential for Saphala */}
                <Select label="Applies To (Course/Category)" name="target" options={targetOptions} value={newCoupon.target} onChange={handleChange} />
                
                <Checkbox label="Active on Creation" name="isActive" checked={newCoupon.isActive} onChange={handleChange} />

                <Button onClick={handleCreateCoupon} primary>Create Coupon</Button>
            </div>

            {/* --- Existing Coupons List --- */}
            <div className="existing-coupons-list">
                <h3>Existing Coupons ({coupons.length})</h3>
                <Table columns={columns} data={coupons} />
            </div>
        </div>
    );
};

export default CouponManagementPage;