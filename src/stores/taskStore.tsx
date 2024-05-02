import { create } from "zustand";
import { TaskMonster } from "../interfaces/MonsterInterface";
import { playerStore } from "./playerStore";
import { calculateReward } from "../utils/task";

interface Task {
  task: {
    monster: TaskMonster;
    reward: number;
    currentKills: number;
    isTaskOn: boolean;
  };
  increaseCurrentKills: () => void;
  selectTask: () => void;
  finishTask: () => void;
  selectMonster: (monster: TaskMonster) => void;
  selectedMonster: TaskMonster;
}

export const taskStore = create<Task>((set) => ({
  task: {
    monster: {
      name: "",
      difficulty: "very-easy",
      probability: 0,
      src: "",
      task: 0,
      experience: 0,
    },
    isTaskOn: false,
    reward: 0,
    currentKills: 0,
  },
  selectedMonster: {
    name: "",
    difficulty: "very-easy",
    probability: 0,
    src: "",
    task: 0,
    experience: 0,
  },
  selectTask: () =>
    set((state) => {
      const reward = calculateReward(state.selectedMonster);
      return {
        task: {
          ...state.task,
          monster: { ...state.selectedMonster },
          reward: reward,
          isTaskOn: true,
        },
      };
    }),
  selectMonster: (monster: TaskMonster) =>
    set((state) => {
      return {
        task: {
          ...state.task,
        },
        selectedMonster: { ...monster },
      };
    }),
  increaseCurrentKills: () =>
    set((state) => {
      const newCount = state.task.currentKills + 1;

      return {
        task: {
          ...state.task,
          currentKills: newCount,
        },
      };
    }),
  finishTask: () =>
    set((state) => {
      const { gainExperience } = playerStore.getState();

      if (state.task.isTaskOn) {
        gainExperience(state.task.reward);
      }

      return {
        task: { ...state.task, isTaskOn: false },
      };
    }),
}));
