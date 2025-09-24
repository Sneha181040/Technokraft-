import React, { useState } from "react";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ✅ Email & Password Validation
  const validate = () => {
    const err = {};
    if (!email) {
      err.email = "Email is required";
    } else if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      err.email = "Enter a valid email";
    }

    if (!password) {
      err.password = "Password is required";
    } else if (password.length < 6) {
      err.password = "Minimum 6 characters";
    }
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setLoading(false);
        alert(`Welcome!\nEmail: ${email}`);
        setEmail("");     // clear email
        setPassword("");  // clear password
      }, 1200);
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }
        html, body, #root { margin: 0; height: 100%; font-family: 'Segoe UI', sans-serif; }
        body { background: #f4f4f9; }

        .page {
          display: flex;
          height: 100vh;
        }

        /* Left login section */
        .left {
          flex: 1;
          max-width: 480px;
          background: #fff;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 40px 30px;
          box-shadow: 2px 0 10px rgba(0, 0, 0, 0.08);
        }

        .card {
          width: 100%;
          max-width: 340px;
        }

        .logo {
          display: block;
          margin: 0 auto 20px;
          height: 60px;
        }

        h2 {
          text-align: center;
          margin-bottom: 25px;
          color: #333;
          font-weight: 600;
        }

        .field { margin-bottom: 20px; }

        label {
          display: block;
          margin-bottom: 6px;
          font-weight: 500;
          color: #444;
        }

        input {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #ccc;
          border-radius: 8px;
          font-size: 15px;
          transition: border 0.2s, box-shadow 0.2s;
        }

        input:focus {
          border-color: #4a90e2;
          box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
          outline: none;
        }

        .error {
          color: #e74c3c;
          font-size: 13px;
          margin-top: 4px;
        }

        .forgot {
          text-align: right;
          margin: -8px 0 20px;
        }

        .forgot a {
          color: #4a90e2;
          text-decoration: none;
          font-size: 14px;
        }

        .btn {
          width: 100%;
          background: #4a90e2;
          border: none;
          color: #fff;
          padding: 12px;
          font-size: 16px;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }

        .btn:hover { background: #3c7dc5; }
        .btn:active { transform: scale(0.97); }
        .btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .register {
          text-align: center;
          margin-top: 20px;
          font-size: 14px;
          color: #666;
        }

        .register a {
          color: #4a90e2;
          text-decoration: none;
          font-weight: 500;
        }

        /* Right image section */
        .right {
          flex: 1;
          background: url("/Images/stu.jpg") center/cover no-repeat;
        }

        /* Responsive: hide image on small screens */
        @media (max-width: 768px) {
          .page { flex-direction: column; }
          .right { display: none; }
          .left { max-width: none; box-shadow: none; }
        }
      `}</style>

      <div className="page">
        {/* Left: Login form */}
        <div className="left">
          <div className="card">
            <img src="/Images/tts.png" alt="Logo" className="logo" />

            <h2>Sign in to Your Account</h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="field">
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
                {errors.email && <div className="error">{errors.email}</div>}
              </div>

              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                {errors.password && <div className="error">{errors.password}</div>}
              </div>

              <div className="forgot">
                <a href="#">Forgot password?</a>
              </div>

              <button className="btn" type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>

            <p className="register">
              New here? <a href="#">Create an account</a>
            </p>
          </div>
        </div>

        {/* Right: Background image */}
        <div className="right" />
      </div>
    </>
  );
}
