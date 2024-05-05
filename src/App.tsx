import { monsterStore } from "./stores/monsterStore";

import "./App.css";
import { Backpack } from "./component/Backpack";
import { LootDrop } from "./component/LootDrop";
import { MonsterStatus } from "./component/MonsterStatus";
import PlayerEquipment from "./component/PlayerEquipment";
import { PlayerHitPoints } from "./component/PlayerHitPoints";
import { PlayerStatus } from "./component/PlayerStatus";
import { Task } from "./component/Task";
import { combatStore } from "./stores/combatStore";
import { places, selectMonster } from "./utils/monsters";

function App() {
  // const [damageDone, setDamageDone] = useState(false);
  const { setMonsterHP, setMonster, huntId, setHuntId } = monsterStore(
    (state) => ({
      monsterHP: state.monsterHP,
      setMonsterHP: state.setMonsterHP,
      monster: state.monster,
      setMonster: state.setMonster,
      setDamageTaken: state.setDamageTaken,
      huntId: state.huntId,
      setHuntId: state.setHuntId,
    }),
  );

  const { attack } = combatStore((state) => ({
    attack: state.attack,
  }));

  function startHunt(id: number) {
    if (id === -1) {
      window.alert("You need to select a hunt first!");
    } else {
      const selectedMonster = selectMonster(places[id]);
      setMonster(selectedMonster);

      setMonsterHP(selectedMonster.hp);
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
                startHunt(newHunt);
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
      {huntId > -1 && <p>{places[huntId].name}</p>}
      <h2>Combat Simulator</h2>
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
            <MonsterStatus damageDone={false} />
            <LootDrop />
          </section>
        </section>
      </section>
    </main>
  );
}

export default App;
