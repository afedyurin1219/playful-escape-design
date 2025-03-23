
// Station types for the escape room generator

export enum StationType {
  DECIPHER = 'decipher',
  BINARY_CODE = 'binary_code',
  HIDDEN_OBJECTS = 'hidden_objects',
  PHYSICAL_CHALLENGE = 'physical_challenge',
  PHYSICAL_CHALLENGE_TWO = 'physical_challenge_two',
  PUZZLE = 'puzzle',
  RIDDLE = 'riddle',
  WORD_PUZZLE = 'word_puzzle',
  MATH_CHALLENGE = 'math_challenge',
  CODE_CRACKING = 'code_cracking',
  // ... more station types will be added here
}

export interface StationTypeInfo {
  name: string;
  description: string;
  promptTemplate: string;
}

export const stationTypeInfoMap: Record<StationType, StationTypeInfo> = {
  [StationType.DECIPHER]: {
    name: 'Decipher',
    description: 'A challenge where participants must decode a hidden message',
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should decipher a message. The task and the message should be based on the {theme} storyline. If your task requires a cipher key, code sheet, or other reference material, make sure to provide detailed instructions for creating this material in the facilitatorInstructions. An example of a task is: [To intercept it, you must decode the message before the Empire realizes you're there. The message reads: 'XLMW WLSY QI WIEH XS RIZIV'. Can you decipher it in time? Answer: SEND HELP TO HOTH]. Provide the following in JSON format: { "name": "Station Name", "task": "Full task description", "answer": "The answer", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room, including how to create any referenced cipher key or chart", "supplies": ["List of needed supplies, including any printable materials"] }`
  },
  [StationType.BINARY_CODE]: {
    name: 'Binary Code',
    description: 'A challenge where participants convert binary code into ASCII text',
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should break a code by converting binary code into ASCII text. The task and the message should be based on the {theme} storyline. If your task requires a reference chart or key, make sure to provide detailed instructions for creating this material in the facilitatorInstructions. An example of a task is: [R2-D2 is malfunctioning! Solve this binary code to repair him: Convert 01010111 01001000 01011001 from binary to ASCII text]. Provide the following in JSON format: { "name": "Station Name", "task": "Full task description", "answer": "The answer", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room including setup details, scoring, and how to create any reference materials mentioned in the task", "supplies": ["List of needed supplies, including any printable materials"] }`
  },
  [StationType.HIDDEN_OBJECTS]: {
    name: 'Hidden Objects',
    description: 'A challenge where participants must find hidden objects in the room',
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should find five hidden objects. The task and the objects should be based on the {theme} storyline. An example of a task is: [Your team is trapped in a trash compactor! Find these 5 hidden tools to escape: hydrospanner, fusion cutter, magnetic key, power cell, and comlink. All are hidden around the room.] Provide the following in JSON format: { "name": "Station Name", "task": "Full task description", "answer": "The objects that need to be found (comma-separated)", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room including where to hide the objects", "supplies": ["List of objects that need to be hidden"] }`
  },
  [StationType.PHYSICAL_CHALLENGE]: {
    name: 'Physical Challenge',
    description: 'A challenge where participants must complete a physical activity',
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should perform a physical activity related to the {theme} storyline. An example of a task is: [Defend your ship by hitting 3 TIE Fighters (paper targets) with your blaster (nerf gun or balls). You must hit all 3 targets within 1 minute to succeed.] Provide the following in JSON format: { "name": "Station Name", "task": "Full task description", "answer": "Success condition (e.g., 'All 3 targets hit')", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room including setup details and scoring", "supplies": ["List of all physical items needed for the challenge"] }`
  },
  [StationType.PHYSICAL_CHALLENGE_TWO]: {
    name: 'Dexterity Challenge',
    description: 'A challenge where participants must demonstrate fine motor skills',
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should complete a dexterity challenge related to the {theme} storyline. An example of a task is: [Transfer 'golden treasures' (ping pong balls) from one container to another using only a spoon held in your mouth. You need to successfully transfer 5 objects to proceed.] Provide the following in JSON format: { "name": "Station Name", "task": "Full task description", "answer": "Success condition (e.g., '5 objects transferred')", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room including setup details and scoring", "supplies": ["List of all physical items needed for the challenge"] }`
  },
  [StationType.PUZZLE]: {
    name: 'Puzzle',
    description: 'A challenge where participants must solve an IQ puzzle',
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should solve an IQ puzzle related to the {theme} storyline. If your task refers to any printed puzzle materials, make sure to provide detailed instructions for creating these materials in the facilitatorInstructions. An example of a task is: [Plot a safe course through the asteroid field by solving this puzzle: If each number represents the position of a safe passage point, find the missing number in this sequence: 2, 5, 10, 17, 26, ?]. Provide the following in JSON format: { "name": "Station Name", "task": "Full task description", "answer": "The answer with explanation", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room including the solution explanation and how to create any puzzle materials referenced in the task", "supplies": ["List of items needed for the puzzle, including any printable materials"] }`
  },
  [StationType.RIDDLE]: {
    name: 'Riddle',
    description: 'A challenge where participants must solve a themed riddle',
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should solve a riddle related to the {theme} storyline. An example of a task is: [Decipher Professor Snape's recipe by solving this riddle: 'I'm tall when I'm young, and short when I'm old. What am I?']. Provide the following in JSON format: { "name": "Station Name", "task": "Full task description", "answer": "The answer with explanation", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room including the solution explanation", "supplies": ["List of items needed for the riddle challenge"] }`
  },
  [StationType.WORD_PUZZLE]: {
    name: 'Word Puzzle',
    description: 'A challenge where participants rearrange letters to solve a riddle',
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should rearrange letters to solve a riddle related to the {theme} storyline. IMPORTANT: Use EXACTLY the same letters in the task description and in any printable/puzzle components. For example, if the task asks to rearrange "EOBNIGH", the printable content must also use "EOBNIGH". An example of a task is: [Rearrange these letters to reveal a spell: MSAIDRUGU (9 letters) → The answer is AGUAMENTI]. Provide the following in JSON format: { "name": "Station Name", "task": "Full task description with the EXACT letters that need to be rearranged", "answer": "The answer with explanation", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room including the solution explanation. Make sure to highlight that the same letters from the task must be printed for participants to arrange", "supplies": ["List of items needed for the word puzzle challenge, including printable letters that match the task description exactly"] }`
  },
  [StationType.MATH_CHALLENGE]: {
    name: 'Math Challenge',
    description: 'A challenge where participants must solve a mathematical problem',
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should crack a code by solving a math problem related to the {theme} storyline. If your task requires any reference charts, worksheets, or other printed materials, make sure to provide detailed instructions for creating these materials in the facilitatorInstructions. An example of a task is: [Crack the vault code: What is the sum of all the numbers in Platform 9¾, Vault 713, and the year Hogwarts was founded (993 A.D.)?]. Provide the following in JSON format: { "name": "Station Name", "task": "Full task description", "answer": "The answer with explanation", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room including the solution explanation and how to create any materials referenced in the task", "supplies": ["List of items needed for the math challenge, including any printable materials"] }`
  },
  [StationType.CODE_CRACKING]: {
    name: 'Code Cracking',
    description: 'A challenge where participants decode a message using a letter-to-number substitution',
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should decode a message using a letter-to-number substitution (A=1, B=2, etc.) related to the {theme} storyline. If your task refers to any code charts, cipher keys, or other reference materials, make sure to provide detailed instructions for creating these materials in the facilitatorInstructions. An example of a task is: [Decode this message using the key where A=1, B=2, etc.: "20-8-5 6-9-14-1-12 3-15-4-5 9-19 8-9-4-4-5-14"]. Provide the following in JSON format: { "name": "Station Name", "task": "Full task description", "answer": "The answer with explanation", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room including the solution explanation and how to create any code charts or reference materials mentioned in the task", "supplies": ["List of items needed for the code cracking challenge, including any printable materials"] }`
  }
};

// Function to get a list of all available station types
export const getAllStationTypes = (): StationType[] => {
  return Object.values(StationType);
};

// Function to get a random selection of station types
export const getRandomStationTypes = (count: number): StationType[] => {
  const allTypes = getAllStationTypes();
  const shuffled = [...allTypes].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.min(count, allTypes.length));
};
