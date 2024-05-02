import { Loot } from "./LootInterface";

export interface Monster {
  name: string;
  hp: number;
  minDamage: number;
  maxDamage: number;
  loot: Loot;
  src: string;
  experience: number;
  difficulty: "very-easy" | "easy" | "medium" | "hard" | "expert";
}

export interface MonstersProbability {
  monster: Monster;
  probability: number;
  task: number;
}

export interface TaskMonster {
  name: string;
  src: string;
  difficulty: "very-easy" | "easy" | "medium" | "hard" | "expert";
  probability: number;
  task: number;
  experience: number;
}
