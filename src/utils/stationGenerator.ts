
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
    
    console.log(`Successfully generated station: ${station.name}`);
    return station;
  } catch (error) {
    console.error('Failed to generate station:', error);
    
    // Re-throw the error instead of returning a fallback
    // This ensures that the UI can handle the failure appropriately
    throw error;
  }
};
