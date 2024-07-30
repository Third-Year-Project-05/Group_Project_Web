import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext.jsx';

const Private = ({ element }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return;
    }

    if (user && user.role === 'Admin') {
        return element;
    }

    return <Navigate to="/login" replace />;
};

export default Private;
