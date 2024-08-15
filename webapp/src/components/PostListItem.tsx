import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Post } from "../types";
import React from "react";
import { DragIndicator, NearMe } from "@mui/icons-material";
import { CSS } from "@dnd-kit/utilities";

import { useSortable } from "@dnd-kit/sortable";

interface Props {
  post: Post;
  selectedIndex?: number;
}

export const PostListItem: React.FC<Props> = (props) => {
  const { post } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    margin: "10px",
    display: "flex",
    justifyContent: "space-between",
  };

  return (
    <Card style={style} ref={setNodeRef} {...attributes} {...listeners}>
      <Box
        sx={{
          display: "flex",
          paddingX: 2,
          alignItems: "center",
        }}
      >
        <ListItemIcon
          sx={{ ":hover": { cursor: isDragging ? "grabbing" : "grab" } }}
        >
          {isDragging ? <NearMe /> : <DragIndicator />}
        </ListItemIcon>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {post.emoji} {post.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div">
              {post.content}
            </Typography>
          </CardContent>
        </Box>
      </Box>
    </Card>
  );
};
