// File: src/features/admin/TestBuilder/TestSectionDefinition.jsx (NEW FILE CREATED)

import React, { useState } from 'react';
import { InputGroup, Button, Checkbox } from '../../../components/common';
import { useTheme } from '../../../core/hooks/useTheme';

// This component manages the creation and validation of test sections.
const TestSectionDefinition = ({ testInfo, onSaveSections, onBack }) => {
    const { themeClass } = useTheme();
    
    const [sections, setSections] = useState([{
        name: 'Section 1', 
        questions: 0, 
        time: 0, 
        negativeMarking: 0.25 
    }]);

    const isTimed = testInfo.isSectionalTiming; 
    const totalQuestions = testInfo.totalQuestions;
    const isSubSectionEnabled = testInfo.isSubSectionEnabled;

    const addSection = () => {
        setSections([...sections, { 
            name: `Section ${sections.length + 1}`, 
            questions: 0, 
            time: 0, 
            negativeMarking: 0.25 
        }]);
    };

    const removeSection = (index) => {
        setSections(sections.filter((_, i) => i !== index));
    };

    const handleSectionChange = (index, field, value) => {
        const newSections = sections.map((section, i) => {
            if (i === index) {
                // Ensure number fields are stored as numbers
                const finalValue = (field === 'questions' || field === 'time' || field === 'negativeMarking') 
                                    ? Number(value) : value;
                return { ...section, [field]: finalValue };
            }
            return section;
        });
        setSections(newSections);
    };

    const validateSections = () => {
        const allocatedQuestions = sections.reduce((sum, section) => sum + section.questions, 0);
        
        if (allocatedQuestions !== totalQuestions) {
            alert(`Error: Total questions allocated (${allocatedQuestions}) do not match the test total (${totalQuestions}).`);
            return false;
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateSections()) {
            onSaveSections(sections);
            console.log('Sections Saved:', sections);
            // In the main builder flow, this would move to TestQuestionContent.jsx
        }
    };

    // Note: Sub-section management logic would be nested here if required by the Admin.

    const allocatedQuestions = sections.reduce((sum, section) => sum + section.questions, 0);

    return (
        <div className={`section-definition-builder ${themeClass}`}>
            <h3>Define Sections for: {testInfo.title}</h3>
            
            <p className="note-total">Target Questions: <strong>{totalQuestions}</strong></p>

            {sections.map((section, index) => (
                <Card key={index} className="section-card">
                    <h4>{section.name}</h4>
                    <InputGroup label="Section Name" value={section.name} onChange={(e) => handleSectionChange(index, 'name', e.target.value)} />
                    
                    {/* Conditional Fields */}
                    {isTimed && (
                        <InputGroup 
                            label="Time Limit (Minutes)" 
                            type="number" 
                            value={section.time} 
                            onChange={(e) => handleSectionChange(index, 'time', e.target.value)} 
                            min="1"
                        />
                    )}

                    <InputGroup label="No. of Questions" type="number" value={section.questions} onChange={(e) => handleSectionChange(index, 'questions', e.target.value)} min="1" />
                    <InputGroup label="Negative Marking" type="number" step="0.01" value={section.negativeMarking} onChange={(e) => handleSectionChange(index, 'negativeMarking', e.target.value)} min="0" />
                    
                    {/* Sub-Section Logic Placeholder */}
                    {isSubSectionEnabled && (
                        <Button small secondary>Manage Sub-Sections</Button>
                    )}

                    {sections.length > 1 && (
                        <Button onClick={() => removeSection(index)} danger>Remove Section</Button>
                    )}
                </Card>
            ))}
            
            <div className="summary-bar">
                <p>Total Questions Allocated: <strong>{allocatedQuestions} / {totalQuestions}</strong></p>
                {allocatedQuestions !== totalQuestions && <p className="warning">Allocation Mismatch! Fix before proceeding.</p>}
            </div>

            <Button onClick={addSection} secondary>+ Add New Section</Button>
            
            <div className="navigation-actions">
                <Button onClick={onBack} secondary>← Back to Basic Info</Button>
                <Button onClick={handleSubmit} primary disabled={allocatedQuestions !== totalQuestions}>Proceed to Question Content</Button>
            </div>
        </div>
    );
};

export default TestSectionDefinition;