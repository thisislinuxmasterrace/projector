import MainLayout from "../../layouts/MainLayout/MainLayout";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../../providers/auth.provider";
import "./EditProjectPage.css";

const EditProjectPage = () => {
    const {id} = useParams();

    const {apiService} = useAuth();

    const [project, setProject] = useState({id, name: "apiService"});
    const [loading, setLoading] = useState(true);
    const [nameValue, setNameValue] = useState("apiService");

    const navigate = useNavigate();

    const onProjectNameFormSubmit = e => {
        e.preventDefault();
        if (nameValue.trim().length > 0 && project.name !== nameValue.trim()) {
            apiService.patchProjectName(id, nameValue.trim()).then(data => {
                alert(`Имя проекта изменено на ${data.name}`);
                setNameValue(data.name);
                const newProject = JSON.parse(JSON.stringify(project));
                newProject.name = data.name;
                setProject(newProject);
            });
        }
    };

    useEffect(() => {
        if (apiService) {
            apiService.getProject(id).then(data => {
                if (data.error) {
                    navigate(`/`);
                } else if (data.myRole !== "owner") {
                    navigate(`/projects/${id}`);
                } else {
                    setNameValue(data.name);
                    setProject(data);
                    setLoading(false);
                }
            });
        }
    }, [apiService, id, navigate]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    return (
        <MainLayout>
            <Link to={`/projects/${id}`}>К проекту</Link>
            <div className="page-title">Редактировать проект</div>
            <form className="project-name-form" onSubmit={onProjectNameFormSubmit}>
                <div className="input-field project-name-form__input">
                    <input
                        onChange={e => setNameValue(e.target.value)}
                        disabled={loading}
                        value={nameValue}
                        id="title"
                        type="text"
                    />
                    <label htmlFor="title">Название проекта</label>
                </div>
                <button type="submit" disabled={loading || nameValue.trim() === project.name} className="project-name-form__button btn-large green darken-2">
                    Сохранить
                </button>
            </form>
        </MainLayout>
    );
};

export default EditProjectPage;