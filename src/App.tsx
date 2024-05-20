import { monsterStore } from "./stores/monsterStore";

import "./App.css";
import { Backpack } from "./component/Backpack";
import { LootDrop } from "./component/LootDrop";
import { MonsterStatus } from "./component/MonsterStatus";
import PlayerEquipment from "./component/PlayerEquipment";
import { PlayerHitPoints } from "./component/PlayerHitPoints";
import { PlayerStatus } from "./component/PlayerStatus";
import { Task } from "./component/Task";
import { places } from "./utils/monsters";
import Potions from "./component/Potions";
import Combat from "./component/Combat";
import { combatStore } from "./stores/combatStore";
import { useEffect } from "react";

function App() {
  // const [damageDone, setDamageDone] = useState(false);
  const { huntId, setHuntId, setMonsters } = monsterStore((state) => ({
    monsterHP: state.monsterHP,
    setMonsterHP: state.setMonsterHP,
    monster: state.monster,
    setMonster: state.setMonster,
    setDamageTaken: state.setDamageTaken,
    huntId: state.huntId,
    setHuntId: state.setHuntId,
    setMonsters: state.setMonsters,
  }));

  const { startAttacking, isAttacking, attack } = combatStore((state) => ({
    startAttacking: state.startAttacking,
    isAttacking: state.isAttacking,
    attack: state.attack,
  }));

  useEffect(() => {
    let interval;
    if (isAttacking) {
      interval = setInterval(() => {
        attack(0); // replace 0 with the index of the monster you want to attack
      }, 200); // attack every 1 second
    }
    return () => clearInterval(interval);
  }, [isAttacking, attack]);

  function startHunt(id: number) {
    if (id === -1) {
      window.alert("You need to select a hunt first!");
    } else {
      setMonsters();
      startAttacking(true);

      // const selectedMonster = selectMonster(places[id]);
      // setMonster(selectedMonster);
      //
      // setMonsterHP(selectedMonster.hp);
    }
  }

  function stopHunt() {
    startAttacking(false);
  }

  return (
    <main className="">
      <section className="flex flex-col gap-4">
        {places.map((hunt) => {
          return (
            <div key={hunt.id}>
              <button
                onClick={() => {
                  const newHunt = hunt.id;

                  setHuntId(newHunt);
                  startHunt(newHunt);
                }}
                className="flex items-center justify-center w-48"
              >
                {hunt.name}
              </button>
            </div>
          );
        })}
      </section>
      {huntId > -1 && <p>{places[huntId].name}</p>}
      <h2>Combat Simulator</h2>
      <button onClick={() => startHunt(huntId)}>Start Hunt!</button>
      <button onClick={() => stopHunt()}>Stop hunt!</button>
      <section className="flex gap-16 items-center justify-between">
        <section className="flex items-start justify-start gap-10">
          <section className="flex items-start justify-start gap-8 flex-col">
            <Potions />
            <PlayerHitPoints />
            <PlayerEquipment />
            <Backpack />
          </section>
          <PlayerStatus />
          <Combat />
        </section>
        <section className="flex items-start justify-start gap-16">
          <Task />
          <section className="flex items-start justify-start gap-8 flex-col">
            <MonsterStatus damageDone={false} />
            <LootDrop />
          </section>
        </section>
      </section>
    </main>
  );
}

export default App;
