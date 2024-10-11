---
layout: note-layout  
title: useEffect Hook  
---

# useEffect Hook

## Overview
The `useEffect` hook allows you to perform side effects in your functional components. Side effects include data fetching, setting up subscriptions, or manually changing the DOM. By default, `useEffect` runs after every render, but you can control when it runs by passing a dependency array.

## Key Points and Code Snippets

**Basic Usage of useEffect**

Demonstrates how `useEffect` runs after every render and how side effects like updating the document title work.

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
```

---

**useEffect with Dependance Array**

Explains how to control the behaviour of `useEffect` with a dependency array to limit when the effect runs.

```jsx
import React, { useState, useEffect } from 'react';

const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);

  // useEffect runs only when 'seconds' changes
  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(timer); // Cleanup when the component unmounts
  }, []); // Empty array means this effect runs only once (on mount)

  return <p>Timer: {seconds} seconds</p>;
};

// Usage
<TimerComponent />
```

---

**Cleaning Up with useEffect**

Shows how to perform cleanup, such as removing event listeners, when a component unmounts or when the effect is run again.


```jsx
import React, { useState, useEffect } from 'react';

const MouseTracker = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Effect that sets up an event listener
  useEffect(() => {
    const updateMousePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []); // Empty array ensures this runs only once

  return (
    <div>
      <p>Mouse Position: {position.x}, {position.y}</p>
    </div>
  );
};

// Usage
<MouseTracker />
```

---

**useEffect with Multiple Dependencies**

Provides and example of how to use `useEffect` to handle multiple depenencies like fetching data when the URL changes.


```jsx
import React, { useState, useEffect } from 'react';

const FetchDataComponent = ({ url }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect with dependencies: re-fetch data when the 'url' changes
  useEffect(() => {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [url]); // Runs the effect when 'url' changes

  if (loading) return <p>Loading...</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

// Usage
<FetchDataComponent url="https://api.example.com/data" />
```

---

**Key Features of useEffect**

- **Dependancy Array**: Controls when the effect runs. Without it, `useEffect` runs after every render. With an empty array, it runs only once (on mount). With dependencies, it runs whenever the values in the array change.
- **Cleanup**: If your effect returns a funciton, React will call it to clean up after the component unmounts or before the effect runs again.

