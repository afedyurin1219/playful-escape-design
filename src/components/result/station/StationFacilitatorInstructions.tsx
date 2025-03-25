
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
import { Button } from '@/components/ui/button';

interface StationFacilitatorInstructionsProps {
  instructions: string;
  station: Station;
}

const StationFacilitatorInstructions = ({
  instructions,
  station
}: StationFacilitatorInstructionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Check if task mentions printable materials
  const taskMentionsPrintableMaterials = () => {
    const taskLower = station.task.toLowerCase();
    const printableTerms = ['chart', 'cipher', 'key', 'code sheet', 'reference', 'provided', 'decoder', 'printed'];
    return printableTerms.some(term => taskLower.includes(term));
  };

  // Check if instructions mention printable materials
  const instructionsMentionPrintableMaterials = () => {
    const instructionsLower = instructions.toLowerCase();
    const printableTerms = ['chart', 'cipher', 'key', 'code sheet', 'reference', 'provided', 'decoder', 'print', 'create a'];
    return printableTerms.some(term => instructionsLower.includes(term));
  };
  
  // Extract additional printable content from facilitator instructions
  const facilitatorPrintableContent = extractPrintableMaterial(instructions);
  const hasPrintableMaterials = hasPrintableContent(station.task) || facilitatorPrintableContent;
  
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
          
          {/* Display printable materials from facilitator instructions */}
          {(instructionsMentionPrintableMaterials() || facilitatorPrintableContent) && (
            <div className="mt-3 border border-blue-200 bg-blue-50 p-3 rounded-md">
              <h5 className="text-sm font-semibold mb-2 text-blue-700 flex items-center gap-1">
                <Printer className="h-3 w-3" /> Printable Materials
              </h5>
              
              {facilitatorPrintableContent ? (
                <PrintableLetters 
                  contentType="facilitator" 
                  content={facilitatorPrintableContent} 
                  title={station.name}
                  description={instructions}
                />
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-sm">Create printable materials based on the facilitator instructions.</p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => window.open(
                      `https://app.canva.com/create/escape-room-printables?related=escapeRoom%20puzzle&openInSameTab=true`, 
                      '_blank'
                    )}
                    className="flex items-center gap-2 w-fit"
                  >
                    <Printer className="h-3 w-3" /> Create in Canva
                  </Button>
                </div>
              )}
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default StationFacilitatorInstructions;
