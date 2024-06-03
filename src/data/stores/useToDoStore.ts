import { create } from "zustand";
import { v4 as uuidv4 } from 'uuid';
import { devtools, persist } from 'zustand/middleware'

interface Task {
    id: string;
    title: string;
    createdAt: number;
    done: boolean;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    removeTask: (id: string) => void;
    updateTask: (id: string, title: string) => void;
    toggleDone: (id: string) => void;
}


export const useToDoStore = create<ToDoStore>() (
    devtools(
        persist(
            (set, get) => ({
                tasks: [
                    {
                        id: uuidv4(),
                        title: 'task1',
                        createdAt: Date.now(),
                        done: false,
                    },
                    {
                        id: uuidv4(),
                        title: 'task2',
                        createdAt: Date.now(),
                        done: false,
                    },
                    {
                        id: uuidv4(),
                        title: 'task3',
                        createdAt: Date.now(),
                        done: false,
                    }
                ],
                createTask: (title: string) => {
                    const { tasks } = get();
                    const newTask = {
                        id: uuidv4(),
                        title,
                        createdAt: Date.now(),
                        done: false,
                    }
                    set({
                        tasks: [newTask].concat(tasks),
                    });
                },
                removeTask: (id: string) => {
                    const { tasks } = get();
                    set({
                        tasks: tasks.filter((task) => task.id !== id),
                    });
                },
                updateTask: (id: string, title: string) => {
                    const { tasks } = get();
                    set({
                        tasks: tasks.map((task) => 
                            task.id === id ? { ...task, title } : task
                        )
                    });
                },
                toggleDone: (id: string) => {
                    const { tasks } = get();
                    set({
                        tasks: tasks.map((task) => 
                            task.id === id ? { ...task, done: !task.done } : task
                        )
                    });
                }
            }),
        { name: 'toDoStore' },
    )
));
