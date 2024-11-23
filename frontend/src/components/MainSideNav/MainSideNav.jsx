import "./MainSideNav.css";
import NewProjectButton from "../NewProjectButton/NewProjectButton";
import {useEffect, useState} from "react";
import {useAuth} from "../../providers/auth.provider";
import {Link} from "react-router-dom";

const MainSideNav = () => {
    const [projects, setProjects] = useState([
        {project: {name: "Ликвидация водки", id: 1}},
        {project: {name: "Запись в друзья", id: 2}},
        {project: {name: "Похороны молодого человека", id: 3}},
        {project: {name: "Концерт Stray Kids", id: 4}},
        {project: {name: "Обход санкций", id: 5}}
    ]);

    const {apiService} = useAuth();

    useEffect(() => {
        if (apiService) {
            apiService.getMyProjects().then(data => setProjects(data));
        }
    }, [apiService]);

    return (
        <div className="main-sidenav__wrapper">
            <div>
                <h5>Ваши проекты:</h5>
                <ul>
                    {projects.map((projectInfo) => <li id={projectInfo.project.id}><Link
                        to={`/projects/${projectInfo.project.id}`}>{projectInfo.project.name}</Link></li>)}
                </ul>
            </div>
            <NewProjectButton/>
        </div>
    );
};

export default MainSideNav;