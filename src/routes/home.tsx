import { useState, useRef, useEffect, useCallback } from "react";

import data from "../assets/data.json";
import { ResponsiveWrapper } from "../features";
import Content from "../features/content/Content";
import Sidebar from "../features/sidebar/Sidebar";
import { solveKnapsack, Segment } from "../stores";

export function useDebounce<Func extends (...args: any[]) => void>(
  func: Func,
  delay = 1000
): Func {
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(
    () => () => {
      if (!timer.current) return;

      clearTimeout(timer.current);
    },
    []
  );

  return ((...args: any[]) => {
    const newTimer = setTimeout(() => func(...args), delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as Func;
}

const _updateSegments = (
  target: number,
  setTotalLength: (number: number) => void,
  setSegments: (segments: Segment[]) => void
) => {
  if (!target) return;

  const { totalLength, segments } = solveKnapsack(data.segments, target, 10);

  setTotalLength(totalLength);
  setSegments(segments);
};

export default function Home() {
  const [segments, setSegments] = useState<Segment[]>([]);

  const [target, setTarget] = useState(0);
  const [totalLength, setTotalLength] = useState(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateSegments = useCallback(useDebounce(_updateSegments, 50), []);
  useEffect(
    () => updateSegments(target, setTotalLength, setSegments),
    [target, updateSegments]
  );

  return (
    <ResponsiveWrapper>
      <Sidebar />
      <Content
        target={target}
        setTarget={setTarget}
        segments={segments}
        totalLength={totalLength}
      />
    </ResponsiveWrapper>
  );
}
