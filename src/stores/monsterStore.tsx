import create from "zustand";
import { Monster } from "../utils/monsters";

interface MonsterState {
  monsterHP: number;
  setMonsterHP: (newHP: number) => void;
  setMonster: (newMonster: Monster) => void;
  monster: Monster;
  damageTaken: number;
  setDamageTaken: (newDamageTaken: number) => void;
}

export const monsterStore = create<MonsterState>((set) => ({
  monsterHP: 0,
  damageTaken: 0,
  monster: {
    name: "",
    hp: 0,
    minDamage: 0,
    maxDamage: 0,
    loot: {
      gold: {
        id: "1",
        min: 0,
        max: 0,
        src: "",
      },
      items: [
        {
          id: "2",
          name: "",
          probability: 0,
          src: "",
          type: "",
        },
      ],
    },
    src: "",
    experience: 0,
  },
  setMonsterHP: (newHP: number) => set({ monsterHP: newHP }),
  setMonster: (newMonster: Monster) => set({ monster: newMonster }),
  setDamageTaken: (newDamageTaken: number) =>
    set({ damageTaken: newDamageTaken }),
}));
