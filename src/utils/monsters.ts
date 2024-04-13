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

interface GoldItem extends BaseItem {
  type: "gold";
}

type Item = FoodItem | GoldItem | WeaponItem | ArmorItem;

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

const foodType: "food" | "helmet" | "armor" | "legs" | "shield" | "weapon" =
  "food";

const helmetType: "food" | "helmet" | "armor" | "legs" | "shield" | "weapon" =
  "helmet";

const weaponType: "food" | "helmet" | "armor" | "legs" | "shield" | "weapon" =
  "weapon";

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
          id: "1",
          name: "Cheese",
          probability: 35,
          type: foodType,
          src: "src/assets/Cheese.gif",
          status: {
            regeneration: 108,
          },
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
          id: "1",
          name: "Cheese",
          probability: 100,
          type: foodType,
          src: "src/assets/Cheese.gif",
          status: {
            regeneration: 108,
          },
        },
      ],
    },
    src: "src/assets/Cave_Rat.gif",
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
          id: "2",
          name: "Meat",
          probability: 100,
          type: foodType,
          src: "src/assets/Meat.gif",
          status: {
            regeneration: 180,
          },
        },
        {
          id: "3",
          name: "Hand Axe",
          probability: 100,
          type: weaponType,
          src: "src/assets/Hand_Axe.gif",
          status: {
            attack: 15,
            defense: 10,
          },
        },
        {
          id: "4",
          name: "Leather Helmet",
          probability: 100,
          type: helmetType,
          src: "src/assets/Leather_Helmet.gif",
          status: {
            armor: 1,
          },
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
