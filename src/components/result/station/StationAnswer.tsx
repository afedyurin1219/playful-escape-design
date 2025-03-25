
import React from 'react';

interface StationAnswerProps {
  answer: string;
}

const StationAnswer = ({ answer }: StationAnswerProps) => {
  return (
    <div className="mb-4">
      <h4 className="font-semibold text-charcoal-light mb-1">Answer:</h4>
      <p className="font-medium">{answer}</p>
    </div>
  );
};

export default StationAnswer;
