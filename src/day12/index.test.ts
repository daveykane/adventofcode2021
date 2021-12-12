import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;
const processData = (data: string) => data.split("\n").map((line) => line.split("-"));

Rhum.testPlan("Advent of Code - Day Twelve", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 10", async () => {
      const example = await getInput("day12", "simple-input");
      assertEquals(part1(processData(example)), 10);
    });

    Rhum.testCase("should get 19", async () => {
      const example = await getInput("day12", "example-input-1");
      assertEquals(part1(processData(example)), 19);
    });

    Rhum.testCase("should get 226", async () => {
      const example = await getInput("day12", "example-input-2");
      assertEquals(part1(processData(example)), 226);
    });

    Rhum.testCase("should get 4378", async () => {
      const input = await getInput("day12");
      assertEquals(part1(processData(input)), 4378);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 36", async () => {
      const example = await getInput("day12", "simple-input");
      assertEquals(part2(processData(example)), 36);
    });

    Rhum.testCase("should get 103", async () => {
      const example = await getInput("day12", "example-input-1");
      assertEquals(part2(processData(example)), 103);
    });

    Rhum.testCase("should get 3509", async () => {
      const example = await getInput("day12", "example-input-2");
      assertEquals(part2(processData(example)), 3509);
    });

    Rhum.testCase("should get 133621", async () => {
      const input = await getInput("day12");
      assertEquals(part2(processData(input)), 133621);
    });
  });
});

Rhum.run();
