
// OpenAI API client for generating escape room stations

/**
 * Validates if the provided string is a valid OpenAI API key format
 * Now accepting both standard keys and project keys
 */
export const isValidOpenAIKey = (key: string): boolean => {
  // Accept both standard OpenAI API keys (sk-...) and project keys (sk-proj-...)
  return key && typeof key === 'string' && (key.startsWith('sk-'));
};

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
        console.log('Key format:', apiKey.substring(0, 10) + '...');
      }
      
      throw new Error('Invalid OpenAI API key. Please provide a valid key that starts with "sk-".');
    }
    
    console.log('Making OpenAI API request with API key');
    
    // Make the API request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 800,
      }),
    });

    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      throw new Error(`Error calling OpenAI API: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received');
    
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      throw new Error('No content returned from OpenAI API');
    }

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
    
    // Use the specific project API key provided
    const projectApiKey = "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";
    
    // Create the prompt based on the theme and age group
    const prompt = `Write a story introduction for an escape room. The room theme is ${theme}. The audience is ${ageGroup} years old. Do not design challenges, only the story introduction. Limit - 5 sentences max.`;
    
    // Make the API request to OpenAI
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${projectApiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {"role": "system", "content": "You are an Escape Room designer."},
          {"role": "user", "content": prompt}
        ],
        temperature: 0.7,
      }),
    });

    console.log('OpenAI API response status for story generation:', response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Story Generation API Error:', errorData);
      throw new Error(`Error calling OpenAI API for story: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Story introduction received from OpenAI');
    
    const storyContent = data.choices[0]?.message?.content;
    
    if (!storyContent) {
      throw new Error('No content returned from OpenAI for story introduction');
    }

    return storyContent;
  } catch (error) {
    console.error('Story generation error:', error);
    // Return a fallback story if API call fails
    return "An exciting adventure awaits! Participants will need to solve puzzles, find clues, and work together to complete a series of challenges.";
  }
};
