
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
- IMPORTANT: If your task involves scrambled letters, letter rearrangement, or word puzzles, 
  you MUST use the EXACT SAME letters in both the task description and in any puzzle content.
  For example, if your task says "rearrange EOBNIGH", the printable content must also use "EOBNIGH".
- For word puzzles, ensure the letters EXACTLY match between the task description and the puzzle components
- CRITICAL: If your task mentions any "provided chart", "cipher key", "decoder", or similar reference material, 
  you MUST include a detailed description of this material in your response. These materials should be included 
  in the "facilitatorInstructions" field with clear instructions on how to create them.
- SUPPLIES LIST REQUIREMENT: If your task mentions ANY physical objects (like vials, blocks, markers, paper, etc.), 
  you MUST include these items in the "supplies" array. Never return an empty supplies list if the task or 
  facilitator instructions mention physical items needed.
- VERY IMPORTANT: Always check your task and facilitatorInstructions for mentioned supplies and ensure they ALL 
  appear in the "supplies" array. For example, if the task mentions "antidote vials" and "foam blocks", these 
  MUST be listed in the supplies array.
- SUPPLIES FORMAT: Each supply item MUST be a complete phrase that makes sense on its own. Do NOT list partial 
  phrases like "of blocks" or incomplete descriptions. Supply items should be full and descriptive like 
  "5 wooden blocks" or "Colored containers labeled with symbols".

Format as valid JSON with the following structure:
{
  "name": "Station Name - should be unique and creative",
  "task": "Detailed task description explaining what participants need to do",
  "answer": "The solution or expected outcome (must be specific and clear)",
  "hints": ["Hint 1 (subtle)", "Hint 2 (more direct)", "Hint 3 (very direct)"],
  "facilitatorInstructions": "Detailed instructions for the person running the escape room, including how to create any charts, ciphers, or printed materials referenced in the task",
  "supplies": ["Supply 1", "Supply 2", "Supply 3"]
}`;
    
    // Make the API request to OpenAI
    const content = await callOpenAI(
      apiKey,
      [
        {"role": "system", "content": `You are an Escape Room designer specialized in creating unique, creative, and original themed stations for ${ageGroup} year olds. Respond with valid JSON only. Never use templates or generic puzzles. Do not add markdown code blocks. CRITICAL: If your puzzle involves letters, words, or codes that participants need to rearrange or decode, ensure that the EXACT SAME letters appear in both the task description and any printable/puzzle components. If your task mentions any 'provided chart', 'cipher key', 'decoder', or similar reference material, you MUST include a detailed description of this material in your response. NEVER leave the supplies array empty if the task or facilitator instructions mention physical items. Always include ALL physical objects mentioned in the task or facilitator instructions in the supplies array. Each supply item MUST be a complete phrase that makes sense on its own.`},
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
      
      // Extract supplies from task and facilitator instructions if not already in supplies
      stationData.supplies = extractMissingSupplies(stationData);
      
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

/**
 * Extract supplies mentioned in the task or facilitator instructions but not listed in the supplies array
 */
const extractMissingSupplies = (stationData: any): string[] => {
  // Initialize supplies array if it doesn't exist or ensure it's a string array
  let currentSupplies: string[] = [];
  
  if (stationData.supplies) {
    // Make sure each supply is a string
    currentSupplies = Array.isArray(stationData.supplies) 
      ? stationData.supplies.filter((supply: any) => typeof supply === 'string')
      : [];
  }
  
  // Common words that might indicate supplies
  const supplyIndicators = [
    'vial', 'tube', 'container', 'box', 'card', 'paper', 'pen', 'marker', 'block', 
    'ball', 'puzzle', 'key', 'lock', 'timer', 'chart', 'map', 'rope', 'tape',
    'prop', 'costume', 'mask', 'glove', 'flashlight', 'light', 'candle', 'obstacle',
    'foam', 'inflatable', 'balloon', 'bottle', 'cup', 'board', 'game', 'dice',
    'token', 'figure', 'toy', 'model', 'equipment', 'tool', 'device', 'cloth',
    'fabric', 'string', 'cord', 'wire', 'badge', 'sticker', 'print', 'item'
  ];
  
  // Combined text to search for supplies
  const taskText = typeof stationData.task === 'string' ? stationData.task.toLowerCase() : '';
  const instructionsText = typeof stationData.facilitatorInstructions === 'string' 
    ? stationData.facilitatorInstructions.toLowerCase() 
    : '';
  const combinedText = `${taskText} ${instructionsText}`;
  
  // Find potential supplies in the text
  const supplies = new Set<string>(
    currentSupplies.map((s: string) => typeof s === 'string' ? s.toLowerCase() : '')
  );
  
  supplyIndicators.forEach(indicator => {
    if (combinedText.includes(indicator)) {
      // Find the context around the indicator word
      const regex = new RegExp(`(\\w+\\s+){0,3}${indicator}\\w*(?:\\s+\\w+){0,5}`, 'gi');
      const matches = combinedText.match(regex);
      
      if (matches) {
        matches.forEach(match => {
          // Check if this supply or a similar one is already in the list
          const isAlreadyIncluded = Array.from(supplies).some(
            supply => supply.includes(indicator) || match.includes(supply)
          );
          
          if (!isAlreadyIncluded) {
            // Clean up the match and add it to supplies
            let supplyName = match.trim()
              .replace(/^(the|a|an)\s+/i, '')  // Remove leading articles
              .replace(/\s+/g, ' ');  // Remove extra spaces
            
            // Make sure the supply is a complete phrase
            if (supplyName.length < 5 || !/\s/.test(supplyName)) {
              // If too short or single word, try to extend context
              const extendedRegex = new RegExp(`(\\w+\\s+){0,5}${indicator}\\w*(?:\\s+\\w+){0,7}`, 'gi');
              const extendedMatches = combinedText.match(extendedRegex);
              if (extendedMatches && extendedMatches.length > 0) {
                supplyName = extendedMatches[0].trim()
                  .replace(/^(the|a|an)\s+/i, '')
                  .replace(/\s+/g, ' ');
              }
              
              // If still too short, add generic descriptor
              if (supplyName.length < 5) {
                supplyName = `${indicator} for station setup`;
              }
            }
            
            // Check if supply ends with a preposition or incomplete thought
            const incompleteEndings = [' of', ' for', ' to', ' with', ' in', ' on', ' by', ' or', ' and', ' the'];
            let isIncomplete = incompleteEndings.some(ending => supplyName.endsWith(ending));
            
            // If supply starts with a preposition, it's likely incomplete
            const incompleteStarts = ['of ', 'for ', 'to ', 'with ', 'in ', 'on ', 'by ', 'or '];
            isIncomplete = isIncomplete || incompleteStarts.some(start => supplyName.startsWith(start));
            
            if (isIncomplete) {
              // Try to complete the phrase or use a more generic description
              supplyName = `Materials including ${indicator}s for station setup`;
            }
            
            // Capitalize first letter
            supplyName = supplyName.charAt(0).toUpperCase() + supplyName.slice(1);
            
            // Only add if the supply name is a complete thought
            if (supplyName.length > 8 && !isIncomplete) {
              supplies.add(supplyName);
            }
          }
        });
      }
    }
  });
  
  // Clean up supply list (remove fragments and duplicates)
  const cleanedSupplies = Array.from(supplies).filter(supply => typeof supply === 'string');
  
  // Post-process the supplies to remove duplicates and incomplete items
  const finalSupplies: string[] = [];
  const addedIndicators = new Set<string>();
  
  for (const supply of cleanedSupplies) {
    // Check if this supply is a complete item (not just a fragment)
    if (supply.length < 10 || !supply.includes(' ')) {
      continue; // Skip very short items or single words
    }
    
    // Skip if this supply has almost the same words as another already added
    const hasCloseMatch = finalSupplies.some(existingSupply => {
      const existingWords = new Set(existingSupply.toLowerCase().split(/\s+/));
      const currentWords = supply.toLowerCase().split(/\s+/);
      const commonWords = currentWords.filter(word => existingWords.has(word));
      return commonWords.length > currentWords.length * 0.6; // 60% word overlap
    });
    
    if (!hasCloseMatch) {
      // Check which indicators this supply contains
      const containedIndicators = supplyIndicators.filter(
        indicator => supply.toLowerCase().includes(indicator)
      );
      
      // Add if we haven't added a supply with any of these indicators yet
      const isNewIndicator = containedIndicators.some(
        indicator => !addedIndicators.has(indicator)
      );
      
      if (isNewIndicator || containedIndicators.length === 0) {
        finalSupplies.push(supply);
        // Mark all indicators in this supply as added
        containedIndicators.forEach(indicator => addedIndicators.add(indicator));
      }
    }
  }
  
  // If we still have no supplies but text mentions items, add a generic supply
  if (finalSupplies.length === 0 && (
    combinedText.includes('obstacle') || 
    combinedText.includes('item') || 
    combinedText.includes('prop') ||
    combinedText.includes('setup')
  )) {
    finalSupplies.push('Materials for station setup (as described in facilitator instructions)');
  }
  
  return finalSupplies;
};
