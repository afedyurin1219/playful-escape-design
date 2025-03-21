
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EscapeRoomPlan, EscapeRoomConfig, Station } from '../components/EscapeRoomGenerator';
import { useToast } from '@/components/ui/use-toast';
import { generateSingleStation, generateStations } from '../utils/stationGenerator';
import ApiKeyInput from '../components/ApiKeyInput';
import { isValidOpenAIKey, generateStoryIntroduction } from '../utils/openaiClient';
import { StationType } from '../utils/stationTypes';

// Import components
import ResultHeader from '../components/result/ResultHeader';
import ResultActions from '../components/result/ResultActions';
import OverviewTab from '../components/result/OverviewTab';
import StationsTab from '../components/result/StationsTab';
import SuppliesTab from '../components/result/SuppliesTab';
import FacilitationTab from '../components/result/FacilitationTab';

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
  const [currentStationIndex, setCurrentStationIndex] = useState<number | null>(null);
  const [isGeneratingStation, setIsGeneratingStation] = useState(false);
  const [lastGeneratedTimestamp, setLastGeneratedTimestamp] = useState<Record<number, number>>({});
  const [showApiKeyDialog, setShowApiKeyDialog] = useState(false);
  const [customStory, setCustomStory] = useState<string | null>(null);
  const [isLoadingStory, setIsLoadingStory] = useState(false);
  const [isGeneratingInitialStations, setIsGeneratingInitialStations] = useState(false);
  
  const state = location.state as LocationState;
  
  useEffect(() => {
    if (!state?.escapeRoom) {
      navigate('/create');
    } else {
      if (state.config) {
        generateCustomStory(state.config);
        generateInitialStations(state.config);
      }
    }
  }, [state, navigate]);
  
  const generateInitialStations = async (config: EscapeRoomConfig) => {
    setIsGeneratingInitialStations(true);
    setStations([]);
    
    try {
      console.log("Starting initial station generation with OpenAI...");
      const generatedStations = await generateStations(config);
      
      if (generatedStations.length === 0) {
        throw new Error("Failed to generate stations");
      }
      
      console.log(`Successfully generated ${generatedStations.length} stations with OpenAI`);
      setStations(generatedStations);
      
      toast({
        title: "Stations Generated",
        description: `Generated ${generatedStations.length} stations for your escape room.`,
      });
    } catch (error) {
      console.error("Failed to generate stations:", error);
      toast({
        title: "Station Generation Failed",
        description: "Could not generate stations. Please try adding them manually or refresh the page.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingInitialStations(false);
    }
  };
  
  const generateCustomStory = async (config: EscapeRoomConfig) => {
    if (isLoadingStory) return;
    
    setIsLoadingStory(true);
    
    try {
      const theme = config.customTheme || config.theme;
      const ageGroup = config.ageGroup;
      
      const story = await generateStoryIntroduction(theme, ageGroup);
      setCustomStory(story);
      
      console.log("Story introduction generated successfully:", story);
    } catch (error) {
      console.error("Failed to generate story introduction:", error);
      toast({
        title: "Story Generation Failed",
        description: "Could not generate a custom story introduction. Using default story instead.",
        variant: "destructive"
      });
    } finally {
      setIsLoadingStory(false);
    }
  };
  
  if (!state?.escapeRoom) {
    return null;
  }
  
  const { escapeRoom, config } = state;
  
  const handleChangeStation = async (index: number) => {
    if (isGeneratingStation) return;
    
    const now = Date.now();
    const lastGenerated = lastGeneratedTimestamp[index] || 0;
    if (now - lastGenerated < 2000) {
      console.log('Throttling generation requests');
      return;
    }
    
    setCurrentStationIndex(index);
    setIsGeneratingStation(true);
    setLastGeneratedTimestamp({...lastGeneratedTimestamp, [index]: now});
    
    try {
      console.log(`Regenerating station ${index} with OpenAI...`);
      
      const existingType = stations[index]?.type as StationType | undefined;
      
      const newStation = await generateSingleStation(config, index, existingType);
      
      console.log(`Successfully regenerated station ${index}:`, newStation.name);
      
      const updatedStations = [...stations];
      updatedStations[index] = newStation;
      setStations(updatedStations);
      
      toast({
        title: "Station updated",
        description: `"${newStation.name}" has been generated.`,
      });
    } catch (error) {
      console.error('Error generating station:', error);
      toast({
        title: "Generation failed",
        description: "Failed to generate a new station. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingStation(false);
      setCurrentStationIndex(null);
    }
  };
  
  const handleDeleteStation = (index: number) => {
    const updatedStations = stations.filter((_, i) => i !== index);
    setStations(updatedStations);
    
    toast({
      title: "Station deleted",
      description: `Station ${index + 1} has been removed.`,
    });
  };
  
  const handleAddStation = async () => {
    setIsGeneratingStation(true);
    setCurrentStationIndex(null);
    
    try {
      console.log("Generating new station with OpenAI...");
      
      const newStation = await generateSingleStation(config, stations.length);
      
      console.log(`Successfully generated new station: ${newStation.name}`);
      
      setStations([...stations, newStation]);
      
      toast({
        title: "Station added",
        description: `"${newStation.name}" has been added to your escape room.`,
      });
    } catch (error) {
      console.error('Error generating station:', error);
      toast({
        title: "Generation failed",
        description: "Failed to generate a new station. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingStation(false);
    }
  };
  
  const handleSaveApiKey = (apiKey: string) => {
    localStorage.setItem('openai_api_key', apiKey);
    toast({
      title: "API Key Updated",
      description: "Your API key has been saved for future use.",
    });
  };
  
  const displayedStory = customStory || escapeRoom.story;
  
  return (
    <div className="min-h-screen bg-ivory text-charcoal pb-16 print:p-0">
      <ResultHeader title={escapeRoom.title} story={customStory || ''} />
      
      <main className="max-w-6xl mx-auto px-6 print:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ApiKeyInput 
            isOpen={showApiKeyDialog} 
            onClose={() => setShowApiKeyDialog(false)}
            onSave={handleSaveApiKey}
          />
          
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-display text-teal mb-3">{escapeRoom.title}</h1>
            {isLoadingStory ? (
              <p className="text-lg max-w-3xl mx-auto italic">Loading story introduction...</p>
            ) : (
              <p className="text-lg max-w-3xl mx-auto">{displayedStory}</p>
            )}
          </div>
          
          <ResultActions escapeRoom={{...escapeRoom, story: displayedStory, stations: stations}} />
          
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
            <div className={`${activeTab === 'overview' ? '' : 'print:block hidden'}`}>
              <OverviewTab escapeRoom={{...escapeRoom, story: displayedStory, stations: stations}} config={config} />
            </div>
            
            <div className={`${activeTab === 'stations' ? '' : 'print:block hidden'}`}>
              <StationsTab 
                stations={stations} 
                escapeRoom={{...escapeRoom, story: displayedStory, stations: stations}}
                config={config}
                isGeneratingStation={isGeneratingStation || isGeneratingInitialStations}
                currentStationIndex={currentStationIndex}
                onChangeStation={handleChangeStation}
                onDeleteStation={handleDeleteStation}
                onAddStation={handleAddStation}
              />
            </div>
            
            <div className={`${activeTab === 'supplies' ? '' : 'print:block hidden'}`}>
              <SuppliesTab escapeRoom={{...escapeRoom, story: displayedStory, stations: stations}} />
            </div>
            
            <div className={`${activeTab === 'facilitation' ? '' : 'print:block hidden'}`}>
              <FacilitationTab />
            </div>
          </div>
        </motion.div>
      </main>
      
      <style>{`
        @media print {
          @page { margin: 1cm; }
          body { font-size: 12pt; }
          h1 { font-size: 24pt; }
          h2 { font-size: 18pt; }
          h3 { font-size: 14pt; }
          .print-hidden { display: none !important; }
          .shadow-card { box-shadow: none !important; }
        }
      `}</style>
    </div>
  );
};

export default Result;
