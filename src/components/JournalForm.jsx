import { useState } from "react";
import axios from "axios";
import styles from "./JournalForm.module.css";
import RomanticLoader from "./RomanticLoader";

export default function JournalForm({ onAdd }) {
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("user", user);
      formData.append("text", text);
      if (image) formData.append("image", image);

      const res = await axios.post(
        "https://journal-server-86z8.onrender.com/api/journal/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        onAdd(res.data.entry);
        setUser("");
        setText("");
        setImage(null);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {loading ? (
        <RomanticLoader />
      ) : (
        <>
          <input
            type="text"
            placeholder="Your Name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
            className={styles.input}
          />
          <textarea
            placeholder="Write something..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className={styles.textarea}
          />
          <input
            type="file"
            accept="image/*"
            id="imageUpload"
            onChange={(e) => setImage(e.target.files[0])}
            className={styles.fileInput}
          />
          <label htmlFor="imageUpload" className={styles.fileLabel}>
            {image ? image.name : "Choose Image"}
          </label>
          <button type="submit" className={styles.button}>
            Add Note
          </button>
        </>
      )}
    </form>
  );
}