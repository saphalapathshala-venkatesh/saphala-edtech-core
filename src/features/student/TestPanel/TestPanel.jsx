// File: src/features/student/TestPanel/TestPanel.jsx (The Core In-Test UI)

import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../core/hooks/useTheme'; 
import { Button } from '../../../components/common';

// --- MOCK DATA/FUNCTIONS for Demo ---
// This would be fetched from the server based on the test ID
const mockTestConfig = {
    testTitle: "IBPS PO Prelims Mock 1",
    totalTime: 60 * 60, // 60 minutes in seconds
    isSectionalTiming: true,
    isSubSectionEnabled: false, // For this example, let's keep sub-section OFF
    sections: [
        { id: 1, name: 'Quantitative Aptitude', totalQuestions: 35, timeLimit: 20 * 60 }, // 20 mins
        { id: 2, name: 'Reasoning Ability', totalQuestions: 35, timeLimit: 20 * 60 }, 
        { id: 3, name: 'English Language', totalQuestions: 30, timeLimit: 20 * 60 }
    ]
};

const TestPanel = ({ testId }) => {
    const { themeClass } = useTheme();
    const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(mockTestConfig.totalTime); // Overall Timer
    
    const currentSection = mockTestConfig.sections[currentSectionIndex];
    const isLastSection = currentSectionIndex === mockTestConfig.sections.length - 1;
    
    // --- State for Sectional Timer (Managed Separately) ---
    const [sectionalTime, setSectionalTime] = useState(mockTestConfig.isSectionalTiming ? currentSection.timeLimit : null);
    
    // --- EFFECTS: Timers and Sectional Lock Logic ---
    useEffect(() => {
        // Overall Timer Logic
        const overallTimer = setInterval(() => {
            setCurrentTime(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        // Sectional Timer Logic (Only if enabled)
        let sectionTimer = null;
        if (mockTestConfig.isSectionalTiming) {
            sectionTimer = setInterval(() => {
                setSectionalTime(prev => (prev > 0 ? prev - 1 : 0));
            }, 1000);
        }

        // Cleanup function
        return () => {
            clearInterval(overallTimer);
            if (sectionTimer) clearInterval(sectionTimer);
        };
    }, [currentSectionIndex]); // Dependency on section index to reset sectional timer

    // Utility function to format seconds into MM:SS
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };

    // --- Action Handlers ---

    const handleSectionSubmit = () => {
        if (isLastSection) {
            // Last section submitted -> Trigger full test submission
            console.log('Final Section Submitted. Redirecting to Confirmation Modal.');
            // This would open the Pre-Submission Summary Modal
        } else {
            // Move to the next section (Remaining time is LOST, as per requirement)
            console.log(`Submitting section ${currentSection.name}. Time remaining NOT carried forward.`);
            setCurrentSectionIndex(currentSectionIndex + 1);
        }
    };

    // --- Rendering Logic for Timers ---
    const renderTimers = () => {
        const timers = [];

        // 1. Sub-Section Timer (Smallest - Omitted for this MVP)

        // 2. Sectional Timer (If enabled)
        if (mockTestConfig.isSectionalTiming) {
             timers.push(<div key="section" className="timer-section-medium">Section: {formatTime(sectionalTime)}</div>);
        }

        // 3. Overall Timer (Largest)
        timers.push(<div key="total" className="timer-total-large">Total: {formatTime(currentTime)}</div>);

        return <div className="timer-container">{timers}</div>;
    };
    
    const renderQuestionPalette = () => {
        // In a real app, this would dynamically generate the 1-to-N question buttons
        // with the correct color based on their status (Answered, Marked, etc.)
        const currentQuestions = Array.from({ length: currentSection.totalQuestions }, (_, i) => i + 1);
        
        return (
            <div className="question-palette">
                <h4>Questions ({currentSection.totalQuestions})</h4>
                <div className="palette-grid">
                    {currentQuestions.map(num => (
                        <div key={num} className="palette-item status-unvisited">{num}</div>
                    ))}
                </div>
                {/* Legend, Status Counter updates go here */}
            </div>
        );
    };

    return (
        <div className={`test-panel-page ${themeClass}`}>
            <div className="test-header">
                <h2>{mockTestConfig.testTitle}</h2>
                {renderTimers()}
            </div>

            <div className="test-content-area">
                
                {/* --- Left/Main Content Area --- */}
                <div className="question-main-view">
                    {/* Section Tabs (Tabs will be disabled/locked if sectional timing is ON) */}
                    <div className="section-tabs">
                        {mockTestConfig.sections.map((sec, index) => (
                            <button 
                                key={sec.id} 
                                className={`section-tab ${index === currentSectionIndex ? 'active' : ''}`}
                                // Lock other sections if sectional timing is enabled AND not yet submitted
                                disabled={mockTestConfig.isSectionalTiming && index !== currentSectionIndex}
                                onClick={() => setCurrentSectionIndex(index)}
                            >
                                {sec.name}
                            </button>
                        ))}
                    </div>

                    {/* Question Rendering Area (Passage Split-Screen logic goes here) */}
                    <div className="question-display-box">
                        {/* Placeholder for actual question content */}
                        <p>Currently viewing **{currentSection.name}** - Question 1 of {currentSection.totalQuestions}</p>
                        {/* Logic here for rendering two columns for Passage Questions */}
                    </div>
                </div>

                {/* --- Right Sidebar (Question Palette) --- */}
                <div className="question-sidebar-palette">
                    {renderQuestionPalette()}
                </div>
            </div>

            {/* --- Footer/Action Buttons --- */}
            <div className="test-footer-actions">
                {/* Submit Section Button */}
                {!isLastSection && mockTestConfig.isSectionalTiming && (
                    <Button onClick={handleSectionSubmit} primary>Submit Section & Go to Next</Button>
                )}
                
                {/* Submit Test Button (Only on the last section) */}
                {isLastSection && (
                    <Button onClick={handleSectionSubmit} danger>Confirm & Submit Test</Button>
                )}
            </div>
        </div>
    );
};

export default TestPanel;