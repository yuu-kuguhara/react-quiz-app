import styles from './Display.module.css';

export default function Display({ children }) {
  return (
    <div className={styles.display}> {/* styles.display は、その中の .display クラスを参照 */}
        {children}
    </div>
  )
}
