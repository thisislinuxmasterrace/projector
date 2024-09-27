import {Fragment} from "react";
import Header from "../../components/Header/Header";
import MainSideNav from "../../components/MainSideNav/MainSideNav";


const MainLayout = ({ children }) => {
    return (
        <Fragment>
            <Header />
            <main className="main">
                <MainSideNav />
                <div className="main-content">
                    {children}
                </div>
            </main>
        </Fragment>
    );
};

export default MainLayout;