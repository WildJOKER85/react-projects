import { useState } from 'react';

const useInput = (validateValueFunc) => {
   const [enteredValue, setEnteredValue] = useState('');
   const [wasInputTouched, setWasInputTouched] = useState(false);

   const isValueValid = validateValueFunc(enteredValue);

   const isInputInvalid = !isValueValid && wasInputTouched;

   const inputChangeHandler = (e) => {
      setEnteredValue(e.target.value);
   };

   const inputLostFocusHandler = () => {
      setWasInputTouched(true);
   };

   const resetValues = () => {
      setEnteredValue('');
      setWasInputTouched(false);
   };

   return {
      value: enteredValue,
      hasError: isInputInvalid,
      isValid: isValueValid,
      inputChangeHandler,
      inputLostFocusHandler,
      resetValues
   };
};

export default useInput; 