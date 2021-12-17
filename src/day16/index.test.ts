import { Rhum } from "https://deno.land/x/rhum@v1.1.12/mod.ts";
import { part1, part2 } from "./index.ts";
import { getInput } from "../utils/index.ts";

const { assertEquals } = Rhum.asserts;

Rhum.testPlan("Advent of Code - Day Sixteen", () => {
  Rhum.testSuite("Part One", () => {
    Rhum.testCase("should get 6", () => {
      assertEquals(part1("D2FE28".split("")), 6);
    });

    Rhum.testCase("should get 9", () => {
      assertEquals(part1("38006F45291200".split("")), 9);
    });

    Rhum.testCase("should get 14", () => {
      assertEquals(part1("EE00D40C823060".split("")), 14);
    });

    Rhum.testCase("should get 16", () => {
      assertEquals(part1("8A004A801A8002F478".split("")), 16);
    });

    Rhum.testCase("should get 12", () => {
      assertEquals(part1("620080001611562C8802118E34".split("")), 12);
    });

    Rhum.testCase("should get 23", () => {
      assertEquals(part1("C0015000016115A2E0802F182340".split("")), 23);
    });

    Rhum.testCase("should get 31", () => {
      assertEquals(part1("A0016C880162017C3686B18A3D4780".split("")), 31);
    });

    Rhum.testCase("should get 981", async () => {
      const input = (await getInput("day16")).split("");
      assertEquals(part1(input), 981);
    });
  });

  Rhum.testSuite("Part Two", () => {
    Rhum.testCase("should get 3", () => {
      assertEquals(part2("C200B40A82".split("")), 3);
    });

    Rhum.testCase("should get 54", () => {
      assertEquals(part2("04005AC33890".split("")), 54);
    });

    Rhum.testCase("should get 7", () => {
      assertEquals(part2("880086C3E88112".split("")), 7);
    });

    Rhum.testCase("should get 9", () => {
      assertEquals(part2("CE00C43D881120".split("")), 9);
    });

    Rhum.testCase("should get 1", () => {
      assertEquals(part2("D8005AC2A8F0".split("")), 1);
    });

    Rhum.testCase("should get 0", () => {
      assertEquals(part2("F600BC2D8F".split("")), 0);
    });

    Rhum.testCase("should get 0", () => {
      assertEquals(part2("9C005AC2F8F0".split("")), 0);
    });

    Rhum.testCase("should get 1", () => {
      assertEquals(part2("9C0141080250320F1802104A08".split("")), 1);
    });

    Rhum.testCase("should get 299227024091", async () => {
      const input = (await getInput("day16")).split("");
      assertEquals(part2(input), 299227024091);
    });
  });
});

Rhum.run();
