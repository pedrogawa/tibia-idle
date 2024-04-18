interface BaseItem {
  id: string;
  name: string;
  probability: number;
  type: string;
  src: string;
}

export interface FoodItem extends BaseItem {
  type: "food";
  status: {
    regeneration: number;
  };
}

export interface ArmorItem extends BaseItem {
  type: "helmet" | "armor" | "legs" | "shield";
  status: {
    armor: number;
  };
}

export interface WeaponItem extends BaseItem {
  type: "weapon";
  status: {
    attack: number;
    defense: number;
  };
}

export type DropItem = Omit<Item, "probability"> & {
  qty: number;
};

export interface Loot {
  gold: { id: string; min: number; max: number; src: string };
  items: Item[];
}

interface GoldItem extends BaseItem {
  type: "gold";
}

export type Item = FoodItem | GoldItem | WeaponItem | ArmorItem;
