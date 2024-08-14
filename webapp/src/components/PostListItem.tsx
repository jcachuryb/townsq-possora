import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
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
  };

  return (
    <ListItem
      key={post.id}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <ListItemButton role={undefined}>
        <ListItemIcon>
          {isDragging ? <NearMe /> : <DragIndicator />}
        </ListItemIcon>
        <ListItemText primary={`${post.title}`} />
      </ListItemButton>
    </ListItem>
  );
};
