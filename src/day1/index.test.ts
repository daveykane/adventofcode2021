import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day One", () => {
  const example = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];

  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 7", () => {
      assertEquals(part1(example), 7);
    });

    Rhum.testCase("should get 1832", async () => {
      const input = (await getInput("day1")).split("\n").map(Number);
      assertEquals(part1(input), 1832);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 5", () => {
      assertEquals(part2(example), 5);
    });

    Rhum.testCase("should get 1858", async () => {
      const input = (await getInput("day1")).split("\n").map(Number);
      assertEquals(part2(input), 1858);
    });
  });
});

Rhum.run();
