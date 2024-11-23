import "./CurrentTasksList.css";

const CurrentTasksList = ({tasks}) => {
    const onClick = id => {
        alert(id);
    };

    return (
        <div className="tasks-list card">
            {tasks.map(task => <div key={task.id} className="card tasks-list__item">{task.name} <i onClick={() => onClick(task.id)}
                className="small orange-text text-darken-3 material-icons">info</i></div>)}
        </div>
    );
};

export default CurrentTasksList;