import React, { createContext, useState, useEffect, useContext } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('jwtToken');
        if (storedToken) {
            try {
                const decodedToken = jwtDecode(storedToken); 
                setUser(decodedToken);
            } catch (error) {
                console.error('Error decoding token:', error);
                localStorage.removeItem('jwtToken');
            }
        }
        setLoading(false);
    }, []);

    const login1 = (data) => {
        setUser(data.account_id);
        setIsLoggedIn(true);
        setIsAdmin(data.account.is_admin);
        localStorage.setItem('jwtToken', data.token);
        localStorage.setItem('id', data.account_id);
    };

    const login = (token) => {
        localStorage.setItem('jwtToken', token);
        try {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        } catch (error) {
            console.error('Error decoding token:', error);
            localStorage.removeItem('jwtToken');
        }
    };

    const logout = () => {
        localStorage.removeItem('jwtToken');
        setUser(null);
    };

    const value = {
        user,
        login,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);       