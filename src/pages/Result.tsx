
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { EscapeRoomPlan, EscapeRoomConfig, Station } from '../components/EscapeRoomGenerator';
import { useToast } from '@/components/ui/use-toast';
import { generateStationWithGPT } from '../utils/stationGenerator';
import ApiKeyInput from '../components/ApiKeyInput';
import { isValidOpenAIKey } from '../utils/openaiClient';

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
  
  const state = location.state as LocationState;
  
  // Check if API key is valid on component mount
  useEffect(() => {
    const validateStoredApiKey = () => {
      const apiKey = localStorage.getItem('openai_api_key');
      
      // If API key exists but is invalid, show dialog
      if (apiKey && !isValidOpenAIKey(apiKey)) {
        console.log('Invalid API key format detected in localStorage');
        toast({
          title: "Invalid API Key Format",
          description: "Your saved API key is not in a valid format. Please provide a standard OpenAI API key.",
          variant: "destructive"
        });
        setShowApiKeyDialog(true);
      }
    };
    
    validateStoredApiKey();
  }, [toast]);
  
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
  
  // Function to handle station change
  const handleChangeStation = async (index: number) => {
    // Don't regenerate if already generating
    if (isGeneratingStation) return;
    
    // Prevent rapid successive generations for the same station
    const now = Date.now();
    const lastGenerated = lastGeneratedTimestamp[index] || 0;
    if (now - lastGenerated < 2000) {
      console.log('Throttling generation requests');
      return;
    }
    
    // Check if we have an API key
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }
    
    setCurrentStationIndex(index);
    setIsGeneratingStation(true);
    setLastGeneratedTimestamp({...lastGeneratedTimestamp, [index]: now});
    
    try {
      // Get the current theme - ensuring we use the exact theme the user selected
      const theme = config.customTheme || config.theme;
      console.log(`Generating station for theme: ${theme}`);
      
      // Generate a new station with ChatGPT
      const newStation = await generateStationWithGPT(config, index, theme);
      
      // Update stations array
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
  
  // Function to handle station deletion
  const handleDeleteStation = (index: number) => {
    const updatedStations = stations.filter((_, i) => i !== index);
    setStations(updatedStations);
    
    toast({
      title: "Station deleted",
      description: `Station ${index + 1} has been removed.`,
    });
  };
  
  // Function to add a new station
  const handleAddStation = async () => {
    // Check if we have an API key
    const apiKey = localStorage.getItem('openai_api_key');
    if (!apiKey) {
      setShowApiKeyDialog(true);
      return;
    }
    
    setIsGeneratingStation(true);
    setCurrentStationIndex(null);
    
    try {
      // Get the current theme
      const theme = config.customTheme || config.theme;
      
      // Generate a new station with ChatGPT
      const newStation = await generateStationWithGPT(config, stations.length, theme);
      
      // Add new station to stations array
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
      description: "You can now generate stations with your API key.",
    });
  };
  
  return (
    <div className="min-h-screen bg-ivory text-charcoal pb-16 print:p-0">
      <ResultHeader title={escapeRoom.title} story={escapeRoom.story} />
      
      <main className="max-w-6xl mx-auto px-6 print:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* API Key Dialog */}
          <ApiKeyInput 
            isOpen={showApiKeyDialog} 
            onClose={() => setShowApiKeyDialog(false)}
            onSave={handleSaveApiKey}
          />
          
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-display text-teal mb-3">{escapeRoom.title}</h1>
            <p className="text-lg max-w-3xl mx-auto">{escapeRoom.story}</p>
          </div>
          
          <ResultActions escapeRoom={escapeRoom} />
          
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
              <OverviewTab escapeRoom={escapeRoom} config={config} />
            </div>
            
            <div className={`${activeTab === 'stations' ? '' : 'print:block hidden'}`}>
              <StationsTab 
                stations={stations} 
                escapeRoom={escapeRoom}
                isGeneratingStation={isGeneratingStation}
                currentStationIndex={currentStationIndex}
                onChangeStation={handleChangeStation}
                onDeleteStation={handleDeleteStation}
                onAddStation={handleAddStation}
              />
            </div>
            
            <div className={`${activeTab === 'supplies' ? '' : 'print:block hidden'}`}>
              <SuppliesTab escapeRoom={escapeRoom} />
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
