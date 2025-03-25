
import { ExternalLink } from 'lucide-react';
import { EscapeRoomPlan, Station } from '../EscapeRoomGenerator';
import { getStationSupplies } from './station/StationUtils';

interface SuppliesTabProps {
  escapeRoom: EscapeRoomPlan;
}

const SuppliesTab = ({ escapeRoom }: SuppliesTabProps) => {
  // Function to generate Amazon search link for a supply
  const getAmazonLink = (supplyName: string) => {
    const searchQuery = encodeURIComponent(supplyName);
    return `https://www.amazon.com/s?k=${searchQuery}`;
  };
  
  // Filter out invalid supplies from the global supplies list
  const validGlobalSupplies = (escapeRoom.supplies || []).filter(supply => 
    typeof supply === 'object' && supply !== null && 
    typeof supply.name === 'string' && 
    supply.name.trim().length > 3
  );
  
  // Get theme and general supplies from the global supplies
  const themeSupplies = validGlobalSupplies.filter(supply => supply.category === 'theme');
  const generalSupplies = validGlobalSupplies.filter(supply => supply.category === 'general');
  
  // Get challenge-specific supplies directly from station objects
  const challengeSupplies: Array<{name: string, purpose: string, station: Station}> = [];
  
  // Collect all unique station supplies
  if (escapeRoom.stations && Array.isArray(escapeRoom.stations)) {
    escapeRoom.stations.forEach((station: Station) => {
      const stationName = station.name;
      
      // Get supplies specific to this station
      const stationSuppliesList = getStationSupplies(stationName, station.supplies, []);
      
      if (stationSuppliesList && stationSuppliesList.length > 0) {
        stationSuppliesList.forEach((supply: any) => {
          // For string supplies, create an object
          if (typeof supply === 'string') {
            challengeSupplies.push({
              name: supply,
              purpose: `For the "${stationName}" challenge`,
              station: station
            });
          } 
          // For object supplies, ensure they have the right station reference
          else if (typeof supply === 'object' && supply !== null) {
            challengeSupplies.push({
              name: supply.name || '',
              purpose: supply.purpose || `For the "${stationName}" challenge`,
              station: station
            });
          }
        });
      }
    });
  }
  
  return (
    <div className="supplies mt-8">
      <h2 className="text-2xl font-display mb-6 print:page-break-before">Required Supplies</h2>
      
      <div className="grid gap-6 md:grid-cols-3 print:grid-cols-1">
        {themeSupplies.length > 0 && (
          <div className="col-span-full md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 h-full">
              <h3 className="text-xl font-medium mb-4">Theme Supplies</h3>
              <ul className="space-y-3">
                {themeSupplies.map((supply, index) => (
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
            </div>
          </div>
        )}
        
        {challengeSupplies.length > 0 && (
          <div className="col-span-full md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 h-full">
              <h3 className="text-xl font-medium mb-4">Challenge Supplies</h3>
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
            </div>
          </div>
        )}
        
        {generalSupplies.length > 0 && (
          <div className="col-span-full md:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 h-full">
              <h3 className="text-xl font-medium mb-4">General Supplies</h3>
              <ul className="space-y-3">
                {generalSupplies.map((supply, index) => (
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuppliesTab;
