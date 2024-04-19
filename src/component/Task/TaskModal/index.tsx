import { useEffect, useState } from "react";
import { MonstersProbability } from "../../../interfaces/MonsterInterface";
import { monsterStore } from "../../../stores/monsterStore";
import { places } from "../../../utils/monsters";

interface TaskModal {
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
}

function calculateProbabilityReward(monster: MonstersProbability) {
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

function calculateDifficultyReward(monster: MonstersProbability) {
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

export function TaskModal({ isModalOpen, setIsModalOpen }: TaskModal) {
  const [modalClass, setModalClass] = useState(
    "hidden overflow-y-auto overflow-x-hidden fixed top-[50%] right-[50%] left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full"
  );
  const [selectedMonster, setSelectedMonster] = useState<MonstersProbability>();

  const { huntId } = monsterStore((state) => ({
    huntId: state.huntId,
  }));

  const MONSTER_DIFFICULTIES = {
    "very-easy": "Very Easy",
  };

  useEffect(() => {
    if (isModalOpen) {
      setModalClass(
        "overflow-y-auto overflow-x-hidden fixed top-[50%] right-[50%] left-0 z-50 justify-center items-center w-full h-[calc(100%-1rem)] max-h-full"
      );
    } else {
      setModalClass(
        "hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      );
    }
  }, [isModalOpen]);

  function closeModal() {
    setIsModalOpen(false);
  }

  function selectMonster(monster: MonstersProbability) {
    setSelectedMonster(monster);
  }

  function calculateReward() {
    let rewardExp = 0;
    let rewardProbability = 0;
    let difficultyBonus = 0;

    if (selectedMonster) {
      const baseExp = selectedMonster.monster.experience * 50;
      rewardProbability += calculateProbabilityReward(selectedMonster);
      difficultyBonus += calculateDifficultyReward(selectedMonster);
      const baseProbability =
        (baseExp * (rewardProbability + difficultyBonus)) / 100;
      console.log(baseExp);

      rewardExp += baseExp + baseProbability;
    }

    return Math.floor(rewardExp);
  }

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      aria-hidden="true"
      className={modalClass}
    >
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="flex flex-col relative bg-white rounded-lg shadow dark:bg-gray-700 p-4 gap-8">
          <div className="flex items-center justify-between w-100">
            <span className="font-bold">Choose a monster for the task</span>
            <button onClick={closeModal}>Close modal</button>
          </div>
          <div className="grid items-center justify-center gap-3 grid-cols-5 gap-y-8 h-32 overflow-auto">
            {places[huntId].monsters.map((monster) => (
              <div
                key={crypto.randomUUID()}
                className="transition ease-in-out delay-150 flex flex-col items-center justify-center cursor-pointer p-2 bg-[#1f1f1f] rounded-md gap-3 hover:opacity-75"
                onClick={() => selectMonster(monster)}
              >
                <img src={monster.monster.src} alt="" />
                <span>{monster.monster.name}</span>
              </div>
            ))}
          </div>
          <div className="flex w-full items-center justify-center">
            {selectedMonster && (
              <div className="flex flex-col items-center justify-center gap-2">
                <img src={selectedMonster.monster.src} alt="" />
                <span>{selectedMonster.monster.name}</span>
                <div className="flex flex-col items-start justify-start">
                  <div className="flex gap-2">
                    <span>Difficulty:</span>
                    <span>{MONSTER_DIFFICULTIES["very-easy"]}</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Quantity:</span>
                    <span>50</span>
                  </div>
                  <div className="flex gap-2">
                    <span>Reward:</span>
                    <span>{calculateReward()} experience</span>
                  </div>
                </div>
              </div>
            )}
            {!selectedMonster && <div>No monsters selected</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
