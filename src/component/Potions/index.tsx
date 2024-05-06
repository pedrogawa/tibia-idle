import { playerStore } from "../../stores/playerStore";

export function Potions() {
  const { player, takeDamage } = playerStore((state) => ({
    player: state.player,
    takeDamage: state.takeDamage,
  }));
  return (
    <section className="inline-flex items-start justify-start flex-col gap-8 bg-[#363636] p-8 rounded-md">
      <div
        className="flex items-center justify-center border-solid border-2 border-slate-200 h-12 w-12 rounded-md cursor-pointer"
        onClick={() => {
          const newHP = player.currentHP + 45;

          takeDamage(newHP);
        }}
      ></div>
      <span>Teste</span>
    </section>
  );
}

export default Potions;
