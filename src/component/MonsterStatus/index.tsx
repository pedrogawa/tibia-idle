import { useEffect, useState } from "react";
import { monsterStore } from "../../stores/monsterStore";

interface MonsterStatusProps {
  damageDone: boolean;
}

export function MonsterStatus({ damageDone }: MonsterStatusProps) {
  const [damageTakenClass, setDamageTakenClass] = useState(
    "flex items-center justify-center bg-red-500 p-1 rounded-full right-0 top-0 absolute h-6 w-6 opacity-0"
  );

  useEffect(() => {
    if (damageDone) {
      setDamageTakenClass(
        "flex items-center justify-center bg-red-500 p-1 rounded-full right-0 top-0 absolute h-6 w-6 opacity-1 ease-in duration-200"
      );
    } else {
      setDamageTakenClass(
        "flex items-center justify-center bg-red-500 p-1 rounded-full right-0 top-0 absolute h-6 w-6 opacity-0 ease-in duration-500"
      );
    }
  }, [damageDone]);

  const { monster, monsterHP, damageTaken } = monsterStore((state) => ({
    monsterHP: state.monsterHP,
    monster: state.monster,
    damageTaken: state.damageTaken,
  }));

  if (!monster.name) {
    return (
      <section className="flex items-center justify-center bg-[#363636] p-16 rounded-md h-80 w-[370px]">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="font-bold">No monster selected</h2>
          <p>HP: -</p>
        </div>
      </section>
    );
  } else {
    return (
      <section className="flex items-center justify-center bg-[#363636] p-16 rounded-md h-80 w-[370px]">
        <div className="flex flex-col items-center justify-center gap-4 relative">
          <h2 className="font-bold">{monster.name}</h2>
          <p>
            HP: {monsterHP} / {monster.hp}
          </p>
          <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
            <div
              className="bg-red-800 h-3 rounded-full dark:bg-red-800"
              style={{ width: `${(monsterHP! * 100) / monster.hp}%` }}
            ></div>
          </div>
          <div className={damageTakenClass}>{damageTaken}</div>
          <img src={monster.src} alt="" />
        </div>
      </section>
    );
  }
}
