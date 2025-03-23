
import { useState } from 'react';
import { Station, EscapeRoomConfig } from '../EscapeRoomGenerator';
import { Button } from '@/components/ui/button';
import { Loader2, MoreVertical, RefreshCw, Printer, AlertTriangle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import PrintableLetters from '../PrintableLetters';
import { hasPrintableContent, getPrintableContent } from '../../utils/printUtils';
import { Badge } from '@/components/ui/badge';
import { stationTypeInfoMap } from '../../utils/stationTypes';

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
  
  // Check if task mentions any printable materials that need to be created
  const taskMentionsPrintableMaterials = () => {
    const taskLower = station.task.toLowerCase();
    const printableTerms = ['chart', 'cipher', 'key', 'code sheet', 'reference', 'provided', 'decoder'];
    return printableTerms.some(term => taskLower.includes(term));
  };
  
  const hasPrintableMaterials = hasPrintableContent(station.task) || taskMentionsPrintableMaterials();

  // Get the station difficulty from stationTypeInfoMap
  const getStationDifficulty = () => {
    if (station.type && stationTypeInfoMap[station.type]) {
      return stationTypeInfoMap[station.type].difficulty;
    }
    return null;
  };

  const difficulty = getStationDifficulty();
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 print:mb-6 print:p-4 relative">
      <div className="flex justify-between items-start mb-3">
        <div className="flex flex-col">
          <h3 className="text-xl font-medium">{index + 1}. {station.name}</h3>
          <div className="flex flex-wrap gap-2 mt-1">
            {hasPrintableMaterials && (
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 flex items-center gap-1 w-fit">
                <Printer className="h-3 w-3" /> Printable Materials
              </Badge>
            )}
            {difficulty && (
              <Badge variant="outline" className={`
                flex items-center gap-1 w-fit
                ${difficulty === 'easy' ? 'bg-green-50 text-green-700 border-green-200' : 
                  difficulty === 'medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                  'bg-red-50 text-red-700 border-red-200'}
              `}>
                {difficulty === 'easy' ? 'Easy' : 
                 difficulty === 'medium' ? 'Medium' : 'Hard'}
              </Badge>
            )}
          </div>
        </div>
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
        
        {taskMentionsPrintableMaterials() && !hasPrintableContent(station.task) && (
          <div className="mt-3 border border-amber-200 bg-amber-50 p-3 rounded-md">
            <p className="text-sm text-amber-700 flex items-center gap-1">
              <AlertTriangle className="h-4 w-4" />
              <strong>Note:</strong> This task mentions materials that need to be created (charts, ciphers, etc.). 
              See the facilitator instructions above for details on how to prepare these materials.
            </p>
          </div>
        )}
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
