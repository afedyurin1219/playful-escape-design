
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
  } else if (config.theme === 'minecraft' || config.customTheme?.toLowerCase().includes('minecraft')) {
    title = "Minecraft: The Missing Diamonds";
    story = "The village's precious diamonds have been stolen by the Ender Dragon! As brave miners, you must venture through the blocky world, solve puzzles, craft items, and defeat challenges to recover the missing diamonds before the dragon uses them to gain ultimate power.";
    
    return {
      title,
      story,
      teamSetup,
      stations: generateMinecraftStations(numStations, config.difficulty),
      supplies: generateMinecraftSupplies(),
      prizes: ["Minecraft character figurines", "Diamond-shaped candy", "Creeper stickers", "Minecraft wristbands", "Pixel art craft kits"]
    };
  } else if (config.theme === 'star-wars' || config.customTheme?.toLowerCase().includes('star wars')) {
    title = "Star Wars: Escape from the Death Star";
    story = "You are Rebel spies who have infiltrated the Empire's Death Star to steal the plans. Your mission was successful, but now you must escape before Darth Vader captures you. Navigate through Imperial security, solve puzzles, and make your way to the hidden Rebel ship before time runs out!";
    
    return {
      title,
      story,
      teamSetup,
      stations: generateStarWarsStations(numStations, config.difficulty),
      supplies: generateStarWarsSupplies(),
      prizes: ["Lightsaber toys", "Star Wars character masks", "Rebel Alliance pins", "Space-themed candy", "Star Wars trading cards"]
    };
  } else if (config.theme === 'detective-noir' || config.customTheme?.toLowerCase().includes('detective')) {
    title = "The Case of the Missing Masterpiece";
    story = "A priceless painting has been stolen from the city museum, and the police are baffled. As expert detectives, you've been called in to crack the case. Follow the clues, decode messages from the thief, and piece together the evidence to recover the masterpiece and bring the culprit to justice.";
    
    return {
      title,
      story,
      teamSetup,
      stations: generateDetectiveStations(numStations, config.difficulty),
      supplies: generateDetectiveSupplies(),
      prizes: ["Magnifying glasses", "Deerstalker hats", "Detective notebooks", "Invisible ink pens", "Mystery novels"]
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

// Helper function for Minecraft-themed stations
const generateMinecraftStations = (count: number, difficulty: string): Station[] => {
  const stations: Station[] = [
    {
      name: "The Crafting Table",
      task: "Solve this Minecraft recipe puzzle: 8 cobblestone blocks arranged in a square with an empty middle makes what item? Unscramble these letters: EARFNUC",
      answer: "FURNACE",
      hints: ["It's used for smelting ores", "It cooks food", "It starts with 'F'"],
      facilitatorInstructions: "Set up a mock crafting table with paper blocks. When they solve the puzzle, give them a 'furnace' prop that contains the next clue."
    },
    {
      name: "Creeper's Maze",
      task: "Navigate through this maze without touching the 'pressure plates' (paper squares on the floor). If you step on one, you must go back to the start. At the end, collect the 5 hidden emeralds (green paper cutouts).",
      answer: "Successfully collecting all 5 emeralds",
      hints: ["Watch your step carefully", "Look for patterns in the pressure plates", "The emeralds might be hidden under or behind objects"],
      facilitatorInstructions: "Create a simple maze using furniture and tape paper 'pressure plates' on the floor. Hide 5 green paper 'emeralds' around the end of the maze."
    },
    {
      name: "Mine for Diamonds",
      task: "Dig through this 'ore' (container filled with beans, rice, or sand) to find 3 blue 'diamonds' (blue marbles or stones) hidden inside. Be careful not to touch the red 'redstone' (red marbles) or you'll lose a life.",
      answer: "Successfully finding 3 diamonds",
      hints: ["Dig carefully and systematically", "Use teamwork - one person can dig while others keep watch", "Try dividing the container into sections"],
      facilitatorInstructions: "Fill a container with a sensory material and hide blue and red marbles inside. The children must find 3 blue marbles without touching the red ones."
    },
    {
      name: "Zombie Defense",
      task: "Build a protective barrier using only the provided materials (blocks, paper, tape) that can withstand a zombie attack (ball throws). Your structure must be at least 1 foot tall and survive 3 zombie attacks.",
      answer: "Successfully building a structure that meets the requirements",
      hints: ["Make a strong base", "Triangular structures are more stable", "Use tape sparingly but effectively"],
      facilitatorInstructions: "Provide building materials and test the structures by gently throwing soft balls at them. The structure must remain standing after 3 throws."
    },
    {
      name: "The Ender Puzzle",
      task: "Decode this End Portal coordinate message: 'The nether portal opens at coordinates where X plus Y equals 64, X minus Y equals 0, and Z equals the number of eyes needed for an End Portal.' What are the coordinates?",
      answer: "X=32, Y=32, Z=12",
      hints: ["Solve the two equations to find X and Y", "An End Portal needs 12 Eyes of Ender", "Both X and Y must be whole numbers"],
      facilitatorInstructions: "This is a math puzzle. X + Y = 64 and X - Y = 0 means X = 32 and Y = 32. The End Portal requires 12 Eyes of Ender, so Z = 12."
    },
    {
      name: "Potion Brewing",
      task: "Follow the brewing instructions to make the 'Potion of Diamond Finding'. Mix the blue powder (blue Kool-Aid) with water, add 3 drops of 'Creeper essence' (green food coloring), and sprinkle in 'Redstone dust' (red glitter). What color does the potion turn?",
      answer: "Teal or Turquoise (blue-green)",
      hints: ["Blue + green makes what color?", "Think about color mixing", "The red glitter doesn't change the liquid color"],
      facilitatorInstructions: "Set up a safe 'brewing station' with the required materials. When mixed, blue and green create a teal color. The red glitter is just for show."
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

// Helper function for Star Wars-themed stations
const generateStarWarsStations = (count: number, difficulty: string): Station[] => {
  const stations: Station[] = [
    {
      name: "Jedi Training",
      task: "Complete the Jedi training course: Balance on one foot while holding a 'lightsaber' (pool noodle) and recite the Jedi code: 'There is no emotion, there is peace. There is no ignorance, there is knowledge. There is no passion, there is serenity. There is no chaos, there is harmony. There is no death, there is the Force.'",
      answer: "Successfully reciting the code while balancing",
      hints: ["Practice balance before trying to recite", "Break the code into smaller sections", "Focus on a fixed point while balancing"],
      facilitatorInstructions: "Provide pool noodle 'lightsabers' and a printed copy of the Jedi code for reference. Children must balance on one foot while reciting as much of the code as appropriate for their age."
    },
    {
      name: "Droid Repair",
      task: "R2-D2 is malfunctioning! Solve this binary code to repair him: Convert 01010111 01001000 01011001 from binary to ASCII text.",
      answer: "WHY",
      hints: ["Each group of 8 digits is one letter", "01010111 = 87 in decimal = W in ASCII", "Look for patterns in the binary code"],
      facilitatorInstructions: "Print a binary-to-ASCII conversion chart for reference. Children can use it to decode the message. Adjust complexity based on age group."
    },
    {
      name: "Imperial Code Breaking",
      task: "Intercept this Imperial transmission by solving the cipher. Each letter has been shifted 3 positions forward in the alphabet: 'PHHW DW WKH KDQJDU'",
      answer: "MEET AT THE HANGAR",
      hints: ["This is a Caesar cipher with shift 3", "D = A, E = B, F = C, etc.", "Try writing out the alphabet and counting backwards 3 letters for each character"],
      facilitatorInstructions: "Provide alphabet strips to help with the cipher. For E = B, they should look 3 letters before E to find B."
    },
    {
      name: "Escape the Trash Compactor",
      task: "Your team is trapped in a trash compactor! Find these 5 hidden tools to escape: hydrospanner, fusion cutter, magnetic key, power cell, and comlink. All are hidden around the room.",
      answer: "Successfully finding all 5 items",
      hints: ["Look high and low", "Some items might be disguised as ordinary objects", "Check under or behind furniture"],
      facilitatorInstructions: "Hide 5 labeled items around the room. Create simple props or just use paper cutouts labeled with each tool name."
    },
    {
      name: "Blast the TIE Fighters",
      task: "Defend your ship by hitting 3 TIE Fighters (paper targets) with your blaster (nerf gun or balls). You must hit all 3 targets within 1 minute to succeed.",
      answer: "Successfully hitting all 3 targets",
      hints: ["Take a moment to aim carefully", "Try different throwing/shooting techniques", "Teamwork: one person can retrieve ammunition while others shoot"],
      facilitatorInstructions: "Set up 3 paper targets with TIE Fighter images. Provide soft balls or Nerf guns for 'blasting' them. Set a 1-minute timer."
    },
    {
      name: "Navigate the Asteroid Field",
      task: "Plot a safe course through the asteroid field by solving this puzzle: If each number represents the position of a safe passage point, find the missing number in this sequence: 2, 5, 10, 17, 26, ?",
      answer: "37",
      hints: ["Look at the difference between consecutive numbers", "The differences form a pattern: 3, 5, 7, 9, ?", "Each difference increases by 2"],
      facilitatorInstructions: "This is a mathematical sequence puzzle. The difference between consecutive numbers increases by 2 each time: +3, +5, +7, +9, so the next difference is +11, making the answer 26+11=37."
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

// Helper function for Detective-themed stations
const generateDetectiveStations = (count: number, difficulty: string): Station[] => {
  const stations: Station[] = [
    {
      name: "The Crime Scene",
      task: "Examine the crime scene (table setup) and identify 5 clues that seem out of place or suspicious. Record your findings in your detective notebook.",
      answer: "Finding the 5 planted clues: torn ticket stub, strange powder, dropped key, partial footprint, and a written note",
      hints: ["Look for items that don't belong", "Check for anything unusual in color or position", "Don't forget to look underneath things"],
      facilitatorInstructions: "Set up a 'crime scene' with 5 obvious clues: a torn ticket stub, some powder (salt or flour), a key, a partial footprint (made with a shoe and some washable paint), and a suspicious note."
    },
    {
      name: "Fingerprint Analysis",
      task: "Compare these 4 fingerprint samples (printouts) with the fingerprint found at the crime scene. Which suspect does it match: A, B, C, or D?",
      answer: "Suspect C",
      hints: ["Look for similar patterns in the fingerprint whorls", "Try turning the samples to match orientation", "Check for distinctive features like loops and arches"],
      facilitatorInstructions: "Print 4 different fingerprint patterns labeled A-D and one 'crime scene' fingerprint that clearly matches C. For younger kids, make the differences more obvious."
    },
    {
      name: "Coded Message",
      task: "Decode this message found in the suspect's pocket: '7-15 20-15 20-8-5 13-21-19-5-21-13 1-20 13-9-4-14-9-7-8-20'",
      answer: "GO TO THE MUSEUM AT MIDNIGHT",
      hints: ["Each number represents a letter position in the alphabet", "1=A, 2=B, etc.", "Look for patterns in the numbers separated by dashes"],
      facilitatorInstructions: "This is a simple letter-to-number substitution cipher. A=1, B=2, etc. Have an alphabet with corresponding numbers available for reference."
    },
    {
      name: "Follow the Money",
      task: "Track the suspicious financial transactions by solving this puzzle: The art dealer received $5,000 on Monday. Each day for the next four days, the amount doubled. How much was received on Friday?",
      answer: "$80,000",
      hints: ["Start with $5,000 and keep doubling", "Monday: $5,000, Tuesday: $10,000, Wednesday: $20,000...", "Remember to double the previous day's amount, not the original"],
      facilitatorInstructions: "This is a mathematical progression puzzle. $5,000 → $10,000 → $20,000 → $40,000 → $80,000."
    },
    {
      name: "Surveillance Photo",
      task: "This surveillance photo (printed image) has been cut into 12 pieces. Reassemble it to identify the location where the suspects are planning to meet.",
      answer: "The train station clock tower",
      hints: ["Start with the corner pieces", "Look for connecting colors and lines", "The image will show a recognizable landmark"],
      facilitatorInstructions: "Print a picture of a clock tower or other recognizable location, cut it into 12 puzzle pieces. Make cuts simpler for younger children."
    },
    {
      name: "The Final Deduction",
      task: "Based on all the evidence gathered, solve this final logic puzzle to identify the culprit: 'Four suspects were in the museum at the time of the theft: the curator, the security guard, the artist, and the donor. The curator was with the donor in the east wing. The security guard was seen on camera in the north wing. The stolen painting was in the west wing. The artist claimed to be alone in the south wing, but a witness saw someone matching the artist's description leaving the west wing with a large bag.' Who stole the painting?",
      answer: "The artist",
      hints: ["Map out where each person was supposed to be", "Consider who had an alibi and who didn't", "Think about the contradicting information"],
      facilitatorInstructions: "This is a logic puzzle that requires putting together information. The artist claimed to be in the south wing but was seen in the west wing where the painting was stolen."
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

// Helper function to generate Minecraft themed supplies
const generateMinecraftSupplies = (): Supply[] => {
  return [
    { name: "Cardboard boxes decorated as Minecraft blocks", purpose: "For building challenges and decorations", category: 'theme' },
    { name: "Blue and red marbles", purpose: "For the 'Mine for Diamonds' challenge", category: 'challenge' },
    { name: "Bean bag or rice-filled container", purpose: "For the mining challenge", category: 'challenge' },
    { name: "Green paper cutouts (emeralds)", purpose: "For the Creeper's Maze challenge", category: 'challenge' },
    { name: "Building materials (paper blocks, tape)", purpose: "For the Zombie Defense challenge", category: 'challenge' },
    { name: "Soft balls", purpose: "To represent Zombies attacking", category: 'challenge' },
    { name: "Blue Kool-Aid powder and green food coloring", purpose: "For the Potion Brewing challenge", category: 'challenge' },
    { name: "Plastic cups for 'potions'", purpose: "For the brewing station", category: 'challenge' },
    { name: "Printouts of Minecraft characters", purpose: "For decorations", category: 'theme' },
    { name: "Creeper face masks or props", purpose: "For team identification", category: 'theme' }
  ];
};

// Helper function to generate Star Wars themed supplies
const generateStarWarsSupplies = (): Supply[] => {
  return [
    { name: "Pool noodle lightsabers (different colors)", purpose: "For Jedi training and team identification", category: 'theme' },
    { name: "Printed copy of the Jedi code", purpose: "For the Jedi Training challenge", category: 'challenge' },
    { name: "Binary-to-ASCII conversion chart", purpose: "For the Droid Repair challenge", category: 'challenge' },
    { name: "Alphabet strips for cipher solving", purpose: "For the Imperial Code Breaking challenge", category: 'challenge' },
    { name: "Hidden tool props (labeled items)", purpose: "For the Trash Compactor challenge", category: 'challenge' },
    { name: "TIE Fighter paper targets", purpose: "For the Blast the TIE Fighters challenge", category: 'challenge' },
    { name: "Nerf guns or soft balls", purpose: "For the Blast the TIE Fighters challenge", category: 'challenge' },
    { name: "Star Wars themed decorations", purpose: "To create the atmosphere", category: 'theme' },
    { name: "R2-D2 or BB-8 props", purpose: "For decoration or to hold clues", category: 'theme' },
    { name: "Timer or stopwatch", purpose: "For timed challenges", category: 'general' }
  ];
};

// Helper function to generate Detective themed supplies
const generateDetectiveSupplies = (): Supply[] => {
  return [
    { name: "Magnifying glasses", purpose: "For examining clues", category: 'theme' },
    { name: "Detective notebooks and pencils", purpose: "For recording clues and theories", category: 'general' },
    { name: "Fingerprint samples (printouts)", purpose: "For the Fingerprint Analysis challenge", category: 'challenge' },
    { name: "Crime scene props (ticket stub, powder, key, etc.)", purpose: "For the Crime Scene challenge", category: 'challenge' },
    { name: "Coded message printouts", purpose: "For the Coded Message challenge", category: 'challenge' },
    { name: "Surveillance photo cut into puzzle pieces", purpose: "For the Surveillance Photo challenge", category: 'challenge' },
    { name: "Deerstalker hats or detective badges", purpose: "For team identification", category: 'theme' },
    { name: "Caution tape", purpose: "For creating the crime scene", category: 'theme' },
    { name: "Logic puzzle handouts", purpose: "For the Final Deduction challenge", category: 'challenge' },
    { name: "Evidence bags or envelopes", purpose: "For collecting and organizing clues", category: 'general' }
  ];
};

// Helper function to generate generic stations
const generateGenericStations = (count: number, theme: string, difficulty: string): Station[] => {
  // Theme-specific words for word puzzles
  const themeWords: Record<string, string[]> = {
    'pokemon': ['PIKACHU', 'CHARIZARD', 'SQUIRTLE', 'EEVEE', 'SNORLAX', 'MEWTWO'],
    'avengers': ['IRONMAN', 'HULK', 'THOR', 'CAPTAIN', 'WIDOW', 'HAWKEYE'],
    'lego': ['MINIFIG', 'BRICK', 'BASEPLATE', 'STUD', 'TECHNIC', 'DUPLO'],
    'pirates': ['TREASURE', 'COMPASS', 'CAPTAIN', 'PARROT', 'ISLAND', 'PLANK'],
    'space-explorers': ['ROCKET', 'PLANET', 'GALAXY', 'ASTEROID', 'COMET', 'ORBIT'],
    'detective': ['MYSTERY', 'CLUES', 'SUSPECT', 'EVIDENCE', 'ALIBI', 'WITNESS'],
    'zombie-apocalypse': ['UNDEAD', 'SURVIVAL', 'BUNKER', 'OUTBREAK', 'INFECTION', 'CURE'],
    'heist': ['VAULT', 'SECURITY', 'DIAMONDS', 'GETAWAY', 'BLUEPRINT', 'ALARM'],
    'cyberpunk': ['HACKER', 'NEURAL', 'IMPLANT', 'MEGACITY', 'CORPORATION', 'CYBORG'],
    'horror': ['HAUNTED', 'GHOST', 'VAMPIRE', 'SHADOW', 'SCREAM', 'MANSION'],
    'escape-island': ['SHIPWRECK', 'SURVIVORS', 'PARADISE', 'COCONUT', 'SIGNAL', 'RESCUE'],
    'spy-mission': ['AGENT', 'SECRET', 'GADGET', 'MISSION', 'DISGUISE', 'ENEMY'],
    'time-travel': ['PORTAL', 'FUTURE', 'HISTORY', 'TIMELINE', 'PARADOX', 'INVENTION'],
    'murder-mystery': ['DETECTIVE', 'WEAPON', 'MOTIVE', 'SUSPECT', 'CLUES', 'INVESTIGATION'],
    'fantasy-quest': ['WIZARD', 'DRAGON', 'KINGDOM', 'QUEST', 'POTION', 'MAGIC']
  };
  
  // Get words for this theme or use defaults
  const wordList = themeWords[theme] || ['ADVENTURE', 'MYSTERY', 'PUZZLE', 'ESCAPE', 'CHALLENGE', 'TEAMWORK'];
  
  // Get a random word from the list and scramble it
  const getScrambledWord = (wordList: string[]) => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    return {
      original: word,
      scrambled: word.split('').sort(() => Math.random() - 0.5).join('')
    };
  };
  
  // Create a riddle appropriate for the theme
  const getRiddle = (theme: string) => {
    const riddles = [
      {
        theme: 'general',
        riddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
        answer: "A map"
      },
      {
        theme: 'general',
        riddle: "What has a head and a tail, but no body?",
        answer: "A coin"
      },
      {
        theme: 'general',
        riddle: "The more you take, the more you leave behind. What am I?",
        answer: "Footprints"
      },
      {
        theme: 'general',
        riddle: "What has many keys but can't open a single lock?",
        answer: "A piano"
      },
      {
        theme: 'pokemon',
        riddle: "I evolve from a small yellow creature. I harness the power of lightning. What Pokémon am I?",
        answer: "Pikachu"
      },
      {
        theme: 'avengers',
        riddle: "I'm made of a rare metal from Africa. I was used to make a super suit and a shield. What am I?",
        answer: "Vibranium"
      }
    ];
    
    // Find a riddle for this theme or use a general one
    const themeRiddles = riddles.filter(r => r.theme === theme);
    const validRiddles = themeRiddles.length > 0 ? themeRiddles : riddles.filter(r => r.theme === 'general');
    return validRiddles[Math.floor(Math.random() * validRiddles.length)];
  };
  
  // Create hidden objects for this theme
  const getHiddenObjects = (theme: string) => {
    const themeObjects: Record<string, string[]> = {
      'pokemon': ['Poké Ball', 'Pikachu toy', 'Trainer card', 'Gym badge', 'Potion bottle'],
      'avengers': ['Captain America shield', 'Iron Man mask', 'Thor\'s hammer', 'Hulk fist', 'Black Widow emblem'],
      'lego': ['Minifigure', 'Red 2x4 brick', 'Yellow head', 'Blue baseplate', 'Lego wheel'],
      'pirates': ['Treasure map', 'Pirate flag', 'Plastic coin', 'Toy compass', 'Eye patch'],
      'default': ['Key', 'Map', 'Letter', 'Token', 'Symbol']
    };
    
    return themeObjects[theme] || themeObjects['default'];
  };
  
  // Generate the stations
  const scrambledWord = getScrambledWord(wordList);
  const riddle = getRiddle(theme);
  const hiddenObjects = getHiddenObjects(theme);
  
  const stations: Station[] = [
    {
      name: `${theme} Word Puzzle`,
      task: `Unscramble these letters to find a word related to ${theme}: ${scrambledWord.scrambled}`,
      answer: scrambledWord.original,
      hints: ["Look for common letters that go together", `It's ${scrambledWord.original.length} letters long`, `It starts with '${scrambledWord.original[0]}'`],
      facilitatorInstructions: `The answer is ${scrambledWord.original}. Have the children write down their answer. When correct, give them the next clue.`
    },
    {
      name: `${theme} Hidden Objects`,
      task: `Find these 5 hidden ${theme}-related objects in this room within 3 minutes: ${hiddenObjects.join(', ')}.`,
      answer: `Successfully finding all objects: ${hiddenObjects.join(', ')}`,
      hints: ["Look high and low", "Check under and behind furniture", "Some objects might be partially hidden"],
      facilitatorInstructions: `Hide the following objects around the room: ${hiddenObjects.join(', ')}. Make them challenging but findable for the age group.`
    },
    {
      name: `${theme} Riddle Challenge`,
      task: `Solve this riddle: ${riddle.riddle}`,
      answer: riddle.answer,
      hints: ["Think metaphorically", "Consider objects related to the theme", "The answer is something common"],
      facilitatorInstructions: `The answer is "${riddle.answer}". When they solve it, give them the next clue or a piece of a larger puzzle.`
    },
    {
      name: `${theme} Physical Challenge`,
      task: `Relay race: Each team member must cross the room while balancing a "${theme}" item (bean bag) on their head. If it falls, you must go back to the start. Complete the relay in under 2 minutes.`,
      answer: "Successfully completing the relay",
      hints: ["Move slowly and steadily", "Keep your head level", "Use teamwork and encourage each other"],
      facilitatorInstructions: "Set up a start and finish line about 15 feet apart. Use bean bags or soft items for balancing. Time the teams."
    },
    {
      name: `${theme} Code Breaking`,
      task: `Decode this message using the key where A=1, B=2, etc.: "20-8-5 6-9-14-1-12 3-15-4-5 9-19 8-9-4-4-5-14"`,
      answer: "THE FINAL CODE IS HIDDEN",
      hints: ["Each number represents a letter position in the alphabet", "1=A, 2=B, etc.", "Group the numbers by dashes to find each letter"],
      facilitatorInstructions: "This is a simple substitution cipher where each number represents a letter's position in the alphabet. Provide an alphabet chart for reference."
    },
    {
      name: `${theme} Final Puzzle`,
      task: `Using the clues from previous stations, find the hidden treasure. The first letter of each answer spells out the location.`,
      answer: "Varies based on previous stations",
      hints: ["Write down the first letter of each answer", "The location is somewhere in this building/house", "It's a simple word that describes a location"],
      facilitatorInstructions: "Design this final challenge to bring together elements from earlier stations. If previous stations spell out 'CHEST', hide the final prize in a chest or box."
    }
  ];
  
  // If difficulty is easy, simplify the tasks
  if (difficulty === 'easy') {
    stations.forEach(station => {
      station.hints.push("Here's a big hint that almost gives it away: " + station.answer);
    });
  }
  
  // Return only the requested number of stations
  return stations.slice(0, count);
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
    { name: `5 hidden objects: ${getThemeObjects(theme).join(', ')}`, purpose: "For specific challenges", category: 'theme' }
  ];
};

// Helper function to get theme-specific objects
const getThemeObjects = (theme: string): string[] => {
  const themeObjects: Record<string, string[]> = {
    'pokemon': ['Poké Ball', 'Pikachu toy', 'Trainer card', 'Gym badge', 'Potion bottle'],
    'avengers': ['Captain America shield', 'Iron Man mask', 'Thor\'s hammer', 'Hulk fist', 'Black Widow emblem'],
    'lego': ['Minifigure', 'Red 2x4 brick', 'Yellow head', 'Blue baseplate', 'Lego wheel'],
    'pirates': ['Treasure map', 'Pirate flag', 'Plastic coin', 'Toy compass', 'Eye patch'],
    'space-explorers': ['Toy rocket', 'Star cutout', 'Alien figure', 'Planet model', 'Astronaut picture'],
    'detective': ['Magnifying glass', 'Notebook', 'Pencil', 'Fingerprint card', 'Mystery novel'],
    'zombie-apocalypse': ['Toy flashlight', 'First aid kit', 'Map', 'Water bottle', 'Compass'],
    'default': ['Key', 'Map', 'Letter', 'Token', 'Symbol']
  };
  
  return themeObjects[theme] || themeObjects['default'];
};
