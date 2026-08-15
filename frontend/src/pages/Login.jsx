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

        const {success , status} = await login(username, password);

        setLoading(false);

        if (success) {
            navigate("/");
        } else {
            if(status === 401){
                setError("Invalid username or password.");
            }
            else if(status === 429){
                setError("Too Many Attempts.Please Try Again Later.")
            }
            else{
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <span className="auth-brand-icon">👨‍🍳</span>
                    <h1>Chef Claude</h1>
                </div>

                <div className="auth-heading">
                    <h2>Welcome back</h2>
                    <p>Log in to continue cooking.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="e.g. User123"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="error">{error}</p>}

                    <button
                        type="submit"
                        className="auth-submit-button"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{" "}
                    <Link to="/register">Register</Link>
                </p>
            </div>
        </div>
    )
}