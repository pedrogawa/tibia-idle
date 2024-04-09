import { Monster } from "../../utils/monsters";

interface MonsterStatusProps {
  monster?: Monster;
  monsterHP?: number;
}

export function MonsterStatus({ monster, monsterHP }: MonsterStatusProps) {
  if (!monster) {
    return (
      <section className="flex items-center justify-center bg-[#363636] p-16 rounded-md">
        <div className="flex flex-col items-center justify-center gap-4">
          <h2 className="font-bold">No monster selected</h2>
          <p>HP: -</p>
          {/* <img src={monster.src} alt="" /> */}
        </div>
      </section>
    );
  } else {
    return (
      <section className="flex items-center justify-center bg-[#363636] p-16 rounded-md">
        <div className="flex flex-col items-center justify-center gap-4">
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
          <img src={monster.src} alt="" />
        </div>
      </section>
    );
  }
}
