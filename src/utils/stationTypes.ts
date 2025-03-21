
// Types of stations available for escape rooms
export enum StationType {
  WORD_PUZZLE = 'WORD_PUZZLE',
  HIDDEN_OBJECTS = 'HIDDEN_OBJECTS',
  RIDDLE_CHALLENGE = 'RIDDLE_CHALLENGE',
  CODE_BREAKING = 'CODE_BREAKING',
  PHYSICAL_CHALLENGE = 'PHYSICAL_CHALLENGE',
  FINAL_PUZZLE = 'FINAL_PUZZLE',
  MEMORY_CHALLENGE = 'MEMORY_CHALLENGE',
  MATH_CHALLENGE = 'MATH_CHALLENGE',
  SENSORY_CHALLENGE = 'SENSORY_CHALLENGE',
  CREATIVE_CHALLENGE = 'CREATIVE_CHALLENGE'
}

// Information about each station type
export interface StationTypeInfo {
  type: StationType;
  name: string;
  description: string;
  promptTemplate: string;
}

// Map of station types to their information
export const stationTypeInfoMap: Record<StationType, StationTypeInfo> = {
  [StationType.WORD_PUZZLE]: {
    type: StationType.WORD_PUZZLE,
    name: "Word Puzzle",
    description: "A puzzle where participants unscramble words related to the theme",
    promptTemplate: "Create a themed word puzzle station for an escape room with the theme '{theme}'. The audience is {ageGroup} years old. The puzzle should involve unscrambling letters to form a word or phrase. Format your response as a JSON object with the following fields: {\"name\": \"Station name\", \"task\": \"Description of the task\", \"answer\": \"The solution\", \"hints\": [\"Hint 1\", \"Hint 2\", \"Hint 3\"], \"facilitatorInstructions\": \"Setup instructions\"}."
  },
  [StationType.HIDDEN_OBJECTS]: {
    type: StationType.HIDDEN_OBJECTS,
    name: "Hidden Objects",
    description: "A challenge to find hidden objects in the room",
    promptTemplate: "Create a hidden objects station for an escape room with the theme '{theme}'. The audience is {ageGroup} years old. The station should involve finding themed objects hidden around the room. Format your response as a JSON object with the following fields: {\"name\": \"Station name\", \"task\": \"Description of the task\", \"answer\": \"What defines success\", \"hints\": [\"Hint 1\", \"Hint 2\", \"Hint 3\"], \"facilitatorInstructions\": \"Setup instructions\"}."
  },
  [StationType.RIDDLE_CHALLENGE]: {
    type: StationType.RIDDLE_CHALLENGE,
    name: "Riddle Challenge",
    description: "A riddle that participants must solve to progress",
    promptTemplate: "Create a riddle challenge station for an escape room with the theme '{theme}'. The audience is {ageGroup} years old. The challenge should involve solving a riddle specifically connected to the theme. Format your response as a JSON object with the following fields: {\"name\": \"Station name\", \"task\": \"The riddle\", \"answer\": \"The solution\", \"hints\": [\"Hint 1\", \"Hint 2\", \"Hint 3\"], \"facilitatorInstructions\": \"Setup instructions\"}."
  },
  [StationType.CODE_BREAKING]: {
    type: StationType.CODE_BREAKING,
    name: "Code Breaking",
    description: "A cipher or code that must be deciphered",
    promptTemplate: "Create a code breaking station for an escape room with the theme '{theme}'. The audience is {ageGroup} years old. The station should involve decoding a message or solving a cipher that relates to the theme. Format your response as a JSON object with the following fields: {\"name\": \"Station name\", \"task\": \"Description of the code to break\", \"answer\": \"The decoded message\", \"hints\": [\"Hint 1\", \"Hint 2\", \"Hint 3\"], \"facilitatorInstructions\": \"Setup instructions\"}."
  },
  [StationType.PHYSICAL_CHALLENGE]: {
    type: StationType.PHYSICAL_CHALLENGE,
    name: "Physical Challenge",
    description: "A challenge requiring physical activity or dexterity",
    promptTemplate: "Create a physical challenge station for an escape room with the theme '{theme}'. The audience is {ageGroup} years old. The station should involve a physical activity or task that connects to the theme. Format your response as a JSON object with the following fields: {\"name\": \"Station name\", \"task\": \"Description of the physical challenge\", \"answer\": \"What defines success\", \"hints\": [\"Hint 1\", \"Hint 2\", \"Hint 3\"], \"facilitatorInstructions\": \"Setup instructions with safety considerations\"}."
  },
  [StationType.FINAL_PUZZLE]: {
    type: StationType.FINAL_PUZZLE,
    name: "Final Puzzle",
    description: "A culminating puzzle that brings together elements from earlier challenges",
    promptTemplate: "Create a final puzzle station for an escape room with the theme '{theme}'. The audience is {ageGroup} years old. This should be a culminating challenge that brings together various elements and feels like a finale. Format your response as a JSON object with the following fields: {\"name\": \"Station name\", \"task\": \"Description of the final challenge\", \"answer\": \"The solution\", \"hints\": [\"Hint 1\", \"Hint 2\", \"Hint 3\"], \"facilitatorInstructions\": \"Setup instructions\"}."
  },
  [StationType.MEMORY_CHALLENGE]: {
    type: StationType.MEMORY_CHALLENGE,
    name: "Memory Challenge",
    description: "A challenge testing participants' memory of themed information",
    promptTemplate: "Create a memory challenge station for an escape room with the theme '{theme}'. The audience is {ageGroup} years old. The station should test participants' ability to remember information related to the theme. Format your response as a JSON object with the following fields: {\"name\": \"Station name\", \"task\": \"Description of the memory challenge\", \"answer\": \"The correct sequence or information\", \"hints\": [\"Hint 1\", \"Hint 2\", \"Hint 3\"], \"facilitatorInstructions\": \"Setup instructions\"}."
  },
  [StationType.MATH_CHALLENGE]: {
    type: StationType.MATH_CHALLENGE,
    name: "Math Challenge",
    description: "A mathematical puzzle integrated with the theme",
    promptTemplate: "Create a math challenge station for an escape room with the theme '{theme}'. The audience is {ageGroup} years old. The challenge should involve solving a mathematical puzzle that connects to the theme in a creative way. Format your response as a JSON object with the following fields: {\"name\": \"Station name\", \"task\": \"Description of the math problem\", \"answer\": \"The solution\", \"hints\": [\"Hint 1\", \"Hint 2\", \"Hint 3\"], \"facilitatorInstructions\": \"Setup instructions\"}."
  },
  [StationType.SENSORY_CHALLENGE]: {
    type: StationType.SENSORY_CHALLENGE,
    name: "Sensory Challenge",
    description: "A challenge involving smell, touch, taste, sight, or hearing",
    promptTemplate: "Create a sensory challenge station for an escape room with the theme '{theme}'. The audience is {ageGroup} years old. The station should engage one or more senses (sight, sound, touch, smell) in a way that connects to the theme. Format your response as a JSON object with the following fields: {\"name\": \"Station name\", \"task\": \"Description of the sensory challenge\", \"answer\": \"The solution or successful completion criteria\", \"hints\": [\"Hint 1\", \"Hint 2\", \"Hint 3\"], \"facilitatorInstructions\": \"Setup instructions\"}."
  },
  [StationType.CREATIVE_CHALLENGE]: {
    type: StationType.CREATIVE_CHALLENGE,
    name: "Creative Challenge",
    description: "A challenge requiring creative thinking or artistic expression",
    promptTemplate: "Create a creative challenge station for an escape room with the theme '{theme}'. The audience is {ageGroup} years old. The station should involve creative thinking, drawing, building, or artistic expression related to the theme. Format your response as a JSON object with the following fields: {\"name\": \"Station name\", \"task\": \"Description of the creative challenge\", \"answer\": \"What defines successful completion\", \"hints\": [\"Hint 1\", \"Hint 2\", \"Hint 3\"], \"facilitatorInstructions\": \"Setup instructions\"}."
  }
};

// Get all station types as an array
export const getAllStationTypes = (): StationType[] => {
  return Object.values(StationType);
};

// Get a random selection of station types
export const getRandomStationTypes = (count: number): StationType[] => {
  const allTypes = getAllStationTypes();
  const shuffled = [...allTypes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Determine how many stations to generate based on duration
export const getStationCountForDuration = (duration: string): number => {
  switch (duration) {
    case '<30':
      return 3;
    case '30-60':
      return 5;
    case '60-120':
      return 7;
    default:
      return 5; // Default to medium length
  }
};
