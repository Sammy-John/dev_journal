---
layout: note-layout  
title: Component Lifecycle  
---

# Component Lifecycle

## Overview
The lifecycle of a React component refers to the phases a component goes through from its creation to its removal from the DOM. In class components, there are specific lifecycle methods that can be used to control behavior at different stages. In functional components, hooks like `useEffect` are used to manage lifecycle-like behavior.

## Key Points and Code Snippets

**Class Component Lifecycle Methods**

Demonstrates the three main lifecyle methods: `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

```jsx
// Class component demonstrating basic lifecycle methods.
class LifecycleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Hello, world!" };
    console.log("Constructor: Component is being constructed");
  }

  componentDidMount() {
    console.log("Component Did Mount: Component has been added to the DOM");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component Did Update: Component has updated");
  }

  componentWillUnmount() {
    console.log("Component Will Unmount: Component is about to be removed from the DOM");
  }

  render() {
    return <h1>{this.state.message}</h1>;
  }
}

// Usage
<LifecycleComponent />

```

---

**Using `useEffect` in Functional Components**

Shows how to replicate lifecycle behaviour in functional components with `useEffect`.

```jsx
// Functional component using useEffect to mimic lifecycle methods.
import React, { useState, useEffect } from "react";

const FunctionalLifecycleComponent = () => {
  const [message, setMessage] = useState("Hello, world!");

  useEffect(() => {
    console.log("Component Did Mount: Component has been added to the DOM");

    return () => {
      console.log("Component Will Unmount: Cleanup before the component is removed");
    };
  }, []); // Empty array ensures this runs only once (on mount/unmount).

  useEffect(() => {
    console.log("Component Did Update: Component has updated");
  }, [message]); // Runs when `message` changes.

  return <h1>{message}</h1>;
};

// Usage
<FunctionalLifecycleComponent />
```
---

## Lifecycle Phases

Breaks down the mounting, updating, and unmounting phases.

**Mounting Phase**
- In **class components**, the `constructor` and `componentDidMount` methods are called during this phase.
- In **functional components**, you use the `useEffect` hook with an empty dependancey array to mimic the behaviour of `componentDidMount`

---

**Updating Phase**
- In **class components**, `componentDidUpdate` is called whenever the components state or props change.
- In **functional components**, the `useEffect` hook is used with a dependancy array to listen for specific changes and update accordingly.

---

** Unmounting Phase**

- In **class components**, `componentWillUnmount` is used for cleanup when the component is removed from the DOM.
- In **functional components**, the `useEffect` hook can return a cleanup function to mimic the behaviour.




