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
  
  // Check if it's a custom theme first - custom themes are now properly processed
  if (config.theme === 'custom' && config.customTheme) {
    // Create a normalized version of the custom theme for comparison
    const normalizedTheme = config.customTheme.toLowerCase();
    
    // Check if the custom theme matches any known themes
    if (normalizedTheme.includes('harry potter')) {
      return generateHarryPotterEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup);
    } else if (normalizedTheme.includes('minecraft')) {
      return generateMinecraftEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup);
    } else if (normalizedTheme.includes('star wars')) {
      return generateStarWarsEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup);
    } else if (normalizedTheme.includes('detective') || normalizedTheme.includes('mystery') || normalizedTheme.includes('noir')) {
      return generateDetectiveEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup);
    } else if (normalizedTheme.includes('winnie') || normalizedTheme.includes('pooh')) {
      return generateWinniePoohEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup);
    } else if (normalizedTheme.includes('peppa') || normalizedTheme.includes('pig')) {
      return generatePeppaPigEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup);
    } else if (normalizedTheme.includes('smile') || normalizedTheme.includes('horror')) {
      return generateHorrorEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup, 'smile');
    } else if (normalizedTheme.includes('frozen')) {
      return generateFrozenEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup);
    } else if (normalizedTheme.includes('pirate')) {
      return generatePirateEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup);
    } else if (normalizedTheme.includes('superhero') || normalizedTheme.includes('avenger') || normalizedTheme.includes('marvel')) {
      return generateSuperheroEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup);
    } else if (normalizedTheme.includes('dinosaur') || normalizedTheme.includes('jurassic')) {
      return generateDinosaurEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup);
    } else {
      // For truly custom themes that don't match any known categories
      return generateCustomThemeEscapeRoom(numStations, config.difficulty, config.customTheme, teamSetup);
    }
  }
  
  // Handle predefined themes
  if (config.theme === 'harry-potter' || (config.customTheme && config.customTheme.toLowerCase().includes('harry potter'))) {
    return generateHarryPotterEscapeRoom(numStations, config.difficulty, 'Harry Potter', teamSetup);
  } else if (config.theme === 'minecraft' || (config.customTheme && config.customTheme.toLowerCase().includes('minecraft'))) {
    return generateMinecraftEscapeRoom(numStations, config.difficulty, 'Minecraft', teamSetup);
  } else if (config.theme === 'star-wars' || (config.customTheme && config.customTheme.toLowerCase().includes('star wars'))) {
    return generateStarWarsEscapeRoom(numStations, config.difficulty, 'Star Wars', teamSetup);
  } else if (config.theme === 'detective-noir' || (config.customTheme && (config.customTheme.toLowerCase().includes('detective') || config.customTheme.toLowerCase().includes('mystery')))) {
    return generateDetectiveEscapeRoom(numStations, config.difficulty, 'Detective Mystery', teamSetup);
  } else if (config.theme === 'winnie-pooh' || (config.customTheme && (config.customTheme.toLowerCase().includes('winnie') || config.customTheme.toLowerCase().includes('pooh')))) {
    return generateWinniePoohEscapeRoom(numStations, config.difficulty, 'Winnie the Pooh', teamSetup);
  } else if (config.theme === 'peppa-pig' || (config.customTheme && config.customTheme.toLowerCase().includes('peppa'))) {
    return generatePeppaPigEscapeRoom(numStations, config.difficulty, 'Peppa Pig', teamSetup);
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

// Helper functions to generate complete escape rooms for specific themes
const generateHarryPotterEscapeRoom = (numStations: number, difficulty: string, themeName: string, teamSetup: string): EscapeRoomPlan => {
  return {
    title: `Hogwarts Mystery: The Chamber of Secrets`,
    story: `A mysterious force has locked down Hogwarts, and dark magic is spreading through the castle. As young witches and wizards, you must work together to solve puzzles, cast spells, and find the source of the dark magic before it's too late. Professor McGonagall has left clues around the castle to help you on your quest.`,
    teamSetup,
    stations: generateHarryPotterStations(numStations, difficulty),
    supplies: generateHarryPotterSupplies(),
    prizes: ["House Cup replica", "Chocolate frogs", "Bertie Bott's Every Flavor Beans", "Wand for each participant", "Hogwarts House badges"]
  };
};

const generateMinecraftEscapeRoom = (numStations: number, difficulty: string, themeName: string, teamSetup: string): EscapeRoomPlan => {
  return {
    title: `Minecraft: The Missing Diamonds`,
    story: `The village's precious diamonds have been stolen by the Ender Dragon! As brave miners, you must venture through the blocky world, solve puzzles, craft items, and defeat challenges to recover the missing diamonds before the dragon uses them to gain ultimate power.`,
    teamSetup,
    stations: generateMinecraftStations(numStations, difficulty),
    supplies: generateMinecraftSupplies(),
    prizes: ["Minecraft character figurines", "Diamond-shaped candy", "Creeper stickers", "Minecraft wristbands", "Pixel art craft kits"]
  };
};

const generateStarWarsEscapeRoom = (numStations: number, difficulty: string, themeName: string, teamSetup: string): EscapeRoomPlan => {
  return {
    title: `Star Wars: Escape from the Death Star`,
    story: `You are Rebel spies who have infiltrated the Empire's Death Star to steal the plans. Your mission was successful, but now you must escape before Darth Vader captures you. Navigate through Imperial security, solve puzzles, and make your way to the hidden Rebel ship before time runs out!`,
    teamSetup,
    stations: generateStarWarsStations(numStations, difficulty),
    supplies: generateStarWarsSupplies(),
    prizes: ["Lightsaber toys", "Star Wars character masks", "Rebel Alliance pins", "Space-themed candy", "Star Wars trading cards"]
  };
};

const generateDetectiveEscapeRoom = (numStations: number, difficulty: string, themeName: string, teamSetup: string): EscapeRoomPlan => {
  return {
    title: `The Case of the Missing Masterpiece`,
    story: `A priceless painting has been stolen from the city museum, and the police are baffled. As expert detectives, you've been called in to crack the case. Follow the clues, decode messages from the thief, and piece together the evidence to recover the masterpiece and bring the culprit to justice.`,
    teamSetup,
    stations: generateDetectiveStations(numStations, difficulty),
    supplies: generateDetectiveSupplies(),
    prizes: ["Magnifying glasses", "Deerstalker hats", "Detective notebooks", "Invisible ink pens", "Mystery novels"]
  };
};

const generateWinniePoohEscapeRoom = (numStations: number, difficulty: string, themeName: string, teamSetup: string): EscapeRoomPlan => {
  return {
    title: `Hundred Acre Wood Mystery`,
    story: `Oh bother! Winnie the Pooh's honey pots have all gone missing, and his tumbly is getting rumbly! As Pooh's friends, you must help search the Hundred Acre Wood, solve puzzles from Christopher Robin, and follow clues to find the missing honey before Pooh's picnic with all his friends.`,
    teamSetup,
    stations: generateWinniePoohStations(numStations, difficulty),
    supplies: generateWinniePoohSupplies(),
    prizes: ["Honey-flavored treats", "Winnie the Pooh coloring books", "Plush Winnie the Pooh character keychains", "Red balloon toys", "Hundred Acre Wood map prints"]
  };
};

const generatePeppaPigEscapeRoom = (numStations: number, difficulty: string, themeName: string, teamSetup: string): EscapeRoomPlan => {
  return {
    title: `Peppa's Muddy Puddle Adventure`,
    story: `Peppa and George are planning a special surprise party, but all the party supplies have been scattered around by a big wind! As Peppa's friends, you need to help find all the missing party items by jumping in muddy puddles, solving puzzles, and working together before the party guests arrive!`,
    teamSetup,
    stations: generatePeppaPigStations(numStations, difficulty),
    supplies: generatePeppaPigSupplies(),
    prizes: ["Peppa Pig stickers", "Small Peppa Pig character toys", "Muddy puddle slime", "Peppa Pig party hats", "Colorful balloons"]
  };
};

// New functions to handle additional themes
const generateHorrorEscapeRoom = (numStations: number, difficulty: string, themeName: string, teamSetup: string, subtheme: string = ''): EscapeRoomPlan => {
  let title = "Horror Mansion Escape";
  let story = "You've found yourself trapped in a spooky mansion with strange occurrences all around. Work together to solve the puzzles and escape before it's too late!";
  
  // Special case for the movie "Smile"
  if (subtheme === 'smile') {
    title = "Smile: Escape the Curse";
    story = "You've witnessed something terrifying - people with unnatural smiles who pass on a deadly curse. You have limited time to solve the mystery and break the curse before it claims you as its next victim!";
  }
  
  return {
    title,
    story,
    teamSetup,
    stations: generateHorrorStations(numStations, difficulty, subtheme),
    supplies: generateHorrorSupplies(subtheme),
    prizes: ["Spooky themed candy", "Small flashlights", "Horror-themed bookmarks", "Glow-in-the-dark stickers", "Mystery mini-puzzles"]
  };
};

const generateFrozenEscapeRoom = (numStations: number, difficulty: string, themeName: string, teamSetup: string): EscapeRoomPlan => {
  return {
    title: "Frozen: The Eternal Winter",
    story: "Arendelle has been plunged into an eternal winter once again! As friends of Elsa and Anna, you must work together to discover what has caused this strange weather and help restore summer to the kingdom.",
    teamSetup,
    stations: generateFrozenStations(numStations, difficulty),
    supplies: generateFrozenSupplies(),
    prizes: ["Snowflake necklaces", "Frozen character stickers", "Blue and white bracelets", "Mini snow globes", "Frozen-themed candy"]
  };
};

const generatePirateEscapeRoom = (numStations: number, difficulty: string, themeName: string, teamSetup: string): EscapeRoomPlan => {
  return {
    title: "Pirate's Lost Treasure",
    story: "Ahoy, mateys! Captain Blackbeard's legendary treasure map has been torn into pieces. As brave pirates, you must solve the puzzles, find all the pieces of the map, and discover where the treasure is hidden before rival pirates beat you to it!",
    teamSetup,
    stations: generatePirateStations(numStations, difficulty),
    supplies: generatePirateSupplies(),
    prizes: ["Chocolate gold coins", "Pirate eye patches", "Treasure map bookmarks", "Pirate flag bandanas", "Skull and crossbones stickers"]
  };
};

const generateSuperheroEscapeRoom = (numStations: number, difficulty: string, themeName: string, teamSetup: string): EscapeRoomPlan => {
  return {
    title: "Superhero Academy: Final Test",
    story: "Congratulations on making it to the final test at Superhero Academy! To graduate and receive your superhero license, you must complete a series of challenges that will test your courage, intelligence, and teamwork. Only then will you be ready to join the ranks of Earth's greatest heroes!",
    teamSetup,
    stations: generateSuperheroStations(numStations, difficulty),
    supplies: generateSuperheroSupplies(),
    prizes: ["Superhero masks", "Cape keychains", "Power wristbands", "Superhero emblem stickers", "Action figure minis"]
  };
};

const generateDinosaurEscapeRoom = (numStations: number, difficulty: string, themeName: string, teamSetup: string): EscapeRoomPlan => {
  return {
    title: "Dinosaur Park: The Great Escape",
    story: "Welcome to Dinosaur Park! But wait - there's been a security breach and some dinosaurs have escaped from their enclosures. As park rangers, you must work together to solve puzzles, track the dinosaurs, and help secure the park before any visitors arrive!",
    teamSetup,
    stations: generateDinosaurStations(numStations, difficulty),
    supplies: generateDinosaurSupplies(),
    prizes: ["Dinosaur figurines", "Fossil excavation kits", "Dinosaur stickers", "Dino egg candies", "Prehistoric activity books"]
  };
};

// For any truly custom theme that doesn't match our categories
const generateCustomThemeEscapeRoom = (numStations: number, difficulty: string, themeName: string): EscapeRoomPlan => {
  const displayThemeName = themeName || "Adventure";
  
  return {
    title: `The ${displayThemeName} Challenge`,
    story: `An exciting adventure in the world of ${displayThemeName} awaits! Participants will need to solve puzzles related to ${displayThemeName}, find clues, and work together to complete a series of themed challenges.`,
    teamSetup: '',
    stations: generateCustomThemeStations(numStations, difficulty, displayThemeName),
    supplies: generateCustomThemeSupplies(displayThemeName),
    prizes: ["Certificate of completion", `${displayThemeName}-themed prizes`, "Candy treats", "Custom medals"]
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
      hints: ["Work as a team", "Steady does it", "Maybe take
