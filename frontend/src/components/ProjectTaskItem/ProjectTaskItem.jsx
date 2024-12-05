import {translateTaskPriority, translateTaskPriorityToColor, translateTaskSize} from "../../services/translate.service";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

const ProjectTaskItem = ({task, changeTaskSize, changeTaskPriority}) => {
    const [date, setDate] = useState(null);

    useEffect(() => {
        if (task.expectedDoneAt) {
            const dateObject = new Date(task.expectedDoneAt);
            const yyyy = dateObject.getFullYear();
            let mm = dateObject.getMonth() + 1;
            let dd = dateObject.getDate();

            if (dd < 10) dd = '0' + dd;
            if (mm < 10) mm = '0' + mm;

            setDate(`${dd}.${mm}.${yyyy}`);
        }
    }, [task.expectedDoneAt]);

    return (
        <Link className="project-tasks__col-content__item" to={`/tasks/${task.id}`}>
            <div className="card blue-grey darken-2">
                <div className="card-content white-text">
                    <span className="card-title">{task.name}</span>
                    <button
                        className="dropdown-trigger btn orange darken-2"
                        data-target={`sizedropdown${task.id}`}
                    >
                        {translateTaskSize(task.size)}
                    </button>

                    <ul id={`sizedropdown${task.id}`} className='dropdown-content'>
                        <li onClick={() => changeTaskSize(task.id, "none")}><span>НЕТ</span></li>
                        <li onClick={() => changeTaskSize(task.id, "xs")}><span>XS</span></li>
                        <li onClick={() => changeTaskSize(task.id, "s")}><span>S</span></li>
                        <li onClick={() => changeTaskSize(task.id, "m")}><span>M</span></li>
                        <li onClick={() => changeTaskSize(task.id, "l")}><span>L</span></li>
                        <li onClick={() => changeTaskSize(task.id, "xl")}><span>XL</span></li>
                    </ul>

                    <button
                        className={`dropdown-trigger btn ${translateTaskPriorityToColor(task.priority)}`}
                        data-target={`prioritydropdown${task.id}`}
                    >
                        {translateTaskPriority(task.priority)}
                    </button>

                    <ul id={`prioritydropdown${task.id}`} className='dropdown-content'>
                        <li onClick={() => changeTaskPriority(task.id, "none")}><span>НЕТ</span></li>
                        <li onClick={() => changeTaskPriority(task.id, "low")}><span>НИЗКИЙ</span></li>
                        <li onClick={() => changeTaskPriority(task.id, "medium")}><span>СРЕДНИЙ</span></li>
                        <li onClick={() => changeTaskPriority(task.id, "high")}><span>ВЫСОКИЙ</span></li>
                    </ul>
                    {date &&
                        <div className="mt-2">
                        <span style={{display: "flex", alignItems: "center", gap: 3}}>
                            <i className="material-icons">insert_invitation</i>{date}
                        </span>
                        </div>
                    }
                    {task.assignedToUser &&
                        <div className="mt-2">
                        <span style={{display: "flex", alignItems: "center", gap: 3}}>
                            <i className="material-icons">person_outline</i>
                            {task.assignedToUser.name} {task.assignedToUser.surname}
                        </span>
                            <div style={{fontSize: 12}}>&#10100;{task.assignedToUser.email}&#10101;</div>
                        </div>
                    }
                </div>
            </div>
        </Link>
    );
};

export default ProjectTaskItem;