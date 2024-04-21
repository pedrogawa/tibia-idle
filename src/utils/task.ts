import { MonstersProbability } from "../interfaces/MonsterInterface";

export function calculateProbabilityReward(monster: MonstersProbability) {
  let aux = 0;

  if (monster.probability > 0 && monster.probability <= 25) {
    aux += 20;
  }

  if (monster.probability >= 26 && monster.probability <= 50) {
    aux += 15;
  }

  if (monster.probability >= 51 && monster.probability <= 75) {
    aux += 10;
  }

  if (monster.probability >= 76) {
    aux += 5;
  }

  return aux;
}

export function calculateDifficultyReward(monster: MonstersProbability) {
  let aux = 0;

  if (monster.monster.difficulty === "very-easy") {
    aux += 5;
  }

  if (monster.monster.difficulty === "easy") {
    aux += 10;
  }

  if (monster.monster.difficulty === "medium") {
    aux += 15;
  }

  if (monster.monster.difficulty === "hard") {
    aux += 20;
  }

  if (monster.monster.difficulty === "expert") {
    aux += 25;
  }

  return 5;
}
