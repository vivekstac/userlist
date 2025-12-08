import { useNavigate } from 'react-router-dom';
import logOutIcon from '../assets/img/logout.svg';

export default function Header() {
    const navigate = useNavigate();
    const userName = localStorage.getItem("user") || sessionStorage.getItem("user");
    const logout = () => {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        navigate("/")
    };

    return (
        <div className="header-component">
            <div className="logout-main">
                <h4>{userName || 'User'}</h4>
                <button className="logout-btn" onClick={logout}>
                    <img src={logOutIcon} alt='' />
                </button>
            </div>
        </div>
    );
}
