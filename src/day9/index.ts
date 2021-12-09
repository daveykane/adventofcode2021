const isHigher = (point: number, adjacent: number) => typeof adjacent === "undefined" || adjacent > point;
const isHigherBasin = (point: number, adjacent: number) =>
  typeof adjacent !== "undefined" && adjacent !== 9 && adjacent > point;

const getLowPoints = (map: number[][]) => {
  let lowPointsSum: number = 0;
  const lowPoints: number[][] = [];

  for (let y = 0; y < map.length; y++) {
    for (let x = 0; x < map[0].length; x++) {
      if (
        isHigher(map[y][x], map[y - 1] && map[y - 1][x]) &&
        isHigher(map[y][x], map[y][x + 1]) &&
        isHigher(map[y][x], map[y + 1] && map[y + 1][x]) &&
        isHigher(map[y][x], map[y][x - 1])
      ) {
        lowPointsSum += map[y][x] + 1;
        lowPoints.push([y, x]);
      }
    }
  }

  return { lowPoints, lowPointsSum };
};

const getBasinSize = (sizes: Set<string>, map: number[][], [y, x]: number[]) => {
  sizes.add(`y${y}x${x}`);

  if (isHigherBasin(map[y][x], map[y - 1] && map[y - 1][x])) getBasinSize(sizes, map, [y - 1, x]);
  if (isHigherBasin(map[y][x], map[y][x + 1])) getBasinSize(sizes, map, [y, x + 1]);
  if (isHigherBasin(map[y][x], map[y + 1] && map[y + 1][x])) getBasinSize(sizes, map, [y + 1, x]);
  if (isHigherBasin(map[y][x], map[y][x - 1])) getBasinSize(sizes, map, [y, x - 1]);
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
