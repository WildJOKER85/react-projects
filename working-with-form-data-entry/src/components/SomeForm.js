import useMyInput from '../hooks/use-myInput';

const isInputEmpty = val => val.trim() !== '';

const SomeForm = () => {
   const {
      value: enteredName,
      hasError: hasNameError,
      isValid: isEnteredValidName,
      inputChangeHandler: nameInputChangeHandler,
      inputLostFocusHandler: nameInputLostFocusHandler,
      resetValue: resetValueName,
   } = useMyInput(isInputEmpty);

   const {
      value: enteredSurName,
      hasError: hasSurNameError,
      isValid: isEnteredValidSurName,
      inputChangeHandler: surNameInputChangeHandler,
      inputLostFocusHandler: surNameInputLostFocusHandler,
      resetValue: resetValueSurName,
   } = useMyInput(isInputEmpty);

   const {
      value: enteredEmail,
      hasError: hasEmailError,
      isValid: isEnteredValidEmail,
      inputChangeHandler: emailInputChangeHandler,
      inputLostFocusHandler: emailInputLostFocusHandler,
      resetValue: resetValueEmail,
   } = useMyInput(val => val.includes('@'));

   let isFormValid = false;
   if (isEnteredValidName && isEnteredValidSurName && isEnteredValidEmail) {
      isFormValid = true;
   };

   const formSubmitHandler = (e) => {
      e.preventDefault();

      if (!isFormValid) {
         return;
      };

      resetValueName();
      resetValueSurName();
      resetValueEmail();
   };

   const nameInputClasses = hasNameError ? 'form-control invalid' : 'form-control';
   const surNameInputClasses = hasSurNameError ? 'form-control invalid' : 'form-control';
   const emailInputClasses = hasEmailError ? 'form-control invalid' : 'form-control';

   return (
      <form onSubmit={formSubmitHandler}>
         <div className="control-group">
            <div className={nameInputClasses}>
               <label htmlFor="name">Введите Имя</label>
               <input
                  type="text"
                  id="name"
                  value={enteredName}
                  onChange={nameInputChangeHandler}
                  onBlur={nameInputLostFocusHandler}
               />
               {hasNameError && <p className='error-text'>Нужно обязательно ввести имя</p>}
            </div>
            <div className={surNameInputClasses}>
               <label htmlFor="surName">Введите Фамилию</label>
               <input
                  type="text"
                  id="surName"
                  value={enteredSurName}
                  onChange={surNameInputChangeHandler}
                  onBlur={surNameInputLostFocusHandler}
               />
               {hasSurNameError && <p className='error-text'>Нужно обязательно ввести фамилию</p>}
            </div>
         </div>
         <div className={emailInputClasses}>
            <label htmlFor="email">Введите E-Mail</label>
            <input
               type="email"
               id="email"
               value={enteredEmail}
               onChange={emailInputChangeHandler}
               onBlur={emailInputLostFocusHandler}
            />
            {hasEmailError && <p className='error-text'>Нужно обязательно ввести email</p>}
         </div>
         <div className="form-actions">
            <button disabled={!isFormValid}>Отправить</button>
         </div>
      </form>
   );
};

export default SomeForm;