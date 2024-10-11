---
layout: note-layout  
title: State Normalization  
---

# State Normalization

## Overview
State normalization refers to structuring your application’s state in a flat, organized way, similar to how a database is structured. This practice avoids deeply nested data structures, making it easier to manage and update state, particularly in complex applications where state is shared across many components. Normalized state makes updating, retrieving, and referencing data more efficient and prevents issues with redundant or inconsistent state.

## Key Points and Code Snippets

**What is State Normalization?**
- In a non-normalized state, related data might be stored in a nested structure, leading to difficulties in updating or accessing it.
- Normalization involves flattening the state and organizing related entities by using keys, such as IDs, to reference them.

---

**Example: Non-Normalized State**
```jsx
const state = {
  users: [
    {
      id: 1,
      name: 'John',
      posts: [
        { id: 101, title: 'Post 1', content: 'Content 1' },
        { id: 102, title: 'Post 2', content: 'Content 2' },
      ],
    },
    {
      id: 2,
      name: 'Jane',
      posts: [
        { id: 103, title: 'Post 3', content: 'Content 3' },
      ],
    },
  ],
};
```

---

**Example: Normalized State**

```jsx
const state = {
  users: {
    1: { id: 1, name: 'John', posts: [101, 102] },
    2: { id: 2, name: 'Jane', posts: [103] },
  },
  posts: {
    101: { id: 101, title: 'Post 1', content: 'Content 1' },
    102: { id: 102, title: 'Post 2', content: 'Content 2' },
    103: { id: 103, title: 'Post 3', content: 'Content 3' },
  },
};
```

In this nromalized state:
- The `users` key contains a flat structure whereeach user references their posts by post IDs.
- The `posts` key contains all posts indexed by their ID, allowing posts to be updated or accessed independantly from users.

---

**Benefits of State Normalization**

1. **Efficient Updates:** Normalized state makes it easier to update a specific part of the state without affecting the entire structure.
2. **Avoiding Redundancy:** By referencing entities via IDs, you avoid duplicating data, which can lead to inconsistencies.
3. **Simpler State Management:** Working with a flat structure is more predictable and scalable, especially when your application grows in complexity.
4. **Easier to Query:** Normalized state allows you to easily retrieve and manipulate data from the global state, similar to querying a database.

---

**Handling State Normalization with Libraries** libraries like **Redux** or tools like **normalizer** can help manage and normalize state in larger applications.

**Using normalizer for Normalization**

```jsx
import { normalize, schema } from 'normalizr';

// Define a post schema
const post = new schema.Entity('posts');

// Define a user schema that references the posts schema
const user = new schema.Entity('users', {
  posts: [post],
});

// Example response from an API
const response = [
  {
    id: 1,
    name: 'John',
    posts: [
      { id: 101, title: 'Post 1', content: 'Content 1' },
      { id: 102, title: 'Post 2', content: 'Content 2' },
    ],
  },
  {
    id: 2,
    name: 'Jane',
    posts: [
      { id: 103, title: 'Post 3', content: 'Content 3' },
    ],
  },
];

// Normalize the response
const normalizedData = normalize(response, [user]);

console.log(normalizedData);
```

This would produce:

```jsx
{
  "entities": {
    "users": {
      "1": { "id": 1, "name": "John", "posts": [101, 102] },
      "2": { "id": 2, "name": "Jane", "posts": [103] }
    },
    "posts": {
      "101": { "id": 101, "title": "Post 1", "content": "Content 1" },
      "102": { "id": 102, "title": "Post 2", "content": "Content 2" },
      "103": { "id": 103, "title": "Post 3", "content": "Content 3" }
    }
  },
  "result": [1, 2]
}
```

---

**When to Use State Normalization**
- **Large Applications** When your applications state grows more complex, normalization helps maintain scalability.
- **Frequent State Updates** If your app requires updates to a portion of the state (eg, a list of items or users), normalization ensures updates are efficient.
- **Shared Data** If multiple components depend on the same data, normalization reduces redundancy and ensures that all components reflect the same data.

