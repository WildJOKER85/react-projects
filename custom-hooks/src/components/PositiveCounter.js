import Card from './Card';
import useCounter from '../hooks/use-counter';

const PositiveCounter = () => {
   const counter = useCounter();

   return (
      <Card>
         {counter}
      </Card>
   );
};

export default PositiveCounter;