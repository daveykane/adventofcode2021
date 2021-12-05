import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

const processData = (lines: string[]): number[][][] => {
  return lines.map((line) => line.split(" -> ").map((coordinates) => coordinates.split(",").map(Number)));
};

Rhum.testPlan("Advent of Code - Day Five", () => {
  const example = processData([
    "0,9 -> 5,9",
    "8,0 -> 0,8",
    "9,4 -> 3,4",
    "2,2 -> 2,1",
    "7,0 -> 7,4",
    "6,4 -> 2,0",
    "0,9 -> 2,9",
    "3,4 -> 1,4",
    "0,0 -> 8,8",
    "5,5 -> 8,2",
  ]);

  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 5", () => {
      assertEquals(part1(example), 5);
    });

    Rhum.testCase("should get 5774", async () => {
      const input = (await getInput("day5")).split("\n");
      assertEquals(part1(processData(input)), 5774);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 12", () => {
      assertEquals(part2(example), 12);
    });

    Rhum.testCase("should get 18423", async () => {
      const input = (await getInput("day5")).split("\n");
      assertEquals(part2(processData(input)), 18423);
    });
  });
});

Rhum.run();
