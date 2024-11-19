import "./Header.css";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <header className="header">
            <nav className="orange darken-3">
                <div className="nav-wrapper container">
                    <a className="brand-logo center">Projector</a>
                    <ul className="left hide-on-med-and-down">
                        <li><Link to="/">Главная</Link></li>
                        <li><Link to="/projects">Проекты</Link></li>
                        <li><Link to="/profile">Профиль</Link></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;