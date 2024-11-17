import axios from 'axios';

const API_URL = 'https://projector.pidor.dev/api';

export const register = async (name, surname, email, password) => {
    const response = await axios.post(`${API_URL}/users`, {
        name,
        surname,
        email,
        password
    });
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
        rememberMe: true
    });
    return response.data;
};

export const checkTokenValidity = async (token) => {
    const response = await axios.get(`${API_URL}/auth/current`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};