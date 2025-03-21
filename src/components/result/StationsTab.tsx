
import { Station, EscapeRoomConfig, EscapeRoomPlan } from '../EscapeRoomGenerator';
import StationCard from './StationCard';
import { Button } from '@/components/ui/button';
import { PlusCircle, Loader2, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StationType, stationTypeInfoMap } from '@/utils/stationTypes';

interface StationsTabProps {
  stations: Station[];
  escapeRoom: EscapeRoomPlan;
  config: EscapeRoomConfig;
  isGeneratingStation: boolean;
  currentStationIndex: number | null;
  onChangeStation: (index: number) => void;
  onDeleteStation: (index: number) => void;
  onAddStation: () => void;
}

const StationsTab = ({ 
  stations, 
  escapeRoom,
  config,
  isGeneratingStation,
  currentStationIndex,
  onChangeStation,
  onDeleteStation,
  onAddStation
}: StationsTabProps) => {
  // Get the number of stations based on duration
  const getStationCountByDuration = (duration: string): number => {
    if (duration === '<30') return 3;
    if (duration === '30-60') return 5;
    return 7; // for 60-120
  };

  const recommendedStationCount = getStationCountByDuration(config.duration);
  
  return (
    <div className="stations mt-8">
      <div className="flex justify-between items-center mb-6 print:page-break-before">
        <div>
          <h2 className="text-2xl font-display">Stations ({stations.length})</h2>
          <p className="text-sm text-gray-500 mt-1">
            {config.duration === '<30' && 'Quick escape room (under 30 minutes)'}
            {config.duration === '30-60' && 'Standard escape room (30-60 minutes)'}
            {config.duration === '60-120' && 'Extended escape room (1-2 hours)'}
            {stations.length < recommendedStationCount && ` - We recommend adding ${recommendedStationCount - stations.length} more station(s)`}
          </p>
        </div>
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
      
      {stations.length === 0 && !isGeneratingStation && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
          <p className="text-gray-500">No stations generated yet. Click "Add Station" to create your first challenge.</p>
        </div>
      )}
      
      {isGeneratingStation && stations.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-6 text-center">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-teal" />
          <p className="text-gray-500">Generating stations for your escape room...</p>
        </div>
      )}
      
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
