
import { Station, EscapeRoomConfig } from '../components/EscapeRoomGenerator';
import { generateStationWithOpenAI } from './openai/contentGenerator';
import { StationType, stationTypeInfoMap, getRandomStationTypes } from './stationTypes';

// Cache to store generated stations
const stationCache: Record<string, Station> = {};

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
    
    // Get random station types to use
    const stationTypes = getRandomStationTypes(stationCount);
    
    console.log(`Generating ${stationCount} stations with types:`, stationTypes);
    
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
    
    return validStations;
  } catch (error) {
    console.error('Failed to generate stations:', error);
    throw error;
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
    // If no specific station type is provided, pick a random one
    const type = stationType || getRandomStationTypes(1)[0];
    
    // Get the theme (either selected theme or custom theme)
    const theme = config.customTheme || config.theme;
    
    // Generate a cache key that includes a timestamp to reduce caching
    // This ensures more variety in generated stations
    const timestamp = new Date().getTime();
    const cacheKey = `${theme}-${config.ageGroup}-${type}-${index}-${timestamp % 1000000}`;
    
    console.log(`Generating station of type ${type} for theme: ${theme}`);
    
    // Generate the station using OpenAI
    const station = await generateStationWithOpenAI(
      type,
      theme,
      config.ageGroup,
      config.difficulty
    );
    
    // Cache the station
    stationCache[cacheKey] = station;
    
    return station;
  } catch (error) {
    console.error('Failed to generate station:', error);
    
    // Return a fallback station if generation fails
    return {
      name: `Station ${index + 1}`,
      task: "This station could not be generated. Please try again or create a different station.",
      answer: "N/A",
      hints: ["Try refreshing the station"],
      facilitatorInstructions: "This station needs to be regenerated or replaced.",
      type: stationType || StationType.DECIPHER
    };
  }
};
