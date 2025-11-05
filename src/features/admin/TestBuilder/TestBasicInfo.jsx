// File: src/features/admin/TestBuilder/TestBasicInfo.jsx (UPDATED and FINALIZED)

import React, { useState } from 'react';
// Assuming useTheme is a custom hook in src/core/hooks/
import { useTheme } from '../../../core/hooks/useTheme'; 
import { InputGroup, Button, Checkbox, Select, DateTimeInput, Textarea, FileUploader } from '../../../components/common'; // Assuming new components (Textarea, FileUploader) exist

const categories = ['UPSC', 'IBPS', 'SSC', 'APPSC', 'Insurance'];
const validityUnits = ['Days', 'Months']; 
// Options for attempts dropdown: -1 (Unlimited), 1, 2, 3, 4, 5
const attemptOptions = [{ value: -1, label: 'Unlimited (-1)' }, { value: 1, label: '1 Attempt' }, { value: 2, label: '2 Attempts' }, { value: 3, label: '3 Attempts' }, { value: 4, label: '4 Attempts' }, { value: 5, label: '5 Attempts' }];

const TestBasicInfo = ({ onNext }) => {
  const { themeClass } = useTheme(); 
  
  const [testData, setTestData] = useState({
    title: '',
    category: 'UPSC',
    totalQuestions: 0,
    totalTime: 0,
    
    // --- NEW INSTRUCTION AND ATTEMPTS FIELDS ---
    attemptsAllowed: -1, // Default: Unlimited
    instructionsText: '',
    // instructionsFilePath: '', // Optional: for image/doc upload

    // --- Validity & Activation ---
    validityValue: 30, 
    validityUnit: 'Days',
    activeFrom: '',
    activeTill: '',

    // --- Monetization ---
    isIndividualSale: false,
    mrp: 0,
    sellingPrice: 0,
    
    // --- Structural Rules (Toggles) ---
    isSectionalMarking: false,
    isSectionalTiming: false,
    isSubSectionEnabled: false,
    isSubSectionTiming: false,
    
    // --- Advanced Student Settings ---
    allowReview: true, 
    shuffleOptions: true,
    shuffleQuestions: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // Special handling for the attempts dropdown value conversion
    const finalValue = name === 'attemptsAllowed' ? Number(value) : (type === 'checkbox' ? checked : value);
    
    setTestData(prev => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const handleSubmit = () => {
    // Basic validation check
    if (!testData.title || testData.totalQuestions <= 0 || testData.totalTime <= 0) {
      alert('Please fill in all mandatory fields.');
      return;
    }
    if (!testData.activeFrom || !testData.activeTill) {
        alert('Please set the Active From and Active Till dates.');
        return;
    }
    // Pass data to the parent component or save to global state
    console.log('Test Info Saved:', testData);
    onNext(testData);
  };

  return (
    <div className={`test-builder-card ${themeClass}`}>
      <h2>Define Test Basics</h2>
      {/* ----------------- General Info ----------------- */}
      <InputGroup label="Test Title" name="title" value={testData.title} onChange={handleChange} />
      <Select label="Category" name="category" options={categories} value={testData.category} onChange={handleChange} />
      <InputGroup label="Total Questions" name="totalQuestions" type="number" value={testData.totalQuestions} onChange={handleChange} min="1" />
      <InputGroup label="Total Time (Minutes)" name="totalTime" type="number" value={testData.totalTime} onChange={handleChange} min="5" />
      
      {/* ----------------- Instructions and Attempts (NEW) ----------------- */}
      <div className="form-section-header">Instructions & Attempt Control</div>
      
      {/* Instructions Input */}
      <Textarea label="Instructions Text (Type or Paste)" name="instructionsText" value={testData.instructionsText} onChange={handleChange} />
      <FileUploader label="Upload Instructions Doc/Image (Optional)" accept=".pdf, .png, .jpg, .doc" />

      {/* Attempts Dropdown */}
      <Select 
          label="Attempts Allowed per Student" 
          name="attemptsAllowed" 
          options={attemptOptions} 
          value={testData.attemptsAllowed} 
          onChange={handleChange} 
      />

      {/* ----------------- Validity & Activation ----------------- */}
      <div className="form-section-header">Validity & Access Control</div>
      <div className="input-row">
          <InputGroup label="Validity Value" name="validityValue" type="number" value={testData.validityValue} onChange={handleChange} min="1" />
          <Select label="Unit" name="validityUnit" options={validityUnits} value={testData.validityUnit} onChange={handleChange} />
          <p className="note">Validity starts from student purchase/enrollment.</p>
      </div>
      <DateTimeInput label="Active From Date/Time" name="activeFrom" value={testData.activeFrom} onChange={handleChange} required />
      <DateTimeInput label="Active Till Date/Time" name="activeTill" value={testData.activeTill} onChange={handleChange} required />
      

      {/* ----------------- Monetization ----------------- */}
      <div className="form-section-header">Monetization</div>
      <Checkbox label="Sell as Individual Test" name="isIndividualSale" checked={testData.isIndividualSale} onChange={handleChange} />
      
      {testData.isIndividualSale && (
        <>
          <InputGroup label="MRP (₹)" name="mrp" type="number" value={testData.mrp} onChange={handleChange} min="1" />
          <InputGroup label="Selling Price (₹)" name="sellingPrice" type="number" value={testData.sellingPrice} onChange={handleChange} min="0" />
        </>
      )}

      {/* ----------------- Structural Rules & Toggles ----------------- */}
      <div className="form-section-header">Structural Rules & Toggles</div>
      <Checkbox label="Enable Sectional Marking (Marks/Section)" name="isSectionalMarking" checked={testData.isSectionalMarking} onChange={handleChange} />
      <Checkbox label="Enable Sectional Timing (Time Limit/Section)" name="isSectionalTiming" checked={testData.isSectionalTiming} onChange={handleChange} />
      
      {/* Sub-Section Toggles */}
      <Checkbox label="Enable Sub-Sections" name="isSubSectionEnabled" checked={testData.isSubSectionEnabled} onChange={handleChange} />
      {testData.isSubSectionEnabled && (
          <Checkbox label="Enable Sub-Section Timing" name="isSubSectionTiming" checked={testData.isSubSectionTiming} onChange={handleChange} />
      )}
      
      <Button onClick={handleSubmit} primary>Define Sections & Questions</Button>
    </div>
  );
};

export default TestBasicInfo;