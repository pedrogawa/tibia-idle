import { Player } from "./player";

export function calculateDamage(player: Player) {
  const weaponDamage = Math.floor(player.equipment.weapon.status.attack / 3);
  const levelDamage = Math.floor(player.level / 5);

  return levelDamage + weaponDamage + player.skills.attack.level;
}
