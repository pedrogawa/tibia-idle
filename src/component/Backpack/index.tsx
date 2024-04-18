import { playerStore } from "../../stores/playerStore";
import { isArmorItem, isWeaponItem } from "../../utils/items";

export function Backpack() {
  const { player, takeDamage, removeItem, equipItem } = playerStore(
    (state) => ({
      player: state.player,
      takeDamage: state.takeDamage,
      removeItem: state.removeItem,
      equipItem: state.equipItem,
    })
  );

  return (
    <div className="flex items-start justify-start bg-[#363636] p-8 rounded-md gap-8 flex-col w-[370px] h-[270px]">
      <h3>Backpack</h3>
      <div className="grid items-center justify-center gap-3 grid-cols-5 gap-y-8 overflow-auto">
        {player.backpack.map((item) => {
          return (
            <div
              className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md relative"
              key={crypto.randomUUID()}
              onClick={() => {
                if (item.type === "food") {
                  const healedHP = player.currentHP + 27;

                  takeDamage(healedHP);
                  removeItem(item.id);
                }

                if (item.type === "armor" && isArmorItem(item)) {
                  const newItem = {
                    ...item,
                    status: item.status,
                  };

                  equipItem(newItem);
                }

                if (item.type === "weapon" && isWeaponItem(item)) {
                  const newItem = {
                    ...item,
                    status: item.status,
                  };

                  equipItem(newItem);
                }
              }}
            >
              <img src={item.src} alt="" />
              <span className="absolute inset-7 right-1 text-xs">
                {item.qty}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
