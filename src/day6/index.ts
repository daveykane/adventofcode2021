const trackFish = (fish: number[], days: number) => {
  let cycle: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  fish.forEach((age) => cycle[age]++);

  for (let day = 1; day <= days; day++) {
    const [spawning, ...aged] = cycle;
    cycle = [...aged, spawning];
    cycle[6] += spawning;
  }

  return cycle.reduce((total, count) => total + count);
};

export const part1 = trackFish;
export const part2 = trackFish;
