
import { Station } from '../components/EscapeRoomGenerator';

// Predefined stations by theme - used when API fails or for faster development
export const themeStations: Record<string, Station[]> = {
  "star-wars": [
    {
      name: "Jedi Mind Puzzle",
      task: "Decode the ancient Jedi text by matching symbols to letters using the provided cipher. Once decoded, it will reveal the location of the hidden lightsaber crystal.",
      answer: "The crystal lies within the heart of the cave",
      hints: [
        "Group similar symbols together first",
        "The most common symbol is likely the letter 'E'",
        "Look for single letter words - they're likely 'A' or 'I'"
      ],
      facilitatorInstructions: "Place the encoded message and cipher key in separate locations. The cipher key should be partially damaged/incomplete to increase difficulty."
    },
    {
      name: "Droid Repair Station",
      task: "Reassemble the damaged protocol droid by connecting the correct wires. Each wire must connect to the proper port based on the color code sequence from the Rebel Alliance manual.",
      answer: "Blue-Red-Yellow-Green-Purple",
      hints: [
        "The manual page has a small tear - you'll need to infer the missing sequence",
        "Wires must be connected in a specific order",
        "The Imperial code uses the opposite sequence"
      ],
      facilitatorInstructions: "Provide colored wires and a circuit board with ports. The 'manual' should be a partially damaged sheet with color sequences."
    },
    {
      name: "Death Star Escape",
      task: "Deactivate the tractor beam by solving the mathematical sequence that controls the power relays. Each incorrect attempt triggers an alarm.",
      answer: "The sequence is 2, 5, 10, 17, 26 (n²+1)",
      hints: [
        "Look at the difference between consecutive numbers",
        "The sequence follows a squared pattern",
        "The Death Star schematics contain a clue about the sequence type"
      ],
      facilitatorInstructions: "Create a control panel with keypads for number input. Set up a timer that accelerates after each incorrect guess."
    }
  ],
  "harry-potter": [
    {
      name: "Potion Master's Challenge",
      task: "Brew the correct potion by combining ingredients in the right order. The ancient spell book contains cryptic clues about which ingredients to use.",
      answer: "Nightshade, Mandrake Root, Phoenix Feather, Unicorn Hair",
      hints: [
        "The first ingredient comes from a plant that blooms only at night",
        "The second ingredient has a human-like form",
        "The last two ingredients come from magical creatures"
      ],
      facilitatorInstructions: "Set up containers with different colored liquids representing ingredients. Provide a worn spell book with potion riddles."
    },
    {
      name: "Marauder's Map Mystery",
      task: "Reveal the hidden message on the Marauder's Map by using the correct spell and wand movement pattern.",
      answer: "I solemnly swear that I am up to no good",
      hints: [
        "The spell begins with 'I solemnly...'",
        "Fred and George Weasley knew this spell",
        "The message appears only when you state your intentions"
      ],
      facilitatorInstructions: "Create a blank parchment with invisible ink messages that appear when the correct phrase is spoken."
    }
  ],
  "minecraft": [
    {
      name: "Redstone Circuit Challenge",
      task: "Complete the redstone circuit to power the iron door. The circuit requires specific components placed in the correct configuration.",
      answer: "Power source → Repeater → Redstone dust → Lever → Door",
      hints: [
        "Redstone signal weakens over distance",
        "Repeaters can strengthen the signal",
        "The circuit needs to form a complete loop"
      ],
      facilitatorInstructions: "Provide printed 'blocks' representing redstone components that can be arranged in different configurations."
    },
    {
      name: "Crafting Table Puzzle",
      task: "Create the diamond pickaxe by placing the correct materials in the crafting grid pattern.",
      answer: "Top row: 3 diamonds. Middle row: empty, stick, empty. Bottom row: empty, stick, empty.",
      hints: [
        "Tools always require sticks as handles",
        "The material determines the tool's strength",
        "Higher tier tools require a specific pattern"
      ],
      facilitatorInstructions: "Create a physical 3x3 crafting grid and provide cutouts of different materials (diamond, stick, wood, stone, etc)."
    }
  ],
  "superhero": [
    {
      name: "Kryptonite Containment",
      task: "Safely contain the unstable kryptonite by solving the frequency alignment puzzle. Each crystal must be tuned to the correct frequency.",
      answer: "Green: 42Hz, Red: 67Hz, Blue: 31Hz, Gold: 89Hz",
      hints: [
        "The frequencies correspond to atomic numbers of elements",
        "The lab notes contain partial frequency data",
        "The color of each crystal relates to an element on the periodic table"
      ],
      facilitatorInstructions: "Create 'crystals' of different colors with adjustable frequency dials. Provide a damaged lab notebook with partial information."
    },
    {
      name: "Villain's Code Breaker",
      task: "Decrypt the villain's master plan by breaking their cipher. The message is encoded using a superhero-themed substitution cipher.",
      answer: "Attack at midnight through the south entrance",
      hints: [
        "Each symbol represents a letter",
        "The villain has used hero emblems as part of the code",
        "Common words like 'the' and 'at' can help you identify patterns"
      ],
      facilitatorInstructions: "Create an encoded message using superhero symbols as a cipher. Provide partial decoding key with some symbols already translated."
    }
  ],
  "zombie-apocalypse": [
    {
      name: "Quarantine Zone Breach",
      task: "Decode the security clearance to access the safe zone. The military communication device is damaged and you need to repair the circuitry by connecting the correct wires based on the infection spread patterns.",
      answer: "Red-Green-Blue-Yellow-Black",
      hints: [
        "The pattern follows the chronological order of city infections",
        "The first infected city connects to the red wire",
        "The military evacuation routes provide a clue to the sequence"
      ],
      facilitatorInstructions: "Create a prop circuit board with colored wires and a map showing infection spread patterns with dates."
    },
    {
      name: "Antidote Formula",
      task: "Synthesize the zombie virus antidote by identifying the correct chemical compounds from the scattered research notes. Each compound is represented by a symbol, and you must arrange them in the correct sequence.",
      answer: "Triangle-Circle-Square-Hexagon-Star",
      hints: [
        "The first compound was discovered in a military lab",
        "The sequence mimics the virus's protein structure",
        "The last compound stabilizes the entire formula"
      ],
      facilitatorInstructions: "Provide torn research notes with chemical symbols and clues about their order. Include red herrings to increase difficulty."
    },
    {
      name: "Survivor's Supply Cache",
      task: "Unlock the hidden supply cache by solving the survivor's riddle: 'When the dead walk, I am your best friend. I have no blade but can end what breathes. My voice is loud but my silence is deadly. What am I?'",
      answer: "A gun",
      hints: [
        "This tool is commonly used for defense in a zombie apocalypse",
        "It makes noise when used",
        "It can be found in police stations and military bases"
      ],
      facilitatorInstructions: "Create a locked box with survival supplies. The answer must be entered into a combination lock using a simple letter-to-number cipher (A=1, B=2, etc)."
    }
  ],
  "space-exploration": [
    {
      name: "Oxygen System Failure",
      task: "The space station's oxygen system is failing. Restore it by solving the atmospheric composition equation: If O₂ needs to be at 21%, CO₂ at 0.04%, and N₂ at 78%, what percentage should the noble gases be set to?",
      answer: "0.96%",
      hints: [
        "All percentages must add up to 100%",
        "There are four main components in the atmosphere",
        "The noble gases make up the smallest percentage"
      ],
      facilitatorInstructions: "Create a control panel with dials for adjusting gas percentages. Include a oxygen level warning light that turns green when correct."
    },
    {
      name: "Asteroid Navigation",
      task: "Plot a safe course through the asteroid field by identifying the correct sequence of directional thrusts based on the asteroid pattern projections.",
      answer: "Up-Right-Right-Down-Left-Up",
      hints: [
        "The largest asteroid must be avoided first",
        "Minimal fuel usage requires no more than 6 maneuvers",
        "The final maneuver should position you toward the space station"
      ],
      facilitatorInstructions: "Create a star map with asteroid positions and a spacecraft model that participants need to physically move through the course."
    }
  ],
  "detective": [
    {
      name: "Crime Scene Analysis",
      task: "Identify the suspect by analyzing the fingerprints found at the crime scene and matching them to the database of known criminals.",
      answer: "Suspect #3 - The Butler",
      hints: [
        "Focus on the whorls and ridges of each print",
        "The suspect has a distinctive scar on their right thumb",
        "Check the wine glass for the clearest print"
      ],
      facilitatorInstructions: "Provide fingerprint cards for each suspect and a magnifying glass. The matching print should have subtle but identifiable differences."
    },
    {
      name: "Cryptic Ransom Note",
      task: "Decode the kidnapper's ransom note by identifying the pattern in the seemingly random letters. The note will reveal the drop location.",
      answer: "The Old Clock Tower at Midnight",
      hints: [
        "Every third letter is part of the message",
        "Ignore punctuation when counting letters",
        "The message begins with 'The'"
      ],
      facilitatorInstructions: "Create a ransom note using newspaper cutouts with the hidden message embedded. Include red herring letters to increase difficulty."
    }
  ],
  "hunger-games": [
    {
      name: "Capitol Security Override",
      task: "Hack into the Capitol's security system by decoding President Snow's personal password. The clues are hidden in the names of previous Hunger Games victors.",
      answer: "RoseBlood75",
      hints: [
        "President Snow is known for his love of roses",
        "The last two tributes from District 12 before Katniss hold a clue",
        "The year of the first Quarter Quell is significant"
      ],
      facilitatorInstructions: "Create a terminal interface with Victor records that contain hidden clues. Include a countdown timer representing Peacekeepers approaching."
    },
    {
      name: "Arena Survival Station",
      task: "Identify which plants are safe to eat in the arena. Sort the provided plant samples into 'Edible' and 'Poisonous' categories using Katniss's plant knowledge.",
      answer: "Edible: Katniss roots, pine bark, dandelion, blackberries / Poisonous: nightlock berries, white baneberry, hemlock",
      hints: [
        "Berries with smooth skin and black color are deadly",
        "Plants with umbrella-shaped flowers are often poisonous",
        "Katniss was named after an edible aquatic plant with arrow-shaped leaves"
      ],
      facilitatorInstructions: "Print images of various plants or use artificial plant samples. Include Katniss's family plant book with some torn pages."
    },
    {
      name: "Tracker Jacker Venom Antidote",
      task: "Prepare the antidote for Tracker Jacker venom by correctly identifying the sequence of ingredients needed. The recipe is encoded in a Capitol medical guide.",
      answer: "Rue's leaves, crushed, applied as paste",
      hints: [
        "Rue showed this remedy to Katniss in the arena",
        "The leaves have a distinctive shape shown in the guide",
        "Application method is as important as the ingredients"
      ],
      facilitatorInstructions: "Create sealed containers with different leaf types. Include a medical guide with partially destroyed pages containing the recipe."
    }
  ],
  "pirate": [
    {
      name: "Captain's Hidden Treasure Map",
      task: "Reassemble the torn pieces of the captain's treasure map and decode the location markings using the pirate's cipher wheel.",
      answer: "X marks the spot: Skull Island, 10 paces north of the twin palms",
      hints: [
        "The compass rose on the map points to true treasure",
        "Pirates often used landmarks rather than coordinates",
        "The captain always started counting paces with his right foot"
      ],
      facilitatorInstructions: "Create torn map pieces and a cipher wheel with maritime symbols. Include red herring map pieces that don't fit."
    },
    {
      name: "Ship's Navigation Challenge",
      task: "Plot a safe course through the treacherous reefs by correctly identifying the star patterns that guided ancient pirates through these waters.",
      answer: "North Star, Orion's Belt, Southern Cross",
      hints: [
        "The North Star is fixed in the northern sky",
        "Orion's Belt consists of three bright stars in a row",
        "The Southern Cross points to the south celestial pole"
      ],
      facilitatorInstructions: "Create a star chart with various constellations. Include a pirate's logbook with partial navigation notes."
    },
    {
      name: "Cursed Doubloon Puzzle",
      task: "Lift the curse from the pirate's gold by arranging the doubloons in the correct pattern as shown in the ghost captain's riddle.",
      answer: "Skull and crossbones pattern with 13 coins",
      hints: [
        "The number of coins is significant to pirate superstition",
        "The pattern represents the flag of the ghost captain's ship",
        "The center coin must face heads up, all others tails up"
      ],
      facilitatorInstructions: "Provide 15 prop coins (only 13 are needed) and a cryptic rhyming riddle from the ghost captain explaining the pattern."
    }
  ]
};

// Add theme aliases to handle different ways users might refer to the same theme
const themeAliases: Record<string, string[]> = {
  "star-wars": ["star wars", "jedi", "sith", "force", "skywalker", "darth vader"],
  "harry-potter": ["harry potter", "hogwarts", "wizard", "witchcraft", "magic school"],
  "minecraft": ["minecraft", "mining", "crafting", "blocks", "steve"],
  "superhero": ["superhero", "marvel", "dc", "comics", "avengers", "justice league"],
  "zombie-apocalypse": ["zombie", "apocalypse", "undead", "walking dead", "infected"],
  "space-exploration": ["space", "astronaut", "nasa", "galaxy", "planets", "cosmic", "mars", "moon"],
  "detective": ["detective", "mystery", "crime", "sherlock", "investigation", "sleuth"],
  "hunger-games": ["hunger games", "katniss", "panem", "capitol", "district", "tribute", "mockingjay"],
  "pirate": ["pirate", "treasure", "captain", "ship", "sea", "sailor", "caribbean", "buccaneer"]
};

/**
 * Find the best matching theme key for a given theme input
 */
const findBestMatchingTheme = (theme: string): string => {
  const normalizedInput = theme.toLowerCase().trim();
  
  // 1. Try direct match with a theme key
  const directMatch = Object.keys(themeStations).find(key => 
    key.toLowerCase() === normalizedInput
  );
  
  if (directMatch) return directMatch;
  
  // 2. Try matching with theme aliases
  for (const [themeKey, aliases] of Object.entries(themeAliases)) {
    if (aliases.some(alias => normalizedInput.includes(alias) || alias.includes(normalizedInput))) {
      return themeKey;
    }
  }
  
  // 3. Try partial matching with theme keys
  for (const themeKey of Object.keys(themeStations)) {
    const normalizedThemeKey = themeKey.toLowerCase();
    if (normalizedInput.includes(normalizedThemeKey) || normalizedThemeKey.includes(normalizedInput)) {
      return themeKey;
    }
  }
  
  // 4. If still no match, return the first available theme
  console.log(`No matching theme found for "${theme}", using default theme`);
  return Object.keys(themeStations)[0];
};

/**
 * Generate a fallback station based on theme when API generation fails
 */
export const generateFallbackStation = (theme: string, stationIndex: number): Station => {
  // Find best matching theme
  const themeKey = findBestMatchingTheme(theme);
  console.log(`Using theme "${themeKey}" for requested theme "${theme}"`);
  
  const themeCollection = themeStations[themeKey];
  
  // Use modulo to cycle through available stations if we need more than are predefined
  const stationTemplate = themeCollection[stationIndex % themeCollection.length];
  
  // Clone and slightly modify the template to make it feel different if we're cycling
  return {
    ...stationTemplate,
    name: `${stationTemplate.name} ${Math.floor(stationIndex / themeCollection.length) > 0 
      ? (Math.floor(stationIndex / themeCollection.length) + 1) 
      : ''}`
  };
};
