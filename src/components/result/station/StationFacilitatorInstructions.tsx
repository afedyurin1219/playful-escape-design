
import React, { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Printer } from 'lucide-react';
import { Station } from '../../EscapeRoomGenerator';
import { hasPrintableContent, extractPrintableMaterial } from '../../../utils/printUtils';
import PrintableLetters from '../../PrintableLetters';

interface StationFacilitatorInstructionsProps {
  instructions: string;
  station: Station;
}

const StationFacilitatorInstructions = ({
  instructions,
  station
}: StationFacilitatorInstructionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Extract additional printable content from facilitator instructions
  const facilitatorPrintableContent = extractPrintableMaterial(instructions);
  
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
          
          {/* Display printable materials from facilitator instructions only if actual content exists */}
          {facilitatorPrintableContent && (
            <div className="mt-3 border border-blue-200 bg-blue-50 p-3 rounded-md">
              <h5 className="text-sm font-semibold mb-2 text-blue-700 flex items-center gap-1">
                <Printer className="h-3 w-3" /> Printable Materials
              </h5>
              
              <PrintableLetters 
                contentType="facilitator" 
                content={facilitatorPrintableContent} 
                title={station.name}
                description={instructions}
              />
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default StationFacilitatorInstructions;
