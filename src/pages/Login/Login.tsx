import React from 'react';
import AuthForm from '../../components/AuthForm/AuthForm';
import styles from './Login.module.scss'


const Login: React.FC = () => {
    return (
        <section className={styles.loginPage}>
            <h1 className={styles.loginPage__title}>Login</h1>
            <AuthForm />
        </section>
    );
};

export default Login;
