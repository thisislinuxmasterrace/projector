import MainLayout from "../../layouts/MainLayout/MainLayout";
import {useEffect, useState} from "react";

const UserEditPage = () => {
    const [name, setName] = useState("Артём");
    const [surname, setSurname] = useState("Лукичев");
    const [email, setEmail] = useState("artem@gmail.com");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    return (
        <MainLayout>
            <div className="page-title">Edit profile</div>
            <form>
                <div className="row">
                    <div className="input-field col s6">
                        <input value={name} disabled={loading} id="first_name" type="text" className="validate"/>
                        <label htmlFor="first_name">Name</label>
                    </div>
                    <div className="input-field col s6">
                        <input value={surname} disabled={loading} id="last_name" type="text" className="validate"/>
                        <label htmlFor="last_name">Surname</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input value={email} disabled={loading} id="email" type="email" className="validate"/>
                        <label htmlFor="email">Email</label>
                    </div>
                </div>
                <div className="row">
                    <button className="btn waves-effect waves-light orange darken-4" type="submit" name="action">Submit
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </form>
        </MainLayout>
    );
};

export default UserEditPage;