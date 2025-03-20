
// OpenAI API client for generating escape room stations

/**
 * Call OpenAI API to generate content based on a prompt
 */
export const generateWithOpenAI = async (prompt: string): Promise<string> => {
  try {
    console.log('Calling OpenAI API with prompt about:', prompt.substring(0, 50) + '...');
    
    // Get API key from localStorage or use the default one
    let apiKey = localStorage.getItem('openai_api_key');
    
    // If no key in localStorage, use default key
    if (!apiKey) {
      apiKey = process.env.OPENAI_API_KEY || 'your-api-key-here';
      console.log('Using default API key');
    } else {
      console.log('Using API key from localStorage');
    }
    
    // Check if API key is available and valid
    if (!apiKey || apiKey === 'your-api-key-here') {
      console.log('No valid API key available, using fallback stations');
      throw new Error('No valid API key available, using fallback stations');
    }
    
    console.log('Making OpenAI API request with API key starting with:', apiKey.substring(0, 5) + '...');
    
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
    console.log('OpenAI API response received:', data);
    
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
