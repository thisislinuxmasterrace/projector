import "./MainSideNav.css";
import NewProjectButton from "../NewProjectButton/NewProjectButton";
import {useEffect, useState} from "react";
import {useAuth} from "../../providers/auth.provider";
import ProjectsList from "../ProjectsList/ProjectsList";

const MainSideNav = () => {
    const [projects, setProjects] = useState([
        {project: {name: "Ликвидация водки", id: 1}},
        {project: {name: "Запись в друзья", id: 2}},
        {project: {name: "Похороны молодого человека", id: 3}},
        {project: {name: "Концерт Stray Kids", id: 4}},
        {project: {name: "Обход санкций", id: 5}}
    ]);

    const [createdProjectsCount, setCreatedProjectsCount] = useState(0);

    const {apiService} = useAuth();

    const counterFunction = () => {
        setCreatedProjectsCount(createdProjectsCount + 1);
    };

    useEffect(() => {
        if (apiService) {
            apiService.getMyProjects().then(data => setProjects(data));
        }
    }, [apiService, createdProjectsCount]);

    return (
        <div className="main-sidenav__wrapper">
            <ProjectsList projects={projects} />
            <NewProjectButton counterFunction={counterFunction} />
        </div>
    );
};

export default MainSideNav;