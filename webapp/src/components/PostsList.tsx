import { Box, Grid } from "@mui/material";
import { Post } from "../types";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { useMutation, useQuery } from "@apollo/client";
import { GET_POSTS, IGetPosts, MUTATION_UPDATE_POST_ORDER } from "../api/gql";
import { useEffect, useState } from "react";
import { SortablePost } from "./SortablePost";

interface Props {}

/**
 * Renders a list of posts with drag and drop functionality.
 *
 * @component
 * ```tsx
 * <PostsList />
 * ```
 */
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

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (data) {
      setPosts((data as IGetPosts).getPosts ?? []);
    }
  }, [data]);

  const handleOrderPostList = async (newIndex: number, oldIndex: number) => {
    setPosts((_posts) => {
      if (_posts && oldIndex !== undefined && newIndex !== undefined)
        return arrayMove(_posts, oldIndex, newIndex);
      return _posts;
    });
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || !active || !posts) return;

    const activeId = active.id.toString();
    const refPost = posts?.find((post) => post.id === over.id.toString());

    if (refPost && activeId !== refPost.id) {
      const oldIndex = posts?.findIndex((post) => post.id === activeId);
      const newIndex = posts?.findIndex((post) => post.id === refPost.id);

      handleOrderPostList(newIndex, oldIndex);
      await updatePostOrder({
        variables: {
          id: activeId,
          refOrder: refPost.order,
          isUpperLimit: newIndex < oldIndex,
        },
      });
    }

    setActiveId(undefined);
  };

  if (!posts) return null;

  return (
    <Box sx={{ margin: "auto" }}>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        <SortableContext
          items={posts.map((post) => post.id)}
          strategy={rectSortingStrategy}
        >
          <Grid
            container
            rowSpacing={0}
            columnSpacing={1}
            sx={{ justifyContent: "center" }}
          >
            {posts.map((post, index) => (
              <SortablePost key={index} post={post} index={index + 1} />
            ))}
          </Grid>
        </SortableContext>
      </DndContext>
    </Box>
  );
};
