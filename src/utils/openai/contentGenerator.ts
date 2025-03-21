
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
  stationType: string,
  theme: string,
  ageGroup: string,
  difficulty: string
): Promise<any> => {
  try {
    console.log(`Generating ${stationType} station for theme: ${theme}, age group: ${ageGroup}`);
    
    // Get the prompt template for this station type
    const stationTypeObj = Object.values(StationType).find(type => type === stationType);
    let promptTemplate = '';
    
    if (stationTypeObj && stationTypeInfoMap[stationTypeObj]) {
      promptTemplate = stationTypeInfoMap[stationTypeObj].promptTemplate;
      // Replace {theme} placeholder with actual theme
      promptTemplate = promptTemplate.replace('{theme}', theme);
    } else {
      console.error('Unknown station type:', stationType);
      throw new Error(`Unknown station type: ${stationType}`);
    }
    
    // Create a more detailed prompt that ensures proper JSON formatting
    const prompt = `${promptTemplate}
    
Additional details:
- Age group: ${ageGroup}
- Difficulty: ${difficulty}

Format as valid JSON with no additional text.`;
    
    // Make the API request to OpenAI using the project API key
    const content = await callOpenAI(
      PROJECT_API_KEY,
      [
        {"role": "system", "content": "You are an Escape Room designer specialized in creating themed stations. Respond with valid JSON only."},
        {"role": "user", "content": prompt}
      ],
      { max_tokens: 800 }
    );

    console.log('Station data received from OpenAI');
    
    try {
      // Parse the JSON response
      const stationData = JSON.parse(content);
      
      // Add the station type to the data
      stationData.type = stationType;
      
      return stationData;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      throw new Error('Invalid station data format returned');
    }
  } catch (error) {
    console.error('Station generation error:', error);
    
    // Return a fallback station if API call fails
    return {
      name: `${theme.charAt(0).toUpperCase() + theme.slice(1)} ${stationType} Challenge`,
      task: `Solve the ${stationType} puzzle related to ${theme}.`,
      answer: "Sample answer (would be customized in actual implementation)",
      hints: [
        "Look carefully at the clues provided",
        "Consider how this relates to the theme",
        "The answer involves matching the pattern"
      ],
      facilitatorInstructions: "Help participants if they get stuck. Provide the hints in order.",
      supplies: ["Paper", "Pencils", "Clue cards"],
      type: stationType
    };
  }
};
