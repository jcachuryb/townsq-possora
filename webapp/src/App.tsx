import "./App.css";
import { Box, Container, CssBaseline } from "@mui/material";
import { PostsList } from "./components/PostsList";
import { AppBarComponent } from "./layouts/components/AppBar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { ReactNode } from "react";

const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  const client = new ApolloClient({
    uri:
      process.env.REACT_APP_GRAPHQL_API_URL ?? "http://localhost:4000/graphql",
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
      <Container maxWidth="xl">
        <Box sx={{ marginTop: 2, alignContent: "center" }}>
          <PostsList />
        </Box>
      </Container>
    </AppProviders>
  );
};

export default App;
