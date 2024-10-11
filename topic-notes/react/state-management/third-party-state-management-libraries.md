---
layout: note-layout  
title: Third-party State Management Libraries  
---

# Third-party State Management Libraries

## Overview
In larger or more complex React applications, managing state with `useState` or `useReducer` may not be sufficient. Third-party state management libraries like Redux, Zustand, Recoil, and MobX provide more scalable solutions to manage global state across components and ensure predictable state transitions. These libraries can be useful when your app has a lot of shared state or complex state interactions.

## Key Points and Code Snippets

### **Redux**
Redux is a popular state management library based on a unidirectional data flow. It uses a central store to manage state, actions to describe state changes, and reducers to handle those actions.


```jsx
// Simple Redux setup for managing a counter
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Reducer function
const counterReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(counterReducer);

// Counter component
const Counter = () => {
  const count = useSelector((state) => state.count); // Access state
  const dispatch = useDispatch(); // Dispatch actions

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};

// Usage
<Provider store={store}>
  <Counter />
</Provider>
```

---

**Zustand**

Zustand is a minimilistic and flexible state management library. Unlike Redux, Zustand doesnt require actions or reducers, and it allows direct mutation of state.

```jsx
import create from 'zustand';

// Create a store using Zustand
const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
}));

const Counter = () => {
  const { count, increment, decrement } = useStore(); // Access state and actions

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

// Usage
<Counter />
```

---

**Recoil**

Recoil is a state management library developed by Facebook. It provides a reactive data-flow graph, where atoms represent shared state, and selectors derive  state. Recoil integrates tightly with Reacts concurrent rendering.

```jsx

import { atom, selector, useRecoilState, RecoilRoot } from 'recoil';

// Define an atom (state)
const countState = atom({
  key: 'countState',
  default: 0,
});

// Selector to derive state
const doubledCountState = selector({
  key: 'doubledCountState',
  get: ({ get }) => {
    const count = get(countState);
    return count * 2;
  },
});

const Counter = () => {
  const [count, setCount] = useRecoilState(countState);
  const doubleCount = useRecoilValue(doubledCountState);

  return (
    <div>
      <p>Count: {count}</p>
      <p>Double Count: {doubleCount}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// Usage
<RecoilRoot>
  <Counter />
</RecoilRoot>
```

---

**MobX**

MobX is a state management library that leverages observables. It automatically tracks state changes and re-renders components when the observed data changes.

```jsx
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';
import React from 'react';

// Observable state
const counterStore = observable({
  count: 0,
  increment() {
    this.count++;
  },
  decrement() {
    this.count--;
  },
});

// Observer component that reacts to state changes
const Counter = observer(() => {
  return (
    <div>
      <p>Count: {counterStore.count}</p>
      <button onClick={() => counterStore.increment()}>Increment</button>
      <button onClick={() => counterStore.decrement()}>Decrement</button>
    </div>
  );
});

// Usage
<Counter />
```

---

**When to use Third-party State Management Libraries**

- **Large Applications** As apps grow, prop drilling and managing local state with hooks can become cumbersome. Third-party libraries like Redux, Zustand or Recoil provides scalable solutions.
- **Complex State Logic** If your app has complex or interdependant state logic (Eg, multiple components depend on the same piece of state), third-party libraries simplify managing such logic.
- **Global State** Use third-party libraries when you need to manage global state that is accessed across multiple components (eg, user authentication, themes, data fetched from an API)
