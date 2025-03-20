
import { Station, EscapeRoomConfig } from '../components/EscapeRoomGenerator';
import { generateWithOpenAI } from './openaiClient';
import { generateFallbackStation } from './fallbackStations';

/**
 * Generate a themed station using OpenAI API with fallback to predefined stations
 */
const generateStationWithGPT = async (
  config: EscapeRoomConfig,
  stationIndex: number,
  currentTheme: string
): Promise<Station> => {
  try {
    const prompt = `Create a creative and engaging escape room station that is DEEPLY AND EXPLICITLY tied to a "${currentTheme}" theme for ${config.ageGroup} year olds.
Difficulty level: ${config.difficulty}

CRITICAL REQUIREMENTS:
1. The station's name MUST specifically reference the "${currentTheme}" theme (e.g., for zombie theme: "Infected Laboratory", NOT "Mystery Box")
2. The puzzle/task MUST be directly related to "${currentTheme}" lore, objects, or concepts
3. All content MUST be age-appropriate for ${config.ageGroup} year olds
4. EVERY ELEMENT must explicitly connect to the "${currentTheme}" theme - NO generic puzzles or riddles

Format your response as a JSON object with the following fields:
{
  "name": "Station name with EXPLICIT "${currentTheme}" theme references",
  "task": "Detailed description of a task/puzzle that is DIRECTLY connected to ${currentTheme} - include specific themed elements and references",
  "answer": "The solution or answer to the puzzle",
  "hints": ["Hint 1 (themed)", "Hint 2 (themed)", "Hint 3 (themed)"],
  "facilitatorInstructions": "Instructions for setting up and running this themed station"
}`;

    // Call OpenAI API
    const content = await generateWithOpenAI(prompt);
    
    try {
      // Try to parse the response as JSON
      const stationData = JSON.parse(content);
      
      // Validate that the station is theme-specific
      if (!isStationThemeSpecific(stationData, currentTheme)) {
        console.log('Generated station not theme-specific enough, falling back to predefined stations');
        return generateFallbackStation(currentTheme, stationIndex);
      }
      
      return stationData as Station;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      
      // Fall back to predefined stations
      return generateFallbackStation(currentTheme, stationIndex);
    }
  } catch (error) {
    console.error('Error generating station:', error);
    
    // Fall back to predefined stations
    return generateFallbackStation(currentTheme, stationIndex);
  }
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
