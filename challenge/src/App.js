import './App.css';
import { useState } from 'react';
import CreateUser from './components/CreateUser/CreateUser';
import UserList from './components/UserList/UserList';

const App = () => {
  const [users, setUsers] = useState([]);

  const addUserHandler = (user) => {
    setUsers((prevUsers) => {
      return [...prevUsers, { id: Math.random().toString(), ...user }];
    });
  }

  return (
    <div className="App">
      <CreateUser addUser={addUserHandler} />
      <UserList items={users} />
    </div>
  );
}

export default App;
