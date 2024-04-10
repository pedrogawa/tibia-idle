import create from "zustand";
import { Monster } from "../utils/monsters";

interface MonsterState {
  monsterHP: number;
  setMonsterHP: (newHP: number) => void;
  setMonster: (newMonster: Monster) => void;
  monster: Monster;
}

export const monsterStore = create<MonsterState>((set) => ({
  monsterHP: 0,
  monster: {
    name: "",
    hp: 0,
    minDamage: 0,
    maxDamage: 0,
    loot: {
      gold: {
        id: 0,
        min: 0,
        max: 0,
      },
      items: [
        {
          id: 0,
          name: "",
          probability: 0,
        },
      ],
    },
    src: "",
    experience: 0,
  },
  setMonsterHP: (newHP: number) => set({ monsterHP: newHP }),
  setMonster: (newMonster: Monster) => set({ monster: newMonster }),
}));
