import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

const App = () => {
  const ctx = useContext(AuthContext);
  return (
    <>
      <MainHeader />
      <main>
        {!ctx.isLoggedIn && <Login />}
        {ctx.isLoggedIn && <Home />}
      </main>
    </>
  );
};

export default App;