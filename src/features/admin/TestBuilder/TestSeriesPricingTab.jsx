// File: src/features/admin/TestBuilder/TestSeriesPricingTab.jsx

import React from 'react';
import { InputGroup } from '../../../components/common';

const TestSeriesPricingTab = ({ seriesData, setSeriesData }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSeriesData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // This tab content is only fully visible if the series is marked as PAID in Tab 1
    if (seriesData.isFree) {
        return <div className="tab-panel"><p>Pricing is not applicable. Series is set to FREE in the Details tab.</p></div>;
    }

    return (
        <div className="tab-panel">
            <h3>Pricing (Paid Series)</h3>
            <InputGroup label="MRP (₹)" name="mrp" type="number" value={seriesData.mrp} onChange={handleChange} min="1" required />
            <InputGroup label="Selling Price (₹)" name="sellingPrice" type="number" value={seriesData.sellingPrice} onChange={handleChange} min="0" required />
            <p className="note">The discount will be automatically calculated and shown to the student.</p>

            <div className="form-section-header">Advanced Selling Options</div>
            {/* Bundling/Selling Options */}
            <p>Will be developed later. Needs logic to link to courses/bundles.</p>
        </div>
    );
};

// export default TestSeriesPricingTab; // Already exported in parent component