import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated')=== 'true';
    });

    const [userRole, setUserRole] = useState(() => {
        return localStorage.getItem('userRole') || null;
    });

    const login = (role) => {
        setIsAuthenticated(true);
        setUserRole(role);

        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', role);
    }

    const logout = () => {
        setIsAuthenticated(false);
        setUserRole(null);

        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userRole');
    }

    return (<AuthContext.Provider value={{ isAuthenticated, userRole, login, logout}}>
        {children}
    </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default AuthContext