
import { Station, EscapeRoomConfig } from '../components/EscapeRoomGenerator';

const OPENAI_API_KEY = "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";

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

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(`Error calling OpenAI API: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content returned from OpenAI API');
    }

    try {
      // Try to parse the response as JSON
      const stationData = JSON.parse(content);
      return stationData as Station;
    } catch (parseError) {
      console.error('Failed to parse OpenAI response as JSON:', parseError);
      
      // Fallback to a default station with the error message
      return {
        name: `New ${currentTheme} Station ${stationIndex + 1}`,
        task: "This is a new task you can customize.",
        answer: "Custom answer",
        hints: ["First hint", "Second hint", "Third hint"],
        facilitatorInstructions: "Instructions for facilitator."
      };
    }
  } catch (error) {
    console.error('Error generating station:', error);
    
    // Return a fallback station
    return {
      name: `New ${currentTheme} Station ${stationIndex + 1}`,
      task: "This is a new task you can customize.",
      answer: "Custom answer",
      hints: ["First hint", "Second hint", "Third hint"],
      facilitatorInstructions: "Instructions for facilitator."
    };
  }
};

export { generateStationWithGPT };
