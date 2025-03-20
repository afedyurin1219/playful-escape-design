
// OpenAI API client for generating escape room stations

// API key
const OPENAI_API_KEY = "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";

/**
 * Call OpenAI API to generate content based on a prompt
 */
export const generateWithOpenAI = async (prompt: string): Promise<string> => {
  try {
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

    return content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
};
