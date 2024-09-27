import React, { useState } from 'react';

const RegisterPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const userData = {
            email,
            password,
            name,
            surname,
        };

        try {
            const response = await fetch('/users/crud', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                throw new Error('Ошибка при создании пользователя');
            }

            const data = await response.json();
            let token = data.token;
            document.cookie = "jwt=" + data.token + "; path=/";
            alert('Пользователь создан');
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <div className="container">
            <h2>Регистрация</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Имя:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="surname">Фамилия:</label>
                    <input
                        type="text"
                        id="surname"
                        name="surname"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Зарегистрироваться</button>
                <p id="n">Есть аккаунт? <a href="#">Войти</a></p>
            </form>
        </div>
    );
};

export default RegisterPage;
