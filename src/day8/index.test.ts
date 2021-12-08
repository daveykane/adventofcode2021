import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Eight", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 26", async () => {
      const example = (await getInput("day8", "example-input")).split("\n").map((line) => line.split(" | "));
      assertEquals(part1(example), 26);
    });

    Rhum.testCase("should get 412", async () => {
      const input = (await getInput("day8")).split("\n").map((line) => line.split(" | "));
      assertEquals(part1(input), 412);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 5353", () => {
      const example = [["acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab", "cdfeb fcadb cdfeb cdbaf"]];
      assertEquals(part2(example), 5353);
    });

    Rhum.testCase("should get 61229", async () => {
      const example = (await getInput("day8", "example-input")).split("\n").map((line) => line.split(" | "));
      assertEquals(part2(example), 61229);
    });

    Rhum.testCase("should get 978171", async () => {
      const input = (await getInput("day8")).split("\n").map((line) => line.split(" | "));
      assertEquals(part2(input), 978171);
    });
  });
});

Rhum.run();
