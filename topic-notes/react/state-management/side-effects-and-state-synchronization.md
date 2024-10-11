---
layout: note-layout  
title: Side Effects and State Synchronization  
---

# Side Effects and State Synchronization

## Overview
In React, side effects refer to operations that affect something outside the component, such as data fetching, setting up subscriptions, or updating the DOM. React’s `useEffect` hook is commonly used to handle side effects. State synchronization ensures that the component’s state is consistent with external data sources, such as APIs, or with other parts of the app. Synchronizing state with external changes often requires careful use of effects and state management.

## Key Points and Code Snippets

**Handling Side Effects with useEffect**

Demonstrates how to handle common side effects like data fetching and updating the DOM.


```jsx
import React, { useState, useEffect } from 'react';

const DataFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Side effect for fetching data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once (on mount)

  if (loading) return <p>Loading...</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

// Usage
<DataFetcher />
```

---

**Synchronizing State with External Data**

Explains how to synchronize component state with external data sources (eg, system time, URL parameters )


```jsx
import React, { useState, useEffect } from 'react';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  // Side effect that updates the state every second to sync with the system time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once (on mount)

  return <p>Current Time: {time.toLocaleTimeString()}</p>;
};

// Usage
<Clock />
```

---

**Synchronizing Component State with URL Parameters**


```jsx

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const [query, setQuery] = useState('');
  const searchParams = useQuery();

  // Synchronize component state with URL query parameters
  useEffect(() => {
    const searchQuery = searchParams.get('query');
    if (searchQuery) {
      setQuery(searchQuery);
    }
  }, [searchParams]); // Sync whenever the URL changes

  return <p>Search results for: {query}</p>;
};

// Usage
<SearchResults />
```

---

**Cleaning Up Side Effects**

Shows how to use cleanup functions in `useEffect` to remove event listeners, clear intervals, or prevent memory leaks.


```jsx
import React, { useState, useEffect } from 'react';

const EventListenerComponent = () => {
  const [keyPressed, setKeyPressed] = useState(null);

  // Side effect that adds an event listener
  useEffect(() => {
    const handleKeyPress = (e) => {
      setKeyPressed(e.key);
    };

    window.addEventListener('keydown', handleKeyPress);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []); // Effect runs once on mount, and the cleanup runs on unmount

  return <p>Key Pressed: {keyPressed}</p>;
};

// Usage
<EventListenerComponent />
```

---

**Best Practices for Side Effects and State Synchronization**

- **Use useEffect for Side Effects:** Reacts `useEffect` is the primary tool for handling side effects such as data fetching, event listeners, and updating the DOM based on state changes. 
- **Dependancy Arrays** Ensure the correct use of the dependancy array in `useEffect` to avoid infinite loops or missed updates. Include variables or state that the effect depends on.
- **Cleanup Effects:** Always clean up side effects such as timers or event listeners in the cleanup function of `useEffect` to avoid memory leaks.
- **State Synchronization** For state that depends on external data (eg. APIs, URL parameters, or system time), synchronize the state using `useEffect` and ensure it updates properly when external changes occur.
  

