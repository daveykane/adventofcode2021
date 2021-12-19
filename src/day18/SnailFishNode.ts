import { SnailFishNumber } from "./type.ts";

export default class SnailFishNode {
  depth: number;
  value: number | null;
  left: SnailFishNode | null;
  right: SnailFishNode | null;
  parent: SnailFishNode | null;

  constructor(
    depth: number,
    value?: number | null,
    left?: SnailFishNode | null,
    right?: SnailFishNode | null,
    parent?: SnailFishNode | null
  ) {
    this.depth = depth;
    this.value = typeof value !== "undefined" ? value : null;
    this.left = typeof left !== "undefined" ? left : null;
    this.right = typeof right !== "undefined" ? right : null;
    this.parent = typeof parent !== "undefined" ? parent : null;
  }

  magnitude(): number {
    return this.value !== null ? this.value : (this.left?.magnitude() ?? 1) * 3 + (this.right?.magnitude() ?? 1) * 2;
  }

  reduce() {
    let reduced = false;

    while (!reduced) {
      const toExplode = this.nextToExplode();
      const toSplit = this.nextToSplit();

      if (toExplode !== null) {
        toExplode.explode();
      } else if (toSplit !== null) {
        toSplit.split();
      } else {
        reduced = true;
      }
    }

    return this;
  }

  print(): number | SnailFishNumber {
    return this.value !== null
      ? this.value
      : [this.left?.print() as SnailFishNumber, this.right?.print() as SnailFishNumber];
  }

  nextToSplit(): SnailFishNode | null {
    if (this.value === null) {
      const leftSplit = this.left?.nextToSplit() ?? null;
      if (leftSplit !== null) return leftSplit;

      const rightSplit = this.right?.nextToSplit() ?? null;
      if (rightSplit !== null) return rightSplit;
    } else if (this.value >= 10) {
      return this;
    }

    return null;
  }

  rightValue(): SnailFishNode {
    return this.value !== null ? this : (this.right as SnailFishNode).rightValue();
  }

  leftValue(): SnailFishNode {
    return this.value !== null ? this : (this.left as SnailFishNode).leftValue();
  }

  firstLeft(): SnailFishNode | null {
    if (!this.parent || !this.parent.left) {
      return null;
    }

    return this.parent.left !== this ? this.parent.left.rightValue() : this.parent.firstLeft();
  }

  firstRight(): SnailFishNode | null {
    if (!this.parent || !this.parent.right) {
      return null;
    }

    return this.parent.right !== this ? this.parent.right.leftValue() : this.parent.firstRight();
  }

  nextToExplode(): SnailFishNode | null {
    if (this.value !== null) return null;
    if (this.depth === 4) return this;

    if (this.left && this.right) {
      const leftExplode = this.left.nextToExplode();
      if (leftExplode !== null && leftExplode.value === null) return leftExplode;

      const rightExplode = this.right.nextToExplode();
      if (rightExplode !== null && rightExplode.value === null) return rightExplode;
    }

    return null;
  }

  explode() {
    const firstLeft = this.firstLeft();
    const firstRight = this.firstRight();

    if (typeof firstLeft?.value === "number" && typeof this.left?.value === "number") {
      firstLeft.value += this.left.value;
    }

    if (typeof firstRight?.value === "number" && typeof this.right?.value === "number") {
      firstRight.value += this.right.value;
    }

    this.left = null;
    this.right = null;
    this.value = 0;
  }

  split() {
    if (this.value) {
      const newDepth = this.depth + 1;
      const newLeft = new SnailFishNode(newDepth, Math.floor(this.value / 2), null, null, this);
      const newRight = new SnailFishNode(newDepth, Math.ceil(this.value / 2), null, null, this);

      this.left = newLeft;
      this.right = newRight;
      this.value = null;
    }
  }
}
