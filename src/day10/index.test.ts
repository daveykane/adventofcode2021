import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Ten", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 26397", async () => {
      const example = (await getInput("day10", "example-input")).split("\n");
      assertEquals(part1(example), 26397);
    });

    Rhum.testCase("should get 399153", async () => {
      const input = (await getInput("day10")).split("\n");
      assertEquals(part1(input), 399153);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 288957", async () => {
      const example = (await getInput("day10", "example-input")).split("\n");
      assertEquals(part2(example), 288957);
    });

    Rhum.testCase("should get 2995077699", async () => {
      const input = (await getInput("day10")).split("\n");
      assertEquals(part2(input), 2995077699);
    });
  });
});

Rhum.run();
