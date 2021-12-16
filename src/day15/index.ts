import { Grid } from "./type.ts";
import { getNeighbours } from "../utils/index.ts";

const setTrackers = (width: number) => {
  const distance: Grid = [];
  const visited: Grid = [];

  for (let y = 0; y < width; y++) {
    distance[y] = [];
    visited[y] = [];

    for (let x = 0; x < width; ++x) {
      distance[y][x] = Infinity;
      visited[y][x] = 1;
    }
  }

  distance[0][0] = 0;
  visited[0][0] = 2;

  return { distance, visited };
};

const pathFinder = (width: number, map: (y: number, x: number) => number): number => {
  const path = [[0, 0]];
  const { distance, visited } = setTrackers(width);

  while (path.length > 0) {
    let minDistance = Infinity;
    let minDistanceIndex = 0;

    path.forEach(([y, x], index) => {
      if (distance[y][x] < minDistance) {
        minDistance = distance[y][x];
        minDistanceIndex = index;
      }
    });

    const [y, x] = path[minDistanceIndex];

    path[minDistanceIndex] = path[path.length - 1];
    path.length--;
    visited[y][x] = 3;

    getNeighbours([x, y], width, width).forEach(([yy, xx]) => {
      if (visited[yy][xx] === 3) return;

      distance[yy][xx] = Math.min(distance[yy][xx], distance[y][x] + map(yy, xx));

      if (visited[yy][xx] === 1) {
        visited[yy][xx] = 2;
        path.push([yy, xx]);
      }
    });
  }

  return distance[width - 1][width - 1];
};

export const part1 = (grid: Grid) => pathFinder(grid.length, (y, x) => grid[y][x]);

export const part2 = (grid: Grid) => {
  const height = grid.length;
  return pathFinder(
    height * 5,
    (y, x) => ((grid[y % height][x % height] + Math.floor(x / height) + Math.floor(y / height) + 8) % 9) + 1
  );
};
