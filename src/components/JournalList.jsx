import styles from "./JournalList.module.css";

export default function JournalList({ entries }) {
  return (
    <div className={styles.list}>
      {entries.map((entry) => (
        <div key={entry._id} className={styles.entry}>
          <h4>{entry.user}</h4>
          <p>{entry.text}</p>
          {entry.imageUrl && <img src={entry.imageUrl} alt="note" />}
          <small>{new Date(entry.date).toLocaleString()}</small>
        </div>
      ))}
    </div>
  );
}