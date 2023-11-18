import { Middleware } from '@reduxjs/toolkit';
import { RootState } from './store';
import { CounterState } from "../features/counter/counterSlice";

const myMiddleware: Middleware = store => next => action => {
    // Call the next dispatch method in the middleware chain.
    const result = next(action);
  
    // Run your function after dispatch with the updated state.
    const currentState: RootState = store.getState();
    myFunction(currentState.list);
  
    // Return the result to the dispatch in case it's needed by other middleware or components.
    return result;
  };
  
  // Your function to run after dispatch.
  const myFunction = (list: CounterState) => {
    localStorage.setItem("list_item", JSON.stringify(list.list))
    

    // Your logic using currentState here
  };
  
  export default myMiddleware;