---
layout: note-layout  
title: Code Splitting  
---

# Code Splitting

## Overview
Code splitting is a technique used in React to optimize the performance of applications by loading only the necessary parts of the code when they are needed. This improves the load time and reduces the initial bundle size. Code splitting can be achieved through dynamic `import()` and tools like `React.lazy` and `React.Suspense`.

## Key Points and Code Snippets

**Using Dynamic `import()` for Code Splitting**

Shows how to dynamilcally import components on demand.

```jsx
// Dynamically importing a component only when it's needed.
const loadComponent = () => {
  import('./MyComponent')
    .then((MyComponent) => {
      // Use the dynamically loaded component.
      console.log(MyComponent);
    })
    .catch((error) => {
      console.error('Error loading component:', error);
    });
};

// Usage
<button onClick={loadComponent}>Load Component Dynamically</button>
```

---

**`React.lazy` for Lazy Loading**

Demonstrates lazy loading of components using `React.lazy` with a fallback UI provided by `Suspense`.


```jsx
import React, { Suspense } from 'react';

// Using React.lazy to lazily load a component.
const LazyComponent = React.lazy(() => import('./LazyComponent'));

const ParentComponent = () => {
  return (
    <div>
      <h1>Welcome!</h1>
      {/* Suspense component is used to display fallback content while loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
};

// Usage
<ParentComponent />
```

---

**Code Splitting with React Router**

Illustrates how to use code splitting in a React Router setup for route-based component loading.


```jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Dynamically load components for different routes.
const Home = React.lazy(() => import('./Home'));
const About = React.lazy(() => import('./About'));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Suspense>
    </Router>
  );
};

// Usage
<App />
```

---

**Why Use Code Splitting?**

- **Improved Performance**: Reduces the initial bundle size and improves the performance of your app, especially for larger applications.
- **Load on Demand**: Only load the parts of the app that are currently needed by the user.
- **Better User Experience**: Loading smaller chunks of code ensures faster initial load times, leading to a better user experience.

