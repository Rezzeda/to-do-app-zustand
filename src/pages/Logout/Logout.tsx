import React, { useEffect } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Logout: React.FC = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore();

    useEffect(() => {
        logout();
        const timer = setTimeout(() => {
            navigate('/login');
        }, 5000);

        // Очистка таймера при размонтировании компонента
        return () => clearTimeout(timer);
    }, [logout, navigate]);

    return (
        <div>
            <h1>You have been logged out</h1>
            <p>Redirecting to login page in 5 seconds</p>
        </div>
    );
};

export default Logout;
