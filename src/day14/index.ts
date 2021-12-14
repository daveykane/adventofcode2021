import { Instructions, Polymer } from "./types.ts";

const getElementCounts = (polymer: Polymer, firstElement: string, lastElement: string) => {
  const elements: Polymer = { [firstElement]: 0.5, [lastElement]: 0.5 };

  for (const pair in polymer) {
    const [left, right] = pair.split("");
    elements[left] = (elements[left] ?? 0) + polymer[pair] / 2;
    elements[right] = (elements[right] ?? 0) + polymer[pair] / 2;
  }

  return elements;
};

const makePolymer = ({ polymer, firstElement, lastElement, rules }: Instructions, steps: number) => {
  for (let i = 0; i < steps; i++) {
    const newPolymer: Polymer = {};

    for (const pair in polymer) {
      const [left, right] = pair.split("");
      const newLeftPair = `${left}${rules[pair]}`;
      const newRightPair = `${rules[pair]}${right}`;

      newPolymer[newLeftPair] = (newPolymer[newLeftPair] ?? 0) + polymer[pair];
      newPolymer[newRightPair] = (newPolymer[newRightPair] ?? 0) + polymer[pair];
    }

    polymer = newPolymer;
  }

  const totals = Object.values(getElementCounts(polymer, firstElement, lastElement));
  return Math.max(...totals) - Math.min(...totals);
};

export const part1 = (instructions: Instructions) => makePolymer(instructions, 10);
export const part2 = (instructions: Instructions) => makePolymer(instructions, 40);
