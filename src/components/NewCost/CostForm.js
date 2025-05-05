import "./CostForm.css";
import { useState } from "react";

const CostForm = () => {
  const [inputName, setInputName] = useState("");
  const [inputAmount, setInputAmount] = useState("");
  const [inputDate, setInputDate] = useState("");

  // const [userInput, setUserInput] = useState({
  //   name: "",
  //   amount: "",
  //   date: "",
  // });

  const nameChangeHandler = (e) => {
    setInputName(e.target.value);
    // setUserInput({
    //   ...userInput,
    //   name: e.target.value,
    // });

    // setUserInput((prevState) => {
    //   return { ...prevState, name: e.target.value };
    // });
  };

  const amountChangeHandler = (e) => {
    setInputAmount(e.target.value);
  };

  const dateChangeHandler = (e) => {
    setInputDate(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const costData = {
      name: inputName,
      amount: +inputAmount,
      date: new Date(inputDate),
    };
    setInputName("");
    setInputAmount("");
    setInputDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-cost__controls"></div>
      <div className="new-cost__control">
        <label>Название</label>
        <input type="text" onChange={nameChangeHandler} value={inputName} />
      </div>
      <div className="new-cost__control">
        <label>Сумма</label>
        <input
          type="number"
          min="0.01"
          step="0.01"
          onChange={amountChangeHandler}
          value={inputAmount}
        />
      </div>
      <div className="new-cost__control">
        <label>Дата</label>
        <input
          type="date"
          min="2019-01-01"
          step="2025-12-31"
          onChange={dateChangeHandler}
          value={inputDate}
        />
      </div>
      <div className="new-cost__actions">
        <button type="submit">Добавить Расход</button>
      </div>
    </form>
  );
};

export default CostForm;
