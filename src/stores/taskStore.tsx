import { create } from "zustand";
import { MonstersProbability } from "../interfaces/MonsterInterface";

interface Task {
  task: {
    monster: MonstersProbability;
    reward: number;
    currentKills: number;
    kills: number;
    isTaskOn: boolean;
  };
  increaseCurrentKills: () => void;
  selectTask: (task: MonstersProbability, reward: number) => void;
  finishTask: () => void;
}

export const taskStore = create<Task>((set) => ({
  task: {
    monster: {
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
      probability: 0,
    },
    isTaskOn: false,
    reward: 0,
    currentKills: 0,
    kills: 10,
  },
  selectTask: (monster: MonstersProbability, reward: number) =>
    set((state) => {
      return {
        task: {
          ...state.task,
          monster: { ...monster },
          reward: reward,
          isTaskOn: true,
        },
      };
    }),
  increaseCurrentKills: () =>
    set((state) => {
      const newTask = { ...state.task };

      newTask.currentKills++;

      return {
        task: {
          ...newTask,
        },
      };
    }),
  finishTask: () =>
    set((state) => {
      return {
        task: { ...state.task, isTaskOn: false },
      };
    }),
}));
