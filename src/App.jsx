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
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#ff6b81",
          textShadow: "1px 1px 2px rgba(0,0,0,0.2)",
          marginBottom: "20px",
        }}
      >
        Couple Journal 💖
      </h1>

      {/* Navbar */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button
          onClick={() => setActiveTab("add")}
          style={{
            padding: "10px 20px",
            marginRight: "10px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeTab === "add" ? "#ff6b81" : "#eee",
            color: activeTab === "add" ? "#fff" : "#333",
            fontWeight: "bold",
          }}
        >
          Add Journal
        </button>
        <button
          onClick={() => setActiveTab("list")}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            backgroundColor: activeTab === "list" ? "#ff6b81" : "#eee",
            color: activeTab === "list" ? "#fff" : "#333",
            fontWeight: "bold",
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