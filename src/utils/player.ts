import { DropItem } from "../interfaces/LootInterface";
import { items } from "./items";

export interface Player {
  hp: number;
  currentHP: number;
  level: number;
  experience: number;
  currentExperience: number;
  backpack: DropItem[];
  equipment: Record<string, any>;
  skills: {
    attack: {
      level: number;
      percentage: number;
    };
    defense: {
      level: number;
      percentage: number;
    };
  };
  damage: number;
}

export const player = {
  currentHP: 150,
  hp: 150,
  level: 1,
  experience: 100,
  currentExperience: 0,
  backpack: [],
  equipment: {
    helmet: {
      id: items.leatherHelmet.id,
      name: items.leatherHelmet.name,
      src: items.leatherHelmet.src,
      status: items.leatherHelmet.status,
      type: items.leatherHelmet.type,
    },
    armor: {
      id: items.jacket.id,
      name: items.jacket.name,
      src: items.jacket.src,
      type: items.jacket.type,
      status: items.jacket.status,
    },
    weapon: {
      id: items.club.id,
      name: items.club.name,
      src: items.club.src,
      type: items.club.type,
      status: items.club.status,
    },
    shield: {
      id: items.woodenShield.id,
      name: items.woodenShield.name,
      src: items.woodenShield.src,
      type: items.woodenShield.type,
      status: items.woodenShield.status,
    },
  },
  skills: {
    attack: {
      level: 10,
      percentage: 0,
    },
    defense: {
      level: 10,
      percentage: 0,
    },
  },
  damage: 0,
};
