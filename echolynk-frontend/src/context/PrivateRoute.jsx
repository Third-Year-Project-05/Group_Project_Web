import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext.jsx';

const Private = ({ element }) => {
    const { user } = useContext(AuthContext);

    if (user && user.role === 'Admin') {
        return element;
    }
    console.log(user.role);

};

export default Private;
