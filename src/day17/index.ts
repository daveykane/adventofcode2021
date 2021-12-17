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

const testProbe = (targetArea: TargetArea) => {
  let highestY = 0;
  const velocities: Set<string> = new Set();

  for (let y = -200; y <= 200; y++) {
    for (let x = -200; x <= 200; x++) {
      const { hitTarget, highestPoint } = launchProbe({ x: 0, y: 0 }, { x, y }, targetArea);

      if (hitTarget) {
        highestY = Math.max(highestY, highestPoint);
        velocities.add(`x${x}y${y}`);
      }
    }
  }

  return { highestY, velocities };
};

export const part1 = (targetArea: TargetArea) => testProbe(targetArea).highestY;
export const part2 = (targetArea: TargetArea) => testProbe(targetArea).velocities.size;
