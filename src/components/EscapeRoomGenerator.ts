
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
  type?: string; // Add type to track what kind of station this is
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
  
  // Get a formatted theme name for display in challenges
  const displayThemeName = getDisplayThemeName(themeName);
  
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
  } else if (config.theme === 'winnie-pooh' || config.customTheme?.toLowerCase().includes('winnie') || config.customTheme?.toLowerCase().includes('pooh')) {
    title = "Hundred Acre Wood Mystery";
    story = "Oh bother! Winnie the Pooh's honey pots have all gone missing, and his tumbly is getting rumbly! As Pooh's friends, you must help search the Hundred Acre Wood, solve puzzles from Christopher Robin, and follow clues to find the missing honey before Pooh's picnic with all his friends.";
    
    return {
      title,
      story,
      teamSetup,
      stations: generateWinniePoohStations(numStations, config.difficulty),
      supplies: generateWinniePoohSupplies(),
      prizes: ["Honey-flavored treats", "Winnie the Pooh coloring books", "Plush Winnie the Pooh character keychains", "Red balloon toys", "Hundred Acre Wood map prints"]
    };
  } else if (config.theme === 'peppa-pig' || config.customTheme?.toLowerCase().includes('peppa')) {
    title = "Peppa's Muddy Puddle Adventure";
    story = "Peppa and George are planning a special surprise party, but all the party supplies have been scattered around by a big wind! As Peppa's friends, you need to help find all the missing party items by jumping in muddy puddles, solving puzzles, and working together before the party guests arrive!";
    
    return {
      title,
      story,
      teamSetup,
      stations: generatePeppaPigStations(numStations, config.difficulty),
      supplies: generatePeppaPigSupplies(),
      prizes: ["Peppa Pig stickers", "Small Peppa Pig character toys", "Muddy puddle slime", "Peppa Pig party hats", "Colorful balloons"]
    };
  }
  
  // Default generic response for any other theme using theme-specific words
  title = `The ${displayThemeName} Challenge`;
  story = `An exciting adventure in the world of ${displayThemeName} awaits! Participants will need to solve puzzles, find clues, and work together to complete a series of challenges.`;
  
  return {
    title,
    story,
    teamSetup,
    stations: generateGenericStations(numStations, config.theme, config.difficulty, displayThemeName),
    supplies: generateGenericSupplies(config.theme, displayThemeName),
    prizes: ["Certificate of completion", `Small ${displayThemeName} themed toys`, "Candy treats", "Custom medals"]
  };
};

// Helper function to convert theme IDs to display names
const getDisplayThemeName = (themeId: string): string => {
  const themeMap: Record<string, string> = {
    'peppa-pig': 'Peppa Pig',
    'winnie-pooh': 'Winnie the Pooh',
    'paw-patrol': 'Paw Patrol',
    'mickey-mouse': 'Mickey Mouse',
    'bluey': 'Bluey',
    'sesame-street': 'Sesame Street',
    'cocomelon': 'Cocomelon',
    'frozen': 'Frozen',
    'dinosaurs': 'Dinosaurs',
    'under-the-sea': 'Under the Sea',
    'harry-potter-junior': 'Harry Potter Junior',
    'pokemon': 'Pokemon',
    'minecraft': 'Minecraft',
    'star-wars-junior': 'Star Wars Junior',
    'avengers': 'Avengers',
    'jurassic-park': 'Jurassic Park',
    'lego': 'LEGO Adventure',
    'pirates': 'Pirates',
    'space-explorers': 'Space Explorers',
    'detective': 'Junior Detective',
    'harry-potter': 'Harry Potter',
    'star-wars': 'Star Wars',
    'marvel': 'Marvel Universe',
    'stranger-things': 'Stranger Things',
    'percy-jackson': 'Percy Jackson',
    'hunger-games': 'Hunger Games',
    'minecraft-advanced': 'Minecraft Advanced',
    'fortnite': 'Fortnite',
    'science-lab': 'Science Lab',
    'tomb-raider': 'Tomb Raider',
    'detective-noir': 'Detective Noir',
    'zombie-apocalypse': 'Zombie Apocalypse',
    'heist': 'The Heist',
    'cyberpunk': 'Cyberpunk',
    'horror': 'Horror Mansion',
    'escape-island': 'Escape Island',
    'spy-mission': 'Spy Mission',
    'time-travel': 'Time Travel',
    'murder-mystery': 'Murder Mystery',
    'fantasy-quest': 'Fantasy Quest'
  };
  
  return themeMap[themeId] || themeId;
};

// Helper function for Winnie the Pooh themed stations
const generateWinniePoohStations = (count: number, difficulty: string): Station[] => {
  const stations: Station[] = [
    {
      name: "Honey Hunt",
      task: "Help Pooh find his honey! Unscramble these letters to find 5 places where Pooh might hide his honey: EERT, TOPWEREFY, OOLG, ETRUCMPHSIROR INROB SEHOU, BBRISTSA EDNARG",
      answer: "TREE, FLOWERPOT, LOG, CHRISTOPHER ROBIN HOUSE, RABBITS GARDEN",
      hints: ["These are all places in the Hundred Acre Wood", "Think about where Pooh and his friends live", "One is where flowers grow"],
      facilitatorInstructions: "Have pictures or drawings of these locations around the room. When they unscramble a word, they should look for the corresponding location to find the next clue."
    },
    {
      name: "Eeyore's Tail",
      task: "Oh dear! Eeyore has lost his tail again. Search the room to find 3 possible tails (ribbons pinned to different objects). Then solve this riddle to determine which is the real tail: 'I am pink and bright and tied up tight. I help hold things together, but on a donkey I'm light as a feather.'",
      answer: "The pink ribbon",
      hints: ["Eeyore's tail has a bow on it", "Think about the color that might make Eeyore embarrassed", "In the books, what color is the bow on Eeyore's tail?"],
      facilitatorInstructions: "Hide three different colored ribbons around the room (pink, blue, and yellow). The pink one is the correct answer."
    },
    {
      name: "Tigger's Bounce Challenge",
      task: "Tigger loves to bounce! Create a bouncing pattern by hopping on the numbered spots in the correct sequence. The formula is: 'Start at 1, then add 2, then add 3, then add 1, then add 4.' What 5 numbers will you land on?",
      answer: "1, 3, 6, 7, 11",
      hints: ["Start at spot number 1", "1 + 2 = 3, so the second spot is 3", "3 + 3 = 6, so the third spot is 6"],
      facilitatorInstructions: "Place numbered paper spots on the floor. Children must physically hop from spot to spot following the pattern. If a child has mobility issues, they can trace the path with their finger or a pointer."
    },
    {
      name: "Piglet's Brave Quest",
      task: "Piglet is very small and very scared, but he's also very brave! Help Piglet navigate through his fears by matching each fear with its solution: 1. Heffalumps, 2. Woozles, 3. Strong winds, 4. Getting lost, 5. The dark. Solutions: A. Map, B. Flashlight, C. Pooh's hand, D. Sturdy house, E. Brave thoughts.",
      answer: "1-E, 2-C, 3-D, 4-A, 5-B",
      hints: ["Think about what might help with each fear", "What would help you find your way if you were lost?", "What would make you feel better in the dark?"],
      facilitatorInstructions: "Create cards with the fears and solutions. Children must match them correctly. For younger kids, you can use pictures instead of words."
    },
    {
      name: "Roo's Jumping Game",
      task: "Like Tigger, Roo loves to jump! Transfer 10 'Roo balls' (ping pong balls) from one container to another by bouncing them into the target. You must bounce each ball at least once before it lands in the container.",
      answer: "Successfully transferring 10 balls",
      hints: ["Try bouncing the ball on the table or floor", "Work as a team and take turns", "Aim carefully"],
      facilitatorInstructions: "Set up two containers about 5 feet apart. Fill one with 10 ping pong balls. Children must bounce the balls from the first container into the second one."
    },
    {
      name: "Owl's Wisdom Test",
      task: "Wise old Owl has a puzzle for you! Count how many of each letter appears in this sentence from one of Owl's stories: 'THE HUNDRED ACRE WOOD IS WHERE CHRISTOPHER ROBIN PLAYS WITH POOH BEAR.' Count only the letters: H, O, E, Y.",
      answer: "H:4, O:7, E:5, Y:3",
      hints: ["Go through the sentence letter by letter", "Keep track of your count on paper", "O appears in words like HUNDRED and WOOD"],
      facilitatorInstructions: "Provide the children with paper and pencils to keep track of their counts. For younger children, you can provide a simpler sentence."
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

// Helper function for Peppa Pig themed stations
const generatePeppaPigStations = (count: number, difficulty: string): Station[] => {
  const stations: Station[] = [
    {
      name: "Muddy Puddle Jump",
      task: "Peppa loves jumping in muddy puddles! Follow the puddle path by stepping only on the puddles that match this pattern: 'small, big, small, big, big.' There are 10 puddles laid out - which ones should you jump in?",
      answer: "Puddles 1, 2, 3, 4, and 6",
      hints: ["Start with the first puddle", "Follow the size pattern: small, big, small, big, big", "If puddle 1 is small, then puddle 2 must be big"],
      facilitatorInstructions: "Lay out 10 paper 'puddles' of varying sizes in a path. Label them 1-10. Children must identify and step only on the ones that follow the pattern."
    },
    {
      name: "George's Dinosaur Hunt",
      task: "George loves his dinosaur! Find the 5 hidden dinosaur pictures around the room and arrange them from smallest to largest. What color is the middle-sized dinosaur?",
      answer: "Green",
      hints: ["Look high and low for the dinosaur pictures", "Once you find all 5, compare their sizes", "The middle one is the 3rd dinosaur when arranged by size"],
      facilitatorInstructions: "Hide 5 dinosaur pictures of different sizes and colors around the room. The middle-sized one should be green."
    },
    {
      name: "Grandpa Pig's Garden Puzzle",
      task: "Unscramble these words to find 5 things that grow in Grandpa Pig's garden: OTATOP, ROTRAC, TUCICEL, BBCAGAE, RWBAYRRSTE",
      answer: "POTATO, CARROT, LETTUCE, CABBAGE, STRAWBERRY",
      hints: ["These are all vegetables and fruits", "Some grow underground", "One is red and sweet"],
      facilitatorInstructions: "Have plastic toy vegetables or pictures available. When children solve each word, they can match it to the corresponding item."
    },
    {
      name: "Daddy Pig's Big Tummy Laugh",
      task: "Daddy Pig has a big laugh! Listen to these 5 recorded laughs and identify which one is Daddy Pig's. His laugh contains exactly 5 'ho' sounds and ends with a snort.",
      answer: "Laugh number 3",
      hints: ["Count the 'ho' sounds in each laugh", "Listen for the snort at the end", "Daddy Pig's laugh is deep and jolly"],
      facilitatorInstructions: "Record or play 5 different laughs from a device. Make sure laugh #3 has exactly 5 'ho' sounds and ends with a snort."
    },
    {
      name: "Peppa's Family Matching Game",
      task: "Match each Peppa Pig character to their favorite activity: 1. Peppa, 2. George, 3. Mummy Pig, 4. Daddy Pig. Activities: A. Working at home, B. Jumping in muddy puddles, C. Playing with dinosaurs, D. Driving the car.",
      answer: "1-B, 2-C, 3-A, 4-D",
      hints: ["What does Peppa love to do more than anything?", "George always carries his dinosaur", "Think about what the grown-ups do in the show"],
      facilitatorInstructions: "Create cards with the characters and activities. Children must match them correctly."
    },
    {
      name: "Miss Rabbit's Jobs",
      task: "Miss Rabbit has many jobs! Solve this riddle to find out which job she's doing today: 'I fly in the sky but I'm not a bird, I take people places and have a red button. What am I driving?'",
      answer: "Helicopter",
      hints: ["Miss Rabbit drives many vehicles", "This vehicle can hover", "It has spinning blades on top"],
      facilitatorInstructions: "After solving the riddle, the children can be given a toy helicopter or a picture of one that contains the next clue."
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

// Helper function for Winnie the Pooh themed supplies
const generateWinniePoohSupplies = (): Supply[] => {
  return [
    { name: "Small honey pots (can be plastic cups decorated like honey pots)", purpose: "For the Honey Hunt challenge and decorations", category: 'theme' },
    { name: "Colorful ribbons (especially pink ones)", purpose: "For Eeyore's Tail challenge", category: 'challenge' },
    { name: "Numbered paper spots", purpose: "For Tigger's Bounce Challenge", category: 'challenge' },
    { name: "Fear and solution cards", purpose: "For Piglet's Brave Quest", category: 'challenge' },
    { name: "Ping pong balls", purpose: "As 'Roo balls' for Roo's Jumping Game", category: 'challenge' },
    { name: "Two containers for the balls", purpose: "For Roo's Jumping Game", category: 'challenge' },
    { name: "Paper and pencils", purpose: "For Owl's Wisdom Test", category: 'challenge' },
    { name: "Winnie the Pooh character cutouts or stuffed toys", purpose: "For decoration and to mark stations", category: 'theme' },
    { name: "Hundred Acre Wood map (hand-drawn is fine)", purpose: "For decoration and orientation", category: 'theme' },
    { name: "Red balloons", purpose: "For decoration (like Winnie the Pooh with a balloon)", category: 'theme' }
  ];
};

// Helper function for Peppa Pig themed supplies
const generatePeppaPigSupplies = (): Supply[] => {
  return [
    { name: "Paper 'puddles' of different sizes", purpose: "For the Muddy Puddle Jump challenge", category: 'challenge' },
    { name: "Dinosaur pictures of different sizes and colors", purpose: "For George's Dinosaur Hunt", category: 'challenge' },
    { name: "Toy vegetables or pictures", purpose: "For Grandpa Pig's Garden Puzzle", category: 'challenge' },
    { name: "Device to play recorded laughs", purpose: "For Daddy Pig's Big Tummy Laugh", category: 'challenge' },
    { name: "Character and activity cards", purpose: "For Peppa's Family Matching Game", category: 'challenge' },
    { name: "Toy helicopter or picture", purpose: "For Miss Rabbit's Jobs", category: 'challenge' },
    { name: "Peppa Pig character cutouts", purpose: "For decoration", category: 'theme' },
    { name: "Pink and red decorations", purpose: "To match Peppa's colors", category: 'theme' },
    { name: "Muddy puddle themed items (brown/blue circles)", purpose: "For decoration", category: 'theme' },
    { name: "Peppa house picture or model", purpose: "For decoration", category: 'theme' }
  ];
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
const generateGenericStations = (count: number, themeId: string, difficulty: string, themeName: string): Station[] => {
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
    'fantasy-quest': ['WIZARD', 'DRAGON', 'KINGDOM', 'QUEST', 'POTION', 'MAGIC'],
    'winnie-pooh': ['HONEY', 'POOH', 'PIGLET', 'TIGGER', 'RABBIT', 'EEYORE'],
    'peppa-pig': ['PEPPA', 'GEORGE', 'MUDDY', 'PUDDLE', 'FAMILY', 'JUMP'],
    'paw-patrol': ['CHASE', 'MARSHALL', 'SKYE', 'RUBBLE', 'ZUMA', 'ROCKY'],
    'mickey-mouse': ['MICKEY', 'MINNIE', 'PLUTO', 'DONALD', 'GOOFY', 'DAISY'],
    'bluey': ['BLUEY', 'BINGO', 'BANDIT', 'CHILLI', 'GAMES', 'PLAYFUL'],
    'sesame-street': ['ELMO', 'COOKIE', 'GROVER', 'OSCAR', 'COUNT', 'ABBY'],
    'cocomelon': ['NURSERY', 'RHYMES', 'SINGING', 'LEARNING', 'FAMILY', 'SCHOOL'],
    'frozen': ['ELSA', 'ANNA', 'OLAF', 'KRISTOFF', 'SVEN', 'SNOWMAN'],
    'dinosaurs': ['TREX', 'RAPTOR', 'FOSSIL', 'JURASSIC', 'SCALES', 'ROAR'],
    'under-the-sea': ['CORAL', 'FISH', 'OCEAN', 'MERMAID', 'SHELL', 'REEF']
  };
  
  // Get words for this theme or use defaults
  const wordList = themeWords[themeId] || ['ADVENTURE', 'MYSTERY', 'PUZZLE', 'ESCAPE', 'CHALLENGE', 'TEAMWORK'];
  
  // Get a random word from the list and scramble it
  const getScrambledWord = (wordList: string[]) => {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    return {
      original: word,
      scrambled: word.split('').sort(() => Math.random() - 0.5).join('')
    };
  };
  
  // Create a riddle appropriate for the theme
  const getRiddle = (themeId: string) => {
    const riddles: Record<string, { riddle: string, answer: string }[]> = {
      'pokemon': [
        {
          riddle: "I evolve from a small yellow creature. I harness the power of lightning. Who am I?",
          answer: "Pikachu"
        },
        {
          riddle: "I'm a water type starter Pokémon. My final evolution has powerful water cannons on its shell. Who am I?",
          answer: "Squirtle"
        }
      ],
      'avengers': [
        {
          riddle: "I'm made of a rare metal from Africa. I was used to make a super suit and a shield. What am I?",
          answer: "Vibranium"
        },
        {
          riddle: "I'm the strongest Avenger, and I turn green when I'm angry. Who am I?",
          answer: "Hulk"
        }
      ],
      'winnie-pooh': [
        {
          riddle: "I'm yellow and round and love to eat a sweet sticky food made by bees. Who am I?",
          answer: "Winnie the Pooh"
        },
        {
          riddle: "I'm small and pink and very nervous, but I'm best friends with a bear. Who am I?",
          answer: "Piglet"
        }
      ],
      'peppa-pig': [
        {
          riddle: "I'm pink and love to jump in dirty water outside after it rains. Who am I?",
          answer: "Peppa Pig"
        },
        {
          riddle: "I'm Peppa's little brother and I love my toy dinosaur. Who am I?",
          answer: "George"
        }
      ],
      'paw-patrol': [
        {
          riddle: "I'm a Dalmatian pup who serves as a firefighter. Who am I?",
          answer: "Marshall"
        },
        {
          riddle: "I'm a German Shepherd who leads the Paw Patrol team. Who am I?",
          answer: "Chase"
        }
      ],
      'frozen': [
        {
          riddle: "I'm a princess with magical ice powers. Who am I?",
          answer: "Elsa"
        },
        {
          riddle: "I'm a snowman who loves warm hugs. Who am I?",
          answer: "Olaf"
        }
      ],
      'default': [
        {
          riddle: "I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?",
          answer: "A map"
        },
        {
          riddle: "What has a head and a tail, but no body?",
          answer: "A coin"
        }
      ]
    };
    
    // Find riddles for this theme or use general ones
    const themeRiddles = riddles[themeId] || riddles['default'];
    return themeRiddles[Math.floor(Math.random() * themeRiddles.length)];
  };
  
  // Create hidden objects for this theme
  const getHiddenObjects = (themeId: string): string[] => {
    const themeObjects: Record<string, string[]> = {
      'pokemon': ['Poké Ball', 'Pikachu toy', 'Trainer card', 'Gym badge', 'Potion bottle'],
      'avengers': ['Captain America shield', 'Iron Man mask', 'Thor\'s hammer', 'Hulk fist', 'Black Widow emblem'],
      'lego': ['Minifigure', 'Red 2x4 brick', 'Yellow head', 'Blue baseplate', 'Lego wheel'],
      'pirates': ['Treasure map', 'Pirate flag', 'Plastic coin', 'Toy compass', 'Eye patch'],
      'winnie-pooh': ['Honey pot', 'Red balloon', 'Tigger\'s tail', 'Eeyore\'s house', 'Piglet\'s scarf'],
      'peppa-pig': ['Muddy puddle drawing', 'Toy dinosaur', 'Daddy Pig\'s glasses', 'Peppa\'s boots', 'Toy teddy'],
      'paw-patrol': ['Pup tag', 'Chase\'s police hat', 'Marshall\'s fire hat', 'Ryder\'s pup pad', 'Paw Patrol badge'],
      'frozen': ['Snowflake decoration', 'Elsa\'s glove', 'Carrot nose', 'Paper crown', 'Reindeer antlers'],
      'mickey-mouse': ['Mickey ears', 'Red bow', 'White gloves', 'Yellow shoes', 'Mouse tail'],
      'space-explorers': ['Toy rocket', 'Star cutout', 'Alien figure', 'Planet model', 'Astronaut picture'],
      'dinosaurs': ['Dinosaur toy', 'Fossil imprint', 'Dinosaur egg', 'Dinosaur footprint', 'Dinosaur book'],
      'under-the-sea': ['Seashell', 'Toy fish', 'Mermaid figure', 'Toy boat', 'Blue ribbon (water)'],
      'default': ['Key', 'Map', 'Letter', 'Token', 'Symbol']
    };
    
    return themeObjects[themeId] || themeObjects['default'];
  };
  
  // Generate the stations
  const scrambledWord = getScrambledWord(wordList);
  const riddle = getRiddle(themeId);
  const hiddenObjects = getHiddenObjects(themeId);
  
  const stations: Station[] = [
    {
      name: `${themeName} Word Puzzle`,
      task: `Unscramble these letters to find a word related to ${themeName}: ${scrambledWord.scrambled}`,
      answer: scrambledWord.original,
      hints: ["Look for common letters that go together", `It's ${scrambledWord.original.length} letters long`, `It starts with '${scrambledWord.original[0]}'`],
      facilitatorInstructions: `The answer is ${scrambledWord.original}. Have the children write down their answer. When correct, give them the next clue.`
    },
    {
      name: `${themeName} Hidden Objects`,
      task: `Find these 5 hidden ${themeName}-related objects in this room within 3 minutes: ${hiddenObjects.join(', ')}.`,
      answer: `Successfully finding all objects: ${hiddenObjects.join(', ')}`,
      hints: ["Look high and low", "Check under and behind furniture", "Some objects might be partially hidden"],
      facilitatorInstructions: `Hide the following objects around the room: ${hiddenObjects.join(', ')}. Make them challenging but findable for the age group.`
    },
    {
      name: `${themeName} Riddle Challenge`,
      task: `Solve this riddle: ${riddle.riddle}`,
      answer: riddle.answer,
      hints: ["Think metaphorically", "Consider characters or objects related to the theme", "The answer is something from the theme"],
      facilitatorInstructions: `The answer is "${riddle.answer}". When they solve it, give them the next clue or a piece of a larger puzzle.`
    },
    {
      name: `${themeName} Physical Challenge`,
      task: `Relay race: Each team member must cross the room while balancing a "${themeName}" item (bean bag) on their head. If it falls, you must go back to the start. Complete the relay in under 2 minutes.`,
      answer: "Successfully completing the relay",
      hints: ["Move slowly and steadily", "Keep your head level", "Use teamwork and encourage each other"],
      facilitatorInstructions: "Set up a start and finish line about 15 feet apart. Use bean bags or soft items for balancing. Time the teams."
    },
    {
      name: `${themeName} Code Breaking`,
      task: `Decode this message using the key where A=1, B=2, etc.: "20-8-5 6-9-14-1-12 3-15-4-5 9-19 8-9-4-4-5-14"`,
      answer: "THE FINAL CODE IS HIDDEN",
      hints: ["Each number represents a letter position in the alphabet", "1=A, 2=B, etc.", "Group the numbers by dashes to find each letter"],
      facilitatorInstructions: "This is a simple substitution cipher where each number represents a letter's position in the alphabet. Provide an alphabet chart for reference."
    },
    {
      name: `${themeName} Final Puzzle`,
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
const generateGenericSupplies = (themeId: string, themeName: string): Supply[] => {
  // Get theme-specific objects
  const hiddenObjects = getThemeObjects(themeId);
  
  return [
    { name: `${themeName}-themed decorations`, purpose: "To set the atmosphere", category: 'theme' },
    { name: "Team identifiers (bandanas, badges, etc.)", purpose: "To identify teams", category: 'general' },
    { name: "Pencils and paper", purpose: "For solving puzzles", category: 'general' },
    { name: "Small containers or boxes", purpose: "For hiding clues", category: 'general' },
    { name: "Locks and keys (or combination locks)", purpose: "For securing clues", category: 'challenge' },
    { name: "Flashlights", purpose: "For finding hidden objects", category: 'challenge' },
    { name: "Timer or stopwatch", purpose: "For timed challenges", category: 'general' },
    { name: "Envelopes for clues", purpose: "To present each challenge", category: 'general' },
    { name: "Small treasure box", purpose: "For the final prize", category: 'general' },
    { name: `5 hidden objects: ${hiddenObjects.join(', ')}`, purpose: "For the Hidden Objects challenge", category: 'theme' }
  ];
};

// Helper function to get theme-specific objects
const getThemeObjects = (themeId: string): string[] => {
  const themeObjects: Record<string, string[]> = {
    'pokemon': ['Poké Ball', 'Pikachu toy', 'Trainer card', 'Gym badge', 'Potion bottle'],
    'avengers': ['Captain America shield', 'Iron Man mask', 'Thor\'s hammer', 'Hulk fist', 'Black Widow emblem'],
    'lego': ['Minifigure', 'Red 2x4 brick', 'Yellow head', 'Blue baseplate', 'Lego wheel'],
    'pirates': ['Treasure map', 'Pirate flag', 'Plastic coin', 'Toy compass', 'Eye patch'],
    'space-explorers': ['Toy rocket', 'Star cutout', 'Alien figure', 'Planet model', 'Astronaut picture'],
    'detective': ['Magnifying glass', 'Notebook', 'Pencil', 'Fingerprint card', 'Mystery novel'],
    'zombie-apocalypse': ['Toy flashlight', 'First aid kit', 'Map', 'Water bottle', 'Compass'],
    'winnie-pooh': ['Honey pot', 'Red balloon', 'Tigger\'s tail', 'Eeyore\'s house', 'Piglet\'s scarf'],
    'peppa-pig': ['Muddy puddle drawing', 'Toy dinosaur', 'Daddy Pig\'s glasses', 'Peppa\'s boots', 'Toy teddy'],
    'paw-patrol': ['Pup tag', 'Chase\'s police hat', 'Marshall\'s fire hat', 'Ryder\'s pup pad', 'Paw Patrol badge'],
    'frozen': ['Snowflake decoration', 'Elsa\'s glove', 'Carrot nose', 'Paper crown', 'Reindeer antlers'],
    'mickey-mouse': ['Mickey ears', 'Red bow', 'White gloves', 'Yellow shoes', 'Mouse tail'],
    'dinosaurs': ['Dinosaur toy', 'Fossil imprint', 'Dinosaur egg', 'Dinosaur footprint', 'Dinosaur book'],
    'under-the-sea': ['Seashell', 'Toy fish', 'Mermaid figure', 'Toy boat', 'Blue ribbon (water)'],
    'default': ['Key', 'Map', 'Letter', 'Token', 'Symbol']
  };
  
  return themeObjects[themeId] || themeObjects['default'];
};

