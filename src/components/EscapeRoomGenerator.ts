
export interface EscapeRoomConfig {
  ageGroup: string;
  theme: string;
  customTheme?: string;
  groupSize: string;
  difficulty: string;
  duration: string;
}

export interface EscapeRoomPlan {
  title: string;
  story: string;
  stations: Station[];
  teamSetup: string;
  supplies: Supply[];
  prizes: string[];
}

export interface Station {
  name: string;
  task: string;
  answer: string;
  hints: string[];
  facilitatorInstructions: string;
}

export interface Supply {
  name: string;
  purpose: string;
  category: 'theme' | 'challenge' | 'general';
}

// This is a simplified generator for demo purposes
// In a real implementation, this would use a more sophisticated algorithm or AI
export const generateEscapeRoom = (config: EscapeRoomConfig): EscapeRoomPlan => {
  // For demonstration, we'll have some predefined responses based on configurations
  // In a real implementation, this would be much more dynamic and complex
  
  // Get theme name (either selected theme or custom theme)
  const themeName = config.customTheme || config.theme;
  
  // Sample story generation based on age group and theme
  let story = '';
  let title = '';
  let teamSetup = '';
  let numStations = 3; // default
  
  // Adjust number of stations based on duration
  if (config.duration === '30-60') {
    numStations = 4;
  } else if (config.duration === '60-120') {
    numStations = 6;
  }
  
  // Further adjust based on difficulty
  if (config.difficulty === 'hard') {
    numStations += 1;
  } else if (config.difficulty === 'easy') {
    numStations = Math.max(numStations - 1, 2); // Minimum 2 stations
  }
  
  // Generate team setup based on group size
  if (config.groupSize === '0-5') {
    teamSetup = "Since there are only a few participants, everyone will work together as one team.";
  } else if (config.groupSize === '5-10') {
    teamSetup = "Divide participants into two teams. Each team will go through the stations in a different order, competing to finish first.";
  } else { // 10+
    teamSetup = "Divide participants into three or four teams of 3-4 kids each. Teams will compete to complete all stations first.";
  }
  
  // Custom generation based on specific popular themes
  if (config.theme === 'harry-potter' || config.customTheme?.toLowerCase().includes('harry potter')) {
    title = "Hogwarts Mystery: The Chamber of Secrets";
    story = "A mysterious force has locked down Hogwarts, and dark magic is spreading through the castle. As young witches and wizards, you must work together to solve puzzles, cast spells, and find the source of the dark magic before it's too late. Professor McGonagall has left clues around the castle to help you on your quest.";
    
    return {
      title,
      story,
      teamSetup,
      stations: generateHarryPotterStations(numStations, config.difficulty),
      supplies: generateHarryPotterSupplies(),
      prizes: ["House Cup replica", "Chocolate frogs", "Bertie Bott's Every Flavor Beans", "Wand for each participant", "Hogwarts House badges"]
    };
  }
  
  // Default generic response for any other theme
  title = `The ${themeName} Challenge`;
  story = `An exciting adventure in the world of ${themeName} awaits! Participants will need to solve puzzles, find clues, and work together to complete a series of challenges.`;
  
  return {
    title,
    story,
    teamSetup,
    stations: generateGenericStations(numStations, config.theme, config.difficulty),
    supplies: generateGenericSupplies(config.theme),
    prizes: ["Certificate of completion", "Small themed toys", "Candy treats", "Custom medals"]
  };
};

// Helper function to generate Harry Potter themed stations
const generateHarryPotterStations = (count: number, difficulty: string): Station[] => {
  const stations: Station[] = [
    {
      name: "Potions Class",
      task: "Decipher Professor Snape's recipe by solving this riddle: 'I'm tall when I'm young, and short when I'm old. What am I?'",
      answer: "A candle",
      hints: ["It changes over time", "It gives light", "It melts down"],
      facilitatorInstructions: "Hide the next clue inside or under a candle. Make sure children don't light the candle - it's just a prop."
    },
    {
      name: "Transfiguration Challenge",
      task: "Rearrange these letters to reveal a spell: MSAIDRUGU (9 letters)",
      answer: "RIDIKULUS",
      hints: ["It's used against a Boggart", "It turns something scary into something funny", "It starts with 'R'"],
      facilitatorInstructions: "Have children write down their answer. When correct, give them a small mirror that will be used in the next challenge."
    },
    {
      name: "Defense Against the Dark Arts",
      task: "To defeat the Dementor, find the code hidden in this message: 'Happiness can be found even in the darkest of times, if one only remembers to turn on the light.' Count the number of times the letters E, X, P, E, C, T, O appear.",
      answer: "3211111 (or 3,2,1,1,1,1,1)",
      hints: ["Focus on the letters that spell a specific charm", "Count each letter individually", "The charm is used against Dementors"],
      facilitatorInstructions: "The children need to count each letter of 'EXPECTO' in the quote. Have them use this code to open a lock or reveal the next clue."
    },
    {
      name: "Herbology",
      task: "What plant makes a sound that can be fatal to anyone who hears it? Unscramble: YADRGANMNA",
      answer: "MANDRAKE",
      hints: ["It's shaped like a human", "Wearing earmuffs protects you", "It's used in petrification cures"],
      facilitatorInstructions: "Hide earmuffs or pictures of earmuffs around the room. When they solve the puzzle, they need to all put on the earmuffs to receive the next clue."
    },
    {
      name: "Quidditch Pitch",
      task: "Complete a physical challenge: Transfer 'golden snitches' (ping pong balls) from one container to another using only a spoon held in your mouth. You need to catch 5 snitches to win.",
      answer: "Successfully transferring 5 balls",
      hints: ["Work as a team", "Steady does it", "Maybe take turns"],
      facilitatorInstructions: "Set up two containers about 10 feet apart. Fill one with yellow ping pong balls. Each team member can try to transfer balls. Once 5 are transferred, give them the next clue."
    },
    {
      name: "Gringotts Bank",
      task: "Crack the vault code: What is the sum of all the numbers in Platform 9¾, Vault 713, and the year Hogwarts was founded (993 A.D.)?",
      answer: "1715.75 (9.75 + 713 + 993)",
      hints: ["Add all three numbers together", "Don't forget the fraction in Platform 9¾", "The founding year is 993 A.D."],
      facilitatorInstructions: "Have a 'vault' (box or cabinet) with a combination lock set to 1715 or 1716. Inside the vault is the final clue or treasure."
    }
  ];
  
  // If difficulty is easy, simplify the tasks
  if (difficulty === 'easy') {
    stations.forEach(station => {
      station.hints.push("Here's a big hint: " + station.answer);
    });
  }
  
  // Return only the requested number of stations
  return stations.slice(0, count);
};

// Helper function to generate Harry Potter themed supplies
const generateHarryPotterSupplies = (): Supply[] => {
  return [
    { name: "Wands (can be made from chopsticks or twigs)", purpose: "For casting 'spells' during challenges", category: 'theme' },
    { name: "House colored scarves or ribbons", purpose: "To identify teams", category: 'theme' },
    { name: "Candles (unlit, for safety)", purpose: "For the Potions challenge", category: 'challenge' },
    { name: "Small mirrors", purpose: "For the Transfiguration challenge", category: 'challenge' },
    { name: "Lock and key or combination lock", purpose: "For the Gringotts challenge", category: 'challenge' },
    { name: "Yellow ping pong balls", purpose: "As 'Golden Snitches' for the Quidditch challenge", category: 'challenge' },
    { name: "Plastic spoons", purpose: "For the Quidditch challenge", category: 'challenge' },
    { name: "Small cauldrons (can use black plastic cups)", purpose: "For holding clues or items", category: 'theme' },
    { name: "Envelopes for clues", purpose: "To present each challenge", category: 'general' },
    { name: "Small treasure box", purpose: "For the final prize", category: 'general' }
  ];
};

// Helper function to generate generic stations
const generateGenericStations = (count: number, theme: string, difficulty: string): Station[] => {
  const genericStations: Station[] = [
    {
      name: "Word Puzzle Station",
      task: `Unscramble these letters to find a word related to ${theme}: [scrambled word]`,
      answer: "Varies based on theme",
      hints: ["It's something important in the theme", "It starts with [letter]", "It has to do with [hint]"],
      facilitatorInstructions: "Choose a word relevant to your theme and scramble it. Adjust difficulty as needed."
    },
    {
      name: "Hidden Objects",
      task: `Find 5 hidden ${theme}-related objects in this room within 3 minutes.`,
      answer: "Successfully finding all objects",
      hints: ["Look high and low", "Check under and behind things", "One is very well hidden near [location]"],
      facilitatorInstructions: "Hide theme-related objects around the room at varying difficulty levels."
    },
    {
      name: "Coded Message",
      task: "Decode this message using the key provided: [coded message]",
      answer: "Varies based on theme",
      hints: ["Start with the first letter", "The message is about [hint]", "Try substituting each letter"],
      facilitatorInstructions: "Create a simple substitution cipher appropriate for the age group."
    },
    {
      name: "Physical Challenge",
      task: "Complete this relay/task within the time limit: [specific physical challenge]",
      answer: "Successfully completing the challenge",
      hints: ["Work together", "Try a different approach", "Focus on [specific aspect]"],
      facilitatorInstructions: "Set up a physical challenge appropriate for the age group and theme."
    },
    {
      name: "Logic Puzzle",
      task: "Solve this riddle: [age-appropriate riddle]",
      answer: "Varies based on riddle",
      hints: ["Think about [aspect]", "It's related to [hint]", "The answer is a type of [category]"],
      facilitatorInstructions: "Choose a riddle appropriate for the age group and theme."
    },
    {
      name: "Final Challenge",
      task: "Combine clues from previous stations to solve this final puzzle: [final puzzle]",
      answer: "Varies based on previous stations",
      hints: ["Look at what you've collected", "The order matters", "Remember the [specific previous clue]"],
      facilitatorInstructions: "Design a culminating challenge that brings together elements from earlier stations."
    }
  ];
  
  // If difficulty is easy, simplify the tasks
  if (difficulty === 'easy') {
    genericStations.forEach(station => {
      station.hints.push("Here's a big hint that almost gives it away");
    });
  }
  
  // Return only the requested number of stations
  return genericStations.slice(0, count);
};

// Helper function to generate generic supplies
const generateGenericSupplies = (theme: string): Supply[] => {
  return [
    { name: `${theme}-themed decorations`, purpose: "To set the atmosphere", category: 'theme' },
    { name: "Team identifiers (bandanas, badges, etc.)", purpose: "To identify teams", category: 'general' },
    { name: "Pencils and paper", purpose: "For solving puzzles", category: 'general' },
    { name: "Small containers or boxes", purpose: "For hiding clues", category: 'general' },
    { name: "Locks and keys (or combination locks)", purpose: "For securing clues", category: 'challenge' },
    { name: "Flashlights", purpose: "For finding hidden objects", category: 'challenge' },
    { name: "Timer or stopwatch", purpose: "For timed challenges", category: 'general' },
    { name: "Envelopes for clues", purpose: "To present each challenge", category: 'general' },
    { name: "Small treasure box", purpose: "For the final prize", category: 'general' },
    { name: `${theme}-related props`, purpose: "For specific challenges", category: 'theme' }
  ];
};
