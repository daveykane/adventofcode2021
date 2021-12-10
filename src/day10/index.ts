const bracePairings = {
  ")": { match: "(", points: 3 },
  "]": { match: "[", points: 57 },
  "}": { match: "{", points: 1197 },
  ">": { match: "<", points: 25137 },
  "(": { match: ")", points: 1 },
  "[": { match: "]", points: 2 },
  "{": { match: "}", points: 3 },
  "<": { match: ">", points: 4 },
};

type BracePairingsKey = keyof typeof bracePairings;

const checkParenthesis = (line: string) => {
  const stack: string[] = [];

  for (let i = 0; i < line.length; i++) {
    const brace = line[i] as BracePairingsKey;

    if (["(", "[", "{", "<"].includes(brace)) {
      stack.push(brace);
    } else if (bracePairings[brace] && stack.pop() !== bracePairings[brace].match) {
      return { illegal: brace };
    }
  }

  return { incomplete: stack };
};

export const part1 = (lines: string[]) => {
  return lines.reduce((points, line) => {
    const { illegal } = checkParenthesis(line);

    if (illegal) {
      points += bracePairings[illegal].points;
    }

    return points;
  }, 0);
};

export const part2 = (lines: string[]) => {
  const scores = lines.reduce((allScores: number[], line) => {
    const { incomplete } = checkParenthesis(line);

    if (incomplete) {
      allScores.push(
        incomplete.reverse().reduce((total, brace) => total * 5 + bracePairings[brace as BracePairingsKey].points, 0)
      );
    }

    return allScores;
  }, []);

  return scores.sort((a, b) => a - b)[Math.floor(scores.length / 2)];
};
