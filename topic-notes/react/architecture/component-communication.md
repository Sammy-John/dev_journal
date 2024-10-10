---
layout: note-layout  
title: Component Communication  
---

# Component Communication

## Overview
In React, components need to communicate with each other to share data and functionality. This communication is typically done through props, callbacks, or React's Context API. Properly managing communication between components ensures a smooth flow of data in the application.

## Key Points and Code Snippets

**Passing Props**

Simple parent-to-child communication.

```jsx
// Parent component passing data (props) to child component.
const ParentComponent = () => {
  const message = "Hello from Parent!";
  return <ChildComponent message={message} />;
};

const ChildComponent = ({ message }) => {
  return <h1>{message}</h1>;
};

// Usage
<ParentComponent />
```

---

**Callback Functions for Child-to-Parent Communication**

For chils-to-parent communication.

```jsx
// Child component sends data back to the parent through a callback function.
const ParentComponent = () => {
  const handleChildData = (data) => {
    console.log("Data from child:", data);
  };

  return <ChildComponent sendData={handleChildData} />;
};

const ChildComponent = ({ sendData }) => {
  const handleClick = () => {
    sendData("Hello Parent!");
  };

  return <button onClick={handleClick}>Send Data to Parent</button>;
};

// Usage
<ParentComponent />
```

---

**Lifting State Up**

Sharing state between sibling components by lifting it to the common parent.

```jsx
// State is lifted up to the common ancestor to share between sibling components.
const ParentComponent = () => {
  const [sharedData, setSharedData] = React.useState("");

  return (
    <div>
      <ChildComponentA setData={setSharedData} />
      <ChildComponentB data={sharedData} />
    </div>
  );
};

const ChildComponentA = ({ setData }) => {
  const handleChange = (e) => {
    setData(e.target.value);
  };

  return <input onChange={handleChange} placeholder="Type something" />;
};

const ChildComponentB = ({ data }) => {
  return <h1>{data}</h1>;
};

// Usage
<ParentComponent />
```

---

**Using Context API for Deep Communication**

For sharing data between distant components without proper drilling.

```jsx
import React, { createContext, useContext } from "react";

// Creating context to share data across distant components.
const DataContext = createContext();

const ParentComponent = () => {
  const sharedData = "Hello from Context!";
  
  return (
    <DataContext.Provider value={sharedData}>
      <ChildComponent />
    </DataContext.Provider>
  );
};

const ChildComponent = () => {
  const data = useContext(DataContext);
  return <h1>{data}</h1>;
};

// Usage
<ParentComponent />
```

