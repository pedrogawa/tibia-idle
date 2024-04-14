import { lootStore } from "../../stores/lootStore";
import { playerStore } from "../../stores/playerStore";
import { isArmorItem, isWeaponItem, isFoodItem } from "../../utils/monsters";

export function LootDrop() {
  const { droppedLoot, clearDroppedLoot } = lootStore((state) => ({
    droppedLoot: state.droppedLoot,
    clearDroppedLoot: state.clearDroppedLoot,
  }));

  const { lootItems } = playerStore((state) => ({
    player: state.player,
    lootItems: state.lootItems,
    takeDamage: state.takeDamage,
  }));

  function handleLootAll() {
    lootItems(droppedLoot);
    clearDroppedLoot();
  }

  if (droppedLoot) {
    return (
      <div className="flex items-start justify-start bg-[#363636] p-8 rounded-md gap-8 flex-col w-[370px] h-[270px]">
        <div className="flex w-full items-center justify-between gap-8">
          <h3>Dropped Loot</h3>
          <button onClick={handleLootAll}>Loot all</button>
        </div>
        <div className="grid items-center justify-center gap-3 grid-cols-5 gap-y-8 h-32 overflow-auto">
          {droppedLoot.map((loot) => {
            return (
              <div
                className="flex items-center justify-center gap-2"
                key={loot.id}
              >
                <div className="group flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md cursor-pointer relative">
                  <img src={loot.src} alt="" />

                  {isWeaponItem(loot) && (
                    <div className="hidden flex-col items-start ustify-start group-hover:flex absolute top-12 left-0 w-14">
                      <span className="font-bold text-sm text-green-300">
                        Atk: {loot.status.attack}
                      </span>
                      <span className="font-bold text-sm text-green-300">
                        Def: {loot.status.defense}
                      </span>
                    </div>
                  )}
                  {isArmorItem(loot) && (
                    <div className="hidden flex-col items-start w-20 justify-start group-hover:flex absolute top-12 left-0">
                      <span className="font-bold text-sm text-green-300">
                        Armour: {loot.status.armor}
                      </span>
                    </div>
                  )}
                  {isFoodItem(loot) && (
                    <div className="hidden flex-col items-start w-32 justify-start group-hover:flex absolute top-12 left-0">
                      <span className="font-bold text-sm text-green-300">
                        Regen: {loot.status.regeneration} HP
                      </span>
                    </div>
                  )}
                  {loot.type === "gold" && (
                    <div className="hidden flex-col items-start w-32 justify-start group-hover:flex absolute top-12 left-0">
                      <span className="font-bold text-sm text-green-300">
                        {loot.qty} coins
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-center bg-[#363636] p-16 rounded-md">
        No loot dropped
      </div>
    );
  }
}
