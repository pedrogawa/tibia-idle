import { isWeaponItem, isArmorItem } from "../../utils/items";
import { playerStore } from "../../stores/playerStore";

interface EquipmentTileProps {
  type: string;
}

export function EquipmentTile({ type }: EquipmentTileProps) {
  const { player } = playerStore((state) => ({
    player: state.player,
  }));

  return (
    <div className="group flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md cursor-pointer relative">
      {type === "weapon" && (
        <>
          <img src={player.equipment.weapon.src} alt="" />
          {isWeaponItem(player.equipment.weapon) && (
            <div className="hidden bg-red-500 opacity-75 flex-col z-5 items-start w-20 justify-start group-hover:flex absolute top-12 left-0">
              <span className="font-bold text-sm text-green-300">
                Attack: {player.equipment.weapon.status.attack}
              </span>
            </div>
          )}
        </>
      )}
      {type === "armor" && (
        <>
          <img src={player.equipment.armor.src} alt="" />
          {isArmorItem(player.equipment.armor) && (
            <div className="hidden flex-col items-start w-20 justify-start group-hover:flex absolute top-12 left-0">
              <span className="font-bold text-sm text-green-300">
                Armour: {player.equipment.armor.status.armor}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default EquipmentTile;
