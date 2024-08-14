import "./App.css";
import { Box, Container, CssBaseline } from "@mui/material";
import { PostsList } from "./components/PostsList";
import { AppBarComponent } from "./layouts/components/AppBar";

function App() {
  return (
    <Container maxWidth="sm">
      <AppBarComponent title="Posts Sorter" />
      <CssBaseline />

      <Box sx={{ bgcolor: "whitesmoke" }}>
        <PostsList />
      </Box>
    </Container>
  );
}

export default App;
