import JokeForm from './../components/jokes/JokeForm';
import { useHistory } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import { addJoke } from '../utils/firebase-api';
import { useEffect } from 'react';

const AddJoke = () => {
   const history = useHistory();
   const { sendHttpRequest, status } = useHttp(addJoke,);

   useEffect(() => {
      if (status === 'completed') {
         history.push('/jokes');
      }
   }, [status, history]);

   const addJokeHandler = (jokeData) => {
      sendHttpRequest(jokeData);
   };

   return (
      <div>
         <JokeForm isLoading={status === 'pending'} onAddJoke={addJokeHandler} />
      </div>
   );
};

export default AddJoke;
