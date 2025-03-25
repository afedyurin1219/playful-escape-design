
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { EscapeRoomPlan, EscapeRoomConfig, Station } from '../components/EscapeRoomGenerator';
import { generateSingleStation, generateStations } from '../utils/stationGenerator';
import { generateStoryIntroduction } from '../utils/openaiClient';
import { StationType } from '../utils/stationTypes';

interface LocationState {
  escapeRoom: EscapeRoomPlan;
  config: EscapeRoomConfig;
}

export function useEscapeRoomResult() {
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
      
      const newStation = await generateSingleStation(state.config, index, existingType);
      
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
      
      const newStation = await generateSingleStation(state.config, stations.length);
      
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

  const isValidState = Boolean(state?.escapeRoom);
  const escapeRoom = isValidState ? {
    ...state.escapeRoom,
    story: customStory || state.escapeRoom.story,
    stations: stations
  } : null;
  const config = isValidState ? state.config : null;
  
  return {
    activeTab,
    setActiveTab,
    stations,
    currentStationIndex,
    isGeneratingStation,
    isGeneratingInitialStations,
    isLoadingStory,
    showApiKeyDialog,
    setShowApiKeyDialog,
    escapeRoom,
    config,
    customStory,
    handleChangeStation,
    handleDeleteStation,
    handleAddStation,
    handleSaveApiKey,
    isValidState
  };
}
