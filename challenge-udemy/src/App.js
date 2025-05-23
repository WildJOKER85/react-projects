import CreateUser from "./components/Users/CreateUser";
import UserList from "./components/Users/UserList";
import { useState } from "react";

const App = () => {
  const [userList, setUserList] = useState([]);

  const createUserHandler = (name, age) => {
    setUserList((prevUserList) => {
      return [...prevUserList, { name: name, age: age, id: Math.random().toString() }];
    });
  };

  return (
    <>
      <CreateUser onCreateUser={createUserHandler} />
      <UserList users={userList} />
    </>
  );
};

export default App;