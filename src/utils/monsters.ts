import { items } from "./items";

interface BaseItem {
  id: string;
  name: string;
  probability: number;
  type: string;
  src: string;
}

interface FoodItem extends BaseItem {
  type: "food";
  status: {
    regeneration: number;
  };
}

interface ArmorItem extends BaseItem {
  type: "helmet" | "armor" | "legs" | "shield";
  status: {
    armor: number;
  };
}

interface WeaponItem extends BaseItem {
  type: "weapon";
  status: {
    attack: number;
    defense: number;
  };
}

export function isWeaponItem(item: any): item is WeaponItem {
  return (
    item.type === "weapon" &&
    item.status !== undefined &&
    typeof item.status.attack === "number"
  );
}

export function isArmorItem(item: any): item is ArmorItem {
  return (
    ["helmet", "armor", "legs", "shield"].includes(item.type) &&
    item.status !== undefined &&
    typeof item.status.armor === "number"
  );
}

export function isFoodItem(item: any): item is FoodItem {
  return (
    item.type === "food" &&
    item.status !== undefined &&
    typeof item.status.regeneration === "number"
  );
}

interface GoldItem extends BaseItem {
  type: "gold";
}

export type Item = FoodItem | GoldItem | WeaponItem | ArmorItem;

export type DropItem = Omit<Item, "probability"> & {
  qty: number;
};

interface Loot {
  gold: { id: string; min: number; max: number; src: string };
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

interface Hunt {
  id: number;
  name: string;
  monsters: MonstersProbability[];
}

function goldObjectGenerator(min: number, max: number) {
  return {
    id: "0",
    min,
    max,
    src: "src/assets/Gold_Coin.gif",
  };
}

const monsters = {
  rat: {
    name: "Rat",
    hp: 20,
    minDamage: 0,
    maxDamage: 8,
    experience: 5,
    loot: {
      gold: goldObjectGenerator(0, 4),
      items: [
        {
          ...items.cheese,
          probability: 35,
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
      gold: goldObjectGenerator(0, 2),
      items: [
        {
          ...items.cheese,
          probability: 35,
        },
      ],
    },
    src: "src/assets/Cave_Rat.gif",
  },
  spider: {
    name: "Young Troll",
  },
  troll: {
    name: "Troll",
    hp: 50,
    minDamage: 0,
    maxDamage: 10,
    experience: 20,
    src: "src/assets/Troll.gif",
    loot: {
      gold: goldObjectGenerator(0, 12),
      items: [
        {
          ...items.meat,
          probability: 100,
        },
        {
          ...items.handAxe,
          probability: 100,
        },
        {
          ...items.leatherHelmet,
          probability: 100,
        },
        {
          ...items.woodenShield,
          probability: 100,
        },
        {
          ...items.leatherArmor,
          probability: 100,
        },
      ],
    },
  },
  minotaur: {
    name: "Minotaur",
    hp: 100,
    minDamage: 0,
    maxDamage: 20,
    experience: 50,
    src: "src/assets/Minotaur.gif",
    loot: {
      gold: goldObjectGenerator(0, 20),
      items: [
        {
          ...items.brassHelmet,
          probability: 100,
        },
        {
          ...items.chainArmor,
          probability: 100,
        },
        {
          ...items.plateShield,
          probability: 100,
        },
        {
          ...items.mace,
          probability: 100,
        },
      ],
    },
  },
};

export const places: Hunt[] = [
  {
    id: 0,
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
  {
    id: 1,
    name: "Troll Cave",
    monsters: [
      {
        monster: monsters.troll,
        probability: 95,
      },
      {
        monster: monsters.rat,
        probability: 5,
      },
    ],
  },
  {
    id: 2,
    name: "Minotaur Hell",
    monsters: [
      {
        monster: monsters.minotaur,
        probability: 100,
      },
    ],
  },
];

export function selectMonster(place: Hunt): Monster {
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
      if (item.type !== "gold") {
        return {
          id: item.id,
          name: item.name,
          qty: 1,
          src: item.src,
          type: item.type,
          status: item.status,
        };
      } else {
        return {
          id: "0",
          name: "gold",
          qty: gold,
          src: "src/assets/Gold_Coin.gif",
          type: "gold",
        };
      }
    });

  droppedItems.push({
    id: "0",
    name: "gold",
    qty: gold,
    src: "src/assets/Gold_Coin.gif",
    type: "gold",
  });

  return { items: droppedItems };
}
