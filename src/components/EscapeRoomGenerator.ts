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
      name: "Potions Class with Professor Snape",
      task: "Professor Snape has left instructions for a potion. Unscramble these ingredients: ZBEAORE, WOLFSBANE, AMDRAKEN, LEESTUEW, PHINODELA",
      answer: "BEZOAR, WOLFSBANE, MANDRAKE, WEASEL EYE, DOLPHIN",
      hints: ["These are all magical ingredients from Harry Potter", "One is used to cure most poisons", "One makes a loud, potentially fatal scream when pulled from soil"],
      facilitatorInstructions: "Have pictures of these ingredients around the room. When they unscramble a word, they should match it to the corresponding picture to receive the next clue."
    },
    {
      name: "Transfiguration with Professor McGonagall",
      task: "Complete this spell used to transform objects by unscrambling the letters: RMSAIDRUGU OTEFLCIARIN",
      answer: "RIDIKULUS FELIFORS",
      hints: ["The first spell is used against boggarts", "The second spell turns things into cats", "Professor Lupin taught one of these spells"],
      facilitatorInstructions: "When children unscramble the spells correctly, give them a small mirror and a cat toy that will be used in the next challenge."
    },
    {
      name: "Defense Against the Dark Arts",
      task: "To defeat the Dementor, you must cast the correct spell. Decode this message to find it: The patronus charm requires you to think of your happiest memory. Count how many times these letters appear in the spell: P, A, T, R, O, N, U, S in the phrase 'EXPECTO PATRONUM'.",
      answer: "1, 1, 2, 1, 2, 1, 1, 1",
      hints: ["E-X-P-E-C-T-O P-A-T-R-O-N-U-M", "Count each letter individually", "Some letters appear twice"],
      facilitatorInstructions: "Children need to count each letter of 'PATRONUS' in 'EXPECTO PATRONUM'. When correct, they can use these numbers as a code to unlock a box with the next clue."
    },
    {
      name: "Herbology with Professor Sprout",
      task: "Match these magical plants to their properties: 1. Devil's Snare, 2. Gillyweed, 3. Mandrake, 4. Venomous Tentacula, 5. Mimbulus Mimbletonia. Properties: A. Allows underwater breathing, B. Dislikes sunlight and fire, C. Has a fatal cry when mature, D. Spits stinksap when touched, E. Has poisonous vines.",
      answer: "1-B, 2-A, 3-C, 4-E, 5-D",
      hints: ["Remember what affected Neville's Devil's Snare in the first book", "What did Harry use in the second Triwizard task?", "Which plant does Neville keep as a pet?"],
      facilitatorInstructions: "Create cards with the plants and properties. Children must match them correctly. When completed, they receive earmuffs or pictures of earmuffs as protection from the Mandrake's cry."
    },
    {
      name: "Quidditch with Madam Hooch",
      task: "Catch the Golden Snitch! Transfer 5 'Golden Snitches' (yellow ping pong balls) using only a spoon held in your mouth from one container to another. The containers are placed 10 feet apart.",
      answer: "Successfully transferring 5 balls",
      hints: ["Work as a team", "Move slowly and steadily", "Try different approaches if one isn't working"],
      facilitatorInstructions: "Set up two containers about 10 feet apart. Fill one with yellow ping pong balls. Each team member can try to transfer balls. Once 5 are transferred, give them the next clue."
    },
    {
      name: "Gringotts Bank Puzzle",
      task: "Solve this magical number puzzle to open the Gringotts vault: If Harry was born in 1980, started Hogwarts at age 11, and the Chamber of Secrets was opened 50 years before his second year, in what year was the Chamber first opened by Tom Riddle?",
      answer: "1942",
      hints: ["Harry started Hogwarts in 1991", "The Chamber was opened in Harry's second year", "Work backwards from Harry's second year"],
      facilitatorInstructions: "This requires math skills. 1980 + 11 = 1991 (First year), 1992 (Second year), then subtract 50 years: 1992 - 50 = 1942."
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
