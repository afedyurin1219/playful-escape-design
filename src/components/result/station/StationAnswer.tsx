
import React from 'react';
import { Station } from '../../EscapeRoomGenerator';

interface StationAnswerProps {
  station: Station;
}

const StationAnswer = ({ station }: StationAnswerProps) => {
  const isPhysicalTask = () => {
    const taskLower = station.task.toLowerCase();
    // Only hide answers for truly physical tasks that require physical actions
    return (
      (taskLower.includes('find') && taskLower.includes('hidden')) || 
      (taskLower.includes('search') && taskLower.includes('room')) || 
      taskLower.includes('physical challenge') ||
      taskLower.includes('relay race') ||
      taskLower.includes('obstacle course') ||
      (taskLower.includes('shoot') && taskLower.includes('target')) ||
      (taskLower.includes('throw') && taskLower.includes('ball')) ||
      taskLower.includes('balance') ||
      taskLower.includes('jump') ||
      (taskLower.includes('collect') && taskLower.includes('item'))
    );
  };

  // Show the answer section for all stations except purely physical tasks
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
