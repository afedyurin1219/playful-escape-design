
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
    const prompt = `Create a creative and age-appropriate escape room station for ${config.ageGroup} year olds with a ${currentTheme} theme. 
The difficulty level should be ${config.difficulty}.
Format your response as a JSON object with the following fields:
{
  "name": "Station name that fits the theme",
  "task": "Detailed description of the task or puzzle to solve",
  "answer": "The solution or answer to the puzzle",
  "hints": ["Hint 1", "Hint 2", "Hint 3"],
  "facilitatorInstructions": "Instructions for the person running the activity"
}`;

    // Call OpenAI API
    const content = await generateWithOpenAI(prompt);
    
    try {
      // Try to parse the response as JSON
      const stationData = JSON.parse(content);
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

export { generateStationWithGPT };
