import { monsterStore } from "../../stores/monsterStore";

export function Combat() {
  const { monsters } = monsterStore((state) => ({
    monsters: state.monsters,
  }));
  return (
    <div className="grid items-center justify-center gap-10 grid-cols-custom-3 gap-y-8 overflow-auto">
      <div className="flex items-center justify-center flex-col border-solid border-2 border-red-500 p-2 cursor-pointer">
        {monsters[0] && (
          <>
            <span className="font-mono font-bold">{monsters[0].name}</span>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
              <div
                className="bg-green-800 h-3 rounded-full dark:bg-green-800"
                style={{
                  width: `${Math.floor((monsters[0].currentHP * 100) / monsters[0].hp)}%`,
                }}
              ></div>
            </div>

            <img className="" src={monsters[0].src} alt="Warrior" />
          </>
        )}
      </div>
      <div className="flex items-center justify-center flex-col border-solid border-2 border-red-500 p-2 cursor-pointer">
        {monsters[1] && (
          <>
            <span className="font-mono font-bold">{monsters[1].name}</span>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
              <div
                className="bg-green-800 h-3 rounded-full dark:bg-green-800"
                style={{ width: `100%` }}
              ></div>
            </div>

            <img className="" src={monsters[1].src} alt="Warrior" />
          </>
        )}
      </div>
      <div className="flex items-center justify-center flex-col border-solid border-2 border-red-500 p-2 cursor-pointer">
        {monsters[2] && (
          <>
            <span className="font-mono font-bold">{monsters[2].name}</span>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
              <div
                className="bg-green-800 h-3 rounded-full dark:bg-green-800"
                style={{ width: `100%` }}
              ></div>
            </div>

            <img className="" src={monsters[2].src} alt="Warrior" />
          </>
        )}
      </div>
      <div className="flex items-center justify-center flex-col border-solid border-2 border-red-500 p-2 cursor-pointer">
        {monsters[3] && (
          <>
            <span className="font-mono font-bold">{monsters[3].name}</span>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
              <div
                className="bg-green-800 h-3 rounded-full dark:bg-green-800"
                style={{ width: `100%` }}
              ></div>
            </div>

            <img className="" src={monsters[3].src} alt="Warrior" />
          </>
        )}
      </div>

      <img src="src/assets/Outfit_Warrior_Male_Addon_3.gif" alt="Warrior" />
      <div className="flex items-center justify-center flex-col border-solid border-2 border-red-500 p-2 cursor-pointer">
        {monsters[4] && (
          <>
            <span className="font-mono font-bold">{monsters[4].name}</span>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
              <div
                className="bg-green-800 h-3 rounded-full dark:bg-green-800"
                style={{ width: `100%` }}
              ></div>
            </div>

            <img className="" src={monsters[4].src} alt="Warrior" />
          </>
        )}
      </div>
      <div className="flex items-center justify-center flex-col border-solid border-2 border-red-500 p-2 cursor-pointer">
        {monsters[5] && (
          <>
            <span className="font-mono font-bold">{monsters[5].name}</span>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
              <div
                className="bg-green-800 h-3 rounded-full dark:bg-green-800"
                style={{ width: `100%` }}
              ></div>
            </div>

            <img className="" src={monsters[5].src} alt="Warrior" />
          </>
        )}
      </div>
      <div className="flex items-center justify-center flex-col border-solid border-2 border-red-500 p-2 cursor-pointer">
        {monsters[6] && (
          <>
            <span className="font-mono font-bold">{monsters[6].name}</span>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
              <div
                className="bg-green-800 h-3 rounded-full dark:bg-green-800"
                style={{ width: `100%` }}
              ></div>
            </div>

            <img className="" src={monsters[6].src} alt="Warrior" />
          </>
        )}
      </div>
      <div className="flex items-center justify-center flex-col border-solid border-2 border-red-500 p-2 cursor-pointer">
        {monsters[7] && (
          <>
            <span className="font-mono font-bold">{monsters[7].name}</span>
            <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
              <div
                className="bg-green-800 h-3 rounded-full dark:bg-green-800"
                style={{ width: `100%` }}
              ></div>
            </div>

            <img className="" src={monsters[7].src} alt="Warrior" />
          </>
        )}
      </div>
    </div>
  );
}

export default Combat;
