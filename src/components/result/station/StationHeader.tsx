
import React from 'react';
import { Station } from '../../EscapeRoomGenerator';
import StationBadges from './StationBadges';
import StationActions from './StationActions';
import { stationTypeInfoMap } from '../../../utils/stationTypes';
import { hasPrintableContent, extractPrintableMaterial, isCipherTask } from '../../../utils/printUtils';
import { taskMentionsPrintableMaterials } from './StationUtils';

interface StationHeaderProps {
  station: Station;
  index: number;
  isGeneratingStation: boolean;
  currentStationIndex: number | null;
  onChangeStation: (index: number) => void;
  onDeleteStation: (index: number) => void;
}

const StationHeader = ({ 
  station, 
  index,
  isGeneratingStation,
  currentStationIndex,
  onChangeStation,
  onDeleteStation
}: StationHeaderProps) => {
  // Get the station difficulty from stationTypeInfoMap
  const getStationDifficulty = () => {
    if (station.type && stationTypeInfoMap[station.type]) {
      return stationTypeInfoMap[station.type].difficulty;
    }
    return null;
  };
  
  const difficulty = getStationDifficulty();
  
  // Improved detection for printable materials
  const hasPrintableMaterials = Boolean(
    (hasPrintableContent(station.task) && isCipherTask(station.task)) || 
    extractPrintableMaterial(station.facilitatorInstructions) ||
    taskMentionsPrintableMaterials(station.task)
  );

  return (
    <div className="flex justify-between items-start mb-3">
      <div className="flex flex-col">
        <h3 className="text-xl font-medium">{index + 1}. {station.name}</h3>
        <StationBadges 
          station={station}
          difficulty={difficulty}
          hasPrintableMaterials={hasPrintableMaterials}
        />
      </div>
      <StationActions
        index={index}
        isGeneratingStation={isGeneratingStation}
        currentStationIndex={currentStationIndex}
        onChangeStation={onChangeStation}
        onDeleteStation={onDeleteStation}
      />
    </div>
  );
};

export default StationHeader;
