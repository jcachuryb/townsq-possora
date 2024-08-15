import "./App.css";
import { Box, Container, CssBaseline } from "@mui/material";
import { PostsList } from "./components/postGrid/PostsList";
import { AppBarComponent } from "./layouts/components/AppBar";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { ReactNode } from "react";

const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  const API_URL =
    process.env.REACT_APP_GRAPHQL_API_URL ?? "http://localhost:4000/graphql";

  const httpLink = new HttpLink({
    uri: API_URL,
  });

  const wsLink = new GraphQLWsLink(
    createClient({
      url:
        process.env.REACT_APP_GRAPHQL_WS_URL ?? "ws://localhost:4000/graphql",
      on: {
        connected: () => console.log("GraphQLWsLink connected"),
        closed: () => console.log("GraphQLWsLink closed"),
      },
    })
  );

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    httpLink
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <CssBaseline />
      {children}
    </ApolloProvider>
  );
};

const App = () => {
  return (
    <AppProviders>
      <AppBarComponent title="TSQ - Posts Sorter" />
      <Container maxWidth="lg">
        <Box sx={{ marginTop: 2, alignContent: "center" }}>
          <PostsList />
        </Box>
      </Container>
    </AppProviders>
  );
};

export default App;
