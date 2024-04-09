import { useState } from "react";

import "./App.css";
import PlayerEquipment from "./component/PlayerEquipment";

function App() {
  const [playerHP, setPlayerHP] = useState(150);
  const [monsterHP, setMonsterHP] = useState(20);
  const [monstersKilled, setMonstersKilled] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(100);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);

  function calculateLevelExp(level: number) {
    return (
      (50 * Math.pow(level - 1, 3) -
        150 * Math.pow(level - 1, 2) +
        400 * (level - 1)) /
      3
    );
  }

  function attack(damage: number) {
    const nextMonsterHp = monsterHP - damage;

    if (nextMonsterHp <= 0) {
      setMonsterHP(20);
      setMonstersKilled((prevCount) => prevCount + 1);

      const nextCurrExp = currentExperience + 25;

      setCurrentExperience(nextCurrExp);

      const nextLevelExp = calculateLevelExp(level + 1);
      const nextNextLevel = calculateLevelExp(level + 2);

      if (nextCurrExp >= nextLevelExp) {
        setLevel((prevLevel) => prevLevel + 1);
        setExperience(nextNextLevel);
      }
    } else {
      setMonsterHP(nextMonsterHp);
    }

    setPlayerHP((prevHP) => Math.max(0, prevHP - 1));
  }

  const startHunt = () => {
    if (intervalId === null) {
      const id = setInterval(() => {
        attack(5);
      }, 1200);
      setIntervalId(id);
    }
  };

  const stopHunt = () => {
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };

  return (
    <main className="">
      <section>
        <table className="table-fixed border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="">#</th>
              <th>LEVEL</th>
              <th>%</th>
              <th>PROGRESS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="src/assets/The_Calamity.gif" alt="" />
              </td>
              <td>1</td>
              <td>0%</td>
              <td>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                    style={{ width: `${currentExperience}%` }}
                  ></div>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <img src="src/assets/Blessed_Shield.gif" alt="" />
              </td>
              <td>1</td>
              <td>0%</td>
              <td>
                <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
                    style={{ width: `${50}%` }}
                  ></div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <h2>Combat Simulator</h2>
      <p>Monsters Killed: {monstersKilled}</p>
      <p>Level: {level}</p>
      <p>
        {currentExperience} / {experience}
      </p>
      <button onClick={() => attack(5)}>Start Hunt!</button>
      <button onClick={stopHunt}>Stop Hunt!</button>

      <p>Player HP: {playerHP}</p>
      <p>Monster HP: {monsterHP}</p>
      <section className="flex items-start justify-start flex-col">
        <section className="flex">
          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
            <div
              className="bg-red-800 h-3 rounded-full dark:bg-red-800"
              style={{ width: `85%` }}
            ></div>
          </div>
        </section>
        <PlayerEquipment />
      </section>
    </main>
  );
}

export default App;
