import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Seven", () => {
  const example = [16, 1, 2, 0, 4, 2, 7, 1, 2, 14];

  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 37", () => {
      assertEquals(part1(example), 37);
    });

    Rhum.testCase("should get 356958", async () => {
      const input = (await getInput("day7")).split(",").map(Number);
      assertEquals(part1(input), 356958);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 168", () => {
      assertEquals(part2(example), 168);
    });

    Rhum.testCase("should get 105461913", async () => {
      const input = (await getInput("day7")).split(",").map(Number);
      assertEquals(part2(input), 105461913);
    });
  });
});

Rhum.run();
