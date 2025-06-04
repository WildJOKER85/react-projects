const redux = require('redux');

const counterReducer = (state = { counter: 0 }, action) => {
   if (action.type === 'increment') {
      return {
         counter: state.counter + 1,
      };
   };
   if (action.type === 'decrement') {
      return {
         counter: state.counter - 1,
      };
   };
   return state;
};

const store = redux.legacy_createStore(counterReducer);

const counterSubscriber = () => {
   const newState = store.getState();
   console.log(newState);
};

store.subscribe(counterSubscriber);
store.dispatch({ type: 'increment' });
store.dispatch({ type: 'decrement' });