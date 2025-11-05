// File: src/features/student/TestPanel/PostTestReport.jsx (Student Report Page)

import React from 'react';
import { useTheme } from '../../../core/hooks/useTheme'; 
import { Button, Card, Chart, Table } from '../../../components/common'; // Assuming common UI components exist
import { generateMotivationMessage, calculateTestXP } from '../../../core/utils/xpService';

// --- MOCK REPORT DATA (This would be fetched from the API) ---
const mockReport = {
    testTitle: "IBPS PO Prelims Mock 1",
    totalQuestions: 100,
    attemptNumber: 1,
    netScore: 58.50,
    correct: 65,
    incorrect: 26,
    unattempted: 9,
    accuracy: 71.43, // 65/91
    timeSpent: 3045, // seconds
    finalRank: 12,
    totalTestTakers: 5000,
    percentile: 98.7,

    // Data for Comparison
    topperScore: 78.00,
    topperTime: 2500,

    // Data for Heat Map and AI Suggestions
    sectionalPerformance: [
        { section: 'Quant', accuracy: 55, weakTopic: 'Time & Work', linkId: 'FC-Q-001' },
        { section: 'Reasoning', accuracy: 85, weakTopic: 'None', linkId: null },
        { section: 'English', accuracy: 72, weakTopic: 'Vocabulary', linkId: 'EB-E-005' },
    ]
};

const PostTestReport = () => {
    const { themeClass } = useTheme();

    // Calculate XP using the service logic
    const xpEarned = calculateTestXP(mockReport.totalQuestions, mockReport.finalRank, mockReport.attemptNumber);
    const { message_en, message_te } = generateMotivationMessage(mockReport.finalRank, mockReport.percentile);

    const timeRemaining = mockReport.totalQuestions * 60 - mockReport.timeSpent; // Mock Calc

    const columnsComparison = [
        { header: 'Metric', accessor: 'metric' },
        { header: 'Your Score', accessor: 'you' },
        { header: 'Topper Score', accessor: 'topper' },
    ];
    
    const comparisonData = [
        { metric: 'Net Score', you: mockReport.netScore, topper: mockReport.topperScore },
        { metric: 'Accuracy (%)', you: mockReport.accuracy.toFixed(2), topper: '90.1' },
        { metric: 'Time (s)', you: mockReport.timeSpent, topper: mockReport.topperTime },
    ];

    return (
        <div className={`post-test-report-page ${themeClass}`}>
            <h2 className="report-header">Test Report: {mockReport.testTitle}</h2>

            {/* 1. XP & Motivation Header */}
            <Card className="xp-confetti-section">
                <p className="bilingual-message">
                    <strong>{message_en}</strong><br />
                    <span>({message_te})</span>
                </p>
                <div className="xp-summary">
                    <span>🎉 Earned XP: <strong>+{xpEarned}</strong></span>
                    <span className="rank-display">AIR: <strong>{mockReport.finalRank}</strong> | Percentile: <strong>{mockReport.percentile}%</strong></span>
                </div>
            </Card>

            {/* 2. Core Performance Summary */}
            <Card title="Overall Performance Summary">
                <div className="metrics-grid">
                    <div>Total Attempted: <strong>{mockReport.correct + mockReport.incorrect}</strong></div>
                    <div>Correct: <strong>{mockReport.correct}</strong></div>
                    <div>Incorrect: <strong>{mockReport.incorrect}</strong></div>
                    <div>Unattempted: <strong>{mockReport.unattempted}</strong></div>
                </div>
            </Card>

            {/* 3. Topper Comparison Table */}
            <Card title="Peer Comparison (Your vs. Topper)">
                <Table columns={columnsComparison} data={comparisonData} />
            </Card>

            {/* 4. Heat Map & AI Suggestions */}
            <Card title="Weak & Strong Areas (Heat Map Diagnosis)">
                {mockReport.sectionalPerformance.map(perf => (
                    <div key={perf.section} className={`heat-item accuracy-${Math.round(perf.accuracy / 10) * 10}`}>
                        <strong>{perf.section}</strong>: {perf.accuracy.toFixed(1)}% Accuracy
                        {perf.accuracy < 60 && (
                            <p className="ai-suggestion-text">
                                **AI Suggestion:** Target **{perf.weakTopic}**. Click to access Flashcards ID: {perf.linkId}.
                            </p>
                        )}
                    </div>
                ))}
                
                <h4 className="mt-4">Time Management Analysis</h4>
                {/* Placeholder for Time Spent Chart */}
                <Chart type="bar" data={{ labels: ['Yours', 'Topper'], values: [mockReport.timeSpent / 60, mockReport.topperTime / 60] }} /> 
                <p className="note-insight">You spent <strong>{(mockReport.timeSpent - mockReport.topperTime) / 60}</strong> minutes more than the topper.</p>
            </Card>
            
            {/* 5. Action Buttons (Links to solutions and general leaderboard) */}
            <div className="report-actions">
                <Button primary onClick={() => console.log('Redirect to Question Review Mode')}>View Solutions & Explanations</Button>
                <Button secondary onClick={() => console.log('Redirect to Global Leaderboard')}>View Global Leaderboard (Sadhana Ranks)</Button>
            </div>
        </div>
    );
};

export default PostTestReport;