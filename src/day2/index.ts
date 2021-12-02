const plotCourse = (commands: string[], upDownMove = "depth") => {
  const position = { horizontal: 0, depth: 0, aim: 0 };

  return commands.reduce((final, command) => {
    let [direction, amount] = command.split(" ");
    const value = direction === "up" ? parseInt(`-${amount}`, 10) : parseInt(amount, 10);
    const key = direction === "forward" ? "horizontal" : (upDownMove as keyof typeof position);

    position[key] += value;
    if (direction === "forward" && upDownMove === "aim") position.depth += value * position.aim;

    return position.horizontal * position.depth;
  }, 0);
};

export const part1 = (commands: string[]) => plotCourse(commands);
export const part2 = (commands: string[]) => plotCourse(commands, "aim");
