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
