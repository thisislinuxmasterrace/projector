import MainLayout from "../../layouts/MainLayout/MainLayout";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useAuth} from "../../providers/auth.provider";
import {useEffect, useState} from "react";
import ProjectTasks from "../../components/ProjectTasks/ProjectTasks";

const ProjectPage = () => {
    const {id} = useParams();
    const {apiService} = useAuth();
    const [blocked, setBlocked] = useState(true);

    const navigate = useNavigate();

    const [project, setProject] = useState({id, name: "Миссия 5.9"});

    const leave = async () => {
        const userId = await (await apiService.getUserInfo()).id;
        await apiService.deleteUserFromProject(userId, project.id);
        navigate("/");
        alert(`Вы покинули проект ${project.name}`);
    };

    useEffect(() => {
        if (apiService) {
            apiService.getProject(id).then(data => {
                if (data.error) {
                    navigate("/");
                } else {
                    setProject(data);
                    setBlocked(false);
                }
            });
        }
    }, [apiService, id, navigate]);

    return (
        <MainLayout>
            <Link to="/">На главную</Link>
            <div style={{display: 'flex', gap: 25, alignItems: 'center'}}>
                <div className="page-title" style={{minWidth: "fit-content"}}>{project.name}</div>
                <div style={{display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%"}}>
                    <button className="btn-large orange darken-1">Изменить <i
                        className="material-icons right">create</i></button>
                    <button disabled={blocked} onClick={leave} className="btn-small red darken-2">Покинуть <i
                        className="material-icons right">directions_run</i></button>
                </div>
            </div>
            <ProjectTasks />
        </MainLayout>
    );
};

export default ProjectPage;