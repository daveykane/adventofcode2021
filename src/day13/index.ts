import { Dot, Origami } from "./types.ts";

const clean = (dots: Dot[]) => {
  const overlaps: Set<string> = new Set();
  return dots.reduce((newDots: Dot[], [x, y]: Dot) => {
    if (!overlaps.has(`${x},${y}`)) {
      newDots.push([x, y]);
      overlaps.add(`${x},${y}`);
    }

    return newDots;
  }, []);
};

const fold = ({ dots, instructions }: Origami) => {
  instructions.forEach(({ dimension, fold }) => {
    dots.forEach((dot: Dot) => {
      if (dot[dimension] < fold) return;
      dot[dimension] = fold - (dot[dimension] - fold);
    });
  });

  return clean(dots);
};

export const part1 = (origami: Origami) => fold(origami).length;
export const part2 = (origami: Origami) => {
  const dots = fold(origami);
  const { maxX, maxY } = dots.reduce(
    (edges, [x, y]) => ({ maxX: Math.max(edges.maxX, x), maxY: Math.max(edges.maxY, y) }),
    { maxX: 0, maxY: 0 }
  );

  const row = new Array(maxX + 1).fill(".");
  const grid = new Array(maxY + 1).fill("").map(() => [...row]);

  dots.forEach(([x, y]) => (grid[y][x] = "#"));

  return "\n" + grid.map((row) => row.join("")).join("\n");
};
