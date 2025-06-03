import { type } from '@testing-library/user-event/dist/type';
import { useReducer } from 'react';

const initialInputState = {
   inputValue: '',
   wasTouched: false
};

const inputStateReducer = (prevState, action) => {
   if (action.type === 'INPUT_CHANGE') {
      return {
         inputValue: action.value,
         wasTouched: prevState.wasTouched
      };
   };
   if (action.type === 'INPUT_BLUR') {
      return {
         inputValue: prevState.inputValue,
         wasTouched: true,
      };
   };
   if (action.type === 'RESET_INPUT') {
      return {
         inputValue: '',
         wasTouched: false,
      }
   };
   return initialInputState;
};

const useMyInput = (validateValueFunc) => {
   const [inputState, dispatchAction] = useReducer(inputStateReducer, initialInputState);

   const isValueValid = validateValueFunc(inputState.inputValue);
   const isInputInvalid = !isValueValid && inputState.wasTouched;

   const inputChangeHandler = (e) => {
      dispatchAction({ type: 'INPUT_CHANGE', value: e.target.value });
   };

   const inputLostFocusHandler = () => {
      dispatchAction({ type: 'INPUT_BLUR' });
   };

   const resetValue = () => {
      dispatchAction({ type: 'RESET_INPUT' });
   };

   return {
      value: inputState.inputValue,
      hasError: isInputInvalid,
      isValid: isValueValid,
      inputChangeHandler,
      inputLostFocusHandler,
      resetValue,
   };
};

export default useMyInput;