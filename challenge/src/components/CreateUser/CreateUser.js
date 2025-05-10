import styles from './CreateUser.module.css';
import { useState } from 'react';
import ErrorModal from '../ErrorModal/ErrorModal';

const CreateUser = (props) => {
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorAgeTitle, setErrorAgeTitle] = useState('');

    const inputValueHandler = (e) => {
        setName(e.target.value);
    }

    const inputAgeHandler = (e) => {
        setAge(e.target.value);
    }

    const onSubmitHundler = (e) => {
        e.preventDefault();

        if (name.trim().length === 0 || age.trim().length === 0) {
            handleError('Пожалуйста, заполните все поля', 'Некорректный ввод');
            return;
        }

        if (+age < 1) {
            handleError('Возраст должен быть больше 0', 'Некорректный возраст');
            return;
        }
        props.addUser({ name, age });
        setName('');
        setAge('');
    };

    const handleError = (message, title) => {
        setErrorMessage(message);
        setErrorAgeTitle(title);
        setError(true);
    };

    const closeModalHandler = () => {
        setError(false); // Закрываем модальное окно
    }

    return (
        <div>
            {error && <ErrorModal onClose={closeModalHandler} text={errorMessage} age={errorAgeTitle} />}
            <form onSubmit={onSubmitHundler}>
                <div className={styles['form-user']}>
                    <div className={styles['form-name']}>
                        <label>Имя</label>
                        <input type='text' onChange={inputValueHandler} value={name} />
                    </div>
                    <div className={styles['form-name']}>
                        <label>Возраст</label>
                        <input type='number' onChange={inputAgeHandler} value={age} />
                    </div>
                    <button className={styles['form-button']}>Добавить Пользователя</button>
                </div>
            </form>
        </div>
    )
}

export default CreateUser;
