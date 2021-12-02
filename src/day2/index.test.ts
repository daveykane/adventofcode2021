import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Two", () => {
  const example = ["forward 5", "down 5", "forward 8", "up 3", "down 8", "forward 2"];

  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 150", () => {
      assertEquals(part1(example), 150);
    });

    Rhum.testCase("should get 1690020", async () => {
      const input = (await getInput("day2")).split("\n");
      assertEquals(part1(input), 1690020);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 900", () => {
      assertEquals(part2(example), 900);
    });

    Rhum.testCase("should get 1408487760", async () => {
      const input = (await getInput("day2")).split("\n");
      assertEquals(part2(input), 1408487760);
    });
  });
});

Rhum.run();
