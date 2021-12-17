import { Probe, TargetArea, Velocity } from "./types.ts";

const launchProbe = (probe: Probe, velocity: Velocity, { minX, maxX, minY, maxY }: TargetArea) => {
  let hitTarget = false;
  let highestPoint = 0;

  while (probe.x <= maxX && probe.y >= minY) {
    probe.x += velocity.x;
    probe.y += velocity.y;
    highestPoint = Math.max(highestPoint, probe.y);

    if (probe.x >= minX && probe.x <= maxX && probe.y >= minY && probe.y <= maxY) {
      hitTarget = true;
      break;
    }

    velocity.x += velocity.x === 0 ? 0 : velocity.x < 0 ? 1 : -1;
    velocity.y -= 1;
  }

  return { hitTarget, highestPoint };
};

export const part1 = (targetArea: TargetArea) => {
  let highest = 0;

  for (let y = -200; y <= 200; y++) {
    for (let x = -200; x <= 200; x++) {
      const { hitTarget, highestPoint } = launchProbe({ x: 0, y: 0 }, { x, y }, targetArea);

      if (hitTarget) highest = Math.max(highest, highestPoint);
    }
  }

  return highest;
};

export const part2 = (targetArea: TargetArea) => {
  const velocities: Set<string> = new Set();

  for (let y = -200; y <= 200; y++) {
    for (let x = -200; x <= 200; x++) {
      const { hitTarget } = launchProbe({ x: 0, y: 0 }, { x, y }, targetArea);

      if (hitTarget) velocities.add(`x${x}y${y}`);
    }
  }

  return velocities.size;
};
