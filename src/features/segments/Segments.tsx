import { nanoid } from "nanoid";

import { Segment } from "../../stores";

import styles from "./index.module.scss";

export interface SegmentsProps {
  segments: Readonly<Segment[]>;
}

export default function Segments({ segments: _segments }: SegmentsProps) {
  const segments = [..._segments];
  segments.sort((a, b) => a.length - b.length);

  if (segments.length > 0) {
    return (
      <div className={styles.segments}>
        {segments.map((item) => (
          <div key={nanoid()} className={styles.segment}>
            {item.amount} x {item.length}
          </div>
        ))}
      </div>
    );
  } else {
    return <div className={styles.segments}>No Items to show</div>;
  }
}
