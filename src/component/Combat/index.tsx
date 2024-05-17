import { monsterStore } from "../../stores/monsterStore";
import CombatTile from "./CombatTile";

export function Combat() {
  const { monsters } = monsterStore((state) => ({
    monsters: state.monsters,
  }));
  return (
    <div className="grid items-center justify-center gap-10 grid-cols-custom-3 gap-y-8 overflow-auto">
      {[...Array(4)].map((_, index) => (
        <div
          className="flex items-center justify-center h-32 flex-col border-solid border-2 border-red-500 p-2 cursor-pointer"
          key={index}
        >
          {monsters[index]?.currentHP > 0 && (
            <CombatTile index={index} monster={monsters[index]} />
          )}
        </div>
      ))}

      <img src="src/assets/Outfit_Warrior_Male_Addon_3.gif" alt="Warrior" />
      {[...Array(4)].map((_, index) => (
        <div
          className="flex items-center justify-center h-32 flex-col border-solid border-2 border-red-500 p-2 cursor-pointer"
          key={index + 4}
        >
          {monsters[index + 4]?.currentHP && (
            <CombatTile index={index + 4} monster={monsters[index + 4]} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Combat;
