import create from "zustand";
import { Monster } from "../interfaces/MonsterInterface";

interface MonsterState {
  monsterHP: number;
  setMonsterHP: (newHP: number) => void;
  setMonster: (newMonster: Monster) => void;
  setHuntId: (id: number) => void;
  monster: Monster;
  damageTaken: number;
  setDamageTaken: (newDamageTaken: number) => void;
  huntId: number;
}

export const monsterStore = create<MonsterState>((set) => ({
  huntId: 0,
  monsterHP: 0,
  damageTaken: 0,
  monster: {
    name: "",
    hp: 0,
    minDamage: 0,
    maxDamage: 0,
    difficulty: "very-easy",
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
          type: "gold",
        },
      ],
    },
    src: "",
    experience: 0,
  },
  setHuntId: (id: number) => set({ huntId: id }),
  setMonsterHP: (newHP: number) => set({ monsterHP: newHP }),
  setMonster: (newMonster: Monster) => set({ monster: newMonster }),
  setDamageTaken: (newDamageTaken: number) =>
    set({ damageTaken: newDamageTaken }),
}));
