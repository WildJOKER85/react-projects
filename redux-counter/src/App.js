import Header from "./components/Header";
import Auth from "./components/Auth";
import Counter from "./components/Counter";
import UserProfile from './components/UserProfile';
import { useSelector } from "react-redux";

const App = () => {
  const isUserLoggedIn = useSelector(state => state.auth.isUserLoggedIn);

  return (
    <div>
      <Header />
      {!isUserLoggedIn && <Auth />}
      {isUserLoggedIn && <UserProfile />}
      <Counter />
    </div>
  );
};

export default App;
