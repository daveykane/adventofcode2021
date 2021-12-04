import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";
import { Bingo, Line, LineNumber } from "./types.ts";

const { assertEquals } = Rhum.asserts;

const getGame = (input: string[]): Bingo => {
  const [numbers, ...boardCards] = input;
  const boards = boardCards.map((board) =>
    board.split("\n").map(
      (line): Line =>
        line
          .split(/\s+/)
          .filter(Boolean)
          .map((number): LineNumber => ({ number: parseInt(number, 10), marked: false }))
    )
  );

  return { numbers: numbers.split(",").map(Number), boards };
};

Rhum.testPlan("Advent of Code - Day Four", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 4512", async () => {
      const example = (await getInput("day4", "input-example")).split("\n\n");
      const { numbers, boards } = getGame(example);
      assertEquals(part1(numbers, boards), 4512);
    });

    Rhum.testCase("should get 35670", async () => {
      const input = (await getInput("day4")).split("\n\n");
      const { numbers, boards } = getGame(input);
      assertEquals(part1(numbers, boards), 35670);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 1924", async () => {
      const input = (await getInput("day4", "input-example")).split("\n\n");
      const { numbers, boards } = getGame(input);
      assertEquals(part2(numbers, boards), 1924);
    });

    Rhum.testCase("should get 22704", async () => {
      const input = (await getInput("day4")).split("\n\n");
      const { numbers, boards } = getGame(input);
      assertEquals(part2(numbers, boards), 22704);
    });
  });
});

Rhum.run();
