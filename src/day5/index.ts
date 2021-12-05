const isStraightLine = ([start, end]: number[][]) => start[0] === end[0] || start[1] === end[1];

const markPoint = (grid: Record<string, number>, key: string, points: Set<string>) => {
  grid[key] = grid[key] || 0;
  grid[key]++;
  if (grid[key] > 1) points.add(key);
};

const traverseStraightLine = (grid: Record<string, number>, [start, end]: number[][], points: Set<string>) => {
  const traverseX = start[1] === end[1];
  const startPoint = traverseX ? start[0] : start[1];
  const endPoint = traverseX ? end[0] : end[1];

  for (let i = Math.min(startPoint, endPoint); i <= Math.max(startPoint, endPoint); i++) {
    const key = traverseX ? `x${i}y${start[1]}` : `x${start[0]}y${i}`;
    markPoint(grid, key, points);
  }
};

export const part1 = (lines: number[][][]): number => {
  const grid: Record<string, number> = {};
  const dangerousPoints: Set<string> = new Set();

  lines.filter(isStraightLine).forEach((line) => traverseStraightLine(grid, line, dangerousPoints));

  return dangerousPoints.size;
};

export const part2 = (lines: number[][][]): number => {
  const grid: Record<string, number> = {};
  const dangerousPoints: Set<string> = new Set();

  lines.forEach((line) => {
    if (isStraightLine(line)) {
      traverseStraightLine(grid, line, dangerousPoints);
    } else {
      const [start, end] = line;
      const diff = Math.abs(start[0] - end[0]);

      for (let i = 0; i <= diff; i++) {
        const newX = start[0] < end[0] ? start[0] + i : start[0] - i;
        const newY = start[1] < end[1] ? start[1] + i : start[1] - i;
        markPoint(grid, `x${newX}y${newY}`, dangerousPoints);
      }
    }
  });

  return dangerousPoints.size;
};
