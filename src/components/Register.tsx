import { useState } from "react";
import { register } from "../firebase"; // Import the register function from firebase.ts
import { useNavigate } from "react-router-dom"; // Navigate to another page after success
import './Auth.css'; // Import custom CSS for styling

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For navigation after registration

  const handleRegister = async () => {
    try {
      await register(email, password); // Call the Firebase register function
      alert("Registration successful!");
      navigate("/dashboard"); // Navigate to the dashboard or login page
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Create an Account</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Update email state
          className="input-field"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          className="input-field"
        />
        <button onClick={handleRegister} className="submit-btn">
          Register
        </button>
        <p className="login-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}


