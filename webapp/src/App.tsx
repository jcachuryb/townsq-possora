import "./App.css";
import { Box, Button, Container, CssBaseline } from "@mui/material";
import { PostsList } from "./components/PostsList";

function App() {
  return (
    <Container maxWidth="sm">
      <CssBaseline />

      <Box sx={{ bgcolor: "gray" }}>
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <PostsList />
        </Box>
      </Box>
    </Container>
  );
}

export default App;
