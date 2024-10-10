---
layout: note-layout  
title: Custom Hooks  
---

# Custom Hooks

## Overview
Custom hooks allow you to extract and reuse logic between different components in React. They are JavaScript functions that follow the `use` naming convention and can call other hooks like `useState`, `useEffect`, or `useContext`. Custom hooks make your code more modular, clean, and reusable by encapsulating common logic.

## Key Points and Code Snippets

**Creating a Custom Hook for Fetching Data**

Demonstrates how to create a custom hook for fetching data with `useEffect` and `useState`

```jsx
import React, { useState, useEffect } from 'react';

// Custom hook for data fetching
const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading };
};

// Usage in a component
const DataDisplay = ({ url }) => {
  const { data, loading } = useFetch(url);

  if (loading) return <p>Loading...</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

// Usage
<DataDisplay url="https://api.example.com/data" />
```

---

**Creating a Custom Hook from Input Handling**

Shows how to create a custom hook for managing form inputs and resets.

```jsx
import React, { useState } from 'react';

// Custom hook for form input handling
const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return { value, onChange: handleChange, reset };
};

// Usage in a form component
const FormComponent = () => {
  const name = useInput('');
  const email = useInput('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Name: ${name.value}, Email: ${email.value}`);
    name.reset();
    email.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" {...name} />
      <input type="email" placeholder="Email" {...email} />
      <button type="submit">Submit</button>
    </form>
  );
};

// Usage
<FormComponent />
```

---

**Custom Hook for Managing Local Storage**

Explains how to create a custom hook to interact with `localStorage`.


```jsx
import React, { useState, useEffect } from 'react';

// Custom hook for using localStorage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error setting localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

// Usage in a component
const LocalStorageComponent = () => {
  const [name, setName] = useLocalStorage('name', '');

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter your name"
      />
      <p>Name stored in localStorage: {name}</p>
    </div>
  );
};

// Usage
<LocalStorageComponent />
```

---

**When to Use Custom Hooks**

- **Reuse Logic**: If multiple components need to use the same logic (eg fetching data, managing forms, handling local storage), you should considr using custom hooks.
- **Encapsulate Side Effects**: Custom hooks are useful for encapsultaing side effects, such as data fetching or subscriptions
- **Make Code More Modular**: By moving logic out of components and ito hooks, you make your code more modular and maintainable.


