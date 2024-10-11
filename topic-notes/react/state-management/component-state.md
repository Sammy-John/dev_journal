---
layout: note-layout  
title: Component State  
---

# Component State

## Overview
Component state in React refers to the data or variables that control how a component behaves and renders. State is mutable and can change over time, and any changes to the state trigger a re-render of the component. Functional components use the `useState` hook to manage state, while class components manage state using `this.state` and `setState`.

## Key Points and Code Snippets

**Managing State with useState in Functional Components**

Demonstrates how to use `useState` for managing state in functional components.



```jsx
import React, { useState } from 'react';

const Counter = () => {
  // Declare state variable 'count' initialized to 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      {/* Update state using setCount */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// Usage
<Counter />
```

---

**Managing State in Class Components**

Shows how to declare and update state using `this.state` and `setState` in class components.

```jsx
import React, { Component } from 'react';

class Counter extends Component {
  constructor(props) {
    super(props);
    // Declare state in the constructor
    this.state = { count: 0 };
  }

  // Update state using setState
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

// Usage
<Counter />
```

---

**Multiple Sate Variables with useState**

Explains how to handle multiple state variables in functional components.

```jsx
import React, { useState } from 'react';

const UserInfo = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  return (
    <div>
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter your name"
      />
      <input 
        type="number" 
        value={age} 
        onChange={(e) => setAge(Number(e.target.value))} 
        placeholder="Enter your age"
      />
      <p>Name: {name}</p>
      <p>Age: {age}</p>
    </div>
  );
};

// Usage
<UserInfo />
```

---

**State with Objects and Arrays**

Demonstrates managing more complex state like objects and arrays.

```jsx
import React, { useState } from 'react';

const UserProfile = () => {
  // State with an object
  const [user, setUser] = useState({ name: "", age: 0 });

  const updateName = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const updateAge = (e) => {
    setUser({ ...user, age: Number(e.target.value) });
  };

  return (
    <div>
      <input 
        type="text" 
        value={user.name} 
        onChange={updateName} 
        placeholder="Enter your name"
      />
      <input 
        type="number" 
        value={user.age} 
        onChange={updateAge} 
        placeholder="Enter your age"
      />
      <p>{user.name ? `Hello, ${user.name}! You are ${user.age} years old.` : "Enter your information."}</p>
    </div>
  );
};

// Usage
<UserProfile />
```

---

**Key Concepts of State**

- **State Initialization**: State is initialized using `useState` in functional cmponents and this.state in class components
- **State Updates**: State can be updated via `setState` in class components or by calling the state setter function in functional components (`setCount`, `setName`, etc)
- **State Re-Renders**: Every time the sate is updated, React triggers a re-render of the component to reflect the new state.
- **Managing Complex State**: For managing complex state objects or arrays, you can use `useReducer` or carefully manage state updates with spread operators or state merging.

