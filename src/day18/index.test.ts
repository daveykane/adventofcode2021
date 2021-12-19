import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;
const processData = (data: string) => data.split("\n").map((number) => JSON.parse(number));

Rhum.testPlan("Advent of Code - Day Eighteen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 4140", async () => {
      const example = processData(await getInput("day18", "example-input"));
      assertEquals(part1(example), 4140);
    });

    Rhum.testCase("should get 4111", async () => {
      const input = processData(await getInput("day18"));
      assertEquals(part1(input), 4111);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 3993", async () => {
      const example = processData(await getInput("day18", "example-input"));
      assertEquals(part2(example), 3993);
    });

    Rhum.testCase("should get 4917", async () => {
      const input = processData(await getInput("day18"));
      assertEquals(part2(input), 4917);
    });
  });
});

Rhum.run();
