import { Grid, GridProps } from "@mui/material";
import { Post } from "../../types";
import React from "react";

import { PostListItem } from "./PostListItem";

interface Props extends GridProps {
  post: Post;
  index: number;
}

export const SortablePost: React.FC<Props> = (props) => {
  const { post, index } = props;

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{ justifyContent: "center" }}>
      <PostListItem post={post} index={index} />
    </Grid>
  );
};
