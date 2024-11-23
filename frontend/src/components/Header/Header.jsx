import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <nav className="orange darken-3">
                <div className="nav-wrapper container">
                    <div style={{cursor: "pointer"}} className="brand-logo center">Projector</div>
                </div>
            </nav>
        </header>
    );
};

export default Header;