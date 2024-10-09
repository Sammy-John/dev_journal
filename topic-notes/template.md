---
layout: note-layout  
title: Component Types  
---

# Component Types

## Overview
In React, components are the building blocks of the user interface. Components can be broadly categorized based on their functionality and role within an application. Understanding the different types of components helps to create a clear and organized component architecture.

## Key Points
- **Functional Components**:  
  Functional components are simple JavaScript functions that take props as an argument and return a React element. They are stateless by default but can manage state and lifecycle through hooks.

  ```jsx
// A simple functional component that displays a message.
const FunctionalComponent = ({ message }) => {
  return <h1>{message}</h1>;
};

// Usage
<FunctionalComponent message="Hello from Functional Component!" />
```

This code demonstrates a functional component that receives a `message` prop and displays it inside an `<h1>` tag.

---

- ## **Class Components**:  
  Class components are ES6 classes that extend `React.Component` and contain methods such as `render()`. They are stateful and can have lifecycle methods, but they are less common in modern React development since the introduction of hooks.

  **Class Component**
```jsx
// A basic class component that manages internal state.
class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: "Hello from Class Component!" };
  }

  render() {
    return <h1>{this.state.message}</h1>;
  }
}

// Usage
<ClassComponent />
```

This example demonstrates a **class component** that manages internal state. The `message` state is displayed inside an `<h1>` tag, and the state is initialized in the constructor.


- ## **Presentational Components**:  
  Presentational components are primarily responsible for displaying data and receiving it via props. They are typically stateless and focus on the UI without handling any logic or state manipulation.

  **Presentational Component**
```jsx
// A presentational component that only displays data via props.
const PresentationalComponent = ({ name }) => {
  return <p>Welcome, {name}!</p>;
};

// Usage
<PresentationalComponent name="John" />
```

This example shows a **presentational component** that receives the `name` prop and displays it inside a `<p>` tag. It focuses purely on displaying data without handling any state or logic, making it a typical presentational component.


- ## **Container Components**:  
  Container components manage the logic of the application. They often fetch data, hold state, and pass it down to presentational components via props. They act as the "brains" of the UI.

**Container Component**
```jsx
// A container component that manages state and passes data to a presentational component.
class ContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "John" };
  }

  render() {
    return <PresentationalComponent name={this.state.name} />;
  }
}

// Usage
<ContainerComponent />
```


In this example, the **Container Component** manages the state (`name`) and passes it as a prop to the **Presentational Component**. The container handles the logic and state, while the presentational component focuses on rendering the UI.

---

- **High Order Components (HOCs)**:  
  HOCs are functions that take a component and return a new component with additional props or functionality. They allow for reusability of logic across multiple components.

**High Order Component (HOC)**
```jsx
// A HOC that adds a greeting to the wrapped component.
const withGreeting = (WrappedComponent) => {
  return (props) => (
    <div>
      <h1>Hello!</h1>
      <WrappedComponent {...props} />
    </div>
  );
};

// A simple component to be wrapped by the HOC.
const SimpleComponent = () => <p>This is a simple component.</p>;

// Wrapping SimpleComponent with the HOC.
const EnhancedComponent = withGreeting(SimpleComponent);

// Usage
<EnhancedComponent />
```


This example demonstrates a **Higher-Order Component (HOC)**, which is a function that takes a component (`SimpleComponent`) and returns a new component (`EnhancedComponent`) with added functionality. In this case, the HOC adds a greeting message before rendering the original component.



