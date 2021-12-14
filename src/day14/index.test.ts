import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";
import { Instructions } from "./types.ts";

const { assertEquals } = Rhum.asserts;
const processData = (data: string): Instructions => {
  const [template, rules] = data.split("\n\n");
  return {
    firstElement: template[0],
    lastElement: template[template.length - 1],
    polymer: template.split("").reduce((polymer: Record<string, number>, element, index) => {
      if (index === template.length - 1) return polymer;
      const pair = `${element}${template[index + 1]}`;
      return { ...polymer, [pair]: (polymer[pair] ?? 0) + 1 };
    }, {}),
    rules: rules.split("\n").reduce((map, rule) => {
      const [pair, element] = rule.split(" -> ");
      return { ...map, [pair]: element };
    }, {}),
  };
};

Rhum.testPlan("Advent of Code - Day Fourteen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 1588", async () => {
      const data = processData(await getInput("day14", "example-input"));
      assertEquals(part1(data), 1588);
    });

    Rhum.testCase("should get 4517", async () => {
      const data = processData(await getInput("day14"));
      assertEquals(part1(data), 4517);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 2188189693529", async () => {
      const data = processData(await getInput("day14", "example-input"));
      assertEquals(part2(data), 2188189693529);
    });
    Rhum.testCase("should get 4704817645083", async () => {
      const data = processData(await getInput("day14"));
      assertEquals(part2(data), 4704817645083);
    });
  });
});

Rhum.run();
