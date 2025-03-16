
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EscapeRoomPlan, EscapeRoomConfig } from '../components/EscapeRoomGenerator';
import { Button } from '@/components/ui/button';
import { Printer, Home, FileDown, Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import PrintableLetters from '../components/PrintableLetters';
import { hasPrintableContent, getPrintableContent } from '../utils/printUtils';

interface LocationState {
  escapeRoom: EscapeRoomPlan;
  config: EscapeRoomConfig;
}

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  
  const state = location.state as LocationState;
  
  useEffect(() => {
    // Redirect to creator if no escape room data is available
    if (!state?.escapeRoom) {
      navigate('/create');
    }
  }, [state, navigate]);
  
  if (!state?.escapeRoom) {
    return null; // Prevent rendering while redirecting
  }
  
  const { escapeRoom, config } = state;
  
  const handleCopyToClipboard = () => {
    // Generate a simple text summary of the escape room plan
    const summary = `
${escapeRoom.title}

STORY:
${escapeRoom.story}

TEAM SETUP:
${escapeRoom.teamSetup}

STATIONS:
${escapeRoom.stations.map((station, index) => `
${index + 1}. ${station.name}
Task: ${station.task}
Answer: ${station.answer}
Hints: ${station.hints.join(', ')}
Instructions: ${station.facilitatorInstructions}
Supplies Needed:
${getStationSupplies(station.name, escapeRoom.supplies).map(supply => `- ${supply.name}`).join('\n')}
`).join('')}

SUPPLIES:
${escapeRoom.supplies.map(supply => `- ${supply.name}: ${supply.purpose}`).join('\n')}

PRIZES:
${escapeRoom.prizes.join(', ')}
    `;
    
    navigator.clipboard.writeText(summary).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "You can now paste the escape room plan anywhere you want.",
      });
    }).catch(err => {
      toast({
        title: "Failed to copy",
        description: "Please try again or manually select and copy the text.",
        variant: "destructive"
      });
    });
  };
  
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default navigation
    window.print();
  };
  
  // Helper function to get supplies needed for a specific station
  const getStationSupplies = (stationName: string, supplies: Array<any>) => {
    const stationNameLower = stationName.toLowerCase();
    
    return supplies.filter(supply => {
      // Match supplies by purpose containing the station name
      return supply.purpose.toLowerCase().includes(stationNameLower) ||
             // Match supplies by challenge category
             supply.category === 'challenge';
    });
  };
  
  return (
    <div className="min-h-screen bg-ivory text-charcoal pb-16 print:p-0">
      {/* Header - hidden during print */}
      <header className="py-6 px-6 border-b border-gray-200 mb-8 print:hidden">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <a href="/" className="text-2xl font-display text-teal">Escape Room Designer</a>
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" /> Home
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/create')}
            >
              Create New
            </Button>
          </div>
        </div>
      </header>
      
      <main className="max-w-6xl mx-auto px-6 print:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Title Section */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-display text-teal mb-3">{escapeRoom.title}</h1>
            <p className="text-lg max-w-3xl mx-auto">{escapeRoom.story}</p>
          </div>
          
          {/* Action Buttons - hidden during print */}
          <div className="flex justify-center gap-4 mb-8 print:hidden">
            <Button 
              onClick={handleCopyToClipboard}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" /> Copy to Clipboard
            </Button>
            <Button 
              variant="outline" 
              onClick={handlePrint}
              className="flex items-center gap-2"
            >
              <Printer className="h-4 w-4" /> Print
            </Button>
          </div>
          
          {/* Tabs - hidden during print */}
          <div className="border-b border-gray-200 mb-6 print:hidden">
            <nav className="flex space-x-8">
              {['overview', 'stations', 'supplies', 'facilitation'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab 
                      ? 'border-teal text-teal' 
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Content - all content displays during print */}
          <div className="tab-content mb-16">
            {/* Overview Section - always show for print, hide if not active tab */}
            <div className={`overview ${activeTab === 'overview' ? '' : 'print:block hidden'}`}>
              <h2 className="text-2xl font-display mb-6 print:block hidden">Overview</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none">
                  <h2 className="text-xl font-medium mb-4">Configuration</h2>
                  <ul className="space-y-3">
                    <li className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-charcoal-light">Age Group:</span>
                      <span className="font-medium">{config.ageGroup} years</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-charcoal-light">Theme:</span>
                      <span className="font-medium">{config.customTheme || config.theme}</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-charcoal-light">Group Size:</span>
                      <span className="font-medium">{config.groupSize} kids</span>
                    </li>
                    <li className="flex justify-between pb-2 border-b border-gray-100">
                      <span className="text-charcoal-light">Difficulty:</span>
                      <span className="font-medium capitalize">{config.difficulty}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-charcoal-light">Duration:</span>
                      <span className="font-medium">
                        {config.duration === '0-30' ? 'Less than 30 minutes' :
                         config.duration === '30-60' ? '30-60 minutes' :
                         '1-2 hours'}
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none">
                  <h2 className="text-xl font-medium mb-4">Team Setup</h2>
                  <p>{escapeRoom.teamSetup}</p>
                  
                  <h2 className="text-xl font-medium mt-6 mb-4">Prizes</h2>
                  <ul className="list-disc pl-5 space-y-1">
                    {escapeRoom.prizes.map((prize, index) => (
                      <li key={index}>{prize}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Stations Section - always show for print, hide if not active tab */}
            <div className={`stations mt-8 ${activeTab === 'stations' ? '' : 'print:block hidden'}`}>
              <h2 className="text-2xl font-display mb-6 print:page-break-before">Stations ({escapeRoom.stations.length})</h2>
              <div className="space-y-6">
                {escapeRoom.stations.map((station, index) => {
                  // Get supplies needed for this station
                  const stationSupplies = getStationSupplies(station.name, escapeRoom.supplies);
                  
                  return (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 print:mb-6 print:p-4">
                      <h3 className="text-xl font-medium mb-3">{index + 1}. {station.name}</h3>
                      <div className="mb-4">
                        <h4 className="font-semibold text-charcoal-light mb-1">Task:</h4>
                        <p>{station.task}</p>
                        
                        {/* Add printable content for tasks with letters or numbers */}
                        {hasPrintableContent(station.task) && 
                          getPrintableContent(station.task, station.answer) && (
                            <PrintableLetters 
                              contentType={getPrintableContent(station.task, station.answer)!.type} 
                              content={getPrintableContent(station.task, station.answer)!.content} 
                            />
                          )
                        }
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-charcoal-light mb-1">Answer:</h4>
                        <p className="font-medium">{station.answer}</p>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-charcoal-light mb-1">Hints:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {station.hints.map((hint, hintIndex) => (
                            <li key={hintIndex}>{hint}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-charcoal-light mb-1">Facilitator Instructions:</h4>
                        <p className="italic">{station.facilitatorInstructions}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-charcoal-light mb-1">Supplies Needed:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                          {stationSupplies.length > 0 ? (
                            stationSupplies.map((supply, supplyIndex) => (
                              <li key={supplyIndex}>{supply.name}</li>
                            ))
                          ) : (
                            <li>No specific supplies required for this station</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Supplies Section - always show for print, hide if not active tab */}
            <div className={`supplies mt-8 ${activeTab === 'supplies' ? '' : 'print:block hidden'}`}>
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
                            <span className="font-medium">{supply.name}</span>
                            <p className="text-sm text-gray-600">{supply.purpose}</p>
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
            
            {/* Facilitation Section - always show for print, hide if not active tab */}
            <div className={`facilitation mt-8 ${activeTab === 'facilitation' ? '' : 'print:block hidden'}`}>
              <h2 className="text-2xl font-display mb-6 print:page-break-before">Facilitation Guide</h2>
              
              <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 mb-6">
                <h3 className="text-xl font-medium mb-4">Setup</h3>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>Read through all stations and challenges to understand the flow.</li>
                  <li>Gather all supplies listed in the Supplies tab.</li>
                  <li>Set up each station in a different part of your home.</li>
                  <li>Hide clues and items as indicated in the facilitator instructions.</li>
                  <li>Set up team markers if you're dividing kids into teams.</li>
                </ol>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 mb-6">
                <h3 className="text-xl font-medium mb-4">Running the Activity</h3>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>Begin with a dramatic reading of the story to set the scene.</li>
                  <li>Explain the team setup: {escapeRoom.teamSetup}</li>
                  <li>Start with the first station, giving each team their first clue.</li>
                  <li>Use the hints provided only when teams are struggling.</li>
                  <li>Keep track of time to ensure the activity stays within the planned duration.</li>
                  <li>Award prizes at the conclusion of the activity.</li>
                </ol>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200">
                <h3 className="text-xl font-medium mb-4">Tips for Success</h3>
                <ul className="list-disc pl-5 space-y-3">
                  <li>Take photos of each station before kids arrive, so you can reset if needed.</li>
                  <li>Have extra paper, pencils, and supplies on hand.</li>
                  <li>Consider having small hints or clues for teams that fall behind.</li>
                  <li>Keep the difficulty level appropriate - it's better for kids to succeed with some hints than to get frustrated.</li>
                  <li>Consider having small prizes for everyone, not just the winning team.</li>
                  <li>Take photos during the activity to share with parents afterward.</li>
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
      
      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            margin: 1cm;
          }
          
          body {
            font-size: 12pt;
          }
          
          h1 {
            font-size: 24pt;
          }
          
          h2 {
            font-size: 18pt;
          }
          
          h3 {
            font-size: 14pt;
          }
          
          .print-hidden {
            display: none !important;
          }
          
          .shadow-card {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Result;
