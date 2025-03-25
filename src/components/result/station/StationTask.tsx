
import React from 'react';
import { Station } from '../../EscapeRoomGenerator';
import { hasPrintableContent, getPrintableContent } from '../../../utils/printUtils';
import PrintableLetters from '../../PrintableLetters';
import { Printer } from 'lucide-react';

interface StationTaskProps {
  station: Station;
}

const StationTask = ({ station }: StationTaskProps) => {
  // Extract printable content from the task
  const printableContent = hasPrintableContent(station.task) ? 
    getPrintableContent(station.task, station.answer) : null;
    
  // Remove any "Answer: X" part from the task description
  const taskDisplay = station.task.replace(/\s*Answer:\s*.*$/i, '');
  
  return (
    <div className="mb-4">
      <h4 className="font-semibold text-charcoal-light mb-1">Task:</h4>
      <p>{taskDisplay}</p>
      
      {printableContent && (
        <div className="mt-3 border border-blue-200 bg-blue-50 p-3 rounded-md">
          <h5 className="text-sm font-semibold mb-2 text-blue-700 flex items-center gap-1">
            <Printer className="h-3 w-3" /> Printable Content
          </h5>
          <PrintableLetters 
            contentType={printableContent.type} 
            content={printableContent.content} 
          />
        </div>
      )}
    </div>
  );
};

export default StationTask;
