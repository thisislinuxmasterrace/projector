import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <nav className="orange darken-3">
                <div className="nav-wrapper container">
                    <a href="#!" className="brand-logo center">Projector</a>
                    <ul className="left hide-on-med-and-down">
                        <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li>
                        <li className="active"><a href="collapsible.html">JavaScript</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;