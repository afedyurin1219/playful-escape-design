
import React from 'react';
import { Station } from '../../EscapeRoomGenerator';
import { hasPrintableContent, getPrintableContent } from '../../../utils/printUtils';
import PrintableLetters from '../../PrintableLetters';
import { Printer } from 'lucide-react';

interface StationTaskProps {
  station: Station;
}

const StationTask = ({ station }: StationTaskProps) => {
  return (
    <div className="mb-4">
      <h4 className="font-semibold text-charcoal-light mb-1">Task:</h4>
      <p>{station.task}</p>
      
      {hasPrintableContent(station.task) && 
        getPrintableContent(station.task, station.answer) && (
          <div className="mt-3 border border-blue-200 bg-blue-50 p-3 rounded-md">
            <h5 className="text-sm font-semibold mb-2 text-blue-700 flex items-center gap-1">
              <Printer className="h-3 w-3" /> Printable Content
            </h5>
            <PrintableLetters 
              contentType={getPrintableContent(station.task, station.answer)!.type} 
              content={getPrintableContent(station.task, station.answer)!.content} 
            />
          </div>
        )
      }
    </div>
  );
};

export default StationTask;
