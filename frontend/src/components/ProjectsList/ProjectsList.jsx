import {Link} from "react-router-dom";
import "./ProjectsList.css";

const ProjectsList = ({projects}) => {
    return (
        <div>
            <h5>Ваши проекты:</h5>
            <div className="projects-list">
                {projects.map((projectInfo) =>
                    <Link
                        to={`/projects/${projectInfo.project.id}`}
                        key={projectInfo.project.id}
                    >
                        <div className="card projects-list__item">
                            <span className="projects-list__item-title">{projectInfo.project.name}</span>
                            <div className="black-text">вы <span className="orange-text text-darken-4">{projectInfo.role === "owner" ? "Владелец" : "Участник"}</span></div>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProjectsList;