// File: src/features/admin/Reports/SalesRevenuePage.jsx

import React, { useState } from 'react';
import { Button, Card, InputGroup, Select, Table, Chart } from '../../../components/common';
import { useTheme } from '../../../core/hooks/useTheme'; 

// --- Mock Data ---
const mockSalesData = [
    { date: '2025-11-01', product: 'UPSC Foundation', revenue: 12000, user: 'Priya', coupon: 'NONE', status: 'Success' },
    { date: '2025-11-02', product: 'IBPS Mock Series', revenue: 1500, user: 'Ravi', coupon: 'LAUNCH25', status: 'Success' },
    { date: '2025-11-03', product: 'Flashcards Rev+', revenue: 499, user: 'Vamsi', coupon: 'FALLSALE', status: 'Failed' },
];

const SalesRevenuePage = () => {
    const { themeClass } = useTheme();
    const [startDate, setStartDate] = useState('2025-10-01');
    const [endDate, setEndDate] = useState('2025-11-04');
    const [filterPreset, setFilterPreset] = useState('Last 30 Days');

    // --- Mock Calculation ---
    const totalRevenue = mockSalesData.filter(d => d.status === 'Success').reduce((sum, d) => sum + d.revenue, 0);
    const totalTransactions = mockSalesData.filter(d => d.status === 'Success').length;
    const trialConversions = 45; // Placeholder
    const activePaidUsers = 250; // Placeholder

    return (
        <div className={`sales-revenue-page ${themeClass}`}>
            <h2>Sales & Revenue Analytics</h2>

            {/* --- Date Range Control --- */}
            <div className="date-controls-card">
                <Select 
                    label="Date Preset" 
                    options={['Today', 'Last 7 Days', 'Last 30 Days', 'Custom']} 
                    value={filterPreset} 
                    onChange={(e) => setFilterPreset(e.target.value)} 
                />
                {filterPreset === 'Custom' && (
                    <div className="custom-dates">
                        <InputGroup label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                        <InputGroup label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                        <Button secondary>Apply</Button>
                    </div>
                )}
            </div>

            {/* --- KPI Grid --- */}
            <div className="kpi-grid">
                <Card title="Total Revenue">₹ {totalRevenue.toLocaleString('en-IN')}</Card>
                <Card title="Total Transactions">{totalTransactions}</Card>
                <Card title="Avg. Order Value">₹ {(totalRevenue / totalTransactions).toFixed(2)}</Card>
                <Card title="Trial Conversions (CRITICAL)">{trialConversions}%</Card>
                <Card title="Active Paid Users">{activePaidUsers}</Card>
            </div>

            {/* --- Trend Chart --- */}
            <Card title="Revenue Trend Over Time">
                <Chart type="line" data={{ /* Daily Revenue data */ }} /> 
            </Card>

            {/* --- Transaction Details Table --- */}
            <Card title="Detailed Transaction Audit">
                <Table 
                    data={mockSalesData} 
                    columns={[
                        { header: 'Date', accessor: 'date' },
                        { header: 'Product', accessor: 'product' },
                        { header: 'Revenue (₹)', accessor: 'revenue' },
                        { header: 'Coupon', accessor: 'coupon' },
                        { header: 'Status', accessor: 'status' }
                    ]} 
                />
            </Card>
        </div>
    );
};

export default SalesRevenuePage;