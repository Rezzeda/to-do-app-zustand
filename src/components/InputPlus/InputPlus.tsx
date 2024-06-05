import React, { useState } from "react";
import styles from "./InputPlus.module.scss"


interface InputPlusProps {
    onAdd: (title: string) => void;
}

export const InputPlus: React.FC<InputPlusProps> = ({ onAdd, }) => {

    const [inputValue, setInputValue] = useState('');
    const [error, setError] = useState('');

    const addTask = () => {
        if (inputValue.length < 3 || inputValue.length > 25) {
            setError('Title must be between 3 and 25 characters.');
            return;
        }
        setError('');
        onAdd(inputValue);
        setInputValue('');
    };

    return (
        <div className={styles.formGroup}>
            <input 
                id="input-todo"
                className={styles.formGroup__input}
                type="text"
                required
                placeholder=" "
                value={inputValue}
                onChange={(evt) => {
                    setInputValue(evt.target.value)
                }}
                onKeyDown={(evt) => {
                    if (evt.key === 'Enter') {
                        addTask();
                    }
                }}
            />
            <label className={styles.formGroup__label} htmlFor="input-todo">What To Do</label>
            <button 
                type="button"
                onClick={addTask}
                className={styles.formGroup__button}
                aria-label="Add">
                &#x2192;
            </button>
            {error && <p className={styles.error}>{error}</p>}
        </div>
    );
}