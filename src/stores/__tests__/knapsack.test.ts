import data from "../../assets/data.json";
import { solveKnapsack } from "../index";

const MAX_TARGET = 3800;

describe("Knapsack", () => {
  const findClosestTo = (target: number, limit: number) =>
    solveKnapsack(data.segments, target, limit);

  it("handles zero value", () => {
    const target = 0;
    const limit = 10;

    const { totalLength, combination } = findClosestTo(target, limit);

    expect(combination).toStrictEqual([]);
    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(totalLength).toBeLessThanOrEqual(target);
  });

  it("handles zero limit", () => {
    const target = MAX_TARGET;
    const limit = 0;

    const { totalLength, combination } = findClosestTo(target, limit);

    expect(combination).toStrictEqual([]);
    expect(combination.length).toBe(limit);
    expect(totalLength).toBeLessThanOrEqual(target);
  });

  it("handles single value", () => {
    const target = 150;
    const limit = 1;

    const { totalLength, combination } = findClosestTo(target, limit);

    expect(totalLength).toBeLessThanOrEqual(target);
    expect(combination).toStrictEqual([{ weight: 150, value: 150 }]);
    expect(combination.length).toBeLessThanOrEqual(limit);
  });

  it("handles two values", () => {
    const target = 240;
    const limit = 2;

    const { totalLength, combination } = findClosestTo(target, limit);

    expect(totalLength).toBeLessThanOrEqual(target);
    expect(combination).toStrictEqual([
      { weight: 120, value: 120 },
      { weight: 120, value: 120 },
    ]);
  });

  it("handles three values", () => {
    const target = 360;
    const limit = 3;

    const { totalLength, combination } = findClosestTo(target, limit);

    expect(totalLength).toBeLessThanOrEqual(target);
    expect(combination).toStrictEqual([
      { weight: 120, value: 120 },
      { weight: 120, value: 120 },
      { weight: 120, value: 120 },
    ]);
    expect(combination.length).toBeLessThanOrEqual(limit);
  });

  it("handles four values", () => {
    const target = 600;
    const limit = 4;

    const { totalLength, combination } = findClosestTo(target, limit);

    expect(combination).toStrictEqual([
      { weight: 300, value: 300 },
      { weight: 300, value: 300 },
    ]);
    expect(totalLength).toBeLessThanOrEqual(target);
    expect(combination.length).toBeLessThanOrEqual(limit);
  });

  it("handles small values", () => {
    const target = 12;
    const limit = 10;

    const small_knapsack = [
      { length: 1, amount: 2 },
      { length: 5, amount: 2 },
      { length: 20, amount: 5 },
    ];

    const { totalLength, combination } = solveKnapsack(
      small_knapsack,
      target,
      limit
    );

    expect(totalLength).toBeLessThanOrEqual(target);
    expect(combination).toStrictEqual([
      { weight: 5, value: 5 },
      { weight: 5, value: 5 },
      { weight: 1, value: 1 },
      { weight: 1, value: 1 },
    ]);
    expect(combination.length).toBeLessThanOrEqual(limit);
  });

  it("finds max value", () => {
    const target = MAX_TARGET;
    const limit = 10;

    const { totalLength, combination } = solveKnapsack(
      [...data.segments, { length: 380, amount: 10 }],
      target,
      limit
    );

    expect(totalLength).toBeLessThanOrEqual(target);
    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(combination).toStrictEqual([
      { weight: 380, value: 380 },
      { weight: 380, value: 380 },
      { weight: 380, value: 380 },
      { weight: 380, value: 380 },
      { weight: 380, value: 380 },
      { weight: 380, value: 380 },
      { weight: 380, value: 380 },
      { weight: 380, value: 380 },
      { weight: 380, value: 380 },
      { weight: 380, value: 380 },
    ]);
  });

  it("finds closest to max value", () => {
    const target = MAX_TARGET;
    const limit = 10;

    const { totalLength, combination } = findClosestTo(target, limit);

    expect(totalLength).toBeLessThanOrEqual(target);
    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(combination).toStrictEqual([
      { weight: 300, value: 300 },
      { weight: 300, value: 300 },
      { weight: 300, value: 300 },
      { weight: 230, value: 230 },
      { weight: 230, value: 230 },
      { weight: 230, value: 230 },
      { weight: 230, value: 230 },
      { weight: 230, value: 230 },
      { weight: 230, value: 230 },
      { weight: 150, value: 150 },
    ]);
  });

  it("finds closest single value", () => {
    const target = 160;
    const limit = 1;

    const { combination } = findClosestTo(target, limit);

    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(combination).toStrictEqual([{ weight: 150, value: 150 }]);
  });

  it("efficiently process large target", () => {
    const target = MAX_TARGET * 10;
    const limit = 10;

    const { totalLength, combination } = findClosestTo(target, limit);

    expect(totalLength).toBeLessThanOrEqual(target);
    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(combination).toStrictEqual([
      { weight: 300, value: 300 },
      { weight: 300, value: 300 },
      { weight: 300, value: 300 },
      { weight: 230, value: 230 },
      { weight: 230, value: 230 },
      { weight: 230, value: 230 },
      { weight: 230, value: 230 },
      { weight: 230, value: 230 },
      { weight: 230, value: 230 },
      { weight: 150, value: 150 },
    ]);
  });
});
