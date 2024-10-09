---
layout: note-layout  
title: Error Boundaries  
---

# Error Boundaries

## Overview
Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of crashing the entire application. Error boundaries catch errors during rendering, in lifecycle methods, and in constructors of the whole tree below them. However, they do not catch errors in event handlers.

## Key Points and Code Snippets

**Creating an Error Boundary Class Component**

Demonstrates how to create an error boundary using a class component.

```jsx
// A simple Error Boundary component to catch errors in the child components.
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service
    console.log("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI when an error occurs
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

// Usage: Wrap components that may throw errors with the ErrorBoundary.
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
```

---

**Error Boundaries Do Not Catch Event Handlers**

Error boundaries don't catch errors in event handlers.

```jsx
const MyComponent = () => {
  const handleClick = () => {
    throw new Error("An error occurred in the event handler");
  };

  return <button onClick={handleClick}>Click me</button>;
};

// Usage
// Note: Error Boundaries don't catch this type of error.
<MyComponent />
```

---

**How to Catch Event Handler Errors**

Manual way of catching errors in event handlers

```jsx
// Manually catching errors in event handlers.
const MyComponent = () => {
  const handleClick = () => {
    try {
      throw new Error("An error occurred in the event handler");
    } catch (error) {
      console.log("Caught error:", error);
    }
  };

  return <button onClick={handleClick}>Click me</button>;
};

// Usage
<MyComponent />
```

----

**When to Use Error Boundaries**

- **Component Tree Protection:** Use Error Boundaries to prevent your entire app from crashing when a part of it fails.
- **Third-Party Code:** If using third-party libraries or custom components that could fail during rendering, Error Boundaries ensure a fallback UI is shown.
- **Isolating Errors:** Boundaries can be used around critical areas like user interfaces or data-heavy components to gracefully handle issues.
