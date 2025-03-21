// Station types for the escape room generator

export enum StationType {
  DECIPHER = 'decipher',
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
