import Card from "../UI/Card";
import "./Costs.css";
import CostsFilter from "./CostsFilter";
import { useState } from "react";
import CostsList from "./CostsList";
import CostsDiagram from "./CostsDiagram";

const Costs = (props) => {
  const [selectedYear, setSelectedYear] = useState("2021");

  const yearChangeHandler = (year) => {
    setSelectedYear(year);
  };

  const filteredCosts = props.items.filter((cost) => {
    return cost.date.getFullYear().toString() === selectedYear;
  });

  return (
    <div>
      <Card className="costs">
        <CostsFilter onChangeYear={yearChangeHandler} year={selectedYear} />
        <CostsDiagram costs={filteredCosts} />
        <CostsList costs={filteredCosts} />
      </Card>
    </div>
  );
};

export default Costs;
