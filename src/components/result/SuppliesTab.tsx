
import { ExternalLink } from 'lucide-react';
import { EscapeRoomPlan } from '../EscapeRoomGenerator';

interface SuppliesTabProps {
  escapeRoom: EscapeRoomPlan;
}

const SuppliesTab = ({ escapeRoom }: SuppliesTabProps) => {
  // Function to generate Amazon search link for a supply
  const getAmazonLink = (supplyName: string) => {
    const searchQuery = encodeURIComponent(supplyName);
    return `https://www.amazon.com/s?k=${searchQuery}`;
  };
  
  return (
    <div className="supplies mt-8">
      <h2 className="text-2xl font-display mb-6 print:page-break-before">Required Supplies</h2>
      
      <div className="grid gap-6 md:grid-cols-3 print:grid-cols-1">
        <div className="col-span-full md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 h-full">
            <h3 className="text-xl font-medium mb-4">Theme Supplies</h3>
            <ul className="space-y-3">
              {escapeRoom.supplies
                .filter(supply => supply.category === 'theme')
                .map((supply, index) => (
                  <li key={index} className="pb-2 border-b border-gray-100 last:border-0">
                    <span className="font-medium">{supply.name}</span>
                    <p className="text-sm text-gray-600">{supply.purpose}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
        
        <div className="col-span-full md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 h-full">
            <h3 className="text-xl font-medium mb-4">Challenge Supplies</h3>
            <ul className="space-y-3">
              {escapeRoom.supplies
                .filter(supply => supply.category === 'challenge')
                .map((supply, index) => (
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
        
        <div className="col-span-full md:col-span-1">
          <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 h-full">
            <h3 className="text-xl font-medium mb-4">General Supplies</h3>
            <ul className="space-y-3">
              {escapeRoom.supplies
                .filter(supply => supply.category === 'general')
                .map((supply, index) => (
                  <li key={index} className="pb-2 border-b border-gray-100 last:border-0">
                    <span className="font-medium">{supply.name}</span>
                    <p className="text-sm text-gray-600">{supply.purpose}</p>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuppliesTab;
