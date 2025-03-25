
import { Station, EscapeRoomConfig } from '../components/EscapeRoomGenerator';
import { generateStationWithOpenAI } from './openai/contentGenerator';
import { StationType, getRandomStationTypesForAgeGroup } from './stationTypes';

/**
 * Generate the appropriate number of stations based on the escape room configuration
 */
export const generateStations = async (config: EscapeRoomConfig): Promise<Station[]> => {
  try {
    // Determine how many stations to generate based on duration
    let stationCount = 3; // default for <30 mins
    
    if (config.duration === '30-60') {
      stationCount = 5;
    } else if (config.duration === '60-120') {
      stationCount = 7;
    }
    
    // Get random station types appropriate for the selected age group
    const stationTypes = getRandomStationTypesForAgeGroup(stationCount, config.ageGroup);
    
    console.log(`Generating ${stationCount} stations with types appropriate for age group ${config.ageGroup}:`, stationTypes);
    
    // Generate stations in parallel
    const stationPromises = stationTypes.map((type, index) => 
      generateSingleStation(config, index, type)
    );
    
    const stations = await Promise.all(stationPromises);
    
    // Verify that stations were generated successfully
    const validStations = stations.filter(station => 
      station && station.name && station.task && station.answer && station.hints
    );
    
    console.log(`Generated ${validStations.length} valid stations out of ${stationCount} requested`);
    
    if (validStations.length < stationCount) {
      console.warn("Some stations were not generated successfully");
    }
    
    // Post-process stations to ensure supplies are properly extracted
    validStations.forEach(station => {
      ensureStationHasSupplies(station);
    });
    
    return validStations;
  } catch (error) {
    console.error('Failed to generate stations:', error);
    throw error;
  }
};

/**
 * Ensure that a station has supplies if any are mentioned in the task or instructions
 */
const ensureStationHasSupplies = (station: Station): void => {
  if (!station.supplies || !Array.isArray(station.supplies) || station.supplies.length === 0) {
    // Look for supply indicators in task and facilitator instructions
    const combinedText = `${station.task || ''} ${station.facilitatorInstructions || ''}`.toLowerCase();
    const supplyIndicators = [
      'vial', 'tube', 'container', 'box', 'card', 'paper', 'pen', 'marker', 'block', 
      'ball', 'puzzle', 'key', 'lock', 'timer', 'chart', 'map', 'obstacle', 'props',
      'foam', 'inflatable', 'setup'
    ];
    
    const extractedSupplies: string[] = [];
    
    // Check for common supply terms
    supplyIndicators.forEach(term => {
      if (combinedText.includes(term)) {
        // Find phrases with this term
        const regex = new RegExp(`(\\w+\\s+){0,2}${term}(\\w*)(\\s+\\w+){0,3}`, 'gi');
        const matches = combinedText.match(regex);
        
        if (matches) {
          matches.forEach(match => {
            const supply = match.trim();
            // Ensure supply is a complete phrase
            if (supply.length > 5 && supply.includes(' ')) {
              // Format supply name: capitalize first letter
              const formattedSupply = supply.charAt(0).toUpperCase() + supply.slice(1);
              if (!extractedSupplies.includes(formattedSupply)) {
                extractedSupplies.push(formattedSupply);
              }
            }
          });
        }
      }
    });
    
    // Check for incomplete supplies and fix them
    const completeSupplies = extractedSupplies.map(supply => {
      // Check if supply ends with a preposition or incomplete thought
      const incompleteEndings = [' of', ' for', ' to', ' with', ' in', ' on', ' by', ' or', ' and'];
      const isIncomplete = incompleteEndings.some(ending => supply.endsWith(ending));
      
      if (isIncomplete || supply.length < 10) {
        // Make a more generic description based on the type of supply
        if (supply.includes('container')) return 'Containers for station activities';
        if (supply.includes('paper')) return 'Paper materials for puzzles';
        if (supply.includes('block')) return 'Building blocks for station tasks';
        return `${supply.split(' ')[0]} materials for activities`;
      }
      
      return supply;
    });
    
    // If we found supplies, add them to the station
    if (completeSupplies.length > 0) {
      station.supplies = completeSupplies;
    } else if (combinedText.includes('setup') || combinedText.includes('obstacle') || 
               combinedText.includes('area') || combinedText.includes('prepare')) {
      // Fallback for stations that need setup but don't mention specific supplies
      station.supplies = ['Materials for station setup (see facilitator instructions)'];
    }
  } else {
    // Clean up existing supplies to ensure they are complete phrases
    station.supplies = station.supplies.map((supply: string) => {
      // If supply is a string and is incomplete, fix it
      if (typeof supply === 'string') {
        const incompleteEndings = [' of', ' for', ' to', ' with', ' in', ' on', ' by', ' or', ' and'];
        const isIncomplete = incompleteEndings.some(ending => supply.endsWith(ending));
        
        if (isIncomplete || supply.length < 10 || !supply.includes(' ')) {
          // For common incomplete supplies, provide better descriptions
          if (supply.includes('container')) return 'Containers for station setup';
          if (supply.includes('paper')) return 'Paper materials for activities';
          if (supply.includes('block')) return 'Building blocks for puzzles';
          if (supply === 'Of blocks') return 'Building blocks for puzzles';
          if (supply === 'Or containers labeled') return 'Labeled containers for station activities';
          if (supply === 'Sturdy paper to create the') return 'Sturdy paper for station materials';
          
          // Generic fallback
          return 'Materials for station setup';
        }
        
        return supply;
      }
      return 'Station materials';
    });
  }
};

/**
 * Generate a single station based on the configuration
 */
export const generateSingleStation = async (
  config: EscapeRoomConfig, 
  index: number,
  stationType?: StationType
): Promise<Station> => {
  try {
    // If no specific station type is provided, pick a random one appropriate for the age group
    const type = stationType || getRandomStationTypesForAgeGroup(1, config.ageGroup)[0];
    
    // Get the theme (either selected theme or custom theme)
    const theme = config.customTheme || config.theme;
    
    // Generate a unique timestamp to ensure we get different results each time
    const timestamp = new Date().getTime();
    
    console.log(`Generating station of type ${type} for theme: ${theme} and age group: ${config.ageGroup} at ${timestamp}`);
    
    // Generate a fresh station using OpenAI with the API key from constants or user
    const station = await generateStationWithOpenAI(
      type,
      theme,
      config.ageGroup,
      config.difficulty
    );
    
    // Verify the generated station has all required fields
    if (!station?.name || !station?.task || !station?.answer || !Array.isArray(station?.hints)) {
      console.error('Generated station is missing required fields:', station);
      throw new Error('Generated station is missing required fields');
    }
    
    // Ensure station has supplies if any are mentioned in the task or instructions
    ensureStationHasSupplies(station);
    
    console.log(`Successfully generated station: ${station.name}`);
    return station;
  } catch (error) {
    console.error('Failed to generate station:', error);
    
    // Re-throw the error instead of returning a fallback
    // This ensures that the UI can handle the failure appropriately
    throw error;
  }
};
