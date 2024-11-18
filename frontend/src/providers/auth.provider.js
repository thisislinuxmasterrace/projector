import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkTokenValidity } from "../services/auth.service";
import APIService from "../services/api.service";

const AuthContext = createContext({isAuthenticated: true});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [token, setToken] = useState(null);
    const [apiService, setApiService] = useState(null);

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

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, token, apiService }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};