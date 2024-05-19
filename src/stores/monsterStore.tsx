import { create } from "zustand";
import { Monster } from "../interfaces/MonsterInterface";
import { places, selectMonster } from "../utils/monsters";

type MonsterWithHp = Monster & {
  currentHP: number;
};

interface MonsterState {
  monsterHP: number;
  setMonsterHP: (newHP: number, index: number) => void;
  setMonster: (newMonster: Monster) => void;
  setHuntId: (id: number) => void;
  monster: Monster;
  monsters: MonsterWithHp[];
  damageTaken: number;
  setDamageTaken: (newDamageTaken: number) => void;
  huntId: number;
  setMonsters: () => void;
  removeMonsterImmutable: () => void;
}

export const monsterStore = create<MonsterState>((set) => ({
  huntId: -1,
  monsterHP: 0,
  damageTaken: 0,
  monsters: [],
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
  setMonsters: () =>
    set((state) => {
      const selectedMonsters: MonsterWithHp[] = [];
      for (let i = 0; i < 8; i++) {
        const monster = selectMonster(places[state.huntId]);
        selectedMonsters.push({
          ...monster,
          currentHP: monster.hp,
        });
      }

      return {
        monsters: [...selectedMonsters],
      };
    }),
  removeMonsterImmutable: () =>
    set((state) => {
      const newMonsters = [...state.monsters].filter(
        (monster) => monster.currentHP > 0,
      );

      if (newMonsters.length <= 0) {
        state.setMonsters();
        return {};
      }

      return {
        monsters: [...newMonsters],
      };
    }),
  setHuntId: (id: number) => set({ huntId: id }),
  setMonsterHP: (newHP: number, index: number) =>
    set((state) => {
      const newMonsters = [...state.monsters];
      newMonsters[index].currentHP = newHP;
      return { monsters: [...newMonsters] };
    }),
  setMonster: (newMonster: Monster) => set({ monster: newMonster }),
  setDamageTaken: (newDamageTaken: number) =>
    set({ damageTaken: newDamageTaken }),
}));
