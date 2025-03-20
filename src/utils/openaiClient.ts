
// OpenAI API client for generating escape room stations

/**
 * Call OpenAI API to generate content based on a prompt
 */
export const generateWithOpenAI = async (prompt: string): Promise<string> => {
  try {
    console.log('Calling OpenAI API with prompt about:', prompt.substring(0, 50) + '...');
    
    // Using the provided API key
    const OPENAI_API_KEY = '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';
    
    // Check if API key is available
    if (!OPENAI_API_KEY) {
      console.log('No API key available, using fallback stations');
      throw new Error('No API key available, using fallback stations');
    }
    
    // Make the API request to OpenAI
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

    console.log('Successfully received response from OpenAI');
    return content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};
