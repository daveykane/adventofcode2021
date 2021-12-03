const findCommonalitiesAtPosition = (binaries: string[], position: number) => {
  const halfLength = binaries.length / 2;
  const numOfOnes = binaries.reduce((count, binary) => (binary[position] === "1" ? count + 1 : count), 0);
  const mostCommon = numOfOnes >= halfLength ? "1" : "0";
  const leastCommon = numOfOnes < halfLength ? "1" : "0";
  return { mostCommon, leastCommon };
};

export const part1 = (report: string[]) => {
  let gammaRateBinary = "";
  let epsilonRateBinary = "";

  for (let i = 0; i < report[0].length; i += 1) {
    const { mostCommon, leastCommon } = findCommonalitiesAtPosition(report, i);
    gammaRateBinary += mostCommon;
    epsilonRateBinary += leastCommon;
  }

  return parseInt(gammaRateBinary, 2) * parseInt(epsilonRateBinary, 2);
};

export const part2 = (report: string[]) => {
  let oxygenRateBinary = [...report];
  let co2ScrubberRateBinary = [...report];

  for (let i = 0; i < report[0].length; i += 1) {
    if (oxygenRateBinary.length > 1) {
      const { mostCommon } = findCommonalitiesAtPosition(oxygenRateBinary, i);
      oxygenRateBinary = oxygenRateBinary.filter((binary) => binary[i] === mostCommon);
    }

    if (co2ScrubberRateBinary.length > 1) {
      const { leastCommon } = findCommonalitiesAtPosition(co2ScrubberRateBinary, i);
      co2ScrubberRateBinary = co2ScrubberRateBinary.filter((binary) => binary[i] === leastCommon);
    }
  }

  return parseInt(oxygenRateBinary[0], 2) * parseInt(co2ScrubberRateBinary[0], 2);
};
