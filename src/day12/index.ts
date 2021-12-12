const getConnections = (map: string[][]) => {
  return map.reduce((connections: Record<string, string[]>, [from, to]) => {
    if (to !== "start" && from !== "end") {
      connections[from] = connections[from] ?? [];
      connections[from].push(to);
    }

    if (from !== "start" && to !== "end") {
      connections[to] = connections[to] ?? [];
      connections[to].push(from);
    }

    return connections;
  }, {});
};

const searchPaths = (connections: Record<string, string[]>, visitTwice = false) => {
  let paths = [["start"]];
  const validPaths = [];

  while (paths.length) {
    paths = paths.reduce((nextPaths: string[][], path) => {
      const cave = path[path.length - 1];

      connections[cave].forEach((nextCave) => {
        const nextPath = [...path, nextCave];

        if (nextCave === "end") {
          validPaths.push(nextCave);
          return;
        }

        const smallCaves = nextPath.filter((cave) => /[a-z]/.test(cave));
        const uniqueSmallCaves = new Set(smallCaves);

        if (smallCaves.length <= uniqueSmallCaves.size + Number(visitTwice)) {
          nextPaths.push(nextPath);
        }
      });

      return nextPaths;
    }, []);
  }

  return validPaths.length;
};

export const part1 = (map: string[][]) => searchPaths(getConnections(map));
export const part2 = (map: string[][]) => searchPaths(getConnections(map), true);
