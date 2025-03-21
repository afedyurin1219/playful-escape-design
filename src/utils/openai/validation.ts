
/**
 * Validates if the provided string is a valid OpenAI API key format
 * Accepts both standard keys and project keys
 */
export const isValidOpenAIKey = (key: string): boolean => {
  // Accept both standard OpenAI API keys (sk-...) and project keys (sk-proj-...)
  return key && typeof key === 'string' && (key.startsWith('sk-'));
};
