import { Box, List } from "@mui/material";
import { Post } from "../types";
import { PostListItem } from "./PostListItem";
import { DndContext, DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { ApolloQueryResult, useMutation, useQuery } from "@apollo/client";
import { GET_POSTS, IGetPosts, MUTATION_UPDATE_POST_ORDER } from "../api/gql";
import { useEffect, useState } from "react";

interface Props {}

export const PostsList: React.FC<Props> = (props) => {
  const [activeId, setActiveId] = useState<String>();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(100);

  const { data, loading, error } = useQuery(GET_POSTS, {
    variables: {
      page,
      limit,
    },
  });
  const [updatePostOrder, { data: updateOrderData, loading: update }] =
    useMutation(MUTATION_UPDATE_POST_ORDER);

  const [posts, setPosts] = useState<Post[]>();

  useEffect(() => {
    if (data) {
      setPosts((data as IGetPosts).getPosts ?? []);
    }
  }, [data]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;

    setActiveId(active.id.toString());
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    debugger;
    if (!over || !active || !posts) return;

    const activeId = active.id.toString();

    const refPost = posts?.find((post) => post.id === over.id.toString());

    if (refPost && activeId !== refPost.id) {
      const oldIndex = posts?.findIndex((post) => post.id === activeId);
      const newIndex = posts?.findIndex((post) => post.id === refPost.id);

      setPosts((_posts) => {
        if (_posts && oldIndex !== undefined && newIndex !== undefined)
          return arrayMove(_posts, oldIndex, newIndex);

        return _posts;
      });
      await updatePostOrder({
        variables: {
          id: activeId,
          refOrder: refPost.order,
          isUpperLimit: newIndex < posts?.length - 1,
        },
      });
    }

    setActiveId(undefined);
  };

  if (!posts) return null;

  return (
    <Box>
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <SortableContext
          items={posts.map((post) => post.order)}
          strategy={verticalListSortingStrategy}
        >
          <List
            sx={{ width: "100%", maxWidth: 720, bgcolor: "background.paper" }}
          >
            {posts.map((post, index) => (
              <PostListItem key={index} post={post} />
            ))}
          </List>
        </SortableContext>
      </DndContext>
    </Box>
  );
};
