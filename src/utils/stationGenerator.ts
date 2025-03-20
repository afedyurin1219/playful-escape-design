
import { Station, EscapeRoomConfig } from '../components/EscapeRoomGenerator';
import { generateWithOpenAI } from './openaiClient';
import { generateFallbackStation } from './fallbackStations';

// Cache to track already generated stations per position
const generatedStationsCache = new Map<string, string[]>();

/**
 * Generate a themed station using OpenAI API with fallback to predefined stations
 */
const generateStationWithGPT = async (
  config: EscapeRoomConfig,
  stationIndex: number,
  currentTheme: string
): Promise<Station> => {
  try {
    // Initialize the cache entry for this theme if it doesn't exist
    const cacheKey = currentTheme.toLowerCase();
    if (!generatedStationsCache.has(cacheKey)) {
      generatedStationsCache.set(cacheKey, []);
    }
    
    // Get the list of already generated station names for this theme
    const generatedStationNames = generatedStationsCache.get(cacheKey) || [];
    
    const prompt = `Create a creative and engaging escape room station that is DEEPLY AND EXPLICITLY tied to a "${currentTheme}" theme for ${config.ageGroup} year olds.
Difficulty level: ${config.difficulty}

CRITICAL REQUIREMENTS:
1. The station's name MUST specifically reference the "${currentTheme}" theme (e.g., for zombie theme: "Infected Laboratory", NOT "Mystery Box")
2. The puzzle/task MUST be directly related to "${currentTheme}" lore, objects, or concepts
3. All content MUST be age-appropriate for ${config.ageGroup} year olds
4. EVERY ELEMENT must explicitly connect to the "${currentTheme}" theme - NO generic puzzles or riddles
5. DO NOT use content from other themes - ONLY use ${currentTheme} theme elements

Format your response as a JSON object with the following fields:
{
  "name": "Station name with EXPLICIT "${currentTheme}" theme references",
  "task": "Detailed description of a task/puzzle that is DIRECTLY connected to ${currentTheme} - include specific themed elements and references",
  "answer": "The solution or answer to the puzzle",
  "hints": ["Hint 1 (themed)", "Hint 2 (themed)", "Hint 3 (themed)"],
  "facilitatorInstructions": "Instructions for setting up and running this themed station"
}`;

    console.log(`Attempting to generate station for theme: "${currentTheme}"`);
    
    try {
      // Try to call OpenAI API
      const content = await generateWithOpenAI(prompt);
      console.log("Successfully received content from OpenAI");
      
      try {
        // Try to parse the response as JSON
        const stationData = JSON.parse(content);
        console.log("Successfully parsed station data:", stationData.name);
        
        // Validate that the station is theme-specific
        if (!isStationThemeSpecific(stationData, currentTheme)) {
          console.log('Generated station not theme-specific enough, falling back to predefined stations');
          return generateUniqueStation(currentTheme, stationIndex, generatedStationNames);
        }
        
        // Add this station name to the cache
        generatedStationsCache.get(cacheKey)?.push(stationData.name);
        
        return stationData as Station;
      } catch (parseError) {
        console.error('Failed to parse OpenAI response as JSON:', parseError);
        console.log('Raw content received:', content);
        
        // Fall back to predefined stations
        return generateUniqueStation(currentTheme, stationIndex, generatedStationNames);
      }
    } catch (error) {
      console.error('Error generating station with OpenAI:', error);
      
      // Fall back to predefined stations
      return generateUniqueStation(currentTheme, stationIndex, generatedStationNames);
    }
  } catch (error) {
    console.error('Error in station generation process:', error);
    
    // Ultimate fallback
    return generateUniqueStation(currentTheme, stationIndex, []);
  }
};

/**
 * Generate a unique station that hasn't been used yet
 */
const generateUniqueStation = (
  theme: string, 
  stationIndex: number, 
  usedStationNames: string[]
): Station => {
  console.log(`Generating unique station for theme: ${theme}, avoiding: ${usedStationNames.join(', ')}`);
  
  let attempts = 0;
  let station: Station;
  
  // Try up to 10 times to get a unique station
  do {
    station = generateFallbackStation(theme, stationIndex + attempts);
    attempts++;
    
    // Break after 10 attempts to avoid infinite loop
    if (attempts > 10) {
      console.log('Could not find a unique station after 10 attempts, using the last generated one');
      break;
    }
  } while (usedStationNames.includes(station.name));
  
  // Add this station name to the cache
  const cacheKey = theme.toLowerCase();
  if (!generatedStationsCache.has(cacheKey)) {
    generatedStationsCache.set(cacheKey, []);
  }
  generatedStationsCache.get(cacheKey)?.push(station.name);
  
  return station;
};

/**
 * Validates if a station is sufficiently theme-specific
 */
const isStationThemeSpecific = (station: Station, theme: string): boolean => {
  // Convert theme and station content to lowercase for case-insensitive comparison
  const themeWords = theme.toLowerCase().split(/[- ]+/);
  const nameContent = station.name.toLowerCase();
  const taskContent = station.task.toLowerCase();
  
  // Check if the station name contains the theme or theme words
  const nameContainsTheme = themeWords.some(word => 
    word.length > 3 && nameContent.includes(word)
  );
  
  // Check if the task description contains the theme or theme words
  const taskContainsTheme = themeWords.some(word => 
    word.length > 3 && taskContent.includes(word)
  );
  
  // Both name and task should be theme-specific
  return nameContainsTheme && taskContainsTheme;
};

export { generateStationWithGPT };
