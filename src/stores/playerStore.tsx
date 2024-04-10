import create from "zustand";

interface Player {
  hp: number;
  currentHP: number;
  level: number;
  experience: number;
  currentExperience: number;
}

interface PlayerState {
  player: Player;
  levelUp: (newLevelExperience: number) => void;
  gainExperience: (newExperience: number) => void;
  takeDamage: (newHP: number) => void;
}

export const playerStore = create<PlayerState>((set) => ({
  player: {
    currentHP: 150,
    hp: 150,
    level: 1,
    experience: 100,
    currentExperience: 0,
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
}));
