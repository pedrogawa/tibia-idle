export const foodType:
  | "food"
  | "helmet"
  | "armor"
  | "legs"
  | "shield"
  | "weapon" = "food";

export const helmetType:
  | "food"
  | "helmet"
  | "armor"
  | "legs"
  | "shield"
  | "weapon" = "helmet";

export const weaponType:
  | "food"
  | "helmet"
  | "armor"
  | "legs"
  | "shield"
  | "weapon" = "weapon";

export const shieldType:
  | "food"
  | "helmet"
  | "armor"
  | "legs"
  | "shield"
  | "weapon" = "shield";

export const armorType:
  | "food"
  | "helmet"
  | "armor"
  | "legs"
  | "shield"
  | "weapon" = "armor";

export const items = {
  cheese: {
    id: "1",
    name: "Cheese",
    src: "src/assets/Cheese.gif",
    type: foodType,
    status: {
      regeneration: 27,
    },
  },
  meat: {
    id: "2",
    name: "Meat",
    src: "src/assets/Meat.gif",
    type: foodType,
    status: {
      regeneration: 45,
    },
  },
  handAxe: {
    id: "3",
    name: "Hand Axe",
    src: "src/assets/Hand_Axe.gif",
    type: weaponType,
    status: {
      attack: 15,
      defense: 10,
    },
  },
  leatherHelmet: {
    id: "4",
    name: "Leather Helmet",
    type: helmetType,
    src: "src/assets/Leather_Helmet.gif",
    status: {
      armor: 1,
    },
  },
  woodenShield: {
    id: "5",
    name: "Wooden Shield",
    type: shieldType,
    src: "src/assets/Wooden_Shield.gif",
    status: {
      armor: 1,
    },
  },
  leatherArmor: {
    id: "6",
    name: "Leather Armor",
    type: armorType,
    src: "src/assets/Leather_Armor.gif",
    status: {
      armor: 6,
    },
  },
  brassHelmet: {
    id: "7",
    name: "Brass Helmet",
    type: helmetType,
    src: "src/assets/Brass_Helmet.gif",
    status: {
      armor: 3,
    },
  },
  chainArmor: {
    id: "8",
    name: "Chain Armor",
    type: armorType,
    src: "src/assets/Chain_Armor.gif",
    status: {
      armor: 6,
    },
  },
  plateShield: {
    id: "9",
    name: "Plate Shield",
    type: shieldType,
    src: "src/assets/Plate_Shield.gif",
    status: {
      armor: 17,
    },
  },
  mace: {
    id: "10",
    name: "Mace",
    type: weaponType,
    src: "src/assets/Mace.gif",
    status: {
      attack: 16,
      defense: 11,
    },
  },
  jacket: {
    id: "11",
    name: "Jacket",
    type: armorType,
    src: "src/assets/Jacket.gif",
    status: {
      armor: 1,
    },
  },
  club: {
    id: "12",
    name: "Club",
    type: weaponType,
    src: "src/assets/Club.gif",
    status: {
      attack: 7,
      defense: 7,
    },
  },
};
