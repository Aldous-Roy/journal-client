import { useState } from "react";
import axios from "axios";
import styles from "./JournalForm.module.css";

export default function JournalForm({ onAdd }) {
  const [user, setUser] = useState("");
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("user", user);
      formData.append("text", text);
      if (image) formData.append("image", image);

      const res = await axios.post(
        "http://localhost:3000/api/journal/add",
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
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
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
      {/* Styled label as button */}
      <label htmlFor="imageUpload" className={styles.fileLabel}>
        {image ? image.name : "Choose Image"}
      </label>
      <button type="submit" className={styles.button}>
        Add Note
      </button>
    </form>
  );
}
