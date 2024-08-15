# Townqs - Possora _{post sorter}_

## Project Overview

This is a full-stack web application using GraphQL and Apollo Server for the backend, and a web app (React.js) for the frontend. The application leverages the power of GraphQL for managing the reordering of a list of posts, using drag-and-drop and the ApolloServer Sandbox.

## Setup Instructions

### Prerequisites

- Node.js (v18 or later)
- npm
- A running instance of MongoDB

### Installation

1. Clone the repository:

   ```bash
   bashCopy code
   git clone https://github.com/yourusername/yourprojectname.git
   cd yourprojectname

   ```

2. Set up environment variables for both the backend and frontend.
3. Install dependencies and run the project:

### **Backend:**

**Create an .env file at the root of /server**

```jsx
#create an .env file at the root of /server
MONGODB_URI=mongodb://0.0.0.0:27017/townsquare
PORT=4000
CORS_WHITELIST=http://localhost:3000,http://127.0.0.1:3000
```

```bash
cd server
npm install
npm start
```

### **Frontend:**

```jsx
#create an .env file at the root of /webapp
REACT_APP_GRAPHQL_API_URL=http://127.0.0.1:4000/graphql
REACT_APP_GRAPHQL_WS_URL=ws://127.0.0.1:4000/graphql
```

```bash
cd webapp
npm install
npm start
```

1. The frontend will be available at `http://localhost:3000` and the GraphQL API at `http://localhost:4000/graphql`.
2. There is a Mutation that clears and seeds the Collection.

```jsx
mutation ReseedPosts {
  reseedPosts
}
```

## Available Scripts

- **Backend:**
  - `npm start`: Start the server.
- **Frontend:**
  - `npm start`: Start the development server.

## Assumptions and Design Decisions

- **GraphQL Usage:** The application uses GraphQL for API communication to provide flexible and efficient data retrieval.
  It has a main Query, getPosts. It receives params for pagination.
- **Apollo Server:** Useful as well for creating websockets that will enable the front end and the Sandbox to subscribe to updates, in one of the Subscriptions created: `updatedPost`
- **Frontend Framework:** The frontend uses React with Typescript, and as main libraries, there is
  - [Apollo Client](https://www.apollographql.com/docs/react/) for seamless integration with the GraphQL API.
  - [Material UI](https://mui.com/material-ui/), for responsive, and beautiful and easy-to-use UI components
  - [DnDToolkit](https://docs.dndkit.com/), for ordering the list of posts using the `Sortable` module.
- **Database Choice:** MongoDB was selected for its flexibility and scalability in handling the data model. `Mongoose` was the ORM selected for this purpose.
- **Reordering Logic:** I chose to execute the sorting function by using an approach of a destination and a boundary. Depending on the boundary, the algorithm woud attempt to either insert the moved post in between the two numbers closest to the chosen position.
