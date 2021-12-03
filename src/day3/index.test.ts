import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Three", () => {
  const example = [
    "00100",
    "11110",
    "10110",
    "10111",
    "10101",
    "01111",
    "00111",
    "11100",
    "10000",
    "11001",
    "00010",
    "01010",
  ];

  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 198", () => {
      assertEquals(part1(example), 198);
    });

    Rhum.testCase("should get 3882564", async () => {
      const input = (await getInput("day3")).split("\n");
      assertEquals(part1(input), 3882564);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 230", () => {
      assertEquals(part2(example), 230);
    });

    Rhum.testCase("should get 3385170", async () => {
      const input = (await getInput("day3")).split("\n");
      assertEquals(part2(input), 3385170);
    });
  });
});

Rhum.run();
