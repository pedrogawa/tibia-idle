import { combatStore } from "../../stores/combatStore";

interface CombatTileProps {
  index: number;
  monster: any;
}

export function CombatTile({ index, monster }: CombatTileProps) {
  const { attack } = combatStore((state) => ({
    attack: state.attack,
  }));
  return (
    <div onClick={() => attack(index)}>
      <span className="font-mono font-bold">{monster.name}</span>
      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
        <div
          className="bg-green-800 h-3 rounded-full dark:bg-green-800"
          style={{
            width: `${Math.floor((monster.currentHP * 100) / monster.hp)}%`,
          }}
        ></div>
      </div>

      <img className="" src={monster.src} alt="Warrior" />
    </div>
  );
}

export default CombatTile;
