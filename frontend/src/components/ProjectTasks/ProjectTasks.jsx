import "./ProjectTasks.css";
import {useAuth} from "../../providers/auth.provider";
import {useEffect, useState} from "react";
import ProjectTaskItem from "../ProjectTaskItem/ProjectTaskItem";

const ProjectTasks = ({project}) => {
    const {apiService} = useAuth();

    const [tasks, setTasks] = useState([]);

    const changeTaskSize = (taskId, newSize) => {
        if (newSize !== tasks.find(task => task.id === taskId).size) {
            apiService.updateTask(taskId, {size: newSize}).then(() => {
                apiService.getProjectTasks(project.id).then(data => setTasks(data));
            });
        }
    };

    const changeTaskPriority = (taskId, newPriority) => {
        if (newPriority !== tasks.find(task => task.id === taskId).priority) {
            apiService.updateTask(taskId, {priority: newPriority}).then(() => {
                apiService.getProjectTasks(project.id).then(data => setTasks(data));
            });
        }
    };

    useEffect(() => {
        if (apiService) {
            apiService.getProjectTasks(project.id).then(data => setTasks(data));
        }
    }, [apiService, project.id]);

    useEffect(() => {
        window.M.Dropdown.init(document.querySelectorAll(".dropdown-trigger"));
    }, [tasks]);

    return (
        <div className="project-tasks">
            <div className="project-tasks__col grey lighten-3">
                <div className="project-tasks__col-title">Новые</div>
                <div className="project-tasks__col-content">
                    {tasks.filter(task => task.status === "todo")
                        .map(task => <ProjectTaskItem changeTaskPriority={changeTaskPriority} key={task.id} task={task} changeTaskSize={changeTaskSize} />)}
                </div>
            </div>
            <div className="project-tasks__col grey lighten-4">
                <div className="project-tasks__col-title">В процессе</div>
                <div className="project-tasks__col-content">
                    {tasks.filter(task => task.status === "inProgress")
                        .map(task => <ProjectTaskItem changeTaskPriority={changeTaskPriority} key={task.id} task={task} changeTaskSize={changeTaskSize} />)}
                </div>
            </div>
            <div className="project-tasks__col grey lighten-4">
                <div className="project-tasks__col-title">Готовы</div>
                <div className="project-tasks__col-content">
                    {tasks.filter(task => task.status === "done")
                        .map(task => <ProjectTaskItem changeTaskPriority={changeTaskPriority} key={task.id} task={task} changeTaskSize={changeTaskSize} />)}
                </div>
            </div>
        </div>
    );
};

export default ProjectTasks;