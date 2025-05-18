import styles from "./CreateUser.module.css";
import Card from "../UI/Card";
import Button from "../UI/Button";
import { useState, useRef } from "react";
import ErrorModal from "../UI/ErrorModal";

const CreateUser = (props) => {
    const [error, setError] = useState();

    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const createUserHandler = (e) => {
        e.preventDefault();
        const inputUserName = nameInputRef.current.value;
        const inputUserAge = ageInputRef.current.value;
        if (inputUserName.trim().length === 0 || inputUserAge.trim().length === 0) {
            setError({
                title: 'Некорректный ввод',
                message: 'Эти поля не могут быть пустыми'
            });
            return;
        }
        if (+inputUserAge < 1) {
            setError({
                title: 'Некорректный возраст',
                message: 'Возраст должен быть больше 0'
            });
            return;
        }
        props.onCreateUser(inputUserName, inputUserAge);
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';
    };

    const errorHandler = () => {
        setError(false);
    };

    return (
        <>
            {error && <ErrorModal onCloseModal={errorHandler} title={error.title} message={error.message} />}
            <Card className={styles.input}>
                <form onSubmit={createUserHandler}>
                    <label htmlFor="name">Имя</label>
                    <input
                        type="text"
                        id="name"
                        ref={nameInputRef}
                    />
                    <label htmlFor="age">Возраст</label>
                    <input
                        type="number"
                        id="age"
                        ref={ageInputRef}
                    />
                    <Button type="submit">Добавить Пользователя</Button>
                </form>
            </Card>
        </>
    );
};

export default CreateUser;
