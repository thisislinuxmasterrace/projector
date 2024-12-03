import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkTokenValidity } from "../services/auth.service";
import APIService from "../services/api.service";

const AuthContext = createContext({isAuthenticated: true});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [token, setToken] = useState(null);
    const [apiService, setApiService] = useState(null);
    const [userInfo, setUserInfo] = useState({name: "Артём", id: 14});

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkTokenValidity(token)
                .then(() => {
                    setToken(token);
                    setIsAuthenticated(true);
                })
                .catch(() => {
                    setIsAuthenticated(false);
                    setToken(null);
                    localStorage.removeItem('token');
                });
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
        setIsAuthenticated(true);
    };

    useEffect(() => {
        if (token) {
            setApiService(new APIService(token));
        }
    }, [token]);

    useEffect(() => {
        if (apiService) {
            apiService.getUserInfo().then(data => setUserInfo(data));
        }
    }, [apiService]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, token, apiService, userInfo }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};