import MainLayout from "../../layouts/MainLayout/MainLayout";
import {useEffect, useState} from "react";
import {useAuth} from "../../providers/auth.provider";
import "./InvitesPage.css";
import {Link} from "react-router-dom";

const InvitesPage = () => {
    const [invites, setInvites] = useState([]);
    const {apiService} = useAuth();

    const agree = id => {
        apiService.acceptInvite(id).then(data => {
            alert(`Приглашение в проект ${data.project.name} принято`);
            apiService.getInvites().then(data => setInvites(data));
        });
    };

    const decline = id => {
        apiService.rejectInvite(id).then(data => {
            alert(`Приглашение в проект ${data.project.name} отклонено`);
            apiService.getInvites().then(data => setInvites(data));
        });
    };

    useEffect(() => {
        if (apiService) {
            apiService.getInvites().then(data => setInvites(data));
        }
    }, [apiService]);

    return (
        <MainLayout>
            <Link to="/">На главную</Link>
            <div className="page-title">
                Ваши приглашения
            </div>
            <div className="invites-wrapper">
                {invites.length > 0 ?
                    invites.map(invite => (
                        <div className="invites-item" key={invite.id}>
                            <div className="card pink darken-1">
                                <div className="card-content blue-text text-lighten-3">
                                    <bold className="card-title">{invite.project.name}</bold>
                                    <p className="white-text">
                                        Роль
                                        <span className="orange-text text-lighten-4"> {invite.role === "owner" ? "Владелец" : "Участник"}</span>
                                        <span style={{marginLeft: 10}}>
                                            <button onClick={() => decline(invite.id)} className="btn red"><i className="material-icons small">remove_circle</i></button>
                                            <button onClick={() => agree(invite.id)} className="btn green">Принять <i className="material-icons small right">add_box</i></button>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                    : <div>Приглашений пока нет</div>}
            </div>
        </MainLayout>
    );
};

export default InvitesPage;