import { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate , Link} from "react-router-dom";

export default function Login() {
    const { login } = useAuth();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        const success = await login(username, password);

        setLoading(false);

        if (success) {
            navigate("/");
        } else {
            setError("Invalid username or password.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
            type="text"
            placeholder="eg. User123"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />

        <input
            type="password"
            placeholder="eg. Password123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />

        <button 
        type="submit" disabled = {loading}
        >{ loading ? "Logging in..." : "Login"}</button>
        {error && <p className="error">{error}</p>}

        <p>
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
        </p>
        </form>
    );
}