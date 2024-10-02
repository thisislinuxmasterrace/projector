import MainLayout from "../../layouts/MainLayout/MainLayout";
import {useState} from "react";

const InvitesPage = () => {
    const [invites] = useState(null);

    return (
        <MainLayout>
            <div className="page-title">
                Ваши приглашения
            </div>
            {invites === null && <div>Приглашений пока нет</div>}
        </MainLayout>
    );
};

export default InvitesPage;