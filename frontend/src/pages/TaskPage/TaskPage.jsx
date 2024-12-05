import MainLayout from "../../layouts/MainLayout/MainLayout";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Fragment, useEffect, useState} from "react";
import {useAuth} from "../../providers/auth.provider";

const TaskPage = () => {
    const {id} = useParams();
    
    const navigate = useNavigate();
    
    const {apiService} = useAuth();

    const [task, setTask] = useState(null);

    useEffect(() => {
        if (apiService) {
            apiService.getTask(id).then(data => {
               if (data.error) {
                   navigate("/");
                   return;
               } 
               
               setTask(data);
            });
        }
    }, [apiService, id, navigate]);

    return (
        <MainLayout>
            {task !== null &&
                <Fragment>
                    <Link to={`/projects/${task.project.id}`}>К проекту ({task.project.name})</Link>
                    <div className="page-title">{task.name}</div>

                </Fragment>
            }
        </MainLayout>
    );
};

export default TaskPage;