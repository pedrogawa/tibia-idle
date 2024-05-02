import { TaskMonster } from "../interfaces/MonsterInterface";

export function calculateReward(monster: TaskMonster) {
  let rewardExp = 0;
  let rewardProbability = 0;
  let difficultyBonus = 0;

  if (monster) {
    const baseExp = monster.experience * monster.task;
    rewardProbability += calculateProbabilityReward(monster);
    difficultyBonus += calculateDifficultyReward(monster);
    const baseProbability =
      (baseExp * (rewardProbability + difficultyBonus)) / 100;

    rewardExp += baseExp + baseProbability;
  }

  return Math.floor(rewardExp);
}

function calculateProbabilityReward(monster: TaskMonster) {
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

function calculateDifficultyReward(monster: TaskMonster) {
  let aux = 0;

  if (monster.difficulty === "very-easy") {
    aux += 5;
  }

  if (monster.difficulty === "easy") {
    aux += 10;
  }

  if (monster.difficulty === "medium") {
    aux += 15;
  }

  if (monster.difficulty === "hard") {
    aux += 20;
  }

  if (monster.difficulty === "expert") {
    aux += 25;
  }

  return aux;
}
