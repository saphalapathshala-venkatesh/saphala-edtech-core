// File: src/features/admin/TestBuilder/TestSeriesBuilder.jsx

import React, { useState } from 'react';
import { useTheme } from '../../../core/hooks/useTheme'; 
import TestSeriesDetailsTab from './TestSeriesDetailsTab'; // Tab 1
import TestSeriesPricingTab from './TestSeriesPricingTab'; // Tab 2
import TestSeriesCourseLinkTab from './TestSeriesCourseLinkTab'; // Tab 3
import TestSeriesDescriptionTab from './TestSeriesDescriptionTab'; // Tab 4
import { Button } from '../../../components/common';

const TestSeriesBuilder = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [seriesData, setSeriesData] = useState({
        // Default data structure for the entire series
        title: '',
        category: 'UPSC',
        isFree: true,
        mrp: 0,
        sellingPrice: 0,
        courseId: null,
        description: '',
        // Array to hold the list of individual tests in the series
        tests: [], 
    });

    // Assume saveSeriesDraft is an API call in src/api/testService.js
    const saveSeriesDraft = async () => {
        // Implement API call to save all seriesData
        console.log('Saving Test Series Draft:', seriesData);
        // await api.testService.saveSeries(seriesData);
    };
    
    // Publish logic (Active only after adding at least 1 test)
    const handlePublish = async () => {
        if (seriesData.tests.length === 0) {
            alert("Cannot Publish: Please add at least one test to the series.");
            return;
        }
        // Logic to update status to "Published" in the database
        console.log('Publishing Test Series:', seriesData.title);
        // await api.testService.publishSeries(seriesData.id);
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 1:
                return <TestSeriesDetailsTab seriesData={seriesData} setSeriesData={setSeriesData} />;
            case 2:
                return <TestSeriesPricingTab seriesData={seriesData} setSeriesData={setSeriesData} />;
            case 3:
                return <TestSeriesCourseLinkTab seriesData={seriesData} setSeriesData={setSeriesData} />;
            case 4:
                return <TestSeriesDescriptionTab seriesData={seriesData} setSeriesData={setSeriesData} />;
            default:
                return null;
        }
    };

    const tabNames = ["Details", "Pricing", "Add to Course", "Description"];
    const isPublishActive = seriesData.tests.length > 0;

    return (
        <div className="test-series-builder">
            <h2 className="builder-title">Create Test Series</h2>
            
            {/* Tab Navigation Menu */}
            <div className="tab-menu">
                {tabNames.map((name, index) => (
                    <div 
                        key={index} 
                        className={`tab-item ${activeTab === index + 1 ? 'active' : ''}`}
                        onClick={() => setActiveTab(index + 1)}
                    >
                        {name}
                    </div>
                ))}
            </div>

            {/* Tab Content Area (Occupies Entire Screen) */}
            <div className="tab-content-area">
                {renderTabContent()}
            </div>

            {/* Bottom Action Bar */}
            <div className="bottom-actions">
                <Button onClick={saveSeriesDraft} secondary>Save Draft</Button>
                <Button 
                    onClick={handlePublish} 
                    primary 
                    disabled={!isPublishActive}
                    title={!isPublishActive ? "Add at least one test to publish" : "Publish to make visible to students"}
                >
                    Publish
                </Button>
            </div>
        </div>
    );
};

export default TestSeriesBuilder;