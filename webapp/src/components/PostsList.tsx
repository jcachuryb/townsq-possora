import { Box, List } from "@mui/material";
import { Post } from "../types";
import { PostListItem } from "./PostListItem";

interface Props {}

export const PostsList: React.FC<Props> = (props) => {
  const posts: Post[] = [];

  return (
    <Box>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {posts.map((post, index) => (
          <PostListItem key={post.id} post={post} selectedIndex={index} />
        ))}
      </List>
    </Box>
  );
};
