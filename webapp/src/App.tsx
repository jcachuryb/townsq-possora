import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Box, Button, Container, CssBaseline } from "@mui/material";

function App() {
  return (
    <Container maxWidth="sm">
      <CssBaseline />

      <Box sx={{ bgcolor: "background.default" }}>
        <Button variant="contained" color="primary">
          Hello World
        </Button>
      </Box>
    </Container>
  );
}

export default App;
