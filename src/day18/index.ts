import SnailFishNode from "./SnailFishNode.ts";
import { SnailFishNumber } from "./type.ts";

const createTree = (depth: number, number: number | SnailFishNumber): SnailFishNode => {
  if (typeof number === "number") {
    return new SnailFishNode(depth, number);
  }

  const newDepth = depth + 1;
  const leftChild = createTree(newDepth, number[0]);
  const rightChild = createTree(newDepth, number[1]);
  const tree = new SnailFishNode(depth, null, leftChild, rightChild);

  leftChild.parent = tree;
  rightChild.parent = tree;

  return tree;
};

const addNumber = (tree: SnailFishNode, number: SnailFishNumber): SnailFishNode => {
  const rightTree = createTree(0, number);
  const newTree = new SnailFishNode(0, null, tree, rightTree);

  tree.parent = newTree;
  rightTree.parent = newTree;

  return createTree(0, newTree.print()).reduce();
};

const addNumbers = ([firstNumber, ...numbers]: SnailFishNumber[]): SnailFishNode => {
  return numbers.reduce((tree: SnailFishNode, number: SnailFishNumber) => {
    return addNumber(tree, number);
  }, createTree(0, firstNumber).reduce());
};

export const part1 = (numbers: SnailFishNumber[]) => addNumbers(numbers).magnitude();
export const part2 = (numbers: SnailFishNumber[]) => {
  const pairs = [];

  for (let i = 0; i < numbers.length; i++) {
    for (let j = 0; j < numbers.length; j++) {
      if (i !== j) {
        pairs.push([numbers[i], numbers[j]] as SnailFishNumber);
      }
    }
  }

  const trees = pairs.map((number) => createTree(0, number).reduce());
  return Math.max(...trees.map((tree) => tree.magnitude()));
};
