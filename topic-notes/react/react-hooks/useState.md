---
layout: note-layout  
title: useState Hook  
---

# useState Hook

## Overview
The `useState` hook is a fundamental React hook that allows you to add state to functional components. It returns an array with two elements: the current state and a function that lets you update that state. This hook enables functional components to have state management similar to class components.

## Key Points and Code Snippets

**Basic Usage of useState**

Shows how to declare a state variable and update it.

```jsx
import React, { useState } from 'react';

const Counter = () => {
  // Declare a state variable 'count' initialized to 0
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Current Count: {count}</p>
      {/* Update the state using setCount */}
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

// Usage
<Counter />
```

---

**Multiple State Variables**

Demonstrates how to manage multiple state variables in a functional component.


```jsx
import React, { useState } from 'react';

const UserInfo = () => {
  // Declare multiple state variables
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="number" 
        placeholder="Enter your age" 
        value={age} 
        onChange={(e) => setAge(Number(e.target.value))} 
      />
      <p>{name ? `Hello, ${name}! You are ${age} years old.` : "Enter your information."}</p>
    </div>
  );
};

// Usage
<UserInfo />
```

---

**Using useState with Objects**

Explains how to manage object state and update specific fields using `useState`.

```jsx

import React, { useState } from 'react';

const UserProfile = () => {
  // Using useState with objects to track multiple related pieces of state
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
        placeholder="Enter your name" 
        value={user.name} 
        onChange={updateName} 
      />
      <input 
        type="number" 
        placeholder="Enter your age" 
        value={user.age} 
        onChange={updateAge} 
      />
      <p>{user.name ? `Hello, ${user.name}! You are ${user.age} years old.` : "Enter your information."}</p>
    </div>
  );
};

// Usage
<UserProfile />
```

---

**Key Features of useState**

- **Initial State**: The argument passed to `useState` is the intiial value of the state variable
-  **State Setter Function**: The second value in the array returned by `useState` is a function that updates the state.
-  **Functional Updates**: When uploading state based on the previous state, you can pass a function to the state setter, eg. `setCount(prevCount => prevCount +1)`
-  

