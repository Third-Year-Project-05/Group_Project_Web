import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext.jsx';

const PrivateUser = ({ element }) => {
    const { user } = useContext(AuthContext);

    if (user  && user.role === 'Deaf') {
        return element;
    }

    return <Navigate to="/login" replace />;
};

export default PrivateUser;
