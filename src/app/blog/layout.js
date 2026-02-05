import styles from "./blog.module.css";

export default function BlogLayout({ children }) {
  return <div className={styles.page}>{children}</div>;
}
