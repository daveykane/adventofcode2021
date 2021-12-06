import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Six", () => {
  const example = [3, 4, 3, 1, 2];

  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should be 26 fish after 18 days", () => {
      assertEquals(part1(example, 18), 26);
    });

    Rhum.testCase("should be 5934 fish after 80 days", () => {
      assertEquals(part1(example, 80), 5934);
    });

    Rhum.testCase("should get 346063", async () => {
      const input = (await getInput("day6")).split(",").map(Number);
      assertEquals(part1(input, 80), 346063);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should be 26984457539 fish after 256 days", () => {
      assertEquals(part2(example, 256), 26984457539);
    });

    Rhum.testCase("should get 1572358335990", async () => {
      const input = (await getInput("day6")).split(",").map(Number);
      assertEquals(part2(input, 256), 1572358335990);
    });
  });
});

Rhum.run();
