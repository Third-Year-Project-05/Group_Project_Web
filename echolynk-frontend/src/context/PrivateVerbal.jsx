import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext.jsx';

const PrivateVerbal = ({ element }) => {
    const { user, loading } = useContext(AuthContext);


    if (user && user.role === 'Verbal') {
        return element;
    }
};

export default PrivateVerbal;