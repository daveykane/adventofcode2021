const getKeyValue = (pattern: string, digit: string): string => {
  const occurrences = new Map();
  signals.forEach((signal) => occurrences.set(signal, pattern.match(new RegExp(signal, "g"))?.length || 0));

  return digit
    .split("")
    .map((char) => occurrences.get(char))
    .sort((a, b) => a - b)
    .join("");
};

const getOutputValues = (pattern: string, output: string[]): number => {
  return parseInt(output.map((digit) => key.get(getKeyValue(pattern, digit))).join(""), 10);
};

const signals: string[] = "abcdefg".split("");
const key: Map<string, string> = new Map();
const digits = "abcefg cf acdeg acdfg bcdf abdfg abdefg acf abcdefg abcdfg";

digits.split(" ").forEach((digit, i) => key.set(getKeyValue(digits, digit), i.toString()));

export const part1 = (notes: string[][]) => {
  const getTotal = (total: number, value: string) => total + Number([2, 3, 4, 7].includes(value.length));
  return notes.reduce((counter: number, [, output]) => counter + output.split(" ").reduce(getTotal, 0), 0);
};

export const part2 = (notes: string[][]) => {
  return notes.reduce((value: number, [pattern, output]) => value + getOutputValues(pattern, output.split(" ")), 0);
};
