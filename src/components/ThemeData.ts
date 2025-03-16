
export interface Theme {
  id: string;
  name: string;
  description: string;
  ageGroup: string;
  imageUrl?: string;
}

export const themes: Theme[] = [
  // Ages 3-5
  {
    id: "peppa-pig",
    name: "Peppa Pig",
    description: "Join Peppa and her friends on a muddy puddle adventure!",
    ageGroup: "3-5",
    imageUrl: "https://images.unsplash.com/photo-1628921919890-6d79dc5592ed?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "winnie-pooh",
    name: "Winnie the Pooh",
    description: "Explore the Hundred Acre Wood with Pooh and friends.",
    ageGroup: "3-5",
    imageUrl: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "paw-patrol",
    name: "Paw Patrol",
    description: "Help the Paw Patrol team save the day!",
    ageGroup: "3-5"
  },
  {
    id: "mickey-mouse",
    name: "Mickey Mouse",
    description: "A magical adventure with Mickey and friends.",
    ageGroup: "3-5"
  },
  {
    id: "bluey",
    name: "Bluey",
    description: "Play pretend games with Bluey and Bingo.",
    ageGroup: "3-5"
  },
  {
    id: "sesame-street",
    name: "Sesame Street",
    description: "Count and learn with Elmo, Big Bird and friends.",
    ageGroup: "3-5"
  },
  {
    id: "cocomelon",
    name: "Cocomelon",
    description: "Sing along with JJ and the Cocomelon family.",
    ageGroup: "3-5"
  },
  {
    id: "frozen",
    name: "Frozen",
    description: "A magical icy adventure with Elsa and Anna.",
    ageGroup: "3-5"
  },
  {
    id: "dinosaurs",
    name: "Dinosaurs",
    description: "Embark on a prehistoric adventure with dinosaurs.",
    ageGroup: "3-5"
  },
  {
    id: "under-the-sea",
    name: "Under the Sea",
    description: "Dive deep for an oceanic adventure.",
    ageGroup: "3-5"
  },
  
  // Ages 5-10
  {
    id: "harry-potter-junior",
    name: "Harry Potter Junior",
    description: "A simplified magical adventure at Hogwarts.",
    ageGroup: "5-10",
    imageUrl: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "pokemon",
    name: "Pokemon",
    description: "Gotta solve 'em all in this Pokemon adventure!",
    ageGroup: "5-10",
    imageUrl: "https://images.unsplash.com/photo-1628968434441-d9c61d55c6f9?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "minecraft",
    name: "Minecraft",
    description: "Build, craft, and solve in this blocky adventure.",
    ageGroup: "5-10"
  },
  {
    id: "star-wars-junior",
    name: "Star Wars Junior",
    description: "Use the Force to solve puzzles in a galaxy far, far away.",
    ageGroup: "5-10"
  },
  {
    id: "avengers",
    name: "Avengers",
    description: "Assemble your superhero skills to save the day!",
    ageGroup: "5-10"
  },
  {
    id: "jurassic-park",
    name: "Jurassic Park",
    description: "Escape the dinosaurs in this prehistoric adventure.",
    ageGroup: "5-10"
  },
  {
    id: "lego",
    name: "LEGO Adventure",
    description: "Build and solve your way through a LEGO world.",
    ageGroup: "5-10"
  },
  {
    id: "pirates",
    name: "Pirates",
    description: "Sail the seven seas in search of hidden treasure.",
    ageGroup: "5-10"
  },
  {
    id: "space-explorers",
    name: "Space Explorers",
    description: "Blast off on an interstellar mission.",
    ageGroup: "5-10"
  },
  {
    id: "detective",
    name: "Junior Detective",
    description: "Solve mysteries and follow the clues.",
    ageGroup: "5-10"
  },
  
  // Ages 10-15
  {
    id: "harry-potter",
    name: "Harry Potter",
    description: "Solve magical mysteries at Hogwarts School of Witchcraft and Wizardry.",
    ageGroup: "10-15",
    imageUrl: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "star-wars",
    name: "Star Wars",
    description: "Use the Force to escape the Empire's clutches.",
    ageGroup: "10-15",
    imageUrl: "https://images.unsplash.com/photo-1608889175123-8ee362201f81?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "marvel",
    name: "Marvel Universe",
    description: "Channel your inner superhero to defeat villains.",
    ageGroup: "10-15"
  },
  {
    id: "stranger-things",
    name: "Stranger Things",
    description: "Explore the Upside Down and uncover its secrets.",
    ageGroup: "10-15"
  },
  {
    id: "percy-jackson",
    name: "Percy Jackson",
    description: "Embark on a demigod quest to save the world.",
    ageGroup: "10-15"
  },
  {
    id: "hunger-games",
    name: "Hunger Games",
    description: "Use your wits to survive the ultimate challenge.",
    ageGroup: "10-15"
  },
  {
    id: "minecraft-advanced",
    name: "Minecraft Advanced",
    description: "A more complex adventure in the world of blocks.",
    ageGroup: "10-15"
  },
  {
    id: "fortnite",
    name: "Fortnite",
    description: "Race against time in this battle royale inspired challenge.",
    ageGroup: "10-15"
  },
  {
    id: "science-lab",
    name: "Science Lab",
    description: "Conduct experiments to unlock scientific secrets.",
    ageGroup: "10-15"
  },
  {
    id: "tomb-raider",
    name: "Tomb Raider",
    description: "Explore ancient ruins and solve archaeological puzzles.",
    ageGroup: "10-15"
  },
  
  // Ages 15+
  {
    id: "detective-noir",
    name: "Detective Noir",
    description: "Solve a complex murder mystery as a hardboiled detective.",
    ageGroup: "15+",
    imageUrl: "https://images.unsplash.com/photo-1486074051793-e41332bf18fc?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "zombie-apocalypse",
    name: "Zombie Apocalypse",
    description: "Survive the undead and find the cure.",
    ageGroup: "15+",
    imageUrl: "https://images.unsplash.com/photo-1509248961158-e54f6934749c?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "heist",
    name: "The Heist",
    description: "Plan the perfect heist to crack the vault.",
    ageGroup: "15+"
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Hack into systems in a dystopian future.",
    ageGroup: "15+"
  },
  {
    id: "horror",
    name: "Horror Mansion",
    description: "Escape the haunted mansion before it's too late.",
    ageGroup: "15+"
  },
  {
    id: "escape-island",
    name: "Escape Island",
    description: "Stranded on a deserted island, find your way home.",
    ageGroup: "15+"
  },
  {
    id: "spy-mission",
    name: "Spy Mission",
    description: "Complete your mission as an international spy.",
    ageGroup: "15+"
  },
  {
    id: "time-travel",
    name: "Time Travel",
    description: "Fix the timeline before history is changed forever.",
    ageGroup: "15+"
  },
  {
    id: "murder-mystery",
    name: "Murder Mystery",
    description: "Identify the killer among a group of suspects.",
    ageGroup: "15+"
  },
  {
    id: "fantasy-quest",
    name: "Fantasy Quest",
    description: "Complete an epic quest in a magical realm.",
    ageGroup: "15+"
  }
];

export const getThemesByAgeGroup = (ageGroup: string): Theme[] => {
  return themes.filter(theme => theme.ageGroup === ageGroup);
};
