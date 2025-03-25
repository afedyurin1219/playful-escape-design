
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface StationActionsProps {
  index: number;
  isGeneratingStation: boolean;
  currentStationIndex: number | null;
  onChangeStation: (index: number) => void;
  onDeleteStation: (index: number) => void;
}

const StationActions = ({ 
  index,
  isGeneratingStation,
  currentStationIndex,
  onChangeStation,
  onDeleteStation 
}: StationActionsProps) => {
  return (
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
  );
};

export default StationActions;
