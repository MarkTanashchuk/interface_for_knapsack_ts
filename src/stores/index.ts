export type Segment = typeof import("../assets/data.json").segments[number];

interface Combination {
  items: Item[];
  combination: Item[];
  segments: Segment[];
  totalValue: number;
  totalLength: number;
}

interface Item {
  weight: number;
  value: number;
}

export function solveKnapsack(
  segments: Segment[],
  target: number,
  itemLimit: number
): Combination {
  const bestCombination = solve(segments, target, itemLimit, itemLimit);

  let limitPerItem = 1;
  while (limitPerItem < itemLimit) {
    const combination = solve(segments, target, itemLimit, limitPerItem);

    if (combination.totalLength == bestCombination.totalLength) {
      return combination;
    }

    limitPerItem += 1;
  }

  return bestCombination;
}

// Returns the closest combination to `target` using smallest possible elements from `segments`
//
// # Examples
// ```
// const result = solveKnapsack([{ length: 200, amount: 5 }, { length: 100, amount: 2 }], 900, 10);
// ```
function solve(
  segments: Segment[],
  target: number,
  itemLimit: number,
  limitPerType: number
): Combination {
  segments.sort((a, b) => b.length - a.length);

  const items = segments.reduce<Item[]>((acc, { length, amount }) => {
    const limit = Math.min(limitPerType, Math.min(amount, itemLimit));
    for (let i = 1; i <= limit; i += 1) {
      acc.push({ weight: length, value: 1 });
    }

    return acc;
  }, []);

  itemLimit = Math.min(items.length, itemLimit);

  const cachedUnit: [number, number, Item[]] = [0, 0, []];
  const table: typeof cachedUnit[][][] = [];

  for (let i = 0; i <= items.length; i += 1) {
    table[i] = [];

    for (let w = 0; w <= target; w += 1) {
      table[i][w] = [];

      for (let c = 0; c <= itemLimit; c += 1) {
        table[i][w][c] = cachedUnit;
      }
    }
  }

  for (let i = 1; i <= items.length; i += 1) {
    const { weight, value } = items[i - 1];

    for (let w = 0; w <= target; w += 1) {
      for (let count = 1; count <= itemLimit; count += 1) {
        const prevValue = table[i - 1][w][count];

        if (weight > w) {
          table[i][w][count] = prevValue;
          continue;
        }

        const [oldValue, oldWeight, oldList] =
          table[i - 1][w - weight][count - 1];
        const new_value = oldValue + value;
        const new_weight = oldWeight + weight;

        if (new_value > prevValue[0]) {
          table[i][w][count] = [
            new_value,
            new_weight,
            [...oldList, { weight, value }],
          ];
        } else {
          table[i][w][count] = prevValue;
        }
      }
    }
  }

  const [totalValue, totalLength, combination] =
    table[items.length][target][itemLimit];

  return {
    items,
    combination,
    totalValue,
    totalLength,
    segments: Object.values(
      combination.reduce<Record<number, Segment>>((segments, item) => {
        segments[item.weight] = segments[item.weight] || {
          length: item.weight,
          amount: 0,
        };

        segments[item.weight].amount += 1;

        return segments;
      }, {})
    ),
  };
}
