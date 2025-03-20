
import { Station, EscapeRoomConfig, EscapeRoomPlan } from '../EscapeRoomGenerator';
import StationCard from './StationCard';

interface StationsTabProps {
  stations: Station[];
  escapeRoom: EscapeRoomPlan;
  isGeneratingStation: boolean;
  currentStationIndex: number | null;
  onChangeStation: (index: number) => void;
  onDeleteStation: (index: number) => void;
}

const StationsTab = ({ 
  stations, 
  escapeRoom,
  isGeneratingStation,
  currentStationIndex,
  onChangeStation,
  onDeleteStation
}: StationsTabProps) => {
  return (
    <div className="stations mt-8">
      <h2 className="text-2xl font-display mb-6 print:page-break-before">Stations ({stations.length})</h2>
      <div className="space-y-6">
        {stations.map((station, index) => (
          <StationCard
            key={index}
            station={station}
            index={index}
            supplies={escapeRoom.supplies}
            isGeneratingStation={isGeneratingStation}
            currentStationIndex={currentStationIndex}
            onChangeStation={onChangeStation}
            onDeleteStation={onDeleteStation}
          />
        ))}
      </div>
    </div>
  );
};

export default StationsTab;
