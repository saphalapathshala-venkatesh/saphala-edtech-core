// File: src/features/admin/TestBuilder/TestQuestionContent.jsx (FINAL VERSION)

import React, { useState } from 'react';
import { Button, InputGroup, Select, Checkbox, Textarea, FileUploader } from '../../../components/common';
// Assuming useTheme is imported for theme application
import { useTheme } from '../../../core/hooks/useTheme'; 

// --- Mock Data (Based on Hierarchical Tags) ---
const mockSubjects = [{ id: 1, name: 'Polity' }, { id: 2, name: 'Economy' }];
const mockTopics = { 1: ['Preamble', 'Fundamental Rights'], 2: ['Fiscal Policy', 'Monetary Policy'] };
const difficultyLevels = ['Easy', 'Moderate', 'Difficult'];
const questionTypes = ['MCQ Single Correct', 'MCQ Multiple Correct', 'Subjective (Text Input)', 'Subjective (PDF Upload)', 'Match the Following', 'Order Type'];

// Component to manage content for ONE section at a time
const TestQuestionContent = ({ sectionData, onQuestionUpdate }) => {
    const { themeClass } = useTheme(); 
    
    // List of all questions in the current section
    const [questions, setQuestions] = useState(sectionData.questions || []);
    
    // UI state toggles
    const [isManualInput, setIsManualInput] = useState(true); 
    const [editingQuestionId, setEditingQuestionId] = useState(null); 
    
    // State for the single question currently being created/edited (Bilingual structure)
    const [currentQuestion, setCurrentQuestion] = useState({
        text_en: '', text_te: '', // English and Telugu Question Text
        options: [{ id: 1, text_en: '', text_te: '', isCorrect: false }],
        solution_en: '', solution_te: '', // English and Telugu Solution/Explanation
        subjectId: 1, topic: 'Preamble', difficulty: 'Moderate',
        marks: 4, negativeMarks: 1, type: 'MCQ Single Correct'
    });

    const resetForm = () => {
        setEditingQuestionId(null);
        setCurrentQuestion({ 
            text_en: '', text_te: '',
            options: [{ id: 1, text_en: '', text_te: '', isCorrect: false }],
            solution_en: '', solution_te: '',
            subjectId: 1, topic: 'Preamble', difficulty: 'Moderate',
            marks: 4, negativeMarks: 1, type: 'MCQ Single Correct'
        });
    };

    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setCurrentQuestion(prev => ({ ...prev, [name]: value }));
    };

    const addOption = () => {
        setCurrentQuestion(prev => ({ 
            ...prev, 
            options: [...prev.options, { id: Date.now(), text_en: '', text_te: '', isCorrect: false }] 
        }));
    };

    // --- CRUD Actions ---

    const handleQuestionSubmit = () => {
        if (!currentQuestion.text_en || !currentQuestion.options.every(o => o.text_en)) {
            alert('Please fill in question text and all option text (English).');
            return;
        }

        const questionToSave = { ...currentQuestion, id: currentQuestion.id || Date.now() };

        if (editingQuestionId) {
            // Update Logic
            setQuestions(prev => prev.map(q => q.id === editingQuestionId ? questionToSave : q));
            console.log("Question Updated:", questionToSave);
        } else {
            // Create Logic (New question is committed to the Question Bank)
            setQuestions(prev => [...prev, questionToSave]);
            console.log("New Question Saved & Committed to Question Bank:", questionToSave);
        }
        
        onQuestionUpdate(sectionData.name, [...questions.filter(q => q.id !== questionToSave.id), questionToSave]);
        resetForm();
    };

    const handleEditQuestion = (id) => {
        const questionToEdit = questions.find(q => q.id === id);
        if (questionToEdit) {
            setEditingQuestionId(id);
            setCurrentQuestion(questionToEdit); 
            setIsManualInput(true); // Switch to manual form for editing
        }
    };
    
    const handleDuplicateQuestion = (question) => {
        const duplicatedQuestion = {
            ...question,
            id: Date.now(), 
            title: question.title + ' (COPY)', 
        };
        setQuestions(prev => [...prev, duplicatedQuestion]);
        console.log("Question Duplicated for Editing.");
    };

    const handleDeleteQuestion = (id) => {
        if (window.confirm("Are you sure you want to delete this question?")) {
            setQuestions(prev => prev.filter(q => q.id !== id));
            console.log(`Question ID ${id} deleted.`);
        }
    };


    return (
        <div className={`question-content-builder ${themeClass}`}>
            <h3>Content for Section: {sectionData.name}</h3>

            <div className="input-toggle-bar">
                <Button onClick={() => setIsManualInput(true)} primary={isManualInput}>Manual Input</Button>
                <Button onClick={() => setIsManualInput(false)} primary={!isManualInput}>Import / Bulk Upload</Button>
            </div>

            {/* ----------------- MANUAL INPUT / REVIEW FORM ----------------- */}
            {isManualInput && (
                <div className="manual-input-form-card">
                    <h4>{editingQuestionId ? 'Edit/Review Question' : 'Add Single Question'}</h4>
                    
                    {/* --- Bilingual Question Text (Supports Telugu) --- */}
                    <Textarea label="Question Text (English)" name="text_en" value={currentQuestion.text_en} onChange={handleFieldChange} />
                    <Textarea label="Question Text (Telugu - అనువాదం)" name="text_te" value={currentQuestion.text_te} onChange={handleFieldChange} /> 

                    {/* --- Options --- */}
                    <div className="options-area">
                        {currentQuestion.options.map((opt, index) => (
                            <div key={opt.id} className="option-row">
                                <span className="option-label">{String.fromCharCode(65 + index)}.</span>
                                <InputGroup label="Option Text (English)" value={opt.text_en} onChange={(e) => { /* update logic */ }} />
                                <InputGroup label="Option Text (Telugu)" value={opt.text_te} onChange={(e) => { /* update logic */ }} />
                                <Checkbox label="Correct" checked={opt.isCorrect} onChange={(e) => { /* update logic */ }} />
                            </div>
                        ))}
                        <Button small onClick={addOption}>+ Add Option</Button>
                    </div>

                    {/* --- Solution/Explanation --- */}
                    <Textarea label="Solution/Explanation (English)" name="solution_en" value={currentQuestion.solution_en} onChange={handleFieldChange} />
                    <Textarea label="Solution/Explanation (Telugu - వివరణ)" name="solution_te" value={currentQuestion.solution_te} onChange={handleFieldChange} /> 

                    {/* --- Metadata (Hierarchical Tags) --- */}
                    <div className="metadata-row">
                        <Select label="Subject" options={mockSubjects.map(s => s.name)} value={currentQuestion.subjectId} />
                        <Select label="Topic" options={mockTopics[currentQuestion.subjectId]} value={currentQuestion.topic} />
                        <Select label="Difficulty" options={difficultyLevels} value={currentQuestion.difficulty} />
                        <InputGroup label="Marks" type="number" min="1" value={currentQuestion.marks} />
                        <InputGroup label="Negative Marks" type="number" step="0.01" value={currentQuestion.negativeMarks} />
                        <Select label="Question Type" options={questionTypes} value={currentQuestion.type} />
                    </div>

                    <div className="form-actions">
                        <Button onClick={handleQuestionSubmit} primary>{editingQuestionId ? 'Update Question' : 'Save & Commit to Question Bank'}</Button>
                        {editingQuestionId && <Button onClick={resetForm} secondary>Cancel Edit</Button>}
                    </div>
                </div>
            )}
            
            {/* ----------------- IMPORT / BULK UPLOAD ----------------- */}
            {!isManualInput && (
                <div className="bulk-upload-form-card">
                    <h4>Import Content (Supports Image/Math Upload via Templates)</h4>
                    <Button onClick={() => console.log('Opening Question Bank Search')}>Import from Question Bank (Filtered by Subject/Topic)</Button>
                    <p className="note">--- OR ---</p>
                    <FileUploader label="Bulk Upload (Structured Word/Excel Document)" accept=".xlsx, .docx" />
                    <p className="warning">Upload must match the predefined Saphala template format for proper parsing and tagging.</p>
                </div>
            )}

            <hr />

            {/* ----------------- Question Management List (CRUD) ----------------- */}
            <h4>Questions in this Section ({questions.length} total)</h4>
            <div className="question-list">
                {questions.map((q, index) => (
                    <div key={q.id} className="question-item">
                        <span>Q{index + 1}: {q.text_en.substring(0, 50)}...</span>
                        <div className="item-actions">
                            <Button small onClick={() => handleEditQuestion(q.id)}>Edit / Review</Button>
                            <Button small onClick={() => handleDuplicateQuestion(q)}>Duplicate</Button>
                            <Button small danger onClick={() => handleDeleteQuestion(q.id)}>Delete</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestQuestionContent;