import styles from './UserList.module.css';
import Card from '../UI/Card';

const UserList = (props) => {
    return (
        <Card className={styles.users}>
            <ul>
                {props.users.map((user) => <li key={user.id}>{user.name} - {user.age} лет</li>)}
            </ul>
        </Card>
    );
};

export default UserList;
