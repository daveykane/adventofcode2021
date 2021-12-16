import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";
import { Grid } from "./type.ts";

const { assertEquals } = Rhum.asserts;
const processData = (data: string): Grid => data.split("\n").map((line) => line.split("").map(Number));

Rhum.testPlan("Advent of Code - Day Fifteen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 7", async () => {
      const example = processData(await getInput("day15", "simple-input"));
      assertEquals(part1(example), 7);
    });

    Rhum.testCase("should get 40", async () => {
      const example = processData(await getInput("day15", "example-input"));
      assertEquals(part1(example), 40);
    });

    Rhum.testCase("should get 472", async () => {
      const input = processData(await getInput("day15"));
      assertEquals(part1(input), 472);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 315", async () => {
      const example = processData(await getInput("day15", "example-input"));
      assertEquals(part2(example), 315);
    });

    Rhum.testCase("should get 2851", async () => {
      const input = processData(await getInput("day15"));
      assertEquals(part2(input), 2851);
    });
  });
});

Rhum.run();
