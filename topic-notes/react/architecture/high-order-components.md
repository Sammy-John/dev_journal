---
layout: note-layout  
title: Higher-Order Components  
---

# Higher-Order Components

## Overview
A Higher-Order Component (HOC) is an advanced technique in React for reusing component logic. HOCs are functions that take a component and return a new component with enhanced functionality. They help in organizing cross-cutting concerns such as logging, authentication, or theming in a reusable manner.

## Key Points and Code Snippets

**Basic HOC Example**

Demonstrates how to wrap a component with a Higher-Order Component to add extra functionality.

```jsx
// A Higher-Order Component that adds a greeting to the wrapped component.
const withGreeting = (WrappedComponent) => {
  return (props) => (
    <div>
      <h1>Hello!</h1>
      <WrappedComponent {...props} />
    </div>
  );
};

// Simple component to be wrapped by the HOC.
const SimpleComponent = () => <p>This is a simple component.</p>;

// Wrapping SimpleComponent with the HOC.
const EnhancedComponent = withGreeting(SimpleComponent);

// Usage
<EnhancedComponent />
```

---

**HOC with Additional Props**

Shows how to pass additional props using an HOC.

```jsx
// A HOC that passes additional props to the wrapped component.
const withExtraProps = (WrappedComponent) => {
  return (props) => {
    const extraProps = { extra: "This is an extra prop!" };
    return <WrappedComponent {...props} {...extraProps} />;
  };
};

// Simple component that displays the extra prop.
const DisplayComponent = ({ extra }) => <p>{extra}</p>;

// Wrapping DisplayComponent with the HOC.
const EnhancedDisplayComponent = withExtraProps(DisplayComponent);

// Usage
<EnhancedDisplayComponent />
```

---

**Conditional Rendering with HOC**

Implements authorization logic using a Higher-Order Component.


```jsx
// A HOC that conditionally renders the wrapped component based on a prop.
const withAuthorization = (WrappedComponent) => {
  return ({ isAuthorized, ...props }) => {
    if (!isAuthorized) {
      return <h1>Access Denied</h1>;
    }
    return <WrappedComponent {...props} />;
  };
};

// Simple component that requires authorization.
const SecretComponent = () => <p>This is a secret message.</p>;

// Wrapping SecretComponent with the HOC.
const ProtectedComponent = withAuthorization(SecretComponent);

// Usage
<ProtectedComponent isAuthorized={true} />
<ProtectedComponent isAuthorized={false} />
```

---

**When to Use HOCs**

Highlights practical use cases for HOCs, focusing on cross-cutting concerns and resuablity.

- **Cross-Cutting concerns**: HOCs are ideal for sharing logic related to logging, authentication, error handling, etc.
- **Code Reusability**: HOCs allow you to reuse common logic across multiple components without repeating code.
- **Enhancing components**: You can easily add additional behaviour or props to a component by wrappig it with and HOC.

