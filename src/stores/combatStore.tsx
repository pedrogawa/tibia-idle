import { create } from "zustand";
import { playerStore } from "./playerStore";
import { monsterStore } from "./monsterStore";
import { places, generateLoot, selectMonster } from "../utils/monsters";
import { lootStore } from "./lootStore";
import { taskStore } from "./taskStore";

interface CombatState {
  damageDone: number;
  attack: () => void;
}

export const combatStore = create<CombatState>((set) => ({
  damageDone: 0,
  attack: () =>
    set(() => {
      const { player, gainExperience, takeDamage, skillsTraining } =
        playerStore.getState();
      const {
        monster,
        monsterHP,
        setMonster,
        setDamageTaken,
        setMonsterHP,
        huntId,
      } = monsterStore.getState();
      const { addDroppedLoot } = lootStore.getState();
      const { task, increaseCurrentKills } = taskStore.getState();

      const playerDamage = Math.floor(Math.random() * (player.damage - 0) + 0);
      const nextMonsterHp = monsterHP - playerDamage;
      setDamageTaken(playerDamage);
      if (monster.name) {
        if (nextMonsterHp <= 0) {
          gainExperience(monster.experience);

          const selectedMonster = selectMonster(places[huntId]);
          const lootDropped = generateLoot(monster.loot);
          addDroppedLoot(lootDropped.items);
          setMonster(selectedMonster);
          setMonsterHP(selectedMonster.hp);

          if (task.isTaskOn) {
            const isTask = task.monster.name === monster.name;

            if (isTask) {
              if (task.currentKills >= task.monster.task) {
                gainExperience(task.reward);
              } else {
                increaseCurrentKills();
              }
            }
          }
        } else {
          setMonsterHP(nextMonsterHp);
        }
        const monsterDamage = Math.floor(
          Math.random() * (monster.maxDamage - monster.minDamage) +
            monster.minDamage,
        );
        const nextPlayerHP = player.currentHP - monsterDamage;
        const potionHP = Math.floor((player.hp * 35) / 100);

        takeDamage(nextPlayerHP);
        skillsTraining();

        // setDamageDone(true);
        // setTimeout(() => {
        //   setDamageDone(false);
        // }, 500);
        //
        if (player.currentHP <= potionHP) {
          const healedHP = player.currentHP + 45;
          takeDamage(healedHP);
        }
      } else {
        window.alert("Needs to select a monster!");
      }
      return {
        damageDone: 1,
      };
    }),
}));
