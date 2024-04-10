import { useState } from "react";
import { monsterStore } from "./stores/monsterStore";

import "./App.css";
import { MonsterStatus } from "./component/MonsterStatus";
import { playerStore } from "./stores/playerStore";
import PlayerEquipment from "./component/PlayerEquipment";
import { calculateLevelExp } from "./utils/calculateLevelExp";
import {
  DropItem,
  generateLoot,
  places,
  selectMonster,
} from "./utils/monsters";
import { PlayerStatus } from "./component/PlayerStatus";

function App() {
  const { monsterHP, setMonsterHP, monster, setMonster } = monsterStore(
    (state) => ({
      monsterHP: state.monsterHP,
      setMonsterHP: state.setMonsterHP,
      monster: state.monster,
      setMonster: state.setMonster,
    })
  );

  const { player, levelUp, gainExperience, takeDamage } = playerStore(
    (state) => ({
      player: state.player,
      levelUp: state.levelUp,
      gainExperience: state.gainExperience,
      takeDamage: state.takeDamage,
    })
  );

  const [monstersKilled, setMonstersKilled] = useState(0);
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
        const nextCurrExp = player.currentExperience + monster.experience;
        gainExperience(nextCurrExp);
        const nextLevelExp = calculateLevelExp(player.level + 1);
        const nextNextLevel = calculateLevelExp(player.level + 2);
        if (nextCurrExp >= nextLevelExp) {
          levelUp(nextNextLevel);
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
      const nextPlayerHP = player.currentHP - monsterDamage;
      takeDamage(nextPlayerHP);
    } else {
      window.alert("Needs to select a monster!");
    }
  }

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
                    style={{ width: `50%` }}
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
      <p>Level: {player.level}</p>
      <p>
        {player.currentExperience} / {player.experience}
      </p>
      <button onClick={startHunt}>Start Hunt!</button>
      <button onClick={() => attack(5)}>Attack!</button>

      <section className="flex gap-16 items-center justify-between">
        <section className="flex items-start justify-start flex-co gap-8 flex-col">
          <PlayerStatus />
          <PlayerEquipment />
        </section>
        <section>
          <MonsterStatus />
        </section>
      </section>
    </main>
  );
}

export default App;
