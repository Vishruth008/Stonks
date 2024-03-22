import React from "react";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

// Action types
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";

// Action creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });

// Initial state of the reducer
const initialState = { count: 0 };

// Reducer function
const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

// Create a Redux store with the reducer
const store = createStore(counterReducer);

// Presentational component - Counter
const Counter = ({ count, increment, decrement }) => {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

// Mapping Redux state to component props
const mapStateToProps = (state) => ({
  count: state.count,
});

// Mapping action creators to component props
const mapDispatchToProps = {
  increment,
  decrement,
};

// Connect Counter component to the Redux store
const ConnectedCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

// Root component - App
const App = () => {
  return (
    // Provide the Redux store to the connected components
    <Provider store={store}>
      <ConnectedCounter />
    </Provider>
  );
};

export default App;
