
import { Station, EscapeRoomConfig, EscapeRoomPlan } from '../EscapeRoomGenerator';
import StationCard from './StationCard';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2 } from 'lucide-react';

interface StationsTabProps {
  stations: Station[];
  escapeRoom: EscapeRoomPlan;
  isGeneratingStation: boolean;
  currentStationIndex: number | null;
  onChangeStation: (index: number) => void;
  onDeleteStation: (index: number) => void;
  onAddStation: () => void;
}

const StationsTab = ({ 
  stations, 
  escapeRoom,
  isGeneratingStation,
  currentStationIndex,
  onChangeStation,
  onDeleteStation,
  onAddStation
}: StationsTabProps) => {
  return (
    <div className="stations mt-8">
      <div className="flex justify-between items-center mb-6 print:page-break-before">
        <h2 className="text-2xl font-display">Stations ({stations.length})</h2>
        <Button 
          onClick={onAddStation} 
          className="print:hidden"
          disabled={isGeneratingStation}
        >
          {isGeneratingStation && currentStationIndex === null ? (
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          ) : (
            <PlusCircle className="h-4 w-4 mr-2" />
          )}
          Add Station
        </Button>
      </div>
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
