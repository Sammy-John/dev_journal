---
layout: note-layout  
title: useEffect Hook  
---

# useEffect Hook

## Overview
The `useEffect` hook allows you to perform side effects in your functional components. Side effects include data fetching, setting up subscriptions, or manually changing the DOM. By default, `useEffect` runs after every render, but you can control when it runs by passing a dependency array.

## Key Points and Code Snippets

**Basic Usage of useEffect**
```jsx
import React, { useState, useEffect } from 'react';

const ExampleComponent = () => {
  const [count, setCount] = useState(0);

  // useEffect that runs after every render
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
};

// Usage
<ExampleComponent />
