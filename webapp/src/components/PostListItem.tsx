import {
  Box,
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Post } from "../types";
import BrokenImageIcon from "@mui/icons-material/BrokenImage";
import React from "react";
import { Comment } from "@mui/icons-material";
interface Props {
  post: Post;
  selectedIndex?: number;
}

export const PostListItem: React.FC<Props> = (props) => {
  const { post, selectedIndex } = props;
  return (
    <ListItem
      key={post.id}
      secondaryAction={
        <IconButton edge="end" aria-label="comments">
          <Comment />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton role={undefined} dense>
        <ListItemIcon></ListItemIcon>
        <ListItemText primary={`${post.title}`} />
      </ListItemButton>
    </ListItem>
  );
};
