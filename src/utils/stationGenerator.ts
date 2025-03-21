
import { Station, EscapeRoomConfig } from '../components/EscapeRoomGenerator';
import { generateStationWithOpenAI } from './openaiClient';
import { generateFallbackStation } from './fallbackStations';
import { StationType, stationTypeInfoMap, getRandomStationTypes, getStationCountForDuration } from './stationTypes';

// Cache to track already generated stations per theme
const generatedStationsCache = new Map<string, string[]>();

/**
 * Generate multiple stations for an escape room based on the configuration
 */
export const generateStations = async (
  config: EscapeRoomConfig
): Promise<Station[]> => {
  // Determine how many stations to generate based on duration
  const stationCount = getStationCountForDuration(config.duration);
  
  // Get a random selection of station types
  const selectedStationTypes = getRandomStationTypes(stationCount);
  
  console.log(`Generating ${stationCount} stations for theme: ${config.customTheme || config.theme}`);
  console.log('Selected station types:', selectedStationTypes);
  
  // Initialize the stations array
  const stations: Station[] = [];
  
  // Generate each station in parallel
  const stationPromises = selectedStationTypes.map(async (stationType, index) => {
    try {
      const stationInfo = stationTypeInfoMap[stationType];
      console.log(`Generating station ${index + 1}: ${stationInfo.name}`);
      
      // Generate the station
      const station = await generateStationForType(
        stationInfo,
        config,
        index
      );
      
      return station;
    } catch (error) {
      console.error(`Error generating station ${index + 1}:`, error);
      // Return a fallback station if generation fails
      return generateFallbackStation(config.customTheme || config.theme, index);
    }
  });
  
  // Wait for all stations to be generated
  const results = await Promise.allSettled(stationPromises);
  
  // Process the results
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      stations.push(result.value);
    } else {
      console.error(`Station ${index + 1} generation rejected:`, result.reason);
      // Add a fallback station
      stations.push(generateFallbackStation(config.customTheme || config.theme, index));
    }
  });
  
  return stations;
};

/**
 * Generate a single station based on its type
 */
const generateStationForType = async (
  stationInfo: typeof stationTypeInfoMap[StationType],
  config: EscapeRoomConfig,
  stationIndex: number
): Promise<Station> => {
  const theme = config.customTheme || config.theme;
  
  try {
    // Use the station's prompt template
    const stationData = await generateStationWithOpenAI(
      stationInfo.promptTemplate,
      theme,
      config.ageGroup,
      config.difficulty
    );
    
    // Add to cache
    const cacheKey = theme.toLowerCase();
    if (!generatedStationsCache.has(cacheKey)) {
      generatedStationsCache.set(cacheKey, []);
    }
    generatedStationsCache.get(cacheKey)?.push(stationData.name);
    
    return stationData as Station;
  } catch (error) {
    console.error(`Error generating ${stationInfo.name} station:`, error);
    // Fall back to predefined stations
    return generateFallbackStation(theme, stationIndex);
  }
};

/**
 * Generate a single station on demand (for adding or refreshing a station)
 */
export const generateSingleStation = async (
  config: EscapeRoomConfig,
  stationIndex: number
): Promise<Station> => {
  const theme = config.customTheme || config.theme;
  
  // Get a random station type
  const allTypes = Object.values(StationType);
  const randomType = allTypes[Math.floor(Math.random() * allTypes.length)];
  const stationInfo = stationTypeInfoMap[randomType];
  
  console.log(`Generating single station with type: ${stationInfo.name}`);
  
  try {
    return await generateStationForType(stationInfo, config, stationIndex);
  } catch (error) {
    console.error('Error generating single station:', error);
    return generateFallbackStation(theme, stationIndex);
  }
};
