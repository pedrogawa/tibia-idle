import { useState } from "react";
import { monsterStore } from "./stores/monsterStore";

import "./App.css";
import { MonsterStatus } from "./component/MonsterStatus";
import { playerStore } from "./stores/playerStore";
import PlayerEquipment from "./component/PlayerEquipment";
import { generateLoot, places, selectMonster } from "./utils/monsters";
import { LootDrop } from "./component/LootDrop";
import { lootStore } from "./stores/lootStore";
import { Backpack } from "./component/Backpack";
import { PlayerHitPoints } from "./component/PlayerHitPoints";
import { PlayerStatus } from "./component/PlayerStatus";
import { Task } from "./component/Task";
import { taskStore } from "./stores/taskStore";

function App() {
  const [damageDone, setDamageDone] = useState(false);
  const {
    monsterHP,
    setMonsterHP,
    monster,
    setMonster,
    setDamageTaken,
    huntId,
    setHuntId,
  } = monsterStore((state) => ({
    monsterHP: state.monsterHP,
    setMonsterHP: state.setMonsterHP,
    monster: state.monster,
    setMonster: state.setMonster,
    setDamageTaken: state.setDamageTaken,
    huntId: state.huntId,
    setHuntId: state.setHuntId,
  }));

  const { task, increaseCurrentKills, finishTask } = taskStore((state) => ({
    task: state.task,
    increaseCurrentKills: state.increaseCurrentKills,
    finishTask: state.finishTask,
  }));

  const { player, gainExperience, takeDamage, skillsTraining } = playerStore(
    (state) => ({
      player: state.player,
      gainExperience: state.gainExperience,
      takeDamage: state.takeDamage,
      skillsTraining: state.skillsTraining,
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
    const playerDamage = Math.floor(Math.random() * (player.damage - 0) + 0);
    const nextMonsterHp = monsterHP - playerDamage;
    setDamageTaken(playerDamage);
    if (!!monster.name) {
      if (nextMonsterHp <= 0) {
        setMonsterHP(monster.hp);
        setMonstersKilled((prevCount) => prevCount + 1);
        gainExperience(monster.experience);

        const selectedMonster = selectMonster(places[huntId]);
        const lootDropped = generateLoot(monster.loot);
        addDroppedLoot(lootDropped.items);
        setMonster(selectedMonster);
        setMonsterHP(selectedMonster.hp);

        if (task.isTaskOn) {
          const isTask = task.monster.monster.name === monster.name;

          if (isTask) {
            if (task.currentKills === task.kills) {
              gainExperience(task.reward);
              finishTask();
            }
            increaseCurrentKills();
          }
        }
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
      skillsTraining();

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
      <section className="flex flex-col gap-4">
        {places.map((hunt) => {
          return (
            <div
              onClick={() => {
                const newHunt = hunt.id;

                setHuntId(newHunt);
                startHunt(huntId);
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
      <button onClick={() => startHunt(huntId)}>Start Hunt!</button>
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
        <section className="flex items-start justify-start gap-16">
          <Task />
          <section className="flex items-start justify-start gap-8 flex-col">
            <MonsterStatus damageDone={damageDone} />
            <LootDrop />
          </section>
        </section>
      </section>
    </main>
  );
}

export default App;
