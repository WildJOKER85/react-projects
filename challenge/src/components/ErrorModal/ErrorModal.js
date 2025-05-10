import styles from './ErrorModal.module.css';

const ErrorModal = (props) => {
    return (
        <div className={styles['error-modal']}>
            <div className={styles['modal-items']}>
                <h1>{props.age}</h1>
                <p>{props.text}</p>
                <button onClick={props.onClose}>Закрыть</button>
            </div>
        </div>
    )
}

export default ErrorModal;
