import create from "zustand";
import { DropItem, Item } from "../interfaces/LootInterface";
import { calculateDamage } from "../utils/calculateDamage";
import { calculateLevelExp } from "../utils/calculateLevelExp";
import { player, Player } from "../utils/player";

interface PlayerState {
  player: Player;
  gainExperience: (experience: number) => void;
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
  gainExperience: (experience: number) =>
    set((state) => {
      const newPlayer = { ...state.player };
      const nextLevelExp = calculateLevelExp(newPlayer.level + 1);

      const nextExperience = newPlayer.currentExperience + experience;

      if (nextExperience >= nextLevelExp) {
        newPlayer.currentExperience = nextExperience;

        while (newPlayer.currentExperience > newPlayer.experience) {
          newPlayer.level = newPlayer.level + 1;
          newPlayer.experience = calculateLevelExp(newPlayer.level + 1);
          newPlayer.hp = newPlayer.hp + 15;
        }
      } else {
        newPlayer.currentExperience = nextExperience;
      }

      return {
        player: {
          ...newPlayer,
        },
      };
    }),
  takeDamage: (newHP: number) =>
    set((state) => {
      const HP = newHP > state.player.hp ? state.player.hp : newHP;
      return {
        player: {
          ...state.player,
          currentHP: HP,
        },
      };
    }),
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
          (item) => item.id !== id,
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
          (i) => i.id !== item.id,
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
