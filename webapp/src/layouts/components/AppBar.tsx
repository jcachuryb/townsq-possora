import { Menu } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";

interface AppBarProps {
  title: string;
}

export const AppBarComponent: React.FC<AppBarProps> = ({ title }) => {
  return (
    <AppBar position="static">
      <Toolbar variant="dense">
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <Menu />
        </IconButton>
        <Typography variant="h6" color="inherit" component="div">
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
