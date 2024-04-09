import { useState } from "react";

import "./App.css";
import { MonsterStatus } from "./component/MonsterStatus";
import PlayerEquipment from "./component/PlayerEquipment";
import { calculateLevelExp } from "./utils/calculateLevelExp";
import {
  DropItem,
  generateLoot,
  Monster,
  places,
  selectMonster,
} from "./utils/monsters";

function App() {
  const [playerHP, setPlayerHP] = useState(150);
  const [monsterHP, setMonsterHP] = useState(0);
  const [monstersKilled, setMonstersKilled] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(100);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const [monster, setMonster] = useState<Monster>();
  const [loot, setLoot] = useState<DropItem[]>([]);

  function startHunt() {
    const selectedMonster = selectMonster(places[0]);

    setMonster(selectedMonster);

    setMonsterHP(selectedMonster.hp);
  }

  function aggregateLoot(
    droppedItems: DropItem[],
    currentLoot: Map<string, DropItem>
  ) {
    const updatedLoot = new Map(currentLoot);

    for (const item of droppedItems) {
      const existingItem = updatedLoot.get(item.name);
      if (existingItem) {
        updatedLoot.set(item.name, {
          ...item,
          qty: existingItem.qty + item.qty,
        });
      } else {
        updatedLoot.set(item.name, item);
      }
    }

    return updatedLoot;
  }

  function attack(damage: number) {
    const nextMonsterHp = monsterHP - damage;

    if (monster) {
      if (nextMonsterHp <= 0) {
        setMonsterHP(monster.hp);
        setMonstersKilled((prevCount) => prevCount + 1);

        const nextCurrExp = currentExperience + monster.experience;

        setCurrentExperience(nextCurrExp);

        const nextLevelExp = calculateLevelExp(level + 1);
        const nextNextLevel = calculateLevelExp(level + 2);

        if (nextCurrExp >= nextLevelExp) {
          setLevel((prevLevel) => prevLevel + 1);
          setExperience(nextNextLevel);
        }

        const selectedMonster = selectMonster(places[0]);
        const currentLoot = new Map<string, DropItem>();

        const lootDropped = generateLoot(monster.loot);
        const updatedLoot = aggregateLoot(lootDropped.items, currentLoot);

        const nextLootArray = Array.from(updatedLoot.values());
        setLoot(nextLootArray);

        console.log(loot);

        setMonster(selectedMonster);
        setMonsterHP(selectedMonster.hp);
      } else {
        setMonsterHP(nextMonsterHp);
      }
      const monsterDamage = Math.floor(
        Math.random() * (monster.maxDamage - monster.minDamage) +
          monster.minDamage
      );
      const nextPlayerHP = playerHP - monsterDamage;
      setPlayerHP(nextPlayerHP);
    } else {
      window.alert("Needs to select a monster!");
    }
  }

  // const startHunt = () => {
  //   if (intervalId === null) {
  //     const id = setInterval(() => {
  //       attack(5);
  //     }, 1200);
  //     setIntervalId(id);
  //   }
  // };

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
      <button onClick={startHunt}>Start Hunt!</button>
      <button onClick={() => attack(5)}>Attack!</button>

      <button onClick={stopHunt}>Stop Hunt!</button>

      <p>Player HP: {playerHP}</p>
      <section className="flex gap-16 items-center justify-between">
        <section className="flex items-start justify-start flex-co gap-8 flex-col">
          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
            <div
              className="bg-red-800 h-3 rounded-full dark:bg-red-800"
              style={{ width: `85%` }}
            ></div>
          </div>
          <PlayerEquipment />
        </section>
        <section>
          <MonsterStatus monster={monster} monsterHP={monsterHP} />
        </section>
      </section>
    </main>
  );
}

export default App;
