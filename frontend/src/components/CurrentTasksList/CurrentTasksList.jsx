import "./CurrentTasksList.css";
import {useNavigate} from "react-router-dom";

const CurrentTasksList = ({tasks}) => {
    const navigate = useNavigate();

    const onClick = id => {
        navigate(`/tasks/${id}`);
    };

    return (
        <div className="tasks-list card">
            {tasks.map(task => <div key={task.id} className="card tasks-list__item">{task.name} <i onClick={() => onClick(task.id)}
                className="small orange-text text-darken-3 material-icons">info</i></div>)}
        </div>
    );
};

export default CurrentTasksList;