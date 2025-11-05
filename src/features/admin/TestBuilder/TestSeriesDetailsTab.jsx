// File: src/features/admin/TestBuilder/TestSeriesDetailsTab.jsx

import React from 'react';
import { InputGroup, Select, Checkbox, Toggle } from '../../../components/common';
// Assuming Uploader component exists
import FileUploader from '../../../components/form/FileUploader'; 

const categories = ['UPSC', 'IBPS', 'SSC', 'APPSC', 'Insurance'];

const TestSeriesDetailsTab = ({ seriesData, setSeriesData }) => {
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSeriesData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="tab-panel">
            <h3>Details</h3>
            <InputGroup label="Series Title" name="title" value={seriesData.title} onChange={handleChange} required />
            <Select label="Category" name="category" options={categories} value={seriesData.category} onChange={handleChange} required />
            {/* Note: No. of tests is optional/calculated based on added tests */}

            <div className="form-section-header">Pricing Model</div>
            {/* Free/Paid Toggle */}
            <Toggle 
                label="Series Type: Free / Paid" 
                checked={!seriesData.isFree} // Checked means Paid
                onChange={(checked) => setSeriesData(prev => ({ ...prev, isFree: !checked }))} 
                option1="Free"
                option2="Paid"
            />
            {seriesData.isFree && (
                <p className="note">Students can add this Free series to their account directly.</p>
            )}

            <div className="form-section-header">Scheduling & Documents</div>
            {/* PDF Schedule - Can be viewed even before publishing (as per notes) */}
            <FileUploader label="Upload Schedule Document (PDF)" accept=".pdf" />
        </div>
    );
};

// export default TestSeriesDetailsTab; // Already exported in parent component