
import { API_CONFIG } from './constants';

/**
 * Makes a request to the OpenAI API
 */
export const callOpenAI = async (
  apiKey: string,
  messages: Array<{ role: string; content: string }>,
  options: {
    model?: string;
    temperature?: number;
    max_tokens?: number;
  } = {}
): Promise<string> => {
  const { model = API_CONFIG.defaultModel, temperature = API_CONFIG.defaultTemperature, max_tokens } = options;
  
  console.log('Making OpenAI API request with model:', model);
  
  try {
    // Make the API request to OpenAI
    const response = await fetch(API_CONFIG.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        temperature,
        ...(max_tokens ? { max_tokens } : {}),
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      
      // Check for specific error types
      if (errorData.error && errorData.error.code === 'invalid_api_key') {
        throw new Error('Invalid API key. Please provide a valid OpenAI API key.');
      }
      
      throw new Error(`Error calling OpenAI API: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received');
    
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content returned from OpenAI API');
    }

    return content;
  } catch (error) {
    console.error('OpenAI API request error:', error);
    throw error;
  }
};
