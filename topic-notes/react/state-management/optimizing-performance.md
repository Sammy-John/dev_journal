---
layout: note-layout  
title: Optimizing Performance  
---

# Optimizing Performance

## Overview
Optimizing performance in React applications ensures that your app remains fast and responsive, especially as it scales. Performance issues can arise from unnecessary re-renders, expensive computations, and large component trees. React provides built-in tools and techniques, such as `React.memo`, `useMemo`, `useCallback`, and code-splitting, to optimize the rendering and improve performance.

## Key Points and Code Snippets

### **Using React.memo to Prevent Unnecessary Re-renders**
`React.memo` is a higher-order component that memoizes a component, preventing it from re-rendering unless its props change.

```jsx
import React from 'react';

// Memoized component that only re-renders if its props change
const ChildComponent = React.memo(({ count }) => {
  console.log('ChildComponent re-rendered');
  return <p>Count: {count}</p>;
});

const ParentComponent = () => {
  const [count, setCount] = React.useState(0);
  const [text, setText] = React.useState('');

  return (
    <div>
      <ChildComponent count={count} />
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
    </div>
  );
};

// Usage
<ParentComponent />
```

---

**Optimizing with useMemo**

`useMemo` memoizes the result of expensive calculations, ensuring that the value is recalculated only when its dependencies change.

In this example, the expensive calculation is only recalculated when `count` changes, improving performance when typing the input.

```jsx
import React, { useState, useMemo } from 'react';

const ExpensiveCalculationComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Memoize the result of an expensive calculation
  const expensiveCalculation = useMemo(() => {
    console.log('Running expensive calculation...');
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>Expensive Calculation: {expensiveCalculation}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
    </div>
  );
};

// Usage
<ExpensiveCalculationComponent />
```

---

**Optimizing with useCallback**

`useCallback` memoizes callback functions, preventing them from being recreated on every render. This is particulalry useful when passing callbacks to memoized child components.

Here, `useCallback` prevents the `handleClick` function being recreated on every render, which avoids unnecessary re-renders of the `Button` component.

```jsx
import React, { useState, useMemo } from 'react';

const ExpensiveCalculationComponent = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');

  // Memoize the result of an expensive calculation
  const expensiveCalculation = useMemo(() => {
    console.log('Running expensive calculation...');
    return count * 2;
  }, [count]);

  return (
    <div>
      <p>Expensive Calculation: {expensiveCalculation}</p>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something"
      />
    </div>
  );
};

// Usage
<ExpensiveCalculationComponent />
```

---

**Code-Splitting for Performance**

Code-splitting allows you to split your application into smaller bundles, loading only the necessary parts of the code when needed. This reduces the initial load time of your app.

In this example, `LazyComponent` is only loaded when its needed, reducing the initial load time.

```jsx
import React, { Suspense, lazy } from 'react';

// Lazy load a component
const LazyComponent = lazy(() => import('./LazyComponent'));

const ParentComponent = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};

// Usage
<ParentComponent />
```

---

**Virtualization for Large Lists**

When rendering large lists, you can optimize performance by using virtualizatoin. Virtualization renders only the visible items, which improves rendering performance.

In this example, only the rows visible within the viewport are rendered, significantly improving performance when working with large datasets.

```jsx
import { FixedSizeList as List } from 'react-window';

const Row = ({ index, style }) => (
  <div style={style}>Row {index}</div>
);

const LargeList = () => {
  return (
    <List
      height={400}
      itemCount={1000}
      itemSize={35}
      width="100%"
    >
      {Row}
    </List>
  );
};

// Usage
<LargeList />
```
---

**Best Practices for Optimizing Performance**

1. **Avoid Unnecessary Re-renders** Use `React.memo` and `useCallback` to prevent unneccessary re-renders of child components.
2. **Memoize Expensive Calculations:** Use `useMemo` for expensive calculations to avodi recalculating them on every render.
3. **Code-Splitting** Implement code-splitting with `React.Lazy` and `Suspense` to load only the necessary code when its needed.
4. **Virtualize Large Lists** For large lists, use libraries like `react-window` to render only the items in the viewport.

