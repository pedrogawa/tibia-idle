import create from "zustand";
import { Item, DropItem } from "../utils/monsters";
import { items } from "../utils/items";

interface Player {
  hp: number;
  currentHP: number;
  level: number;
  experience: number;
  currentExperience: number;
  backpack: DropItem[];
  equipment: Record<string, any>;
  skills: {
    attack: number;
    defense: number;
  };
}

interface PlayerState {
  player: Player;
  levelUp: (newLevelExperience: number) => void;
  gainExperience: (newExperience: number) => void;
  takeDamage: (newHP: number) => void;
  lootItems: (items: DropItem[]) => void;
  removeItem: (id: string) => void;
  equipItem: (item: ItemWithStatus) => void;
}

type ItemWithStatus = Item & {
  status: any;
};

export const playerStore = create<PlayerState>((set) => ({
  player: {
    currentHP: 150,
    hp: 150,
    level: 1,
    experience: 100,
    currentExperience: 0,
    backpack: [],
    equipment: {
      helmet: {
        id: 0,
        name: "",
        src: "",
        status: {},
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
    },
    skills: {
      attack: 10,
      defense: 10,
    },
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
  equipItem: (item: ItemWithStatus) => {
    set((state) => {
      const aux = state.player.equipment[`${item.type}`];
      const auxIndex = state.player.backpack.findIndex((i) => i.id === aux.id);

      if (auxIndex !== -1) {
        state.player.backpack[auxIndex].qty += 1;
      } else {
        state.player.backpack.push({
          ...aux,
          qty: 1,
          type: item.type,
        });
      }

      const index = state.player.backpack.findIndex((i) => i.id === item.id);

      state.player.backpack[index] = {
        ...state.player.backpack[index],
        qty: state.player.backpack[index].qty - 1,
      };

      if (state.player.backpack[index].qty <= 0) {
        state.player.backpack = state.player.backpack.filter(
          (i) => i.id !== item.id
        );
      }

      return {
        player: {
          ...state.player,
          equipment: {
            ...state.player.equipment,
            [`${item.type}`]: {
              id: item.id,
              name: item.name,
              src: item.src,
              status: item.status,
            },
          },
        },
      };
    });
  },
}));
