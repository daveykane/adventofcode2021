import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";
import { Origami } from "./types.ts";

const { assertEquals } = Rhum.asserts;
const processData = (data: string): Origami => {
  const [dots, instructions] = data.split("\n\n");

  return {
    dots: dots.split("\n").map((dot) => dot.split(",").map(Number)),
    instructions: instructions.split("\n").map((instruction) => {
      const { groups = {} } = /fold along (?<dimension>[x|y])=(?<fold>\d+)/g.exec(instruction) ?? {};
      return { dimension: groups.dimension === "x" ? 0 : 1, fold: Number(groups.fold) };
    }),
  };
};

Rhum.testPlan("Advent of Code - Day Thirteen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 17", async () => {
      const { dots, instructions } = processData(await getInput("day13", "example-input"));
      const [firstInstruction] = instructions;
      assertEquals(part1({ dots, instructions: [firstInstruction] }), 17);
    });

    Rhum.testCase("should get 781", async () => {
      const { dots, instructions } = processData(await getInput("day13"));
      const [firstInstruction] = instructions;
      assertEquals(part1({ dots, instructions: [firstInstruction] }), 781);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 0", async () => {
      const data = processData(await getInput("day13", "example-input"));
      const output = `
#####
#...#
#...#
#...#
#####`;

      assertEquals(part2(data), output);
    });

    Rhum.testCase("should get PERCGJPB", async () => {
      const data = processData(await getInput("day13"));
      const output = `
###..####.###...##...##....##.###..###.
#..#.#....#..#.#..#.#..#....#.#..#.#..#
#..#.###..#..#.#....#.......#.#..#.###.
###..#....###..#....#.##....#.###..#..#
#....#....#.#..#..#.#..#.#..#.#....#..#
#....####.#..#..##...###..##..#....###.`;

      assertEquals(part2(data), output);
    });
  });
});

Rhum.run();
