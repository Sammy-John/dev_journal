---
layout: note-layout  
title: useReducer Hook  
---

# useReducer Hook

## Overview
The `useReducer` hook is an alternative to `useState` for managing more complex state logic in React functional components. It is similar to how Redux works, where state transitions are handled by dispatching actions to a reducer function. `useReducer` is useful when state management requires multiple values or more sophisticated logic.

## Key Points and Code Snippets

**Basic useReducer Example**

Demonstrates how to use `useReducer` for managing a simple counter state with dispatch actions.


```jsx
import React, { useReducer } from 'react';

// Define the reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

const Counter = () => {
  // Use useReducer to manage the state
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};

// Usage
<Counter />
```

---

**useReducer with Complex State**

Shows how to manage more complex state, such as handling multiple pieces of state like `name` and `age`.


```jsx
import React, { useReducer } from 'react';

// Define the reducer function for managing complex state
const reducer = (state, action) => {
  switch (action.type) {
    case 'setName':
      return { ...state, name: action.payload };
    case 'setAge':
      return { ...state, age: action.payload };
    default:
      return state;
  }
};

const UserForm = () => {
  // Initialize complex state with useReducer
  const [state, dispatch] = useReducer(reducer, { name: '', age: 0 });

  return (
    <div>
      <input
        type="text"
        placeholder="Enter your name"
        value={state.name}
        onChange={(e) => dispatch({ type: 'setName', payload: e.target.value })}
      />
      <input
        type="number"
        placeholder="Enter your age"
        value={state.age}
        onChange={(e) => dispatch({ type: 'setAge', payload: Number(e.target.value) })}
      />
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
    </div>
  );
};

// Usage
<UserForm />
```

---

**useReducer with Initial State and Lazy Initialization**

Explains how to initialize state lazily using a function when working with `useReducer`

```jsx

import React, { useReducer } from 'react';

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Lazy initialization function
const init = (initialCount) => {
  return { count: initialCount };
};

const Counter = ({ initialCount }) => {
  // Lazy initialization of state
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};

// Usage
<Counter initialCount={5} />
```

---

**When to Use useReducer**

- **Complex State Logic:** When you have state transitions that depend on multiple values or have complex logic, `useReducer` provides a clean way to manage this.
- **Multiple State Updates**: When state updates depend on multiple actions, `useReducer` can help avoid excessive calls to `setState`
- **Predictable State Transitions**: By using a reducer, state transitions become predictable and easier to debug.

