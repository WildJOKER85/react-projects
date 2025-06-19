import { Route } from "react-router-dom";

const Home = () => {
   return (
      <div>
         <h1>Home Page</h1>
         <Route path='/home/new-user'>
            <h2>Добро Пожаловать!</h2>
            <p>Мы всегда рады новым друзьям!</p>
         </Route>
      </div>
   );
};

export default Home;
