import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../providers/auth.provider";

const PrivateRoute = ({ element }) => {
    const { isAuthenticated } = useAuth(); // Получаем состояние аутентификации

    return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
