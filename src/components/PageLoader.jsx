import styles from "./PageLoader.module.css";

function PageLoader() {
  return (
    <div className={styles.overlay} aria-label="Loading page…" role="status">
      <div className={styles.spinner}>
        <div className={styles.ring} />
        <div className={styles.ring} />
        <div className={styles.ring} />
      </div>
      <p className={styles.label}>Loading…</p>
    </div>
  );
}

export default PageLoader;
