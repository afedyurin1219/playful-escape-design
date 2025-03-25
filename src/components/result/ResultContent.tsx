
import React from 'react';
import { EscapeRoomPlan, EscapeRoomConfig, Station } from '../EscapeRoomGenerator';
import OverviewTab from './OverviewTab';
import StationsTab from './StationsTab';
import SuppliesTab from './SuppliesTab';
import FacilitationTab from './FacilitationTab';

interface ResultContentProps {
  activeTab: string;
  escapeRoom: EscapeRoomPlan;
  config: EscapeRoomConfig;
  stations: Station[];
  isGeneratingStation: boolean;
  isGeneratingInitialStations: boolean;
  currentStationIndex: number | null;
  onChangeStation: (index: number) => void;
  onDeleteStation: (index: number) => void;
  onAddStation: () => void;
}

const ResultContent: React.FC<ResultContentProps> = ({
  activeTab,
  escapeRoom,
  config,
  stations,
  isGeneratingStation,
  isGeneratingInitialStations,
  currentStationIndex,
  onChangeStation,
  onDeleteStation,
  onAddStation
}) => {
  // Make sure escapeRoom.stations is properly set with the current stations
  const escapeRoomWithStations = {
    ...escapeRoom,
    stations: stations
  };
  
  return (
    <div className="tab-content mb-16">
      <div className={`${activeTab === 'overview' ? '' : 'print:block hidden'}`}>
        <OverviewTab escapeRoom={escapeRoomWithStations} config={config} />
      </div>
      
      <div className={`${activeTab === 'stations' ? '' : 'print:block hidden'}`}>
        <StationsTab 
          stations={stations} 
          escapeRoom={escapeRoomWithStations}
          config={config}
          isGeneratingStation={isGeneratingStation || isGeneratingInitialStations}
          currentStationIndex={currentStationIndex}
          onChangeStation={onChangeStation}
          onDeleteStation={onDeleteStation}
          onAddStation={onAddStation}
        />
      </div>
      
      <div className={`${activeTab === 'supplies' ? '' : 'print:block hidden'}`}>
        <SuppliesTab escapeRoom={escapeRoomWithStations} />
      </div>
      
      <div className={`${activeTab === 'facilitation' ? '' : 'print:block hidden'}`}>
        <FacilitationTab />
      </div>
    </div>
  );
};

export default ResultContent;
