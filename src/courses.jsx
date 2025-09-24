import React, { useState } from "react";

export default function CoursePage() {
  const [courses, setCourses] = useState([
    {
      id: 1,
      image: "https://upload.wikimedia.org/wikipedia/en/4/45/MongoDB-Logo.svg",
      name: "MongoDB",
      fees: 4000,
    },
    {
      id: 2,
      image: "https://via.placeholder.com/80x40?text=AI+Tools",
      name: "AI Crash Course",
      fees: 1500,
    },
    {
      id: 3,
      image: "https://via.placeholder.com/80x40?text=Typing",
      name: "English and Marathi Typing",
      fees: 4000,
    },
    {
      id: 4,
      image: "https://via.placeholder.com/80x40?text=CCNA",
      name: "CCNA Switching",
      fees: 5000,
    },
  ]);

  const handleDelete = (id) => {
    setCourses(courses.filter((c) => c.id !== id));
  };

  return (
    <div style={{ display: "flex", fontFamily: "Segoe UI, sans-serif", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside style={{ width: "220px", background: "#1f2937", color: "white", padding: "20px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "20px" }}>Dashboard</h2>
        <nav>
          <p>📘 Student Manager</p>
          <p>💰 Accounts</p>
          <p>🖨️ Printing</p>
          <p>⚙️ Master</p>
          <div style={{ marginLeft: "15px", marginTop: "5px" }}>• Course</div>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, background: "#f9fafb", padding: "20px" }}>
        <div
          style={{
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "15px" }}>📚 Courses</h3>

          {/* Top Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
            <button
              style={{
                background: "#2563eb",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "6px",
                cursor: "pointer",
              }}
            >
              + Add new course
            </button>

            <input
              type="text"
              placeholder="Search..."
              style={{
                padding: "8px",
                borderRadius: "6px",
                border: "1px solid #ddd",
                width: "200px",
              }}
            />
          </div>

          {/* Table */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
                <th style={thStyle}>Course Image</th>
                <th style={thStyle}>Course Name</th>
                <th style={thStyle}>Course Fees</th>
                <th style={thStyle}>Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={tdStyle}>
                    <img src={course.image} alt={course.name} width="80" />
                  </td>
                  <td style={tdStyle}>{course.name}</td>
                  <td style={tdStyle}>₹ {course.fees}</td>
                  <td style={tdStyle}>
                    <button style={iconBtn}>✏️</button>
                    <button style={iconBtn} onClick={() => handleDelete(course.id)}>
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

const thStyle = { padding: "12px", fontWeight: "600", borderBottom: "2px solid #ddd" };
const tdStyle = { padding: "12px" };
const iconBtn = {
  marginRight: "8px",
  border: "none",
  cursor: "pointer",
  background: "transparent",
  fontSize: "16px",
};