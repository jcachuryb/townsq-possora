import {
  Box,
  Card,
  CardContent,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Post } from "../types";
import React from "react";

interface Props {
  post: Post;
  index: number;
}

export const PostListItem: React.FC<Props> = (props) => {
  const { post, index } = props;

  return (
    <Card
      sx={{
        margin: "5px",
        display: "flex",
        justifyContent: "space-between",
        overflow: "hidden",
        height: "150px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          paddingX: 3,
        }}
      >
        <ListItemIcon sx={{ alignSelf: "center" }}>
          <Typography component="div" variant="h4">
            {post.emoji}
          </Typography>
        </ListItemIcon>

        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CardContent sx={{ flex: "1 0 auto" }}>
            <Typography component="div" variant="h6">
              {post.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              component="div"
              textOverflow={"ellipsis"}
            >
              {post.content}
            </Typography>
          </CardContent>
        </Box>
        <Typography
          component="div"
          variant="caption"
          color={"#ccc"}
          style={{
            alignSelf: "start",
            marginTop: "10px",
          }}
        >
          {index}
        </Typography>
      </Box>
    </Card>
  );
};
