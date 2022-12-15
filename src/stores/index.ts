import data from "../assets/data.json";

export type Segment = typeof data.segments[number];

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

  const items = segments.reduce<Item[]>((acc, { length, amount }) => {
    for (let i = 1; i <= Math.min(amount, itemLimit); i += 1) {
      acc.push({ weight: length, value: length });
    }

    return acc;
  }, []);

  itemLimit = Math.min(items.length, itemLimit);

  const table: [number, number, Item[]][][][] = [];

  for (let i = 0; i <= items.length; i += 1) {
    table[i] = [];

    for (let j = 0; j <= target; j += 1) {
      table[i][j] = [];

      for (let c = 0; c <= itemLimit; c += 1) {
        table[i][j][c] = [0, 0, []];
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
