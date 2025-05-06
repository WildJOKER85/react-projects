import { useState } from "react";
import "./NewCost.css";
import CostForm from "./CostForm";

const NewCost = (props) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const saveCostDataHandler = (inputCostData) => {
    const costData = {
      ...inputCostData,
      id: Math.random().toString(),
    };
    props.onAddCost(costData);
    setIsFormVisible(false); // Скрыть форму после добавления расхода
  };

  const showFormHandler = () => {
    setIsFormVisible(true); // Показать форму
  };

  const hideFormHandler = () => {
    setIsFormVisible(false); // Скрыть форму
  };

  return (
    <div className="new-cost">
      {!isFormVisible && (
        <button onClick={showFormHandler}>Добавить Расходы</button>
      )}
      {isFormVisible && (
        <CostForm
          onSaveCostData={saveCostDataHandler}
          onCancel={hideFormHandler}
        />
      )}
    </div>
  );
};

export default NewCost;
