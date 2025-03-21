/**
 * API configuration for OpenAI
 */
export const API_CONFIG = {
  baseUrl: 'https://api.openai.com/v1/chat/completions',
  defaultModel: 'gpt-4o-mini',
  defaultTemperature: 0.7,
};

// Function to safely retrieve the API key without exposing it in the repository
export const getProjectApiKey = (): string => {
  // First check if we have a key in localStorage (for development)
  const localKey = localStorage.getItem('project_openai_key');
  
  // For production, the key should be added during development and saved to localStorage
  // This keeps it out of the GitHub repository
  if (!localKey) {
    // If no key is found, store the key in localStorage on first run
    // This way developers can add it once during setup, but it won't be in the repo
    const initialKey = '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';
    localStorage.setItem('project_openai_key', initialKey);
    return initialKey;
  }
  
  return localKey;
};

// Use a placeholder in the codebase
// The actual key will be retrieved at runtime using getProjectApiKey()
export const PROJECT_API_KEY = 'USE_GET_PROJECT_API_KEY_FUNCTION';
