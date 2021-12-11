const isInGrid = ([x, y]: number[], width: number, height: number) => x >= 0 && y >= 0 && x < width && y < height;

const getOctoputNeighbours = ([y, x]: number[], width: number, height: number) => {
  const neighbours: number[][] = [];

  for (let xx = -1; xx <= 1; xx++) {
    for (let yy = -1; yy <= 1; yy++) {
      if (xx == 0 && yy == 0) continue;
      if (isInGrid([x + xx, y + yy], width, height)) {
        neighbours.push([x + xx, y + yy]);
      }
    }
  }

  return neighbours;
};

const incrementOctopus = (flashes: Set<string>, octopuses: number[][], [y, x]: number[]) => {
  octopuses[y][x]++;

  if (octopuses[y][x] > 9 && !flashes.has(`y${y}x${x}`)) {
    flashes.add(`y${y}x${x}`);

    getOctoputNeighbours([x, y], octopuses[0].length, octopuses.length).forEach((octopus) => {
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
