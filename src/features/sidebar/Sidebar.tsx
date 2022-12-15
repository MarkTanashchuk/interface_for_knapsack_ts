import data from "../../assets/data.json";
import Segments from "../segments/Segments";

import styles from "./index.module.scss";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Segments segments={data.segments} />
    </div>
  );
}
