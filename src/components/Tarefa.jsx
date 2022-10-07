import styles from "../styles/Home.module.css";

export default function Tarefa() {
  return (
    <>
      <input className={styles.card} />
      <textarea className={styles.card} />
      <div className={styles.button}>
        <button className={styles.card}>Incluir</button>
        <button className={styles.card}>Finalizar</button>
      </div>
    </>
  );
}
