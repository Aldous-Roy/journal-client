import { useState } from "react";

export default function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px", backgroundColor: "#ffe6ee", padding: "20px", borderRadius: "16px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        style={{ padding: "12px", borderRadius: "12px", border: "1px solid #ffccd9", fontSize: "16px", outline: "none" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        style={{ padding: "12px", borderRadius: "12px", border: "1px solid #ffccd9", fontSize: "16px", outline: "none" }}
      />
      <button type="submit" style={{ padding: "12px", borderRadius: "12px", border: "none", backgroundColor: "#ff6b81", color: "#fff", fontWeight: "bold", fontSize: "16px", cursor: "pointer", transition: "all 0.3s" }}>
        Login
      </button>
    </form>
  );
}