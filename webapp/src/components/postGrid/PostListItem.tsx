import {
  Box,
  Card,
  CardContent,
  ListItemIcon,
  Typography,
} from "@mui/material";
import { Post } from "../../types";
import React, { CSSProperties } from "react";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { DragIndicator } from "@mui/icons-material";

interface Props {
  post: Post;
  index: number;
}

export const PostListItem: React.FC<Props> = (props) => {
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
  } as CSSProperties;
  return (
    <Card
      sx={{
        margin: "5px",
        justifyContent: "space-between",
        overflow: "hidden",
        height: "150px",
        zIndex: isDragging ? 1000 : 0,
      }}
      ref={setNodeRef}
      style={style}
    >
      <Box
        sx={{
          display: "flex",
          paddingX: 2,
        }}
      >
        <Box
          sx={{
            flexDirection: "column",
            justifyContent: "center",
            pt: 1,
          }}
        >
          <DragIndicator
            {...listeners}
            {...attributes}
            sx={{
              ":hover": { cursor: isDragging ? "grabbing" : "grab" },
              rotate: "90deg",
            }}
            fontSize="small"
            color="disabled"
          />
          <ListItemIcon sx={{ alignSelf: "center", marginTop: 3 }}>
            <Typography component="div" variant="h4">
              {post.emoji}
            </Typography>
          </ListItemIcon>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "start",
          }}
        >
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
