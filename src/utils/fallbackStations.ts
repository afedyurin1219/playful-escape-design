
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
  ]
};

/**
 * Generate a fallback station based on theme when API generation fails
 */
export const generateFallbackStation = (theme: string, stationIndex: number): Station => {
  const normalizedTheme = theme.toLowerCase().replace(/\s+/g, '-');
  const themeKey = Object.keys(themeStations).find(key => 
    normalizedTheme.includes(key) || key.includes(normalizedTheme)
  ) || Object.keys(themeStations)[0];
  
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
