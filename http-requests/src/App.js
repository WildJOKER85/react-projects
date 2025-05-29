import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import JokeList from "./components/JokeList";
import AddJoke from "./components/AddJoke";

const App = () => {
  const [jokes, setJokes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchJokesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('https://react-curse-http-730fa-default-rtdb.firebaseio.com/jokes.json');
      if (!response.ok) {
        throw new Error('Что-то пошло не так...');
      }
      const data = await response.json();

      const loadedJokes = [];

      for (const key in data) {
        loadedJokes.push({
          id: key,
          type: data[key].type,
          setup: data[key].setup,
          punchline: data[key].punchline
        });
      }

      setJokes(loadedJokes);
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchJokesHandler();
  }, [fetchJokesHandler]);

  const addJokeHandler = async (joke) => {
    const response = await fetch('https://react-curse-http-730fa-default-rtdb.firebaseio.com/jokes.json', {
      method: 'POST',
      body: JSON.stringify(joke),
      headers: {
        'Content-type': 'application/json'
      }
    });
    const data = await response.json();
  };

  let content = <p>Шуток не найдено.</p>;
  if (jokes !== null && jokes !== undefined && jokes.length > 0) {
    content = <JokeList jokes={jokes} />;
  }
  if (isLoading) {
    content = <p>Загрузка шуток...</p>;
  }
  if (error) {
    content = error;
  }

  return (
    <React.Fragment>
      <section>
        <AddJoke onAddJoke={addJokeHandler} />
      </section>
      <section>
        <button onClick={fetchJokesHandler}>Fetch Jokes</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
