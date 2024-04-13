import { lootStore } from "../../stores/lootStore";
import { playerStore } from "../../stores/playerStore";
import { DropItem, isArmorItem, isWeaponItem } from "../../utils/monsters";

export function LootDrop() {
  const { droppedLoot, clearDroppedLoot } = lootStore((state) => ({
    droppedLoot: state.droppedLoot,
    clearDroppedLoot: state.clearDroppedLoot,
  }));

  const { lootItems, takeDamage, player } = playerStore((state) => ({
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
      <div className="flex items-start justify-start bg-[#363636] p-16 rounded-md gap-8 flex-col w-full">
        <div className="flex items-center justify-between gap-8">
          <h3>Dropped Loot</h3>
          <button onClick={handleLootAll}>Loot all</button>
        </div>
        <div className="flex items-center justify-center gap-4">
          {droppedLoot.map((loot: DropItem) => {
            return (
              <div
                className="flex items-center justify-center gap-2"
                key={loot.id}
              >
                <div className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md">
                  <img src={loot.src} alt="" />
                </div>
                <span>
                  {isWeaponItem(loot) && (
                    <span>
                      {loot.status.attack} / {loot.status.defense}
                    </span>
                  )}

                  {isArmorItem(loot) && <span>{loot.status.armor}</span>}
                </span>
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
