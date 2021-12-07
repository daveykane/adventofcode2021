const calculateMinFuel = (crabs: number[], constantRate: boolean): number => {
  let lowestFuel = Infinity;

  for (let i = Math.min(...crabs); i <= Math.max(...crabs); i++) {
    const fuel = crabs.reduce((sum, crab) => {
      const diff = Math.abs(crab - i);
      return sum + (constantRate ? diff : diff * ((diff + 1) / 2));
    }, 0);

    lowestFuel = Math.min(fuel, lowestFuel);
  }

  return lowestFuel;
};

export const part1 = (crabs: number[]) => calculateMinFuel(crabs, true);
export const part2 = (crabs: number[]) => calculateMinFuel(crabs, false);
