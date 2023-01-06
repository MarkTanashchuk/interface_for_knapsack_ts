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
  segments.sort((a, b) => b.length - a.length);
  const approximateCombination = getApproximateCombination();

  if (
    approximateCombination.totalLength === target ||
    target / 10 >= target - approximateCombination.totalLength
  ) {
    return approximateCombination;
  }

  const bestCombination = getBestCombination();

  if (approximateCombination.totalLength >= bestCombination.totalLength) {
    return approximateCombination;
  }

  return bestCombination;

  function getBestCombination() {
    let combination: Combination = {
      items: [],
      combination: [],
      segments: [],
      totalValue: 0,
      totalLength: 0,
    };

    for (let limitPerItem = 1; limitPerItem <= itemLimit; limitPerItem += 1) {
      const items = segments.reduce<Item[]>((acc, { length, amount }) => {
        const limit = Math.min(limitPerItem, amount, itemLimit);
        for (let i = 1; i <= limit; i += 1) {
          acc.push({ weight: length, value: 1 });
        }

        return acc;
      }, []);

      const currentCombination = solve(items, target, itemLimit);

      if (currentCombination.totalLength > combination.totalLength) {
        combination = currentCombination;
      }

      if (combination.totalLength == target) {
        break;
      }
    }

    return combination;
  }

  function getApproximateCombination() {
    const maxAmount = segments.reduce(
      (maxAmount, { amount }) => Math.max(maxAmount, amount),
      0
    );
    const items = segments.reduce<Item[]>((acc, { length, amount }) => {
      const limit = Math.min(amount, itemLimit);

      const baseValue = maxAmount / amount / 1;
      let scalingValue = baseValue;
      for (let i = 1; i <= limit; i += 1) {
        scalingValue /= itemLimit;
        acc.push({ weight: length, value: baseValue + scalingValue });
      }

      return acc;
    }, []);

    return solve(items, target, itemLimit);
  }
}

// Returns the closest combination to `target` using smallest possible elements from `segments`
//
// # Examples
// ```
// const result = solveKnapsack([{ length: 200, amount: 5 }, { length: 100, amount: 2 }], 900, 10);
// ```
function solve(items: Item[], target: number, itemLimit: number): Combination {
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
