import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkTokenValidity } from "../services/auth.service";

const AuthContext = createContext({isAuthenticated: true});

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            checkTokenValidity(token)
                .then(() => setIsAuthenticated(true))
                .catch(() => {
                    setIsAuthenticated(false);
                    localStorage.removeItem('token');
                });
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};