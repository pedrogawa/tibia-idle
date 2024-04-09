export function calculateLevelExp(level: number) {
  return (
    (50 * Math.pow(level - 1, 3) -
      150 * Math.pow(level - 1, 2) +
      400 * (level - 1)) /
    3
  );
}
