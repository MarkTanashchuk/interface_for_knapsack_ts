import { Segment } from "../../stores";
import Segments from "../segments/Segments";

import styles from "./index.module.scss";

export interface ContentProps {
  target: number;
  setTarget: (number: number) => void;

  segments: Segment[];
  totalLength: number;
}

interface NumberInputProps {
  value?: number;
  setValue: (value: number) => void;
}

function NumberInput(props: NumberInputProps) {
  return (
    <input
      value={props.value}
      placeholder="0"
      onChange={(e) => props.setValue(Number(e.target.value))}
      type="number"
      className={styles.input}
    />
  );
}

export default function Content({
  target,
  setTarget,
  segments,
  totalLength,
}: ContentProps) {
  return (
    <div className={styles.content}>
      <NumberInput value={target} setValue={setTarget} />
      <Segments segments={segments} />
      <div className={styles.result}>Total Length: {totalLength}</div>
    </div>
  );
}
