import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Nine", () => {
  const processData = (data: string[]) => data.map((row) => row.split("").map(Number));
  const example = ["2199943210", "3987894921", "9856789892", "8767896789", "9899965678"];

  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 15", () => {
      assertEquals(part1(processData(example)), 15);
    });

    Rhum.testCase("should get 564", async () => {
      const input = (await getInput("day9")).split("\n");
      assertEquals(part1(processData(input)), 564);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 1134", () => {
      assertEquals(part2(processData(example)), 1134);
    });

    Rhum.testCase("should get 1038240", async () => {
      const input = (await getInput("day9")).split("\n");
      assertEquals(part2(processData(input)), 1038240);
    });
  });
});

Rhum.run();
