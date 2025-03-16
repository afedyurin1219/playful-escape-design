
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

/**
 * Determines if a task involves some form of cipher or code to solve
 * @param task The task description text
 * @returns Boolean indicating if this is a cipher/code task
 */
export const isCipherTask = (task: string): boolean => {
  return task.toLowerCase().includes('cipher') || 
         task.toLowerCase().includes('code') ||
         task.toLowerCase().includes('decoded') ||
         task.toLowerCase().includes('transmission') ||
         task.toLowerCase().includes('decrypt') ||
         task.toLowerCase().includes('secret message') ||
         task.toLowerCase().includes('password');
};

/**
 * Extracts encrypted text from a cipher task
 * @param task The task description text
 * @returns The encrypted text or null if not found
 */
export const extractCipherText = (task: string): string | null => {
  // Match patterns like text in quotes or after a colon
  const quotesMatch = task.match(/'([^']+)'/);
  if (quotesMatch && quotesMatch[1]) {
    return quotesMatch[1];
  }
  
  const doubleQuotesMatch = task.match(/"([^"]+)"/);
  if (doubleQuotesMatch && doubleQuotesMatch[1]) {
    return doubleQuotesMatch[1];
  }
  
  // For patterns like "The message is: ABCDE"
  const colonMatch = task.match(/:\s+([A-Z0-9\s]+)(\s|$|\.|,)/);
  if (colonMatch && colonMatch[1]) {
    return colonMatch[1];
  }
  
  return null;
};

/**
 * Determines if a task has printable content (letters, numbers, etc.)
 * @param task The task description
 * @returns Boolean indicating if the task has printable content
 */
export const hasPrintableContent = (task: string): boolean => {
  return isWordScrambleTask(task) || isCipherTask(task);
};

/**
 * Gets printable content from a task description
 * @param task The task description
 * @returns The printable content or null if none is found
 */
export const getPrintableContent = (task: string): { type: 'scramble' | 'cipher', content: string } | null => {
  if (isWordScrambleTask(task)) {
    const word = extractScrambledWord(task);
    if (word) {
      return { type: 'scramble', content: word };
    }
  }
  
  if (isCipherTask(task)) {
    const cipherText = extractCipherText(task);
    if (cipherText) {
      return { type: 'cipher', content: cipherText };
    }
  }
  
  return null;
};
