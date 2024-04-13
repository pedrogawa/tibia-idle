import create from "zustand";
import { DropItem } from "../utils/monsters";

interface Player {
  hp: number;
  currentHP: number;
  level: number;
  experience: number;
  currentExperience: number;
  backpack: DropItem[];
}

interface PlayerState {
  player: Player;
  levelUp: (newLevelExperience: number) => void;
  gainExperience: (newExperience: number) => void;
  takeDamage: (newHP: number) => void;
  lootItems: (items: DropItem[]) => void;
  removeItem: (id: string) => void;
}

export const playerStore = create<PlayerState>((set) => ({
  player: {
    currentHP: 150,
    hp: 150,
    level: 1,
    experience: 100,
    currentExperience: 0,
    backpack: [],
  },
  levelUp: (newLevelExperience: number) =>
    set((state) => ({
      player: {
        ...state.player,
        level: state.player.level + 1,
        hp: state.player.hp + 15,
        currentHP: state.player.hp + 15,
        experience: newLevelExperience,
      },
    })),
  gainExperience: (newExperience: number) =>
    set((state) => ({
      player: {
        ...state.player,
        currentExperience: newExperience,
      },
    })),
  takeDamage: (newHP: number) =>
    set((state) => ({
      player: {
        ...state.player,
        currentHP: newHP,
      },
    })),
  lootItems: (items) =>
    set((state) => {
      const newLoot = [...state.player.backpack];
      items.forEach((item) => {
        const existingItemIndex = newLoot.findIndex((i) => i.id === item.id);
        if (existingItemIndex !== -1) {
          newLoot[existingItemIndex].qty += item.qty;
        } else {
          newLoot.push(item);
        }
      });
      return {
        player: {
          ...state.player,
          backpack: newLoot,
        },
      };
    }),
  removeItem: (id) =>
    set((state) => {
      const index = state.player.backpack.findIndex((item) => item.id === id);

      state.player.backpack[index] = {
        ...state.player.backpack[index],
        qty: state.player.backpack[index].qty - 1,
      };

      if (state.player.backpack[index].qty <= 0) {
        state.player.backpack = state.player.backpack.filter(
          (item) => item.id !== id
        );
      }

      return {
        player: {
          ...state.player,
        },
      };
    }),
}));
