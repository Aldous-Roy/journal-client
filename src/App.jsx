import { useEffect, useState } from "react";
import axios from "axios";
import JournalForm from "./components/JournalForm";
import JournalList from "./components/JournalList";
import LoginForm from "./components/LoginForm";
import RomanticLoader from "./components/RomanticLoader";

export default function App() {
  const [entries, setEntries] = useState([]);
  const [activeTab, setActiveTab] = useState("add");

  const [loading, setLoading] = useState(false); // 🩷 new loading state

  // Auth state
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [username, setUsername] = useState(
    localStorage.getItem("username") || ""
  );

  // Fetch journal entries
  const fetchEntries = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        "https://journal-server-86z8.onrender.com/api/journal/"
      );
      if (res.data.success) setEntries(res.data.entries);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add new journal entry
  const handleAdd = (entry) => {
    setEntries([entry, ...entries]);
    setActiveTab("list");
  };

  // Login handler
  const handleLogin = async (user, pass) => {
    try {
      setLoading(true);
      const res = await axios.post(
        "https://journal-server-86z8.onrender.com/api/auth/login",
        {
          username: user,
          password: pass,
        }
      );
      if (res.data.isAuthenticated) {
        setIsAuthenticated(true);
        setUsername(user);
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("username", user);
        await fetchEntries();
      } else {
        alert(res.data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.post("https://journal-server-86z8.onrender.com/api/auth/logout");
      setIsAuthenticated(false);
      setUsername("");
      setEntries([]);
      localStorage.removeItem("isAuthenticated");
      localStorage.removeItem("username");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch entries on app load if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      fetchEntries();
    }
  }, [isAuthenticated]);

  // 💖 show romantic loader while fetching
  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff0f6",
        }}
      >
        <RomanticLoader />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#fff0f6",
        minHeight: "100vh",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#ff6b81",
          textShadow: "1px 1px 4px rgba(0,0,0,0.2)",
          marginBottom: "20px",
        }}
      >
        💖 Couple Journal 💖
      </h1>

      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} />
      ) : (
        <>
          {/* Navbar */}
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
            <button
              onClick={handleLogout}
              style={{
                flex: "1 1 120px",
                padding: "10px 20px",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                backgroundColor: "#ff6b81",
                color: "#fff",
                fontWeight: "bold",
                transition: "all 0.3s",
              }}
            >
              Logout
            </button>
          </div>

          {/* Conditional content */}
          {activeTab === "add" ? (
            <JournalForm onAdd={handleAdd} />
          ) : (
            <JournalList entries={entries} />
          )}
        </>
      )}
    </div>
  );
}