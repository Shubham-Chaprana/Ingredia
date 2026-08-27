import chefClaudeLogo from "../images/chef-claude-icon.png";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    return (
        <header>
            <img src={chefClaudeLogo} />
            <h1>Ingredia</h1>

            <button
                onClick={() => {
                    logout();
                    navigate("/login");
                }}
                className="logout-button"
            >
                Logout
            </button>
        </header>
    );
}