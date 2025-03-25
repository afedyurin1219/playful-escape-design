
import React from 'react';
import { Station } from '../../EscapeRoomGenerator';

interface StationAnswerProps {
  station: Station;
}

const StationAnswer = ({ station }: StationAnswerProps) => {
  const isPhysicalTask = () => {
    const taskLower = station.task.toLowerCase();
    // Check if this is a physical task or search task that shouldn't show an answer
    return (
      taskLower.includes('find') || 
      taskLower.includes('search') || 
      taskLower.includes('locate') || 
      taskLower.includes('collect') ||
      taskLower.includes('gather') ||
      taskLower.includes('assemble') ||
      taskLower.includes('physical') ||
      taskLower.includes('hidden')
    );
  };

  // Skip rendering the answer section completely for physical tasks
  if (isPhysicalTask()) {
    return null;
  }

  return (
    <div className="mb-4">
      <h4 className="font-semibold text-charcoal-light mb-1">Answer:</h4>
      <p className="font-medium">{station.answer}</p>
    </div>
  );
};

export default StationAnswer;
