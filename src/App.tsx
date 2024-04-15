import { useEffect, useState } from "react";
import { monsterStore } from "./stores/monsterStore";

import "./App.css";
import { MonsterStatus } from "./component/MonsterStatus";
import { playerStore } from "./stores/playerStore";
import PlayerEquipment from "./component/PlayerEquipment";
import { calculateLevelExp } from "./utils/calculateLevelExp";
import { generateLoot, places, selectMonster } from "./utils/monsters";
import { LootDrop } from "./component/LootDrop";
import { lootStore } from "./stores/lootStore";
import { Backpack } from "./component/Backpack";
import { PlayerHitPoints } from "./component/PlayerHitPoints";
import { PlayerStatus } from "./component/PlayerStatus";

function App() {
  const [damageDone, setDamageDone] = useState(false);
  const [placeId, setPlaceId] = useState(0);
  const [timeoutId, setTimeoutId] = useState<number>(0);

  const { monsterHP, setMonsterHP, monster, setMonster, setDamageTaken } =
    monsterStore((state) => ({
      monsterHP: state.monsterHP,
      setMonsterHP: state.setMonsterHP,
      monster: state.monster,
      setMonster: state.setMonster,
      setDamageTaken: state.setDamageTaken,
    }));

  const { player, levelUp, gainExperience, takeDamage } = playerStore(
    (state) => ({
      player: state.player,
      levelUp: state.levelUp,
      gainExperience: state.gainExperience,
      takeDamage: state.takeDamage,
    })
  );

  const { addDroppedLoot } = lootStore((state) => ({
    droppedLoot: state.droppedLoot,
    addDroppedLoot: state.addDroppedLoot,
  }));

  const [monstersKilled, setMonstersKilled] = useState(0);

  function startHunt(id: number) {
    const selectedMonster = selectMonster(places[id]);

    setMonster(selectedMonster);

    setMonsterHP(selectedMonster.hp);
  }

  function attack() {
    const weaponDamage = Math.floor(player.equipment.weapon.status.attack / 3);
    const levelDamage = Math.floor(player.level / 5);
    const playerDamage = Math.floor(
      Math.random() * (levelDamage + weaponDamage + player.skills.attack - 0) +
        0
    );
    const nextMonsterHp = monsterHP - playerDamage;
    setDamageTaken(playerDamage);
    if (!!monster.name) {
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
        const selectedMonster = selectMonster(places[placeId]);
        const lootDropped = generateLoot(monster.loot);
        addDroppedLoot(lootDropped.items);
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
      const potionHP = Math.floor((player.hp * 35) / 100);

      takeDamage(nextPlayerHP);

      setDamageDone(true);
      setTimeout(() => {
        setDamageDone(false);
      }, 500);

      if (player.currentHP <= potionHP) {
        const healedHP = player.currentHP + 45;
        takeDamage(healedHP);
      }
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
      <section className="flex flex-col gap-4">
        {places.map((hunt) => {
          return (
            <div
              onClick={() => {
                const newHunt = hunt.id;

                setPlaceId(newHunt);
                startHunt(placeId);
              }}
              key={hunt.id}
            >
              <button className="flex items-center justify-center w-48">
                {hunt.name}
              </button>
            </div>
          );
        })}
      </section>
      <h2>Combat Simulator</h2>
      <p>Monsters Killed: {monstersKilled}</p>
      <p>Level: {player.level}</p>
      <p>
        {player.currentExperience} / {player.experience}
      </p>
      <button onClick={() => startHunt(placeId)}>Start Hunt!</button>
      <button onClick={attack}>Attack!</button>

      <section className="flex gap-16 items-center justify-between">
        <section className="flex items-start justify-start gap-16">
          <section className="flex items-start justify-start gap-8 flex-col">
            <PlayerHitPoints />
            <PlayerEquipment />
            <Backpack />
          </section>
          <PlayerStatus />
        </section>

        <section className="flex items-start justify-start flex-col gap-8">
          <MonsterStatus damageDone={damageDone} />
          <LootDrop />
        </section>
      </section>
    </main>
  );
}

export default App;
