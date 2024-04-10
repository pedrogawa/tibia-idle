import { playerStore } from "../../stores/playerStore";

export function PlayerStatus() {
  const { player } = playerStore((state) => ({
    player: state.player,
  }));

  return (
    <div className="w-full">
      <div className="w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
        <div
          className="bg-red-800 h-3 rounded-full dark:bg-red-800"
          style={{ width: `85%` }}
        ></div>
      </div>
      <p>
        Player HP: {player.currentHP} / {player.hp}
      </p>
    </div>
  );
}
