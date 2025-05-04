import CostItem from "./CostItem";
import Card from "./Card";
import "./Costs.css";

const Costs = (props) => {
  return (
    <Card className="costs">
      {props.items.map((cost, index) => {
        return (
          <CostItem
            key={index}
            date={cost.date}
            description={cost.description}
            amount={cost.amount}
          />
        );
      })}
    </Card>
  );
};

export default Costs;
