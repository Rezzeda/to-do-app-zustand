import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NotFound.module.scss';
import pedro from './images/tenor.gif'

const NotFound: React.FC = () => {
    return (
        <div className={styles.notFound}>
            <h1 className={styles.notFound__title}>404 - Page Not Found</h1>
            <div className={styles.notFound__wrapper}>
                <img className={styles.notFound__pedro} src={pedro} alt="pedro" />
            </div>
            <p className={styles.notFound__text}>Sorry, the page you are looking for does not exist.</p>
            <Link className={styles.notFound__link} to="/">Go back to HomePage</Link>
        </div>
    );
};

export default NotFound;
