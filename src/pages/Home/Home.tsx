import React, { useState } from 'react';
import styles from './Home.module.scss';
import { InputPlus } from '../../components/InputPlus/InputPlus';
import ToDoTask from '../../components/ToDoTask/ToDoTask';
import { useToDoStore } from '../../stores/useToDoStore';
import { useAuthStore } from '../../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {

    const { user } = useAuthStore();
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

    // useEffect(() => {
    //     console.log(tasks);
    // }, [tasks]);

    const handleAddTask = (title: string) => {
        if (user && title.trim()) {
            createTask(title, user.email);
        }
    };

    const handleLogout = () => {
        navigate('/logout');
    };

    const [filter, setFilter] = useState({
        title: '',
        status: 'all',
        date: ''
    });

    const filteredTasks = tasks.filter(task => {
        return (
            (filter.title === '' || task.title.includes(filter.title)) &&
            (filter.status === 'all' || (filter.status === 'done' ? task.done : !task.done)) &&
            (filter.date === '' || new Date(task.createdAt).toDateString() === new Date(filter.date).toDateString())
        );
    });

    return (
        <article className={styles.article}>
            {user && (<div className={styles.article__info}>
                <p>Welcome, {user.email}</p>
                <button className={styles.article__button} onClick={handleLogout}>Logout</button>
                </div>
            )}
            <h1 className={styles.article__title}>To Do App</h1>
            <section className={styles.article__section}>
                <InputPlus onAdd={handleAddTask} />
            </section>
            <section className={styles.article__section}>
                <div className={styles.filters}>
                    <input
                        className={styles.filters__input}
                        type="text"
                        placeholder="Filter by title"
                        value={filter.title}
                        onChange={(e) => setFilter({ ...filter, title: e.target.value })}
                    />
                    <select
                        className={styles.filters__input}
                        value={filter.status}
                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                    >
                        <option value="all">All</option>
                        <option value="done">Done</option>
                        <option value="not-done">Not Done</option>
                    </select>
                    <input
                        className={styles.filters__input}
                        type="date"
                        value={filter.date}
                        onChange={(e) => setFilter({ ...filter, date: e.target.value })}
                    />
                </div>
            </section>
            <section className={styles.article__section}>
                {!filteredTasks.length && (
                    <p className={styles.article__text}>No added To Do's</p>
                )}
                {filteredTasks.map(task => (
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
