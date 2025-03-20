
import { useState } from 'react';
import { Station, EscapeRoomConfig } from '../EscapeRoomGenerator';
import { Button } from '@/components/ui/button';
import { Loader2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PrintableLetters from '../PrintableLetters';
import { hasPrintableContent, getPrintableContent } from '../../utils/printUtils';

interface StationCardProps {
  station: Station;
  index: number;
  supplies: Array<any>;
  isGeneratingStation: boolean;
  currentStationIndex: number | null;
  onChangeStation: (index: number) => void;
  onDeleteStation: (index: number) => void;
}

const StationCard = ({ 
  station, 
  index, 
  supplies,
  isGeneratingStation,
  currentStationIndex,
  onChangeStation,
  onDeleteStation
}: StationCardProps) => {
  // Helper function to get supplies for this station
  const getStationSupplies = (stationName: string, supplies: Array<any>) => {
    const stationNameLower = stationName.toLowerCase();
    
    return supplies.filter(supply => {
      return supply.purpose.toLowerCase().includes(stationNameLower);
    });
  };
  
  const stationSupplies = getStationSupplies(station.name, supplies);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 print:mb-6 print:p-4 relative">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-medium">{index + 1}. {station.name}</h3>
        <div className="print:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                {isGeneratingStation && currentStationIndex === index ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <MoreVertical className="h-4 w-4" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem 
                onClick={() => onChangeStation(index)}
                disabled={isGeneratingStation}
              >
                {isGeneratingStation && currentStationIndex === index ? 
                  'Generating...' : 'Change station'}
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onDeleteStation(index)}
                className="text-destructive"
                disabled={isGeneratingStation}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold text-charcoal-light mb-1">Task:</h4>
        <p>{station.task}</p>
        
        {hasPrintableContent(station.task) && 
          getPrintableContent(station.task, station.answer) && (
            <PrintableLetters 
              contentType={getPrintableContent(station.task, station.answer)!.type} 
              content={getPrintableContent(station.task, station.answer)!.content} 
            />
          )
        }
      </div>
      <div className="mb-4">
        <h4 className="font-semibold text-charcoal-light mb-1">Answer:</h4>
        <p className="font-medium">{station.answer}</p>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold text-charcoal-light mb-1">Hints:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {station.hints.map((hint, hintIndex) => (
            <li key={hintIndex}>{hint}</li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h4 className="font-semibold text-charcoal-light mb-1">Facilitator Instructions:</h4>
        <p className="italic">{station.facilitatorInstructions}</p>
      </div>
      <div>
        <h4 className="font-semibold text-charcoal-light mb-1">Supplies Needed:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {stationSupplies.length > 0 ? (
            stationSupplies.map((supply, supplyIndex) => (
              <li key={supplyIndex}>{supply.name}</li>
            ))
          ) : (
            <li>No specific supplies required for this station</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default StationCard;
