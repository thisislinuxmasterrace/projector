import MainLayout from "../../layouts/MainLayout/MainLayout";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useAuth} from "../../providers/auth.provider";
import "./EditProjectPage.css";

const EditProjectPage = () => {
    const {id} = useParams();

    const {apiService} = useAuth();

    const [project, setProject] = useState({id, name: "apiService"});
    const [loading, setLoading] = useState(true);
    const [nameValue, setNameValue] = useState("apiService");
    const [projectUsers, setProjectUsers] = useState([]);
    const [emailValue, setEmailValue] = useState("");

    const htmlSelectRef = useRef(null);

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

    const removeUser = userId => {
        apiService.deleteUserFromProject(userId, id).then(data => {
            alert(`Пользователь ${data.user.name} ${data.user.surname} (${data.user.email}) удалён из проекта`);
            apiService.getProjectUsers(id).then(users => setProjectUsers(users));
        });
    };

    const onProjectInviteFormSubmit = e => {
        e.preventDefault();
        if (emailValue.trim().length > 0) {
            const roleValue = htmlSelectRef.current.value;
            apiService.createProjectInvite(emailValue, roleValue, id).then(data => {
                if (!data.error) {
                    alert(`Приглашение пользователю ${data.user.email} отправлено`);
                    setEmailValue("");
                    htmlSelectRef.current.value = "maintainer";
                    const roleElement = htmlSelectRef.current;
                    window.M.FormSelect.getInstance(roleElement).destroy();
                    window.M.FormSelect.init(roleElement)
                }
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
            apiService.getProjectUsers(id).then(data => setProjectUsers(data));
        }
    }, [apiService, id, navigate]);

    useEffect(() => {
        const selectElement = htmlSelectRef.current;
        window.M.updateTextFields();
        window.M.FormSelect.init(selectElement);
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
                <button type="submit" disabled={loading || nameValue.trim() === project.name}
                        className="project-name-form__button btn-large green darken-2">
                    Сохранить
                </button>
            </form>
            <h5>Участники проекта</h5>
            <div className="project-users-table__wrapper">
                <table className="project-users-table">
                    <tbody>
                    {projectUsers.map(userInfo => (
                        <tr key={userInfo.user.id}>
                            <td>{userInfo.user.name} {userInfo.user.surname} ({userInfo.user.email})</td>
                            <td>{userInfo.role === "owner" ? "Владелец" : "Участник"}</td>
                            <td>
                                <button
                                    onClick={() => removeUser(userInfo.user.id)}
                                    className="waves-effect waves-light btn red white-text"
                                >
                                    <i className="material-icons center">delete_sweep</i>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <h5>Пригласить в проект</h5>
            <form className="project-invite-form" onSubmit={onProjectInviteFormSubmit}>
                <div className="input-field project-invite-form__input">
                    <input
                        onChange={e => setEmailValue(e.target.value)}
                        value={emailValue}
                        id="email"
                        type="email"
                    />
                    <label htmlFor="email">Почта</label>
                </div>
                <div className="input-field">
                    <select className="icons" ref={htmlSelectRef}>
                        <option value="maintainer">Участник</option>
                        <option value="owner">Владелец</option>
                    </select>
                    <label>Роль</label>
                </div>
                <button
                    type="submit"
                    className="btn-small pink darken-1"
                    disabled={emailValue.trim() === ""}
                >
                    Пригласить
                    <i className="material-icons right small">plus_one</i>
                </button>
            </form>
        </MainLayout>
    );
};

export default EditProjectPage;