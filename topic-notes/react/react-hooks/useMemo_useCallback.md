---
layout: note-layout  
title: useMemo and useCallback Hooks  
---

# useMemo and useCallback Hooks

## Overview
Both `useMemo` and `useCallback` are React hooks used to optimize performance by memoizing values or functions. They prevent unnecessary re-computation or re-creation of values and functions during rendering. `useMemo` returns a memoized value, while `useCallback` returns a memoized function.

## Key Points and Code Snippets

**Using useMemo for Expensive Calculations**

Demonstrates how to memoize expensive calculations to prevent them from running on every render. 

```jsx
import React, { useState, useMemo } from 'react';

const ExpensiveComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Memoize the result of the expensive computation to avoid recalculating it every render
  const expensiveComputation = useMemo(() => {
    console.log('Running expensive computation...');
    return count * 2;
  }, [count]); // Recalculates only when 'count' changes

  return (
    <div>
      <h1>Expensive Computation: {expensiveComputation}</h1>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
};

// Usage
<ExpensiveComponent />
```

---

**Using useCallback to memoize Functions**

Shows how to use `useCallback` to avoid re-creating functions and causing unneccessary re-renders in child components.

```jsx
import React, { useState, useCallback } from 'react';

const Button = React.memo(({ handleClick }) => {
  console.log('Rendering button');
  return <button onClick={handleClick}>Click me</button>;
});

const ParentComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Memoize the function to prevent it from being recreated on every render
  const handleClick = useCallback(() => {
    console.log('Button clicked');
    setCount((prevCount) => prevCount + 1);
  }, []); // Only recreates the function if its dependencies change

  return (
    <div>
      <Button handleClick={handleClick} />
      <p>Count: {count}</p>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
};

// Usage
<ParentComponent />
```

---

**Using useMemo with Arrays or Objects**

Explains how to memoize arrays or objects that undergo operations like filtering or sorting to avoid recalculating on every render.

```jsx
import React, { useState, useMemo } from 'react';

const FilteredList = ({ items, filterTerm }) => {
  // Memoize the filtered list to prevent recalculation on every render unless the items or filterTerm change
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter((item) => item.includes(filterTerm));
  }, [items, filterTerm]);

  return (
    <ul>
      {filteredItems.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

const ParentComponent = () => {
  const [filterTerm, setFilterTerm] = useState('');
  const items = ['apple', 'banana', 'orange', 'grape', 'pear'];

  return (
    <div>
      <input
        type="text"
        value={filterTerm}
        onChange={(e) => setFilterTerm(e.target.value)}
        placeholder="Filter items"
      />
      <FilteredList items={items} filterTerm={filterTerm} />
    </div>
  );
};

// Usage
<ParentComponent />

```

**When to Use useMemo and useCallback**

- **`useMemo`**:
  - Use when you have expensive calculations or operations (eg. sorting, filtering) that shouldn't be recomputed on every render unless dependencies change.
  - Use with arrays, objects, or complex computations that can benefit from memoization.

- **`useCallback`**
  - Use to memoize functions so that they aren't re-created every render. This is especially useful when passing callback functions as props to child components that might otherwise re-render unnecessarily.
  - Use in conjunction with `React.memo` to avoid unneccessary re-renders in child components.

