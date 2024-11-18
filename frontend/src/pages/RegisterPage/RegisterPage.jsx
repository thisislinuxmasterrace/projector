import {useState} from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import {Link, useNavigate} from "react-router-dom";
import {login as loginService, register} from "../../services/auth.service";
import {useAuth} from "../../providers/auth.provider";

const RegisterPage = () => {
    const navigate = useNavigate();

    const {login} = useAuth();

    const [inputs, setInputs] = useState([
        {name: "name", type: "text", value: "", caption: "Имя"},
        {name: "surname", type: "text", value: "", caption: "Фамилия"},
        {name: "email", type: "email", value: "", caption: "Электронная почта"},
        {name: "password", type: "password", value: "", caption: "Пароль"}
    ]);

    const onChange = e => {
        const newValue = e.target.value;
        const inputsCopy = JSON.parse(JSON.stringify(inputs));
        inputsCopy.find(el => el.name === e.target.id).value = newValue;
        setInputs(inputsCopy);
    };

    const onSubmit = async e => {
        e.preventDefault();

        if (inputs.filter(el => el.value.trim().length === 0)[0]) {
            return;
        }

        const requestData = {};

        inputs.forEach((el, i) => requestData[el.name] = el.value);

        try {
            const registerData = await register(requestData.name, requestData.surname, requestData.email, requestData.password);
            if(registerData.id) {
                const token = await loginService(requestData.email, requestData.password);
                login(token);
                navigate("/");
            }
        } catch (error) {
            if (error.status === 409) {
                alert("Такой профиль уже существует");
                return;
            }

            alert("Ошибка регистрации");
        }
    };

    return (
        <div className="row">
            <div className="col s4 offset-s4 card" style={{marginTop: 100, paddingTop: 10}}>
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