---
layout: note-layout  
title: Context API  
---

# Context API

## Overview
The Context API in React is a tool for sharing state across components without passing props down manually at every level. It’s especially useful for global data such as user authentication, themes, or language settings that need to be accessed by many components across the app. It consists of `createContext()`, `Provider`, and `Consumer` or `useContext()` for consuming the context.

## Key Points and Code Snippets

**Creating and Using Context**

Demonstrates how to create a context and use `useContect` to consume it in child components.

```jsx
import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'John', age: 30 });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const UserProfile = () => {
  const { user } = useContext(UserContext); // Access the context using useContext
  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
};

// Usage
<UserProvider>
  <UserProfile />
</UserProvider>
```

---

**Updating Context Data**

Shows how to update shared context data using the setter function.

```jsx
import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: 'John', age: 30 });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext); // Access context and setter

  const changeName = () => {
    setUser({ ...user, name: 'Jane' });
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={changeName}>Change Name</button>
    </div>
  );
};

// Usage
<UserProvider>
  <UserProfile />
</UserProvider>
```

---

**Consuming Multiple Contexts**

Explains how to use multiple contexts in a single component.

```jsx
import React, { createContext, useContext } from 'react';

// Create two contexts
const ThemeContext = createContext();
const LanguageContext = createContext();

const DisplaySettings = () => {
  const theme = useContext(ThemeContext); // Use ThemeContext
  const language = useContext(LanguageContext); // Use LanguageContext

  return (
    <div>
      <p>Current Theme: {theme}</p>
      <p>Current Language: {language}</p>
    </div>
  );
};

// Usage
<ThemeContext.Provider value="dark">
  <LanguageContext.Provider value="English">
    <DisplaySettings />
  </LanguageContext.Provider>
</ThemeContext.Provider>
```

---

**When to Use Context API**

- **Avoid Prop Drilling:** When data needs to be passed through multiple layers of components, the context API provides a way to share data without having to pass props manually at each level.
- **Global State Management:** Its ideal for managing global state like authentication, themes, or settings across an entire application
- **Modular and Scalable:** Context allows breaking down into smaller, reusable pieces making it easier to manage state at different levels of the application.

