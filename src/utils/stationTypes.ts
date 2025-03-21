// Station types for the escape room generator

export enum StationType {
  DECIPHER = 'decipher',
  BINARY_CODE = 'binary_code',
  HIDDEN_OBJECTS = 'hidden_objects',
  PHYSICAL_CHALLENGE = 'physical_challenge',
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
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should decipher a message. The task and the message should be based on the {theme} storyline. An example of a task is: [To intercept it, you must decode the message before the Empire realizes you're there. The message reads: 'XLMW WLSY QI WIEH XS RIZIV'. Can you decipher it in time? Answer: SEND HELP TO HOTH]. Provide the following in JSON format: { "name": "Station Name", "task": "Full task description", "answer": "The answer", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room" }`
  },
  [StationType.BINARY_CODE]: {
    name: 'Binary Code',
    description: 'A challenge where participants convert binary code into ASCII text',
    promptTemplate: `Create a station within a bigger Escape Room. At this station, participants should break a code by converting binary code into ASCII text. The task and the message should be based on the {theme} storyline. An example of a task is: [R2-D2 is malfunctioning! Solve this binary code to repair him: Convert 01010111 01001000 01011001 from binary to ASCII text]. Provide the following in JSON format: { "name": "Station Name", "task": "Full task description", "answer": "The answer", "hints": ["Hint 1", "Hint 2", "Hint 3"], "facilitatorInstructions": "Instructions for the person running the escape room", "supplies": ["List of needed supplies"] }`
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
