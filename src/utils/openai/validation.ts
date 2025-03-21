
/**
 * Validates if the provided string is a valid OpenAI API key format
 * Accepts standard keys, project keys, and service account keys
 */
export const isValidOpenAIKey = (key: string): boolean => {
  // If no key or not a string, return false
  if (!key || typeof key !== 'string') return false;
  
  // Check the different possible key formats
  if (
    // Standard API key format: sk-...
    (key.startsWith('sk-') && key.length > 20) ||
    // Project key format: sk-proj-...
    (key.startsWith('sk-proj-') && key.length > 30) ||
    // Service account key format: sk-svcacct-...
    (key.startsWith('sk-svcacct-') && key.length > 30)
  ) {
    return true;
  }
  
  return false;
};
