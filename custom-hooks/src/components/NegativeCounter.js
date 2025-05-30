import Card from './Card';
import useCounter from '../hooks/use-counter';

const NegativeCounter = () => {
   const counter = useCounter(false);

   return (
      <Card>
         {counter}
      </Card>
   );
};

export default NegativeCounter;
