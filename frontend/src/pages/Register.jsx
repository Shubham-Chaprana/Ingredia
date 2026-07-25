import { useState } from "react";
import { useNavigate , Link } from "react-router-dom";
import { registerUser } from "../api/auth";

export default function Login() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            await registerUser(username, email, password);

            navigate("/login");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        <input
            type="text"
            placeholder="eg. User123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />
        
        <input
            type="text"
            placeholder="eg. newUser@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <input
            type="password"
            placeholder="eg. Password123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button 
        type="submit" disabled = {loading}
        >{ loading ? "Creating account..." : "Register"}</button>
        {error && <p className="error">{error}</p>}

        <p>
            Already have an account?{" "}
            <Link to="/login">Login</Link>
        </p>
        </form>

    );
}