import { playerStore } from "../../stores/playerStore";
import { calculateLevelExp } from "../../utils/calculateLevelExp";

export function PlayerStatus() {
  const { player } = playerStore((state) => ({
    player: state.player,
  }));
  const LEVEL_PERCENTAGE =
    ((player.currentExperience - calculateLevelExp(player.level)) * 100) /
    (player.experience - calculateLevelExp(player.level));

  return (
    <section className="h-full bg-[#363636] w-64 p-4 rounded-md flex flex-col items-start gap-8">
      <span className="font-bold">Player Status</span>
      <div className="flex w-full items-center justify-between font-bold">
        <p>Level</p>
        <span> {player.level}</span>
      </div>
      <div className="flex w-full items-center justify-between font-bold">
        <p>Damage</p>
        <span>0 - {player.damage}</span>
      </div>
      <div className="flex items-start justify-start flex-col w-full gap-2">
        <span className="font-bold">Experience</span>
        <div className="flex item-start justify-start gap-2">
          <span>
            {player.currentExperience} / {player.experience}
          </span>
          <span>
            ({LEVEL_PERCENTAGE.toFixed(2)}
            %)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-lime-400 h-2 rounded-full dark:bg-red-800"
            style={{
              width: `${
                ((player.currentExperience - calculateLevelExp(player.level)) *
                  100) /
                (player.experience - calculateLevelExp(player.level))
              }%`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex items-start justify-start flex-col w-full gap-2">
        <div className="flex item-start justify-between w-full gap-2 font-bold">
          <span>Attacking</span>
          <span>{player.skills.attack.level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-lime-400 h-2 rounded-full dark:bg-lime-800"
            style={{
              width: `${player.skills.attack.percentage}%`,
            }}
          ></div>
        </div>
      </div>
      <div className="flex items-start justify-start flex-col w-full gap-2">
        <div className="flex item-start justify-between w-full gap-2 font-bold">
          <span>Shielding</span>
          <span>{player.skills.defense.level}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
          <div
            className="bg-lime-400 h-2 rounded-full dark:bg-lime-800"
            style={{
              width: `${player.skills.defense.percentage}%`,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
}
