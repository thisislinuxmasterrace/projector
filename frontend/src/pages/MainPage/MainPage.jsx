import MainLayout from "../../layouts/MainLayout/MainLayout";
import "./MainPage.css";
import ProjectsList from "../../components/ProjectsList/ProjectsList";

const MainPage = () => {
    return (
        <MainLayout>
            <div className="main-page-greeting">Привет, Артём!</div>
            <div className="row">
                <div className="col s6">
                    <div className="card blue-grey darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Приглашения в проекты</span>
                            <p>Никуда не приглашают :(</p>
                        </div>
                    </div>
                </div>
                <div className="col s6">
                    <div className="card light-blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Последний проект</span>
                            <p>Открыть "ProjectName"</p>
                        </div>
                    </div>
                </div>
            </div>
            <h5>Список проектов</h5>
            <ProjectsList />
        </MainLayout>
    );
};

export default MainPage;