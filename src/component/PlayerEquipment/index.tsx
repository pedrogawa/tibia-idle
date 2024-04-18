import { playerStore } from "../../stores/playerStore";
import { isArmorItem, isWeaponItem } from "../../utils/items";

function PlayerEquipment() {
  const { player } = playerStore((state) => ({
    player: state.player,
  }));

  return (
    <section className="inline-flex items-start justify-start flex-col gap-8 bg-[#363636] p-8 rounded-md">
      <p className="text-white font-bold">Equipments</p>

      <div className="flex items-start justify-start flex-col gap-4">
        <div className="flex flex-row gap-2">
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            {player.equipment.helmet.src && <img src="" alt="" />}
          </div>
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            <img src={player.equipment.helmet.src} alt="" />
          </div>
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            <img src="src/assets/Backpack.gif" alt="" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="group flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md cursor-pointer relative">
            <img src={player.equipment.weapon.src} alt="" />
            {isWeaponItem(player.equipment.weapon) && (
              <div className="hidden flex-col items-start w-20 justify-start group-hover:flex absolute top-12 left-0">
                <span className="font-bold text-sm text-green-300">
                  Attack: {player.equipment.weapon.status.attack}
                </span>
              </div>
            )}
          </div>
          <div className="group flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md cursor-pointer relative">
            <img src={player.equipment.armor.src} alt="" />
            {isArmorItem(player.equipment.armor) && (
              <div className="hidden flex-col items-start w-20 justify-start group-hover:flex absolute top-12 left-0">
                <span className="font-bold text-sm text-green-300">
                  Armour: {player.equipment.armor.status.armor}
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            <img src="src/assets/Wooden_Shield.gif" alt="" />
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            {/* <img src="src/assets/Dagger.gif" alt="" /> */}
          </div>
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            <img src="src/assets/Leather_Boots.gif" alt="" />
          </div>
          <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
            {/* <img src="src/assets/Wooden_Shield.gif" alt="" /> */}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PlayerEquipment;
