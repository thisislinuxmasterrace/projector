import MainLayout from "../../layouts/MainLayout/MainLayout";
import CurrentTasksList from "../../components/CurrentTasksList/CurrentTasksList";
import {Link} from "react-router-dom";
import {useAuth} from "../../providers/auth.provider";
import {useEffect, useState} from "react";

const MainPage = () => {
    const {apiService} = useAuth();
    const [name, setName] = useState("Артём");

    const [currentTasks, setCurrentTasks] = useState([
        {
            id: 1,
            name: "Нарезать пиццу"
        },
        {
            id: 2,
            name: "Поесть пельмени"
        },
        {
            id: 3,
            name: "Отдать апельсины"
        }
    ]);

    useEffect(() => {
        if (apiService) {
            apiService.getUserInfo().then(data => setName(data.name));
            apiService.getCurrentTasks().then(data => setCurrentTasks(data));
        }
    }, [apiService]);

    return (
        <MainLayout>
            <div className="page-title">Привет, {name}!</div>
            <div className="row">
                <Link to="/invites">
                    <div className="col s6">
                        <div className="card blue-grey darken-1">
                            <div className="card-content white-text">
                                <span className="card-title">Приглашения в проекты</span>
                                <p>Никуда не приглашают :(</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="col s6">
                    <div className="card light-blue darken-1">
                        <div className="card-content white-text">
                            <span className="card-title">Последний проект</span>
                            <p>Открыть "ProjectName"</p>
                        </div>
                    </div>
                </div>
            </div>
            <h5>Текущие задачи</h5>
            <CurrentTasksList tasks={currentTasks} />
            <Link to="/profile">Мой профиль</Link>
        </MainLayout>
    );
};

export default MainPage;