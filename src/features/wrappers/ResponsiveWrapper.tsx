import styles from "./index.module.scss";

export interface WrapperProps {
  children: React.ReactNode;
}

export default function Wrapper(props: WrapperProps) {
  return <div className={styles.wrapper}>{props.children}</div>;
}
