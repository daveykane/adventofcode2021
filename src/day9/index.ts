import { getNeighbours } from "../utils/index.ts";

const getLowPoints = (map: number[][]) => {
  let lowPointsSum: number = 0;
  const lowPoints: number[][] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (getNeighbours([y, x], map[0].length, map.length).every(([xx, yy]) => map[yy][xx] > map[y][x])) {
        lowPointsSum += map[y][x] + 1;
        lowPoints.push([y, x]);
      }
    }
  }

  return { lowPoints, lowPointsSum };
};

const getBasinSize = (sizes: Set<string>, map: number[][], [y, x]: number[]) => {
  sizes.add(`y${y}x${x}`);

  getNeighbours([y, x], map[0].length, map.length).forEach(([xx, yy]) => {
    if (map[yy][xx] !== 9 && map[yy][xx] > map[y][x]) {
      getBasinSize(sizes, map, [yy, xx]);
    }
  });
};

export const part1 = (map: number[][]) => {
  const { lowPointsSum } = getLowPoints(map);
  return lowPointsSum;
};

export const part2 = (map: number[][]) => {
  const { lowPoints } = getLowPoints(map);
  const basins = lowPoints.reduce((acc: number[], point) => {
    const sizes: Set<string> = new Set();
    getBasinSize(sizes, map, point);
    return [...acc, sizes.size];
  }, []);

  basins.sort((a, b) => b - a);
  return basins.slice(0, 3).reduce((sum, basin) => sum * basin, 1);
};
