
import { isValidOpenAIKey } from './validation';
import { callOpenAI } from './apiClient';
import { PROJECT_API_KEY, getProjectApiKey } from './constants';
import { StationType, stationTypeInfoMap, AGE_RANGES } from '../stationTypes';

/**
 * Call OpenAI API to generate content based on a prompt
 */
export const generateWithOpenAI = async (prompt: string): Promise<string> => {
  try {
    console.log('Calling OpenAI API with prompt about:', prompt.substring(0, 50) + '...');
    
    // Use project API key as the primary key
    let apiKey = getProjectApiKey();
    
    // If project key is invalid, try to get from localStorage as fallback
    if (!isValidOpenAIKey(apiKey)) {
      apiKey = localStorage.getItem('openai_api_key') || '';
      console.log('Project API key invalid, using user-provided API key as fallback');
    }
    
    // Check if any valid API key is available
    if (!isValidOpenAIKey(apiKey)) {
      console.log('No valid API key available');
      throw new Error('No valid OpenAI API key available. Please check your configuration.');
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
 * Generate story introduction using OpenAI
 */
export const generateStoryIntroduction = async (theme: string, ageGroup: string): Promise<string> => {
  try {
    console.log(`Generating story introduction for theme: ${theme}, age group: ${ageGroup}`);
    
    // Use project API key as the primary key
    let apiKey = getProjectApiKey();
    
    // If project key is invalid, try to get from localStorage as fallback
    if (!isValidOpenAIKey(apiKey)) {
      apiKey = localStorage.getItem('openai_api_key') || '';
      console.log('Project API key invalid, using user-provided API key as fallback for story generation');
    }
    
    // Check if any valid API key is available
    if (!isValidOpenAIKey(apiKey)) {
      throw new Error('No valid OpenAI API key available for story generation.');
    }
    
    // Determine appropriate complexity based on age group
    let complexity = 'simple';
    if (ageGroup === AGE_RANGES.PRETEEN) {
      complexity = 'moderate';
    } else if ([AGE_RANGES.TEEN, AGE_RANGES.ADULT].includes(ageGroup)) {
      complexity = 'complex';
    }
    
    // Create the prompt based on the theme and age group
    const prompt = `Write a ${complexity} story introduction for an escape room. The room theme is ${theme}. The audience is ${ageGroup} years old. Ensure the language and concepts are appropriate for ${ageGroup} year olds. Do not design challenges, only the story introduction. Limit - 5 sentences max.`;
    
    // Make the API request to OpenAI
    const content = await callOpenAI(
      apiKey,
      [
        {"role": "system", "content": "You are an Escape Room designer specializing in age-appropriate content."},
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
 * Generate a themed station using the OpenAI API
 */
export const generateStationWithOpenAI = async (
  stationType: StationType,
  theme: string,
  ageGroup: string,
  difficulty: string
): Promise<any> => {
  try {
    console.log(`Generating ${stationType} station for theme: ${theme}, age group: ${ageGroup}`);
    
    // Use project API key as the primary key
    let apiKey = getProjectApiKey();
    
    // If project key is invalid, try to get from localStorage as fallback
    if (!isValidOpenAIKey(apiKey)) {
      apiKey = localStorage.getItem('openai_api_key') || '';
      console.log('Project API key invalid, using user-provided API key as fallback for station generation');
    }
    
    // Check if any valid API key is available
    if (!isValidOpenAIKey(apiKey)) {
      throw new Error('No valid OpenAI API key available for station generation.');
    }
    
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
- Make this station AGE-APPROPRIATE for ${ageGroup} year olds
- Ensure the complexity matches this age group (${ageGroup})
- Do NOT use templates or generic puzzles
- Make this station CREATIVE and SPECIFICALLY TIED to the ${theme} theme
- Avoid copying common escape room puzzles

CRITICAL TASK DESCRIPTION RULES:
- NEVER INCLUDE THE ANSWER in the task description
- For counting tasks, NEVER mention the exact number in the task (e.g., say "count the blocks" not "count the 10 blocks")
- NEVER use phrases like "there are 10 blocks" when 10 is the answer
- For quantity-based tasks, use vague terms like "several", "some", or "many" instead of exact numbers
- For physical tasks, don't reveal what players should find - make them discover it
- If the task involves finding a number, don't reveal that number in the task
- Keep the answer SEPARATE in the "answer" field only

CIPHER AND PRINTABLE CONTENT RULES:
- For any cipher, code, or encrypted message tasks, provide the COMPLETE cipher text that needs to be decoded
- If your task mentions "decrypt this message" or similar, include the FULL encrypted message in the task
- When creating ciphers, ensure the entire message is included and makes sense when decoded
- For word scrambles, the letters in the task MUST be the exact same letters needed to form the answer
- Any printable content referenced in the task must be COMPLETELY described in the task and facilitator instructions

SUPPLY LIST REQUIREMENTS:
- You MUST include a detailed list of all physical supplies needed for this station in the "supplies" array
- List EVERY physical item that would be needed to run this station (paper, pens, props, decorations, etc.)
- Each supply MUST be a complete, standalone phrase (e.g., "10 printed pictures of magical creatures" not "of pictures")
- If your station requires themed containers, specify them clearly (e.g., "3 potion vials with colored water" not "vials")
- Do NOT use phrases that start with prepositions like "of", "for", "with", etc.
- NEVER list incomplete supply descriptions like "Pen sesame" or "Or containers labeled"
- If the supply has a specific number, include it (e.g., "5 colored markers" not just "colored markers")
- Include ALL materials needed for setup, even if they seem obvious
- EVERY item mentioned in the task or facilitator instructions MUST appear in the supplies list

Format as valid JSON with the following structure:
{
  "name": "Station Name - should be unique and creative",
  "task": "Detailed task description explaining what participants need to do (DO NOT include the answer in the task)",
  "answer": "The solution or expected outcome (must be specific and clear)",
  "hints": ["Hint 1 (subtle)", "Hint 2 (more direct)", "Hint 3 (very direct)"],
  "facilitatorInstructions": "Detailed instructions for the person running the escape room, including how to create any charts, ciphers, or printed materials referenced in the task",
  "supplies": ["Complete supply 1", "Complete supply 2", "Complete supply 3", "etc."]
}`;
    
    // Make the API request to OpenAI
    const content = await callOpenAI(
      apiKey,
      [
        {
          "role": "system", 
          "content": `You are an Escape Room designer specialized in creating unique, creative, and original themed stations for ${ageGroup} year olds. 
          
Reply with valid JSON only. Never use markdown code blocks.

IMPORTANT GUIDELINES:
1. NEVER include the answer in the task description. The answer should be stored separately in the "answer" field.
2. For counting tasks, NEVER mention the exact quantity in the task description (e.g., use "count the blocks" not "count the 10 blocks").
3. For cipher tasks, include the COMPLETE encrypted message in your response, not just the beginning or a partial message.
4. For word scrambles or codes, the EXACT SAME scrambled letters or code must appear in both the task description and in the printable materials.
5. All supplies must be listed as complete, standalone phrases that clearly describe exactly what is needed.
6. NEVER return incomplete supply descriptions like "of blocks", "with markers", or "for decoration".
7. Each supply must be a complete noun phrase that could appear in a shopping list.
8. DO NOT REVEAL THE ANSWER in the task description in any way - make participants truly discover it.`
        },
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
      
      // Ensure supplies is an array of strings (for type safety)
      if (!stationData.supplies || !Array.isArray(stationData.supplies)) {
        stationData.supplies = [];
      } else {
        stationData.supplies = stationData.supplies
          .filter((supply: unknown): supply is string => typeof supply === 'string')
          .map((supply: string) => supply.trim())
          .filter((supply: string) => supply.length > 0);
      }
      
      // Additional check to ensure answer is not included in the task description
      const answerLower = String(stationData.answer).toLowerCase();
      const taskLower = stationData.task.toLowerCase();
      
      // If the answer appears directly in the task, try to sanitize the task
      if (answerLower !== '' && taskLower.includes(answerLower)) {
        console.warn('Answer found in task description, attempting to sanitize...');
        // Remove "Answer: X" pattern if present
        stationData.task = stationData.task.replace(/\s*Answer:\s*.*$/i, '');
        
        // For counting tasks, replace exact numbers with vague quantities
        if (!isNaN(Number(stationData.answer))) {
          const numAnswer = Number(stationData.answer);
          const numRegex = new RegExp(`\\b${numAnswer}\\b`, 'g');
          stationData.task = stationData.task.replace(numRegex, 'some');
          stationData.task = stationData.task.replace(/there are \d+ /gi, 'there are some ');
        }
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
