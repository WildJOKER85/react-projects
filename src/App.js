import Costs from "./components/Costs/Costs";
import NewCost from "./components/NewCost/NewCost";
import { useState } from "react";

const INITIAL_COSTS = [
  {
    id: "c1",
    date: new Date(2021, 2, 12),
    description: "Холодильник",
    amount: 870.99,
  },
  {
    id: "c2",
    date: new Date(2021, 11, 25),
    description: "Телевизор",
    amount: 440.55,
  },
  {
    id: "c3",
    date: new Date(2020, 8, 30),
    description: "Стиральная машина",
    amount: 650.44,
  },
];

const App = () => {
  const [costs, setCosts] = useState(INITIAL_COSTS);

  const addCostHandler = (cost) => {
    setCosts((prevCosts) => {
      return [cost, ...prevCosts];
    });
  };

  return (
    <div>
      <NewCost onAddCost={addCostHandler} />
      <Costs items={costs} />
    </div>
  );
};

export default App;
