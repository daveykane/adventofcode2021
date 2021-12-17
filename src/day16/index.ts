import { Tracker } from "./type.ts";

const HEADER_VALUE_LENGTH = 3;
const LITERAL_VALUE_LENGTH = 4;
const LENGTH_TYPE_ID_LENGTH = 15;
const NUM_OF_PACKETS_LENGTH = 11;
const LETTERS = ["A", "B", "C", "D", "E", "F"];

const getIndex = (char: string): number => (LETTERS.includes(char) ? 10 + LETTERS.indexOf(char) : parseInt(char, 10));
const getIntValue = (binary: string): number => parseInt(binary, 2);

const getBinary = (transmission: string[]): string => {
  return transmission.map((char) => (getIndex(char) >>> 0).toString(2).padStart(4, "0")).join("");
};

const getHeader = (binary: string, tracker: Tracker) => {
  const version = getIntValue(binary.slice(tracker.pointer, tracker.pointer + HEADER_VALUE_LENGTH));
  tracker.pointer += HEADER_VALUE_LENGTH;

  const typeId = getIntValue(binary.slice(tracker.pointer, tracker.pointer + HEADER_VALUE_LENGTH));
  tracker.pointer += HEADER_VALUE_LENGTH;

  return { version, typeId };
};

const getLiteralValue = (binary: string, tracker: Tracker) => {
  let processed = false;
  let literalValueBinary = "";

  while (!processed) {
    if (binary[tracker.pointer] === "0") processed = true;
    tracker.pointer++;
    literalValueBinary += binary.slice(tracker.pointer, tracker.pointer + LITERAL_VALUE_LENGTH);
    tracker.pointer += LITERAL_VALUE_LENGTH;
  }

  return getIntValue(literalValueBinary);
};

const processPacket = (binary: string, tracker: Tracker, getVersionSum = false) => {
  const values: number[] = [];
  const { version, typeId } = getHeader(binary, tracker);

  tracker.sum += version;

  if (typeId === 4) {
    values.push(getLiteralValue(binary, tracker));
  } else {
    const subPacketValues: number[] = [];

    if (binary[tracker.pointer] === "0") {
      tracker.pointer++;
      const subPacketsLength = getIntValue(binary.slice(tracker.pointer, tracker.pointer + LENGTH_TYPE_ID_LENGTH));

      tracker.pointer += LENGTH_TYPE_ID_LENGTH;
      const endPointer = tracker.pointer + subPacketsLength;

      while (tracker.pointer < endPointer) {
        subPacketValues.push(processPacket(binary, tracker));
      }
    } else {
      tracker.pointer++;
      const numSubPackets = getIntValue(binary.slice(tracker.pointer, tracker.pointer + NUM_OF_PACKETS_LENGTH));
      tracker.pointer += NUM_OF_PACKETS_LENGTH;

      for (let i = 0; i < numSubPackets; i++) {
        subPacketValues.push(processPacket(binary, tracker));
      }
    }

    if (typeId === 0) {
      values.push(subPacketValues.reduce((total, value) => total + value, 0));
    } else if (typeId === 1) {
      values.push(subPacketValues.reduce((total, value) => total * value, 1));
    } else if (typeId === 2) {
      values.push(Math.min(...subPacketValues));
    } else if (typeId === 3) {
      values.push(Math.max(...subPacketValues));
    } else if (typeId === 5) {
      values.push(Number(subPacketValues[0] > subPacketValues[1]));
    } else if (typeId === 6) {
      values.push(Number(subPacketValues[0] < subPacketValues[1]));
    } else if (typeId === 7) {
      values.push(Number(subPacketValues[0] === subPacketValues[1]));
    }
  }

  return getVersionSum ? tracker.sum : values.reduce((total, value) => total + value, 0);
};

export const part1 = (transmission: string[]) => processPacket(getBinary(transmission), { pointer: 0, sum: 0 }, true);
export const part2 = (transmission: string[]) => processPacket(getBinary(transmission), { pointer: 0, sum: 0 });
