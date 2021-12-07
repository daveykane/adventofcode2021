const mean = (crabs: number[]) => crabs.reduce((a, b) => a + b) / crabs.length;
const median = (crabs: number[]) => crabs.slice().sort((a, b) => a - b)[Math.floor(crabs.length / 2)];
const calculateFuel = (crabs: number[], position: number, constantRate: boolean) =>
  crabs.reduce((fuel, crab) => {
    const delta = Math.abs(crab - position);
    return fuel + (constantRate ? delta : delta * ((delta + 1) / 2));
  }, 0);

export const part1 = (crabs: number[]) => calculateFuel(crabs, median(crabs), true);
export const part2 = (crabs: number[]) => {
  const meanCrab = mean(crabs);
  return Math.min(calculateFuel(crabs, Math.ceil(meanCrab), false), calculateFuel(crabs, Math.floor(meanCrab), false));
};
