import React, { useEffect } from 'react';
import styles from './Home.module.scss';
import { InputPlus } from '../../components/InputPlus';
import ToDoTask from '../../components/ToDoTask';
import { useToDoStore } from '../../stores/useToDoStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

    const { user, logout } = useAuthStore();
    const navigate = useNavigate();


    const [
        tasks,
        createTask,
        removeTask,
        updateTask,
        toggleDone,
    ] = useToDoStore(state => [
        state.tasks.filter((task) => task.email === user?.email),
        state.createTask,
        state.removeTask,
        state.updateTask,
        state.toggleDone,
    ]);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    const handleAddTask = (title: string) => {
        if (user && title.trim()) {
            createTask(title, user.email);
        }
    };

    const handleLogout = () => {
        setTimeout(
            () => {
                logout();
                navigate('/login');
            },
            1000,
        )
    };

    return (
        <article className={styles.article}>
            {user && (<div className={styles.article__info}>
            <p>Welcome, {user.email}</p>
            <button className={styles.article__button} onClick={handleLogout}>Logout</button>
            </div>)}
            <h1 className={styles.article__title}>To Do App</h1>
            <section className={styles.article__section}>
                <InputPlus onAdd={handleAddTask}/>
            </section>
            <section className={styles.article__section}>
                {!tasks.length && (
                    <p className={styles.article__text}>No added To Do's</p>
                )}
                {tasks.map((task) => (
                    <ToDoTask 
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        done={task.done}
                        onDone={() => {
                            toggleDone(task.id);
                        }}
                        onEdit={(id, newTitle) => {
                            updateTask(id, newTitle);
                        }}
                        onRemove={() => {
                            removeTask(task.id);
                        }}
                    />
                ))}
            </section>
        </article>
    );
};

export default Home;
