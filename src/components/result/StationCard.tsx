
import React from 'react';
import { Station } from '../EscapeRoomGenerator';
import { hasPrintableContent } from '../../utils/printUtils';
import { getStationSupplies, taskMentionsPrintableMaterials } from './station/StationUtils';
import StationHeader from './station/StationHeader';
import StationTask from './station/StationTask';
import StationAnswer from './station/StationAnswer';
import StationHints from './station/StationHints';
import StationFacilitatorInstructions from './station/StationFacilitatorInstructions';
import StationSupplies from './station/StationSupplies';

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
  // Get supplies for this station
  const stationSupplies = getStationSupplies(station.name, station.supplies, supplies);
  
  return (
    <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 print:mb-6 print:p-4 relative">
      <StationHeader
        station={station}
        index={index}
        isGeneratingStation={isGeneratingStation}
        currentStationIndex={currentStationIndex}
        onChangeStation={onChangeStation}
        onDeleteStation={onDeleteStation}
      />

      <StationTask station={station} />
      <StationAnswer station={station} />
      <StationHints hints={station.hints} />
      
      <StationFacilitatorInstructions
        instructions={station.facilitatorInstructions}
        station={station}
      />
      
      <StationSupplies supplies={stationSupplies} />
    </div>
  );
};

export default StationCard;
