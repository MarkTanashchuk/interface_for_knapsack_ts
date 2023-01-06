import { solveKnapsack } from "../";

const mockSegments = [
  { length: 120, amount: 10 },
  { length: 140, amount: 15 },
  { length: 150, amount: 10 },
  { length: 175, amount: 20 },
  { length: 210, amount: 1 },
  { length: 230, amount: 6 },
  { length: 300, amount: 11 },
];

const MAX_TARGET = 3800;

describe("Knapsack", () => {
  const findClosestTo = (target: number, limit: number) =>
    solveKnapsack(mockSegments, target, limit);

  it("handles zero value", () => {
    const target = 0;
    const limit = 10;

    const { totalLength, combination } = findClosestTo(target, limit);

    expect(totalLength).toBe(target);
    expect(combination).toStrictEqual([]);
    expect(combination.length).toBeLessThanOrEqual(limit);
  });

  it("handles zero limit", () => {
    const target = MAX_TARGET;
    const limit = 0;

    const { totalLength, combination } = findClosestTo(target, limit);

    expect(totalLength).toBe(0);
    expect(combination).toStrictEqual([]);
    expect(combination.length).toBe(limit);
  });

  it("handles single value", () => {
    const target = 120;
    const limit = 1;

    const { totalLength, combination, segments } = findClosestTo(target, limit);

    expect(totalLength).toBe(target);
    expect(combination.length).toBe(limit);
    expect(segments).toStrictEqual([{ length: 120, amount: 1 }]);
  });

  it("handles two values", () => {
    const target = 240;
    const limit = 2;

    const { totalLength, combination, segments } = findClosestTo(target, limit);

    expect(totalLength).toBe(target);
    expect(combination.length).toBe(limit);
    expect(segments).toStrictEqual([{ length: 120, amount: 2 }]);
  });

  it("handles three values", () => {
    const target = 360;
    const limit = 3;

    const { totalLength, combination, segments } = findClosestTo(target, limit);

    expect(totalLength).toBe(target);
    expect(combination.length).toBe(limit);
    expect(segments).toStrictEqual([{ length: 120, amount: 3 }]);
  });

  it("handles four values", () => {
    const target = 600;
    const limit = 4;

    const { totalLength, combination, segments } = findClosestTo(target, limit);

    expect(segments).toStrictEqual([
      { length: 120, amount: 1 },
      { length: 140, amount: 1 },
      { length: 150, amount: 1 },
      { length: 175, amount: 1 },
    ]);
    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(totalLength).toBe(target);
  });

  it("handles small values", () => {
    const target = 12;
    const limit = 10;

    const { totalLength, combination, segments } = solveKnapsack(
      [
        { length: 1, amount: 2 },
        { length: 5, amount: 2 },
        { length: 20, amount: 5 },
      ],
      target,
      limit
    );

    expect(totalLength).toBe(target);
    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(segments).toStrictEqual([
      { length: 1, amount: 2 },
      { length: 5, amount: 2 },
    ]);
  });

  it("finds best combination with maximal amount of segment types", () => {
    const target = 1500;
    const limit = 10;

    const { totalLength, combination, segments } = findClosestTo(target, limit);

    expect(totalLength).toBe(target);
    expect(segments).toStrictEqual([
      { length: 120, amount: 4 },
      { length: 140, amount: 3 },
      { length: 150, amount: 2 },
      { length: 300, amount: 1 },
    ]);
    expect(combination.length).toBeLessThanOrEqual(limit);
  });

  it("finds max value", () => {
    const target = MAX_TARGET;
    const limit = 10;

    const { totalLength, combination, segments } = solveKnapsack(
      [...mockSegments, { length: 380, amount: 10 }],
      target,
      limit
    );

    expect(totalLength).toBe(target);
    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(segments).toStrictEqual([{ length: 380, amount: 10 }]);
  });

  it("finds closest to max value", () => {
    const target = MAX_TARGET;
    const limit = 10;

    const { totalLength, combination, segments } = findClosestTo(target, limit);

    expect(totalLength).toBeLessThanOrEqual(target);
    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(segments).toStrictEqual([{ length: 300, amount: 10 }]);
  });

  it("finds closest single value", () => {
    const target = 160;
    const limit = 1;

    const { totalLength, combination, segments } = findClosestTo(target, limit);

    expect(totalLength).toBeLessThanOrEqual(target);
    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(segments).toStrictEqual([{ length: 150, amount: 1 }]);
  });

  it("efficiently process large target", () => {
    const target = MAX_TARGET * 5;
    const limit = 10;

    const { totalLength, combination, segments } = findClosestTo(target, limit);

    expect(totalLength).toBeLessThanOrEqual(target);
    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(segments).toStrictEqual([{ length: 300, amount: 10 }]);
  });

  it("efficiently process large limit", () => {
    const target = MAX_TARGET;
    const limit = 10 * 5;

    const { totalLength, combination, segments } = findClosestTo(target, limit);

    const isCloseEnough = target / 10 >= target - totalLength;

    expect(isCloseEnough).toBe(true);
    expect(combination.length).toBeLessThanOrEqual(limit);
    expect(segments).toStrictEqual([
      { length: 120, amount: 5 },
      { length: 140, amount: 5 },
      { length: 150, amount: 5 },
      { length: 230, amount: 5 },
      { length: 300, amount: 2 },
    ]);
  });
});
