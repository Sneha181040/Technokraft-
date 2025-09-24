import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [openMenu, setOpenMenu] = useState(null);
  const [selectedPage, setSelectedPage] = useState("Home");
  const navigate = useNavigate();

  const menuGroups = [
    { id: "student", title: "Student Management", icon: "📘", items: ["Student", "Enquiry", "Admission"] },
    { id: "accounts", title: "Accounts", icon: "💰", items: ["Accounts", "Fees", "Receipt", "Expense", "Cheques"] },
    { id: "printing", title: "Printing & Certificates", icon: "🖨️", items: ["Printing", "Certificate"] },
    { id: "master", title: "Master", icon: "⚙️", items: ["Course"] },
  ];

  const toggle = (id) => setOpenMenu(openMenu === id ? null : id);

  const renderContent = () => {
    if (selectedPage === "Home") {
      return (
        <div>
          <h1 style={{ fontSize: "22px", marginBottom: "8px" }}>Welcome to Dashboard</h1>
          <p style={{ color: "#6b7280" }}>Select a module</p>
        </div>
      );
    }
    return (
      <div>
        <h2 style={{ fontSize: "20px", margin: "0 0 6px" }}>{selectedPage}</h2>
        <p style={{ color: "#6b7280" }}>
          This is a placeholder area for <b>{selectedPage}</b>. Build forms, tables, or charts here.
        </p>
      </div>
    );
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Segoe UI, sans-serif", background: "#f5f7fb" }}>
      <aside style={{ width: "260px", background: "#1a202c", color: "#e6eef8", padding: "20px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div style={{ display: "flex", gap: "12px", alignItems: "center", marginBottom: "25px" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "8px", background: "#2d3748", display: "flex", alignItems: "center", justifyContent: "center" }}>🎓</div>
            <div>
              <div style={{ fontWeight: 700 }}>Institute Panel</div>
              <div style={{ fontSize: "12px", color: "#a6b3c7" }}>Admin</div>
            </div>
          </div>

          {menuGroups.map((g) => (
            <div key={g.id} style={{ marginBottom: "12px" }}>
              <button onClick={() => toggle(g.id)} style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: openMenu === g.id ? "#2d3748" : "#2a2f3a", borderRadius: "8px", border: "none", color: "inherit", cursor: "pointer", fontWeight: "500" }}>
                <span>{g.icon} {g.title}</span>
                <span>{openMenu === g.id ? "▾" : "▸"}</span>
              </button>
              {openMenu === g.id && (
                <div style={{ marginTop: "6px", paddingLeft: "10px" }}>
                  {g.items.map((it) => (
                    <button key={it} onClick={() => setSelectedPage(it)} style={{ display: "block", width: "100%", textAlign: "left", padding: "8px 10px", borderRadius: "6px", border: "none", marginBottom: "4px", cursor: "pointer", background: selectedPage === it ? "linear-gradient(90deg,#0ea5a4,#3b82f6)" : "transparent", color: selectedPage === it ? "white" : "#cbd5e0", fontWeight: selectedPage === it ? "600" : "400" }}>{it}</button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={() => navigate("/login")} style={{ marginTop: "20px", padding: "10px", borderRadius: "8px", border: "none", background: "#ef4444", color: "white", cursor: "pointer" }}>
          Logout
        </button>
      </aside>

      <main style={{ flex: 1, padding: "26px" }}>
        <div style={{ background: "white", padding: "22px", borderRadius: "10px", boxShadow: "0 4px 12px rgba(0,0,0,0.08)", height: "100%" }}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
