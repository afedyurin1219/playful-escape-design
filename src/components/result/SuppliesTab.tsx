
import { ExternalLink, ChevronDown, ChevronRight } from 'lucide-react';
import { EscapeRoomPlan } from '../EscapeRoomGenerator';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import { useState } from 'react';

interface SuppliesTabProps {
  escapeRoom: EscapeRoomPlan;
}

const SuppliesTab = ({ escapeRoom }: SuppliesTabProps) => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isChallengeOpen, setIsChallengeOpen] = useState(false);
  const [isGeneralOpen, setIsGeneralOpen] = useState(false);
  
  // Function to generate Amazon search link for a supply
  const getAmazonLink = (supplyName: string) => {
    const searchQuery = encodeURIComponent(supplyName);
    return `https://www.amazon.com/s?k=${searchQuery}`;
  };
  
  // Filter out invalid supplies
  const validSupplies = (escapeRoom.supplies || []).filter(supply => 
    typeof supply === 'object' && supply !== null && 
    typeof supply.name === 'string' && 
    supply.name.trim().length > 3
  );
  
  const themeSupplies = validSupplies.filter(supply => supply.category === 'theme');
  const challengeSupplies = validSupplies.filter(supply => supply.category === 'challenge');
  const generalSupplies = validSupplies.filter(supply => supply.category === 'general');
  
  return (
    <div className="supplies mt-8">
      <h2 className="text-2xl font-display mb-6 print:page-break-before">Required Supplies</h2>
      
      <div className="grid gap-6 md:grid-cols-3 print:grid-cols-1">
        {themeSupplies.length > 0 && (
          <div className="col-span-full md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 h-full">
              <Collapsible
                open={isThemeOpen}
                onOpenChange={setIsThemeOpen}
                className="w-full"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Theme Supplies</h3>
                  <CollapsibleTrigger className="rounded-md hover:bg-gray-100 p-1">
                    {isThemeOpen ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-4">
                  <ul className="space-y-3">
                    {themeSupplies.map((supply, index) => (
                      <li key={index} className="pb-2 border-b border-gray-100 last:border-0">
                        <span className="font-medium">{supply.name}</span>
                        <p className="text-sm text-gray-600">{supply.purpose}</p>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        )}
        
        {challengeSupplies.length > 0 && (
          <div className="col-span-full md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 h-full">
              <Collapsible
                open={isChallengeOpen}
                onOpenChange={setIsChallengeOpen}
                className="w-full"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">Challenge Supplies</h3>
                  <CollapsibleTrigger className="rounded-md hover:bg-gray-100 p-1">
                    {isChallengeOpen ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-4">
                  <ul className="space-y-3">
                    {challengeSupplies.map((supply, index) => (
                      <li key={index} className="pb-2 border-b border-gray-100 last:border-0">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-medium">{supply.name}</span>
                            <p className="text-sm text-gray-600">{supply.purpose}</p>
                          </div>
                          <a 
                            href={getAmazonLink(supply.name)} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-teal hover:text-teal-600 flex items-center gap-1 text-sm mt-1 print:hidden"
                          >
                            <ExternalLink className="h-3 w-3" /> Amazon
                          </a>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        )}
        
        {generalSupplies.length > 0 && (
          <div className="col-span-full md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 h-full">
              <Collapsible
                open={isGeneralOpen}
                onOpenChange={setIsGeneralOpen}
                className="w-full"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium">General Supplies</h3>
                  <CollapsibleTrigger className="rounded-md hover:bg-gray-100 p-1">
                    {isGeneralOpen ? 
                      <ChevronDown className="h-5 w-5" /> : 
                      <ChevronRight className="h-5 w-5" />
                    }
                  </CollapsibleTrigger>
                </div>
                <CollapsibleContent className="mt-4">
                  <ul className="space-y-3">
                    {generalSupplies.map((supply, index) => (
                      <li key={index} className="pb-2 border-b border-gray-100 last:border-0">
                        <span className="font-medium">{supply.name}</span>
                        <p className="text-sm text-gray-600">{supply.purpose}</p>
                      </li>
                    ))}
                  </ul>
                </CollapsibleContent>
              </Collapsible>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliesTab;
