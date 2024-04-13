import { create } from "zustand";
import { DropItem } from "../utils/monsters";

interface LootState {
  droppedLoot: DropItem[];
  addDroppedLoot: (items: DropItem[]) => void;
  clearDroppedLoot: () => void;
}

export const lootStore = create<LootState>((set) => ({
  droppedLoot: [],
  addDroppedLoot: (items) =>
    set((state) => {
      const newLoot = [...state.droppedLoot];
      items.forEach((item) => {
        const existingItemIndex = newLoot.findIndex((i) => i.id === item.id);
        if (existingItemIndex !== -1) {
          newLoot[existingItemIndex].qty += item.qty;
        } else {
          newLoot.push(item);
        }
      });

      return { droppedLoot: newLoot };
    }),
  clearDroppedLoot: () =>
    set(() => {
      return {
        droppedLoot: [],
      };
    }),
}));
