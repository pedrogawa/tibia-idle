import { playerStore } from "../../stores/playerStore";

export function PlayerStatus() {
  const { player } = playerStore((state) => ({
    player: state.player,
  }));

  console.log((100 * player.currentExperience) / player.experience);

  return (
    <section className="h-full bg-[#363636] w-48">
      <span className="">Class</span>
      <div className="">
        <span>{(100 * player.currentExperience) / player.experience}</span>
      </div>
    </section>
  );
}
