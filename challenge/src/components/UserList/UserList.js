import styles from './UserList.module.css';

const UserList = (props) => {
    return (
        <div className={styles['user-list']}>
            {props.items.map((user) => {
                return (
                    <div key={user.id} className={styles['user-item']}>
                        <p>{`${user.name} - ${user.age} лет`}</p>
                    </div>
                );
            })}
        </div>
    )
}

export default UserList;
