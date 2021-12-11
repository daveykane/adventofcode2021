import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;
const processData = (data: string[]) => data.map((row) => row.split("").map(Number));

Rhum.testPlan("Advent of Code - Day Eleven", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 9", async () => {
      const example = (await getInput("day11", "simple-input")).split("\n");
      assertEquals(part1(processData(example), 2), 9);
    });

    Rhum.testCase("should get 204", async () => {
      const example = (await getInput("day11", "example-input")).split("\n");
      assertEquals(part1(processData(example), 10), 204);
    });

    Rhum.testCase("should get 1656", async () => {
      const example = (await getInput("day11", "example-input")).split("\n");
      assertEquals(part1(processData(example), 100), 1656);
    });

    Rhum.testCase("should get 1747", async () => {
      const input = (await getInput("day11")).split("\n");
      assertEquals(part1(processData(input)), 1747);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 195", async () => {
      const example = (await getInput("day11", "example-input")).split("\n");
      assertEquals(part2(processData(example)), 195);
    });

    Rhum.testCase("should get 505", async () => {
      const input = (await getInput("day11")).split("\n");
      assertEquals(part2(processData(input)), 505);
    });
  });
});

Rhum.run();
