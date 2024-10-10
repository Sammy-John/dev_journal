---
layout: note-layout  
title: useContext Hook  
---

# useContext Hook

## Overview
The `useContext` hook allows you to access and consume data from a React context in functional components. Context is used for managing global state or passing data deeply through the component tree without prop drilling. With `useContext`, any component within the provider can access the context directly.

## Key Points and Code Snippets

Deomonstrates how to create a context and use the `useContext` hook by passing down a setter function.


**Creating and Using Context**
```jsx
import React, { useState, createContext, useContext } from 'react';

// Create a context
const UserContext = createContext();

const UserProvider = ({ children }) => {
  // State to be shared
  const [user, setUser] = useState({ name: "John", age: 30 });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const UserProfile = () => {
  // Consume the context using useContext
  const { user } = useContext(UserContext);
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

**Updating Context data with useContext**

Shows how to update context data with the `useContext` hook by passing down a setter function.

```jsx
import React, { useState, createContext, useContext } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ name: "John", age: 30 });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);

  const changeName = () => {
    setUser({ ...user, name: "Jane" });
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <button onClick={changeName}>Change Name to Jane</button>
    </div>
  );
};

// Usage
<UserProvider>
  <UserProfile />
</UserProvider>
```

---

**useContext with Multiple Contexts**

Explains how to handle multiple contexts within a single component. 

```jsx
import React, { useContext, createContext } from 'react';

// Create two contexts
const ThemeContext = createContext();
const LanguageContext = createContext();

const DisplaySettings = () => {
  // Use multiple contexts
  const theme = useContext(ThemeContext);
  const language = useContext(LanguageContext);

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

**When to Use useContext**

- **Avoiding Prop Drilling**: `useContext` helps you avoid passing props through multiple levels of the component tree.
- **Global State Management**: Its ideal for sharing data across many components, like authentication data, themes, or settings.
- **Modular State Access**: Context can be used to split up logic into seperate contexts for different parts of your application (eg, theme context, user context)

