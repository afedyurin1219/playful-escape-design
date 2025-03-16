
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
    ageGroup: "3-5",
    imageUrl: "https://images.unsplash.com/photo-1583511655826-05700442976b?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "mickey-mouse",
    name: "Mickey Mouse",
    description: "A magical adventure with Mickey and friends.",
    ageGroup: "3-5",
    imageUrl: "https://images.unsplash.com/photo-1608768495589-5434cd8f0459?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "bluey",
    name: "Bluey",
    description: "Play pretend games with Bluey and Bingo.",
    ageGroup: "3-5",
    imageUrl: "https://images.unsplash.com/photo-1560743641-3914f2c45636?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "sesame-street",
    name: "Sesame Street",
    description: "Count and learn with Elmo, Big Bird and friends.",
    ageGroup: "3-5",
    imageUrl: "https://images.unsplash.com/photo-1614032686163-bdc24c13d0b6?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "cocomelon",
    name: "Cocomelon",
    description: "Sing along with JJ and the Cocomelon family.",
    ageGroup: "3-5",
    imageUrl: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "frozen",
    name: "Frozen",
    description: "A magical icy adventure with Elsa and Anna.",
    ageGroup: "3-5",
    imageUrl: "https://images.unsplash.com/photo-1551696785-bccc7aea92ed?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "dinosaurs",
    name: "Dinosaurs",
    description: "Embark on a prehistoric adventure with dinosaurs.",
    ageGroup: "3-5",
    imageUrl: "https://images.unsplash.com/photo-1606856110000-a0f46f9e2cf9?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "under-the-sea",
    name: "Under the Sea",
    description: "Dive deep for an oceanic adventure.",
    ageGroup: "3-5",
    imageUrl: "https://images.unsplash.com/photo-1530053969600-caed2596d242?auto=format&fit=crop&q=80&w=200&h=200"
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
    ageGroup: "5-10",
    imageUrl: "https://images.unsplash.com/photo-1587573089734-599a5787ac5d?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "star-wars-junior",
    name: "Star Wars Junior",
    description: "Use the Force to solve puzzles in a galaxy far, far away.",
    ageGroup: "5-10",
    imageUrl: "https://images.unsplash.com/photo-1586861203927-800a5acdcc4c?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "avengers",
    name: "Avengers",
    description: "Assemble your superhero skills to save the day!",
    ageGroup: "5-10",
    imageUrl: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "jurassic-park",
    name: "Jurassic Park",
    description: "Escape the dinosaurs in this prehistoric adventure.",
    ageGroup: "5-10",
    imageUrl: "https://images.unsplash.com/photo-1525877442103-5ddb2089b2bb?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "lego",
    name: "LEGO Adventure",
    description: "Build and solve your way through a LEGO world.",
    ageGroup: "5-10",
    imageUrl: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "pirates",
    name: "Pirates",
    description: "Sail the seven seas in search of hidden treasure.",
    ageGroup: "5-10",
    imageUrl: "https://images.unsplash.com/photo-1591375372138-a2645a67b0aa?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "space-explorers",
    name: "Space Explorers",
    description: "Blast off on an interstellar mission.",
    ageGroup: "5-10",
    imageUrl: "https://images.unsplash.com/photo-1446776709462-d6b525c57bd3?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "detective",
    name: "Junior Detective",
    description: "Solve mysteries and follow the clues.",
    ageGroup: "5-10",
    imageUrl: "https://images.unsplash.com/photo-1617388448621-fcb4039c779f?auto=format&fit=crop&q=80&w=200&h=200"
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
    ageGroup: "10-15",
    imageUrl: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "stranger-things",
    name: "Stranger Things",
    description: "Explore the Upside Down and uncover its secrets.",
    ageGroup: "10-15",
    imageUrl: "https://images.unsplash.com/photo-1601513445506-2ab0d4fb4229?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "percy-jackson",
    name: "Percy Jackson",
    description: "Embark on a demigod quest to save the world.",
    ageGroup: "10-15",
    imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "hunger-games",
    name: "Hunger Games",
    description: "Use your wits to survive the ultimate challenge.",
    ageGroup: "10-15",
    imageUrl: "https://images.unsplash.com/photo-1547756536-cde3673fa2e5?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "minecraft-advanced",
    name: "Minecraft Advanced",
    description: "A more complex adventure in the world of blocks.",
    ageGroup: "10-15",
    imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "fortnite",
    name: "Fortnite",
    description: "Race against time in this battle royale inspired challenge.",
    ageGroup: "10-15",
    imageUrl: "https://images.unsplash.com/photo-1589241062272-c0a000072dfa?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "science-lab",
    name: "Science Lab",
    description: "Conduct experiments to unlock scientific secrets.",
    ageGroup: "10-15",
    imageUrl: "https://images.unsplash.com/photo-1581093458791-9d93baaa3cc0?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "tomb-raider",
    name: "Tomb Raider",
    description: "Explore ancient ruins and solve archaeological puzzles.",
    ageGroup: "10-15",
    imageUrl: "https://images.unsplash.com/photo-1651171283368-bd68ec5fe928?auto=format&fit=crop&q=80&w=200&h=200"
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
    ageGroup: "15+",
    imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    description: "Hack into systems in a dystopian future.",
    ageGroup: "15+",
    imageUrl: "https://images.unsplash.com/photo-1601145686964-1350741c4b80?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "horror",
    name: "Horror Mansion",
    description: "Escape the haunted mansion before it's too late.",
    ageGroup: "15+",
    imageUrl: "https://images.unsplash.com/photo-1605806616949-59150da4b991?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "escape-island",
    name: "Escape Island",
    description: "Stranded on a deserted island, find your way home.",
    ageGroup: "15+",
    imageUrl: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "spy-mission",
    name: "Spy Mission",
    description: "Complete your mission as an international spy.",
    ageGroup: "15+",
    imageUrl: "https://images.unsplash.com/photo-1568288496057-8528e34bd5ea?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "time-travel",
    name: "Time Travel",
    description: "Fix the timeline before history is changed forever.",
    ageGroup: "15+",
    imageUrl: "https://images.unsplash.com/photo-1501139083538-0139583c060f?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "murder-mystery",
    name: "Murder Mystery",
    description: "Identify the killer among a group of suspects.",
    ageGroup: "15+",
    imageUrl: "https://images.unsplash.com/photo-1590422749897-47aae19689d6?auto=format&fit=crop&q=80&w=200&h=200"
  },
  {
    id: "fantasy-quest",
    name: "Fantasy Quest",
    description: "Complete an epic quest in a magical realm.",
    ageGroup: "15+",
    imageUrl: "https://images.unsplash.com/photo-1535666669445-e8c15cd2e7d9?auto=format&fit=crop&q=80&w=200&h=200"
  }
];

export const getThemesByAgeGroup = (ageGroup: string): Theme[] => {
  return themes.filter(theme => theme.ageGroup === ageGroup);
};
