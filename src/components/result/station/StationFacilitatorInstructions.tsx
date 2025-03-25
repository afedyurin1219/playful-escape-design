
import React, { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, AlertTriangle } from 'lucide-react';

interface StationFacilitatorInstructionsProps {
  instructions: string;
  taskMentionsPrintableMaterials: boolean;
  hasPrintableContent: boolean;
}

const StationFacilitatorInstructions = ({
  instructions,
  taskMentionsPrintableMaterials,
  hasPrintableContent
}: StationFacilitatorInstructionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-charcoal-light">Facilitator Instructions:</h4>
          <CollapsibleTrigger className="rounded-md hover:bg-gray-100 p-1">
            {isOpen ? 
              <ChevronDown className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
            }
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-2">
          <p className="italic">{instructions}</p>
          
          {taskMentionsPrintableMaterials && !hasPrintableContent && (
            <div className="mt-3 border border-amber-200 bg-amber-50 p-3 rounded-md">
              <p className="text-sm text-amber-700 flex items-center gap-1">
                <AlertTriangle className="h-4 w-4" />
                <strong>Note:</strong> This task mentions materials that need to be created (charts, ciphers, etc.). 
                See the facilitator instructions above for details on how to prepare these materials.
              </p>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default StationFacilitatorInstructions;
