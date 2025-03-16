
/**
 * Utilities for generating printable content
 */

/**
 * Formats a scrambled word for printing by separating each letter
 * @param word The scrambled word to format
 * @returns Array of individual letters
 */
export const formatScrambledLetters = (word: string): string[] => {
  return word.split('');
};

/**
 * Determines if a station/challenge involves a word scramble task
 * @param task The task description text
 * @returns Boolean indicating if this is a letter rearrangement task
 */
export const isWordScrambleTask = (task: string): boolean => {
  return task.toLowerCase().includes('unscramble these letters') || 
         task.toLowerCase().includes('rearrange these letters');
};

/**
 * Extracts the scrambled word from a word scramble task
 * @param task The task description text
 * @returns The scrambled word or null if not found
 */
export const extractScrambledWord = (task: string): string | null => {
  // Match patterns like "RASNXLO" at the end of a sentence
  const match = task.match(/:\s+([A-Z]+)(\s|$|\.|,)/);
  if (match && match[1]) {
    return match[1];
  }
  return null;
};
