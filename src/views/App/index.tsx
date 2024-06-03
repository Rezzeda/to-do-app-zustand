import React, { useEffect } from "react";
import styles from "./index.module.scss"
import { useToDoStore } from "../../data/stores/useToDoStore";
import { InputPlus } from "../components/InputPlus";
import  ToDoTask from "../components/ToDoTask";

export const App: React.FC = () => {
    const [
        tasks,
        createTask,
        removeTask,
        updateTask,
        toggleDone,
    ] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.removeTask,
        state.updateTask,
        state.toggleDone,
    ]);

    useEffect(() => {
        console.log(tasks);
    }, [tasks]);

    return (
        <article className={styles.article}>
            <h1 className={styles.article__title}>To Do App</h1>
            <section className={styles.article__section}>
                <InputPlus onAdd={(title) => {
                    if (title) {
                        createTask(title);
                    }
                }} />
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
}

export default App;
