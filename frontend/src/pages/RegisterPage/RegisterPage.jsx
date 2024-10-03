import {useState} from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import {Link} from "react-router-dom";

const RegisterPage = () => {
    const [inputs, setInputs] = useState([
        {name: "name", type: "text", value: ""},
        {name: "surname", type: "text", value: ""},
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
                    Регистрация
                </div>
                <AuthForm inputs={inputs} onChange={onChange} onSubmit={onSubmit} />
                <div className="col s12">
                    <p>
                        Уже зарегистрированы? <Link to="/login">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;