
import { isValidOpenAIKey } from './validation';
import { callOpenAI } from './apiClient';
import { PROJECT_API_KEY } from './constants';
import { StationType, stationTypeInfoMap } from '../stationTypes';

/**
 * Call OpenAI API to generate content based on a prompt
 */
export const generateWithOpenAI = async (prompt: string): Promise<string> => {
  try {
    console.log('Calling OpenAI API with prompt about:', prompt.substring(0, 50) + '...');
    
    // Get API key from localStorage
    let apiKey = localStorage.getItem('openai_api_key');
    
    // Check if API key is available and valid
    if (!apiKey || !isValidOpenAIKey(apiKey)) {
      console.log('API key validation failed:', apiKey ? 'Invalid format' : 'Missing key');
      
      // Log first few characters if available for debugging
      if (apiKey) {
        console.log('Key format:', apiKey.substring(0, 15) + '...');
      }
      
      throw new Error('Invalid OpenAI API key. Please provide a valid key that starts with "sk-".');
    }
    
    const content = await callOpenAI(
      apiKey, 
      [{ role: 'user', content: prompt }],
      { max_tokens: 800 }
    );

    console.log('Successfully received response from OpenAI');
    return content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};

/**
 * Generate story introduction using OpenAI with the specific API key
 */
export const generateStoryIntroduction = async (theme: string, ageGroup: string): Promise<string> => {
  try {
    console.log(`Generating story introduction for theme: ${theme}, age group: ${ageGroup}`);
    
    // Create the prompt based on the theme and age group
    const prompt = `Write a story introduction for an escape room. The room theme is ${theme}. The audience is ${ageGroup} years old. Do not design challenges, only the story introduction. Limit - 5 sentences max.`;
    
    // Make the API request to OpenAI using the project API key
    const content = await callOpenAI(
      PROJECT_API_KEY,
      [
        {"role": "system", "content": "You are an Escape Room designer."},
        {"role": "user", "content": prompt}
      ]
    );

    console.log('Story introduction received from OpenAI');
    return content;
  } catch (error) {
    console.error('Story generation error:', error);
    // Return a fallback story if API call fails
    return "An exciting adventure awaits! Participants will need to solve puzzles, find clues, and work together to complete a series of challenges. Each station presents a unique problem to overcome. As you progress, you'll unlock secrets and discover hidden treasures. The clock is ticking, so work quickly to succeed!";
  }
};

/**
 * Generate a themed station using the OpenAI API with project key
 */
export const generateStationWithOpenAI = async (
  stationType: StationType,
  theme: string,
  ageGroup: string,
  difficulty: string
): Promise<any> => {
  try {
    console.log(`Generating ${stationType} station for theme: ${theme}, age group: ${ageGroup}`);
    
    // Get the prompt template for this station type
    let promptTemplate = '';
    
    if (stationTypeInfoMap[stationType]) {
      promptTemplate = stationTypeInfoMap[stationType].promptTemplate;
      // Replace {theme} placeholder with actual theme
      promptTemplate = promptTemplate.replace('{theme}', theme);
    } else {
      console.error('Unknown station type:', stationType);
      throw new Error(`Unknown station type: ${stationType}`);
    }
    
    // Create a more detailed prompt that ensures proper JSON formatting and originality
    const prompt = `${promptTemplate}
    
Additional details:
- Age group: ${ageGroup}
- Difficulty: ${difficulty}
- Theme: ${theme}

IMPORTANT REQUIREMENTS:
- Create a COMPLETELY ORIGINAL and UNIQUE station for the theme "${theme}"
- Do NOT use templates or generic puzzles
- Make this station CREATIVE and SPECIFICALLY TIED to the ${theme} theme
- Avoid copying common escape room puzzles

Format as valid JSON with the following structure:
{
  "name": "Station Name - should be unique and creative",
  "task": "Detailed task description explaining what participants need to do",
  "answer": "The solution or expected outcome (must be specific and clear)",
  "hints": ["Hint 1 (subtle)", "Hint 2 (more direct)", "Hint 3 (very direct)"],
  "facilitatorInstructions": "Detailed instructions for the person running the escape room",
  "supplies": ["Supply 1", "Supply 2", "Supply 3"]
}`;
    
    // Make the API request to OpenAI using the project API key
    const content = await callOpenAI(
      PROJECT_API_KEY,
      [
        {"role": "system", "content": "You are an Escape Room designer specialized in creating unique, creative, and original themed stations. Respond with valid JSON only. Never use templates or generic puzzles. Do not add markdown code blocks."},
        {"role": "user", "content": prompt}
      ],
      { max_tokens: 1000 }  // Increased token limit for more detailed responses
    );

    console.log('Station data received from OpenAI');
    
    try {
      // Clean the response by removing any backticks, code fences or markdown
      const cleanedContent = content
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();
      
      console.log('Cleaned content for parsing:', cleanedContent.substring(0, 50) + '...');
      
      // Parse the JSON response
      const stationData = JSON.parse(cleanedContent);
      
      // Add the station type to the data
      stationData.type = stationType;
      
      // Verify that we have the required fields
      if (!stationData.name || !stationData.task || !stationData.answer || !Array.isArray(stationData.hints)) {
        throw new Error('Station data is missing required fields');
      }
      
      return stationData;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      console.error('Raw response:', content);
      throw new Error('Invalid station data format returned');
    }
  } catch (error) {
    console.error('Station generation error:', error);
    throw error;  // Re-throw the error instead of returning a fallback
  }
};
