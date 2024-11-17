import {useState} from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import {Link, useNavigate} from "react-router-dom";
import {login as loginService, register} from "../../services/auth.service";
import {useAuth} from "../../providers/auth.provider";

const LoginPage = () => {
    const [inputs, setInputs] = useState([
        {name: "email", type: "email", value: ""},
        {name: "password", type: "password", value: ""}
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

        const requestData = {};

        inputs.forEach((el, i) => requestData[el.name] = el.value);

        try {
            const token = await loginService(requestData.email, requestData.password);
            login(token);
            navigate("/");
        } catch (error) {
            console.error(error);
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