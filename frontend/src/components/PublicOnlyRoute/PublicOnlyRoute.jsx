import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from "../../providers/auth.provider";

const PublicOnlyRoute = ({ element }) => {
    const { isAuthenticated } = useAuth();

    return !isAuthenticated ? element : <Navigate to="/" />;
};

export default PublicOnlyRoute;
