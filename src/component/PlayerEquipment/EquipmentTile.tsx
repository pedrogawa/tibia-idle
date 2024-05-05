import { playerStore } from "../../stores/playerStore";
import { isArmorItem, isWeaponItem } from "../../utils/items";

interface EquipmentTileProps {
  type: string;
}

export function EquipmentTile({ type }: EquipmentTileProps) {
  const { player } = playerStore((state) => ({
    player: state.player,
  }));

  const hoverClass =
    "hidden bg-[#242424] opacity-90 flex-col z-10 items-start w-20 justify-start group-hover:flex absolute top-10 left-0 p-2 w-32";

  function handleEquipmentType() {
    switch (type) {
      case "weapon":
        return (
          <>
            <img src={player.equipment.weapon.src} alt="" />
            {isWeaponItem(player.equipment.weapon) && (
              <div className={hoverClass}>
                <span className="font-bold text-sm text-green-300">
                  Attack: {player.equipment.weapon.status.attack}
                </span>
              </div>
            )}
          </>
        );
      case "armor":
        return (
          <>
            <img src={player.equipment.armor.src} alt="" />
            {isArmorItem(player.equipment.armor) && (
              <div className={hoverClass}>
                <span className="font-bold text-sm text-green-300">
                  Armour: {player.equipment.armor.status.armor}
                </span>
              </div>
            )}
          </>
        );
      case "shield":
        return (
          <>
            <img src={player.equipment.shield.src} alt="" />
            {isArmorItem(player.equipment.shield) && (
              <div className={hoverClass}>
                <span className="font-bold text-sm text-green-300">
                  Defense: {player.equipment.shield.status.armor}
                </span>
              </div>
            )}
          </>
        );
      case "helmet":
        return (
          <>
            <img src={player.equipment.helmet.src} alt="" />
            {isArmorItem(player.equipment.helmet) && (
              <div className={hoverClass}>
                <span className="font-bold text-sm text-green-300">
                  Armour: {player.equipment.helmet.status.armor}
                </span>
              </div>
            )}
          </>
        );
    }
  }

  return (
    <div className="group flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md cursor-pointer relative">
      {handleEquipmentType()}
    </div>
  );
}

export default EquipmentTile;
