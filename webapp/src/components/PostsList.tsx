import { Box } from "@mui/material";
import { Post } from "../types";
import { PostListItem } from "./PostListItem";
import { DndContext } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface Props {}

export const PostsList: React.FC<Props> = (props) => {
  const posts: Post[] = [
    { id: 1, title: "Post 1", content: "Content 1", order: 1 },
    { id: 2, title: "Post 2", content: "Content 2", order: 2 },
    { id: 3, title: "Post 3", content: "Content 3", order: 3 },
  ];

  return (
    <Box>
      {/* <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}> */}
      <DndContext>
        <SortableContext
          items={posts.map((post) => post.order)}
          strategy={verticalListSortingStrategy}
        >
          {/* ... */}
          {posts.map((post, index) => (
            <PostListItem key={post.id} post={post} selectedIndex={index} />
          ))}
          {/* </List> */}
        </SortableContext>
      </DndContext>
    </Box>
  );
};
