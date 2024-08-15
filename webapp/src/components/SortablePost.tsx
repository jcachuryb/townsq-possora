import { Grid, GridProps } from "@mui/material";
import { Post } from "../types";
import React, { CSSProperties } from "react";
import { CSS } from "@dnd-kit/utilities";

import { useSortable } from "@dnd-kit/sortable";
import { PostListItem } from "./PostListItem";

interface Props extends GridProps {
  post: Post;
  index: number;
}

export const SortablePost: React.FC<Props> = (props) => {
  const { post, index } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: post.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    justifyContent: "space-between",
  } as CSSProperties;
  return (
    <Grid
      item
      xs={12}
      sm={6}
      md={4}
      lg={3}
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      sx={{ ":hover": { cursor: isDragging ? "grabbing" : "grab" } }}
    >
      <PostListItem post={post} index={index} />
    </Grid>
  );
};
