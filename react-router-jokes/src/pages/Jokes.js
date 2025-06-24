import JokeList from './../components/jokes/JokeList';

const DUMMY_JOKES = [
   {
      id: 'j1',
      topic: 'Programming',
      text: 'How many programmers does it take to change a light bulb? None - It`s a hardware problem',
   },
   {
      id: 'j2',
      topic: 'General',
      text: 'How many programmers does it take to change a light bulb? None - It`s a hardware problem',
   },
];

const Jokes = () => {
   return (
      <div>
         <JokeList jokes={DUMMY_JOKES} />
      </div>
   );
};

export default Jokes;
