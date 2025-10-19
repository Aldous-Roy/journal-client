import { useEffect, useState } from "react";
import axios from "axios";
import JournalForm from "./components/JournalForm";
import JournalList from "./components/JournalList";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState("add"); // "add" or "list"

  const fetchEntries = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/journal/");
      if (res.data.success) setEntries(res.data.entries);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  const handleAdd = (entry) => {
    setEntries([entry, ...entries]);
    setActiveTab("list"); // switch to list after adding
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#fff0f6",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#ff6b81",
          textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
          marginBottom: "20px",
        }}
      >
        Couple Journal 💖
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <button
          onClick={() => setActiveTab("add")}
          style={{
            flex: "1 1 120px",
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeTab === "add" ? "#ff9bb5" : "#ffe6ee",
            color: activeTab === "add" ? "#fff" : "#ff6b81",
            fontWeight: "bold",
            transition: "all 0.3s",
          }}
        >
          Add Journal
        </button>
        <button
          onClick={() => setActiveTab("list")}
          style={{
            flex: "1 1 120px",
            padding: "10px 20px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeTab === "list" ? "#ff9bb5" : "#ffe6ee",
            color: activeTab === "list" ? "#fff" : "#ff6b81",
            fontWeight: "bold",
            transition: "all 0.3s",
          }}
        >
          View Journals
        </button>
      </div>

      {/* Conditional rendering */}
      {activeTab === "add" ? (
        <JournalForm onAdd={handleAdd} />
      ) : (
        <JournalList entries={entries} />
      )}
    </div>
  );
}