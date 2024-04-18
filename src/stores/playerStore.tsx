import create from "zustand";
import { DropItem, Item } from "../interfaces/LootInterface";
import { calculateDamage } from "../utils/calculateDamage";
import { player, Player } from "../utils/player";

interface PlayerState {
  player: Player;
  levelUp: (newLevelExperience: number) => void;
  gainExperience: (newExperience: number) => void;
  takeDamage: (newHP: number) => void;
  lootItems: (items: DropItem[]) => void;
  removeItem: (id: string) => void;
  equipItem: (item: ItemWithStatus) => void;
  skillsTraining: () => void;
}

type ItemWithStatus = Item & {
  status: any;
};

export const playerStore = create<PlayerState>((set) => ({
  player: {
    ...player,
    damage: calculateDamage(player),
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

      const newPlayer = {
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
      };

      return {
        player: {
          ...newPlayer,
          damage: calculateDamage(newPlayer),
        },
      };
    });
  },
  skillsTraining: () => {
    set((state) => {
      const newStatus = state.player.skills;
      newStatus.attack.percentage += 25;
      newStatus.defense.percentage += 0.15;

      if (newStatus.attack.percentage >= 100) {
        newStatus.attack.level++;
        newStatus.attack.percentage = 0;
      }

      if (newStatus.defense.percentage >= 100) {
        newStatus.defense.level++;
        newStatus.defense.percentage = 0;
      }

      const newPlayer = { ...state.player, skills: newStatus };

      return {
        player: {
          ...newPlayer,
          damage: calculateDamage(newPlayer),
        },
      };
    });
  },
}));
