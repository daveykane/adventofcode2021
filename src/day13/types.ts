export type Dot = number[];

export type Instruction = {
  dimension: 0 | 1;
  fold: number;
};

export type Origami = {
  dots: Array<Dot>;
  instructions: Array<Instruction>;
};
