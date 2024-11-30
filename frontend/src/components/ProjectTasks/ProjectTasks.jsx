import "./ProjectTasks.css";

const projectTasks = () => {
    return (
        <div className="project-tasks">
            <div className="project-tasks__col grey lighten-3">
                <div className="project-tasks__col-title">Новые</div>
                <div className="project-tasks__col-content">
                    <div className="card blue-grey darken-2">
                        <div className="card-content white-text">
                            <span className="card-title">Main page</span>
                            <p>Открыть "ProjectName"</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="project-tasks__col grey lighten-4">
                <div className="project-tasks__col-title">В процессе</div>
                <div className="project-tasks__col-content"></div>
            </div>
            <div className="project-tasks__col grey lighten-4">
                <div className="project-tasks__col-title">Готовы</div>
                <div className="project-tasks__col-content"></div>
            </div>
        </div>
    );
};

export default projectTasks;