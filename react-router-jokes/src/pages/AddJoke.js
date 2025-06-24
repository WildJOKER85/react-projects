import JokeForm from './../components/jokes/JokeForm';
import { useHistory } from 'react-router-dom';

const AddJoke = () => {
   const history = useHistory();

   const addJokeHandler = (jokeData) => {
      console.log(jokeData);

      history.push('/jokes');
   };

   return (
      <div>
         <JokeForm onAddJoke={addJokeHandler} />
      </div>
   );
};

export default AddJoke;
