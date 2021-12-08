export const part1 = (notes: string[][]) => {
  return notes.reduce(
    (counter: number, [_, output]) =>
      counter +
      output.split(" ").reduce((total, value) => ([2, 3, 4, 7].includes(value.length) ? total + 1 : total), 0),
    0
  );
};

export const part2 = (notes: string[][]) => {
  return notes.reduce((value: number, [signals, output]) => {
    const uniqueDigits: Record<number, string[]> = {};
    const otherDigits: Record<number, string[][]> = {};

    signals.split(" ").forEach((digit) => {
      if (digit.length === 2) {
        uniqueDigits[1] = digit.split("");
      } else if (digit.length === 4) {
        uniqueDigits[4] = digit.split("");
      } else if (digit.length === 3) {
        uniqueDigits[7] = digit.split("");
      } else if (digit.length === 7) {
        uniqueDigits[8] = digit.split("");
      } else {
        const split = digit.split("");

        if (digit.length === 5) {
          otherDigits[2] = otherDigits[2] || [];
          otherDigits[3] = otherDigits[3] || [];
          otherDigits[5] = otherDigits[5] || [];

          otherDigits[2].push(split);
          otherDigits[3].push(split);
          otherDigits[5].push(split);
        } else if (digit.length === 6) {
          otherDigits[0] = otherDigits[0] || [];
          otherDigits[6] = otherDigits[6] || [];
          otherDigits[9] = otherDigits[9] || [];

          otherDigits[0].push(split);
          otherDigits[6].push(split);
          otherDigits[9].push(split);
        }
      }
    });

    const [top] = uniqueDigits[7].filter(
      (digit) => !uniqueDigits[1].includes(digit) && !uniqueDigits[4].includes(digit)
    );

    const [middle] = uniqueDigits[4].filter(
      (digit) =>
        !uniqueDigits[1].includes(digit) &&
        !uniqueDigits[7].includes(digit) &&
        otherDigits[2].every((combo) => combo.includes(digit)) &&
        otherDigits[3].every((combo) => combo.includes(digit)) &&
        otherDigits[5].every((combo) => combo.includes(digit))
    );

    const [topLeft] = uniqueDigits[4].filter(
      (digit) => !uniqueDigits[1].includes(digit) && !uniqueDigits[7].includes(digit) && digit !== middle
    );

    uniqueDigits[5] = otherDigits[5].filter((combo) => combo.includes(topLeft)).pop() || [];

    const [bottomRight] = uniqueDigits[1].filter((digit) => uniqueDigits[5].includes(digit));

    const [topRight] = uniqueDigits[1].filter((digit) => digit !== bottomRight);

    const [bottomLeft] = uniqueDigits[8].filter(
      (digit) => ![top, topLeft, topRight, middle, bottomRight].includes(digit) && !uniqueDigits[5].includes(digit)
    );

    let signal: string = "";

    output.split(" ").forEach((digit) => {
      if (digit.length === 2) {
        signal += "1";
      } else if (digit.length === 3) {
        signal += "7";
      } else if (digit.length === 4) {
        signal += "4";
      } else if (digit.length === 7) {
        signal += "8";
      } else if (digit.length === 5) {
        if (digit.includes(topLeft)) {
          signal += "5";
        } else if (digit.includes(bottomLeft)) {
          signal += "2";
        } else {
          signal += "3";
        }
      } else if (digit.length === 6) {
        if (!digit.includes(middle)) {
          signal += "0";
        } else if (!digit.includes(topRight)) {
          signal += "6";
        } else {
          signal += "9";
        }
      }
    });

    return value + parseInt(signal, 10);
  }, 0);
};
