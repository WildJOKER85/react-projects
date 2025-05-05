import Costs from "./components/Costs/Costs";
import NewCost from "./components/NewCost/NewCost";

const App = () => {
  const costs = [
    {
      date: new Date(2021, 2, 12),
      description: "Холодильник",
      amount: 870.99,
    },
    {
      date: new Date(2021, 11, 25),
      description: "Телевизор",
      amount: 440.55,
    },
    {
      date: new Date(2021, 8, 30),
      description: "Стиральная машина",
      amount: 650.44,
    },
  ];

  return (
    <div>
      <NewCost />
      <Costs items={costs} />
    </div>
  );
};

export default App;
