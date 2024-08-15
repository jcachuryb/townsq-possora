import "./App.css";
import { Box, Container, CssBaseline } from "@mui/material";
import { PostsList } from "./components/PostsList";
import { AppBarComponent } from "./layouts/components/AppBar";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

const App = () => {
  const client = new ApolloClient({
    uri:
      process.env.REACT_APP_GRAPHQL_API_URL ?? "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });
  return (
    <ApolloProvider client={client}>
      <AppBarComponent title="Posts Sorter" />
      <Container maxWidth="lg">
        <CssBaseline />

        <Box sx={{ marginTop: 2 }}>
          <PostsList />
        </Box>
      </Container>
    </ApolloProvider>
  );
};

export default App;
