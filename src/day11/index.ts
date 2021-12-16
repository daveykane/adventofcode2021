import { getNeighbours } from "../utils/index.ts";

const incrementOctopus = (flashes: Set<string>, octopuses: number[][], [y, x]: number[]) => {
  octopuses[y][x]++;

  if (octopuses[y][x] > 9 && !flashes.has(`y${y}x${x}`)) {
    flashes.add(`y${y}x${x}`);

    getNeighbours([x, y], octopuses[0].length, octopuses.length, true).forEach((octopus) => {
      incrementOctopus(flashes, octopuses, octopus);
    });
  }
};

const resetOctopus = (flashes: Set<string>, octopuses: number[][]) => {
  flashes.forEach((flash) => {
    octopuses[Number(flash[1])][Number(flash[3])] = 0;
  });
};

const runStep = (octopuses: number[][]) => {
  const flashes: Set<string> = new Set();

  for (let y = 0; y < octopuses.length; y++) {
    for (let x = 0; x < octopuses[0].length; x++) {
      incrementOctopus(flashes, octopuses, [y, x]);
    }
  }

  return flashes;
};

export const part1 = (octopuses: number[][], steps = 100) => {
  let total: number = 0;

  for (let step = 1; step <= steps; step++) {
    const flashes: Set<string> = runStep(octopuses);
    resetOctopus(flashes, octopuses);
    total += flashes.size;
  }

  return total;
};

export const part2 = (octopuses: number[][]) => {
  const totalOctopuses = octopuses.length * octopuses[0].length;

  for (let step = 1; step < Infinity; step++) {
    const flashes: Set<string> = runStep(octopuses);
    if (flashes.size === totalOctopuses) return step;
    resetOctopus(flashes, octopuses);
  }
};
