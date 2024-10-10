---
layout: note-layout  
title: Component Hierarchy  
---

# Component Hierarchy

## Overview
Component hierarchy refers to the tree-like structure of how components are organized and interact with each other in a React application. Understanding how to structure components in a hierarchy is crucial for managing state, passing data, and building a scalable application.

## Key Points and Code Snippets

**Parent-Child Relationship**
```jsx
// Parent component that passes data (props) to a child component.
const ParentComponent = () => {
  const data = "Hello from Parent!";
  return <ChildComponent message={data} />;
};

const ChildComponent = ({ message }) => {
  return <h1>{message}</h1>;
};

// Usage
<ParentComponent />
```

---

**Component Nesting**

```jsx
// Components can be nested to form a hierarchy, where one component contains others.
const GrandparentComponent = () => {
  return (
    <div>
      <h1>Grandparent</h1>
      <ParentComponent />
    </div>
  );
};

const ParentComponent = () => {
  return (
    <div>
      <h2>Parent</h2>
      <ChildComponent />
    </div>
  );
};

const ChildComponent = () => {
  return <h3>Child</h3>;
};

// Usage
<GrandparentComponent />
```
**Prop Drilling**

```jsx
// Prop drilling is passing props from parent components down to deeply nested child components.
const GrandparentComponent = () => {
  const data = "Hello from Grandparent!";
  return <ParentComponent message={data} />;
};

const ParentComponent = ({ message }) => {
  return <ChildComponent message={message} />;
};

const ChildComponent = ({ message }) => {
  return <h1>{message}</h1>;
};

// Usage
<GrandparentComponent />
```

---

**Context API**

```jsx
import React, { createContext, useContext } from "react";

// Creating context to share data across components without prop drilling.
const MessageContext = createContext();

const GrandparentComponent = () => {
  const message = "Hello from Context!";
  return (
    <MessageContext.Provider value={message}>
      <ParentComponent />
    </MessageContext.Provider>
  );
};

const ParentComponent = () => {
  return <ChildComponent />;
};

const ChildComponent = () => {
  const message = useContext(MessageContext);
  return <h1>{message}</h1>;
};

// Usage
<GrandparentComponent />
```

