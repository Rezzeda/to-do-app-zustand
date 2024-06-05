import React, { useState, useEffect, useRef } from 'react';
import styles from './ToDoTask.module.scss';

interface ToDoTaskProps {
    title: string;
    id: string;
    done: boolean;
    onDone: (id: string) => void;
    onEdit: (id: string, title: string) => void;
    onRemove: (id: string) => void;
}

const ToDoTask: React.FC<ToDoTaskProps> = ({
    title,
    id,
    done,
    onDone,
    onEdit,
    onRemove,
}) => {

    const [checked, setChecked] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [titleValue, setTitleValue] = useState(title);
    const editTitleInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setTitleValue(title);
    }, [title]);

    useEffect(() => {
        if (isEdit) {
            editTitleInputRef?.current?.focus();
        }
    }, [isEdit])

    useEffect(() => {
        setChecked(done);
    }, [done]);

    return (
        <div className={styles.ToDoTask}>
            <label className={styles.ToDoTask__label}>
                <input
                    className={styles.ToDoTask__checkbox}
                    type="checkbox"
                    disabled={isEdit}
                    checked={checked}
                    id={id}
                    onChange={() => {
                        onDone(id);
                    }}
                />
                { isEdit ? (
                    <input
                        className={styles.ToDoTask__input_edit}
                        type="text"
                        ref={editTitleInputRef}
                        value={titleValue}
                        onChange={(evt) => {
                            setTitleValue(evt.target.value);
                        }}
                        onKeyDown={ (evt) => {
                            if (evt.key === 'Enter') {
                                onEdit(id, titleValue);
                                setIsEdit(false);
                            }
                        }}
                    />
                    ) : (
                        <h3 className={`${styles.ToDoTask__title} ${done ? styles.ToDoTask__title_done : ''}`}>
                        {title}
                    </h3>
                )}
            </label>
            { isEdit ? (
                <button
                    aria-label='Save'
                    className={styles.ToDoTask__button_save}
                    onClick={() => {
                        onEdit(id, titleValue);
                        setIsEdit(false);
                    }}
                />
            ) : (
                <button
                    aria-label='Edit'
                    className={styles.ToDoTask__button_edit}
                    onClick={() => {
                        setIsEdit(true);
                    }}
                />
            )}
            <button
                aria-label='Remove'
                className={styles.ToDoTask__button_remove}
                onClick={() => {
                    if (confirm('Are you sure you want to remove?')) {
                        onRemove(id);
                    }
                }}
            />
        </div>
    );
}

export default ToDoTask;
