import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EscapeRoomPlan, EscapeRoomConfig, Station } from '../components/EscapeRoomGenerator';
import { Button } from '@/components/ui/button';
import { Printer, Home, FileDown, Copy, ExternalLink, MoreVertical } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import PrintableLetters from '../components/PrintableLetters';
import { hasPrintableContent, getPrintableContent } from '../utils/printUtils';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LocationState {
  escapeRoom: EscapeRoomPlan;
  config: EscapeRoomConfig;
}

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [stations, setStations] = useState<Station[]>([]);
  
  const state = location.state as LocationState;
  
  useEffect(() => {
    if (!state?.escapeRoom) {
      navigate('/create');
    } else {
      setStations(state.escapeRoom.stations);
    }
  }, [state, navigate]);
  
  if (!state?.escapeRoom) {
    return null;
  }
  
  const { escapeRoom, config } = state;
  
  // Function to generate Amazon search link for a supply
  const getAmazonLink = (supplyName: string) => {
    const searchQuery = encodeURIComponent(supplyName);
    return `https://www.amazon.com/s?k=${searchQuery}`;
  };
  
  // Function to handle station change
  const handleChangeStation = (index: number) => {
    // Generate a new station - for simplicity, this creates a placeholder station
    // In a real implementation, this would generate a properly themed station
    const newStation: Station = {
      name: `New Station ${index + 1}`,
      task: "This is a new task you can customize.",
      answer: "Custom answer",
      hints: ["First hint", "Second hint"],
      facilitatorInstructions: "Instructions for facilitator."
    };
    
    const updatedStations = [...stations];
    updatedStations[index] = newStation;
    setStations(updatedStations);
    
    toast({
      title: "Station updated",
      description: `Station ${index + 1} has been changed.`,
    });
  };
  
  // Function to handle station deletion
  const handleDeleteStation = (index: number) => {
    const updatedStations = stations.filter((_, i) => i !== index);
    setStations(updatedStations);
    
    toast({
      title: "Station deleted",
      description: `Station ${index + 1} has been removed.`,
    });
  };
  
  const handleCopyToClipboard = () => {
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
    e.preventDefault();
    window.print();
  };
  
  const getStationSupplies = (stationName: string, supplies: Array<any>) => {
    const stationNameLower = stationName.toLowerCase();
    
    return supplies.filter(supply => {
      return supply.purpose.toLowerCase().includes(stationNameLower);
    });
  };
  
  return (
    <div className="min-h-screen bg-ivory text-charcoal pb-16 print:p-0">
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
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-display text-teal mb-3">{escapeRoom.title}</h1>
            <p className="text-lg max-w-3xl mx-auto">{escapeRoom.story}</p>
          </div>
          
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
          
          <div className="tab-content mb-16">
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
            
            <div className={`stations mt-8 ${activeTab === 'stations' ? '' : 'print:block hidden'}`}>
              <h2 className="text-2xl font-display mb-6 print:page-break-before">Stations ({stations.length})</h2>
              <div className="space-y-6">
                {stations.map((station, index) => {
                  const stationSupplies = getStationSupplies(station.name, escapeRoom.supplies);
                  
                  return (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-card print:shadow-none print:border print:border-gray-200 print:mb-6 print:p-4 relative">
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-medium">{index + 1}. {station.name}</h3>
                        <div className="print:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => handleChangeStation(index)}>
                                Change station
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteStation(index)}
                                className="text-destructive"
                              >
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="mb-4">
                        <h4 className="font-semibold text-charcoal-light mb-1">Task:</h4>
                        <p>{station.task}</p>
                        
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
      
      <style>
        {`
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
        `}
      </style>
    </div>
  );
};

export default Result;
