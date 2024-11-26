import MainLayout from "../../layouts/MainLayout/MainLayout";
import CurrentTasksList from "../../components/CurrentTasksList/CurrentTasksList";
import {Link} from "react-router-dom";
import {useAuth} from "../../providers/auth.provider";
import {useEffect, useState} from "react";

const MainPage = () => {
    const {apiService} = useAuth();
    const [name, setName] = useState("Артём");
    const [invitesCount, setInvitesCount] = useState(0);

    const [invitesColor, setInvitesColor] = useState("light-blue darken-4");

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
            apiService.getInvites().then(data => setInvitesCount(data.length));
        }
    }, [apiService]);

    useEffect(() => {
        if (invitesCount > 0) {
            setInvitesColor("light-blue darken-4");
        } else {
            setInvitesColor("blue-grey darken-1");
        }
    }, [invitesCount]);

    return (
        <MainLayout>
            <div className="page-title">Привет, {name}!</div>
            <div className="row">
                <Link to="/invites">
                    <div className="col s6">
                        <div className={`card ${invitesColor}`}>
                            <div className="card-content white-text">
                                <span className="card-title">Приглашения в проекты</span>
                                {invitesCount === 0 ? <p>Никуда не приглашают :(</p> : <p>Подробнее ({invitesCount} шт)</p>}
                            </div>
                        </div>
                    </div>
                </Link>
                <div className="col s6">
                    <div className="card deep-orange darken-4">
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