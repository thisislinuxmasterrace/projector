import {translateTaskPriority, translateTaskPriorityToColor, translateTaskSize} from "../../services/translate.service";
import {useEffect, useState} from "react";

const ProjectTaskItem = ({task, changeTaskSize, changeTaskPriority}) => {
    const [date, setDate] = useState(null);

    useEffect(() => {
        setDate(new Date(task.expectedDoneAt));
    }, [task.expectedDoneAt]);

    return (
        <div className="project-tasks__col-content__item card blue-grey darken-2">
            <div className="card-content white-text">
                <span className="card-title">{task.name}</span>
                {task.description && <p className="mb-2">{task.description}</p>}
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
                <p className="red mt-2">{date && date.toString()}</p>
            </div>
        </div>
    );
};

export default ProjectTaskItem;