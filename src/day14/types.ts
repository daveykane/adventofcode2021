export type Polymer = {
  [pair: string]: number;
};

export type Rules = {
  [pair: string]: number;
};

export type Instructions = {
  firstElement: string;
  lastElement: string;
  polymer: Polymer;
  rules: Rules;
};
