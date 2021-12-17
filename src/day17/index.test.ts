import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";
import { TargetArea } from "./types.ts";

const { assertEquals } = Rhum.asserts;
const processData = (data: string): TargetArea => {
  const { groups } = /target area: x=(?<x1>-?\d+)\.\.(?<x2>-?\d+), y=(?<y1>-?\d+)\.\.(?<y2>-?\d+)/g.exec(data) ?? {};
  return {
    minX: Number(groups?.x1),
    maxX: Number(groups?.x2),
    minY: Number(groups?.y1),
    maxY: Number(groups?.y2),
  };
};

Rhum.testPlan("Advent of Code - Day Seventeen", () => {
  const example = "target area: x=20..30, y=-10..-5";

  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 45", () => {
      assertEquals(part1(processData(example)), 45);
    });

    Rhum.testCase("should get 11781", async () => {
      const input = processData(await getInput("day17"));
      assertEquals(part1(input), 11781);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 112", () => {
      assertEquals(part2(processData(example)), 112);
    });

    Rhum.testCase("should get 4531", async () => {
      const input = processData(await getInput("day17"));
      assertEquals(part2(input), 4531);
    });
  });
});

Rhum.run();
