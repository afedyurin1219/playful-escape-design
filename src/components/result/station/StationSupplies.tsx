
import React, { useState } from 'react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, ExternalLink } from 'lucide-react';

interface StationSuppliesProps {
  supplies: Array<any>;
}

const StationSupplies = ({ supplies }: StationSuppliesProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Function to generate Amazon search link for a supply
  const getAmazonLink = (supplyName: string) => {
    const searchQuery = encodeURIComponent(supplyName);
    return `https://www.amazon.com/s?k=${searchQuery}`;
  };
  
  return (
    <div>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-charcoal-light">Supplies Needed:</h4>
          <CollapsibleTrigger className="rounded-md hover:bg-gray-100 p-1">
            {isOpen ? 
              <ChevronDown className="h-4 w-4" /> : 
              <ChevronRight className="h-4 w-4" />
            }
          </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="mt-2">
          <ul className="list-disc pl-5 space-y-1">
            {supplies && supplies.length > 0 ? (
              supplies.map((supply, supplyIndex) => (
                <li key={supplyIndex} className="flex justify-between items-start">
                  <span>
                    {typeof supply === 'string' ? supply : supply.name}
                  </span>
                  <a 
                    href={getAmazonLink(typeof supply === 'string' ? supply : supply.name)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-teal hover:text-teal-600 flex items-center gap-1 text-xs print:hidden ml-2"
                  >
                    <ExternalLink className="h-3 w-3" /> Amazon
                  </a>
                </li>
              ))
            ) : (
              <li className="text-amber-700 font-medium">
                No specific supplies listed. Review the task and facilitator instructions for needed materials.
              </li>
            )}
          </ul>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default StationSupplies;
