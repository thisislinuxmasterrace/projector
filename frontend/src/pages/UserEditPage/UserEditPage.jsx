import MainLayout from "../../layouts/MainLayout/MainLayout";
import {useEffect, useState} from "react";
import {useAuth} from "../../providers/auth.provider";

const UserEditPage = () => {
    const [name, setName] = useState("Артём");
    const [surname, setSurname] = useState("Лукичев");
    const [email, setEmail] = useState("artem@gmail.com");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    const {apiService} = useAuth();

    useEffect(() => {
        window.M.updateTextFields();
        if (apiService) {
            setLoading(true);
            apiService.getUserInfo().then(data => {
                setEmail(data.email);
                setName(data.name);
                setSurname(data.surname);
            });
            setLoading(false);
        }
    }, [apiService]);

    const onChange = (e, setterFunction) => {
        setterFunction(e.target.value);
    };

    const onClick = () => {
        console.log("patched data");
    };

    return (
        <MainLayout>
            <div className="page-title">Редактировать профиль</div>
            <form>
                <div className="row">
                    <div className="input-field col s6">
                        <input onChange={(e) => onChange(e, setName)} value={name} disabled={loading} id="first_name" type="text" className="validate"/>
                        <label htmlFor="first_name">Имя</label>
                    </div>
                    <div className="input-field col s6">
                        <input onChange={(e) => onChange(e, setSurname)} value={surname} disabled={loading} id="last_name" type="text" className="validate"/>
                        <label htmlFor="last_name">Фамилия</label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field col s6">
                        <input onChange={(e) => onChange(e, setEmail)} value={email} disabled={loading} id="email" type="email" className="validate"/>
                        <label htmlFor="email">Электорнная почта</label>
                    </div>
                    <div className="input-field col s6">
                        <input onChange={(e) => onChange(e, setPassword)} value={password} disabled={loading} id="password" type="password" className="validate"/>
                        <label htmlFor="password">Поменять пароль</label>
                    </div>
                </div>
                <div className="row">
                    <button onClick={onClick} className="btn waves-effect waves-light orange darken-4" type="submit"
                            name="action">Отправить
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            </form>
        </MainLayout>
    );
};

export default UserEditPage;