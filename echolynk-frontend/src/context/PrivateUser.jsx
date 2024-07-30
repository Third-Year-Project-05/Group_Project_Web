import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext.jsx';

const PrivateUser = ({ element }) => {
    const { user } = useContext(AuthContext);

    if (user  && user.role === 'Deaf') {
        return element;
    }
};

export default PrivateUser;
