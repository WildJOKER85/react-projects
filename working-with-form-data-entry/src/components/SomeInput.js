import useInput from '../hooks/use-input';

const SomeInput = () => {
   const {
      value: enteredName,
      hasError: hasNameInputError,
      isValid: isEnteredNameValid,
      resetValues: resetNameInputValues,
      inputChangeHandler: nameInputChangeHandler,
      inputLostFocusHandler: nameInputLostFocusHandler
   } = useInput(val => val.trim() !== '');

   const {
      value: enteredEmail,
      hasError: hasNameEmailError,
      isValid: isEnteredEmailValid,
      resetValues: resetEmailInputValues,
      inputChangeHandler: emailInputChangeHandler,
      inputLostFocusHandler: emailInputLostFocusHandler
   } = useInput(val => val.includes("@"));

   let isFormValid = false;
   if (isEnteredNameValid && isEnteredEmailValid) {
      isFormValid = true;
   };

   const formSubmitHandler = (e) => {
      e.preventDefault();

      if (!isEnteredNameValid) {
         return;
      }
      resetNameInputValues();
      resetEmailInputValues();
   };

   const nameInputClasses = hasNameInputError ? 'form-control invalid' : 'form-control';
   const emailInputClasses = hasNameEmailError ? 'form-control invalid' : 'form-control';

   return (
      <form onSubmit={formSubmitHandler}>
         <div className={nameInputClasses}>
            <label htmlFor="name">Введите Имя</label>
            <input
               type="text"
               id="name"
               onChange={nameInputChangeHandler}
               value={enteredName}
               onBlur={nameInputLostFocusHandler}
            />
            {hasNameInputError && <p className='error-text'>Нужно обязательно ввести имя</p>}
         </div>
         <div className={emailInputClasses}>
            <label htmlFor="email">Введите Email</label>
            <input
               type="email"
               id="email"
               onChange={emailInputChangeHandler}
               value={enteredEmail}
               onBlur={emailInputLostFocusHandler}
            />
            {hasNameEmailError && <p className='error-text'>Нужно обязательно ввести Email</p>}
         </div>
         <div className="form-actions">
            <button disabled={!isFormValid}>Отправить</button>
         </div>
      </form>
   );
};

export default SomeInput;