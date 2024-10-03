import {useState} from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import {Link} from "react-router-dom";

const LoginPage = () => {
    const [inputs, setInputs] = useState([
        {name: "email", type: "email", value: ""},
        {name: "password", type: "password", value: ""}
    ]);

    const onChange = e => {
        const newValue = e.target.value;
        const inputsCopy = JSON.parse(JSON.stringify(inputs));
        inputsCopy.find(el => el.name === e.target.id).value = newValue;
        setInputs(inputsCopy);
    };

    const onSubmit = e => {
        e.preventDefault();
    };

    return (
        <div className="row">
            <div className="col s4 offset-s4">
                <div className="page-title mb-0">
                    Авторизация
                </div>
                <AuthForm inputs={inputs} onChange={onChange} onSubmit={onSubmit} />
                <div className="col s12">
                    <p>
                        Ещё не зарегистрированы? <Link to="/register">Регистрация</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;