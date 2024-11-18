import {useState} from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import {Link, useNavigate} from "react-router-dom";
import {login as loginService} from "../../services/auth.service";
import {useAuth} from "../../providers/auth.provider";

const LoginPage = () => {
    const [inputs, setInputs] = useState([
        {name: "email", type: "email", value: "", caption: "Электронная почта"},
        {name: "password", type: "password", value: "", caption: "Пароль"}
    ]);

    const {login} = useAuth();

    const navigate = useNavigate();

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
            const token = await loginService(requestData.email, requestData.password);
            login(token);
            navigate("/");
        } catch (error) {
            if (error.status === 404) {
                alert("Такого профиля не существует");
                return;
            }

            if (error.status === 401) {
                alert("Неверный пароль");
                return;
            }

            alert("Ошибка входа");
        }
    };

    return (
        <div className="row">
            <div className="col s4 offset-s4 card" style={{marginTop: 100, paddingTop: 10}}>
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