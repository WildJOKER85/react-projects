import "./CostsList.css";
import CostItem from "./CostItem";

const CostsList = (props) => {
  if (props.costs.length === 0) {
    return <h2 className="cost-list__fallback">Нет затрат за этот год</h2>;
  }

  return (
    <ul className="costs-list">
      {props.costs.map((cost) => (
        <CostItem
          key={cost.id}
          date={cost.date}
          description={cost.description}
          amount={cost.amount}
        />
      ))}
    </ul>
  );
};

export default CostsList;
