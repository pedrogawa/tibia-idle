import { create } from "zustand";
import { playerStore } from "./playerStore";
import { monsterStore } from "./monsterStore";
import { generateLoot } from "../utils/monsters";
import { lootStore } from "./lootStore";
import { taskStore } from "./taskStore";

interface CombatState {
  damageDone: number;
  isAttacking: boolean;
  startAttacking: (status: boolean) => void;
  attack: (index: number) => void;
}

export const combatStore = create<CombatState>((set) => ({
  damageDone: 0,
  isAttacking: false,
  startAttacking: (status: boolean) =>
    set(() => {
      return {
        isAttacking: status,
      };
    }),
  attack: (index: number) =>
    set(() => {
      const { player, gainExperience, takeDamage, skillsTraining } =
        playerStore.getState();
      const { monsters, setMonster, setMonsterHP, removeMonsterImmutable } =
        monsterStore.getState();
      const monster = monsters[index];
      const { addDroppedLoot } = lootStore.getState();
      const { task, increaseCurrentKills } = taskStore.getState();
      setMonster(monster);
      const playerDamage = Math.floor(Math.random() * (player.damage - 0) + 0);
      const nextMonsterHP = monster.currentHP - playerDamage;
      if (monster.name) {
        if (nextMonsterHP <= 0) {
          gainExperience(monster.experience);

          const lootDropped = generateLoot(monster.loot);
          addDroppedLoot(lootDropped.items);
          setMonsterHP(0, index);
          removeMonsterImmutable();
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
          setMonsterHP(nextMonsterHP, index);
        }
        let turnDamage = 0;
        const test = 0;
        for (let i = test; i < monsters.length; i++) {
          const monsterDamage = Math.floor(
            Math.random() * (monsters[i].maxDamage - monsters[i].minDamage) +
              monster.minDamage,
          );
          turnDamage += monsterDamage;
        }
        const nextPlayerHP = player.currentHP - turnDamage;

        takeDamage(nextPlayerHP);
        const potionHP = Math.floor((player.hp * 35) / 100);

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
