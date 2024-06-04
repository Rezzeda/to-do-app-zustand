import React, { useState } from 'react';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';
import styles from './AuthFrom.module.scss';

const AuthForm: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const login = useAuthStore((state) => state.login);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError('Both fields are required');
            return;
        }
        if (!email.includes('@')) {
            setError('Invalid email address');
            return;
        }
        const success = login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.AuthForm}>
            {error && <div style={{ color: 'red', marginBottom: '15px' }}>{error}</div>}
            <div className={styles.AuthForm__formGroup}>
                <input
                    className={styles.AuthForm__input}
                    id='input-emial'
                    placeholder=''
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label className={styles.AuthForm__label} htmlFor='input-emial'>E-mail:</label>
            </div>
            <div className={styles.AuthForm__formGroup}>
                <input
                    className={styles.AuthForm__input}
                    id='input-password'
                    type="password"
                    placeholder=''
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label className={styles.AuthForm__label} htmlFor='input-password'>Password:</label>
            </div>
            <button className={styles.AuthForm__btn_submit} type="submit">Login</button>
        </form>
    );
};

export default AuthForm;
