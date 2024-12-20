'use client';
import React, { useEffect } from 'react';
import { removeOverlap } from '../../utils/stringUtils';

const TestPage = () => {
  useEffect(() => {
    const existing = "Once upon a time";
    const suggestion = "Once upon a time, in a land filled with lush green valleys...";
    const result = removeOverlap(existing, suggestion);

    console.log('Existing Text:', existing);
    console.log('Suggestion:', suggestion);
    console.log('Result:', result);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Check the Console for Results</h1>
    </div>
  );
};

export default TestPage;
