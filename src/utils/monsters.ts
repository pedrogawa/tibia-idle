interface Item {
  id: number;
  name: string;
  probability: number;
}

export type DropItem = Omit<Item, "probability"> & {
  qty: number;
};

interface Loot {
  gold: { id: number; min: number; max: number };
  items: Item[];
}

export interface Monster {
  name: string;
  hp: number;
  minDamage: number;
  maxDamage: number;
  loot: Loot;
  src: string;
  experience: number;
}

interface MonstersProbability {
  monster: Monster;
  probability: number;
}

interface Place {
  name: string;
  monsters: MonstersProbability[];
}

const monsters = {
  rat: {
    name: "Rat",
    hp: 20,
    minDamage: 0,
    maxDamage: 8,
    experience: 50,
    loot: {
      gold: { id: 0, min: 0, max: 4 },
      items: [
        {
          id: 1,
          name: "Cheese",
          probability: 80,
        },
      ],
    },
    src: "src/assets/Rat.gif",
  },
  caveRat: {
    name: "Cave Rat",
    hp: 30,
    minDamage: 0,
    maxDamage: 10,
    experience: 10,
    loot: {
      gold: { id: 0, min: 0, max: 2 },
      items: [
        {
          id: 1,
          name: "Cheese",
          probability: 25,
        },
      ],
    },
    src: "src/assets/Cave_Rat.gif",
  },
};

export const places: Place[] = [
  {
    name: "Rookgard Sewer",
    monsters: [
      {
        monster: monsters.rat,
        probability: 95,
      },
      {
        monster: monsters.caveRat,
        probability: 5,
      },
    ],
  },
];

export function selectMonster(place: Place): Monster {
  let totalProbability = 0;
  place.monsters.forEach((mp) => (totalProbability += mp.probability));

  let randomThreshold = Math.random() * totalProbability;
  let cumulativeProbability = 0;

  for (const mp of place.monsters) {
    cumulativeProbability += mp.probability;
    if (cumulativeProbability >= randomThreshold) {
      return mp.monster;
    }
  }

  throw new Error("No monster selected, check probability values");
}

export function generateLoot(loot: Loot): { items: DropItem[] } {
  const gold = Math.floor(
    Math.random() * (loot.gold.max - loot.gold.min + 1) + loot.gold.min
  );

  const droppedItems: DropItem[] = loot.items
    .filter((item) => Math.random() * 100 <= item.probability)
    .map((item) => {
      return {
        id: item.id,
        name: item.name,
        qty: 1,
      };
    });

  droppedItems.push({
    id: 0,
    name: "gold",
    qty: gold,
  });

  return { items: droppedItems };
}
