
/**
 * Validates if the provided string is a valid OpenAI API key format
 * Accepts both standard keys and project keys
 */
export const isValidOpenAIKey = (key: string): boolean => {
  // Accept both standard OpenAI API keys (sk-...) and project keys (sk-proj-...)
  if (!key || typeof key !== 'string') return false;
  
  // Check if it's a standard key or project key with proper format
  if (key.startsWith('sk-') && key.length > 20) {
    return true;
  }
  
  return false;
};
