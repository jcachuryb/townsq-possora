import { Box, Grid, Snackbar } from "@mui/material";
import { Post, SnackBarMessage } from "../../types";
import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useMutation, useQuery, useSubscription } from "@apollo/client";
import {
  GET_POSTS,
  IGetPosts,
  IPostSubscription,
  IUpdatePostOrderMutationResult,
  MUTATION_UPDATE_POST_ORDER,
  POST_REORDER_SUBSCRIPTION,
} from "../../api/gql";
import { useEffect, useState } from "react";
import { SortablePost } from "./SortablePost";
import { PostListSkeleton } from "./SkeletonFactory";

interface Props {}

export const PostsList: React.FC<Props> = (props) => {
  const LIMIT = 300;
  const [page, setPage] = useState(1);
  const [sbMessage, setSbMessage] = useState<SnackBarMessage>({
    open: false,
    message: "",
  });

  const { data, loading } = useQuery(GET_POSTS, {
    variables: {
      page,
      limit: LIMIT,
    },
  });

  const [updatePostOrder, { data: updateOrderData, loading: update }] =
    useMutation<IUpdatePostOrderMutationResult>(MUTATION_UPDATE_POST_ORDER);

  const { loading: subscriptionLoading } = useSubscription(
    POST_REORDER_SUBSCRIPTION,
    {
      onData: (data) => {
        if (!data.data.data || !posts) return;
        try {
          const updatedPost = (data.data.data as IPostSubscription).updatedPost;
          const oldIndex = posts.findIndex(
            (post) => post.id === updatedPost.id
          );
          const newIndex = posts.findIndex(
            (post) => post.order >= updatedPost.order
          );
          if (newIndex === -1) return;
          setSbMessage({
            message: `Moved ${posts[oldIndex].title} to position ${
              newIndex + 1
            }`,
            open: true,
          });
          handleOrderPostList(updatedPost.order, newIndex, oldIndex);
        } catch (error) {
          console.error("Error updating post order: ", error);
        }
      },
    }
  );

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (data) {
      setPosts((data as IGetPosts).getPosts ?? []);
    }
  }, [data]);

  const handleOrderPostList = async (
    newOrder: number,
    newIndex: number | undefined,
    oldIndex: number | undefined
  ) => {
    if (oldIndex === undefined || newIndex === undefined) return;
    const _posts = [...posts];
    _posts[oldIndex] = { ..._posts[oldIndex], order: newOrder };

    setPosts(arrayMove(_posts, oldIndex, newIndex));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    try {
      const { active, over } = event;
      if (!over || !active || !posts) return;

      const activeId = active.id.toString();
      const refPost = posts?.find((post) => post.id === over.id.toString());

      if (refPost && activeId !== refPost.id) {
        const oldIndex = posts?.findIndex((post) => post.id === activeId);
        const newIndex = posts?.findIndex((post) => post.id === refPost.id);

        const { data } = await updatePostOrder({
          variables: {
            id: activeId,
            refOrder: refPost.order,
            isUpperLimit: newIndex < oldIndex,
          },
        });

        data?.updatePostOrder &&
          handleOrderPostList(data.updatePostOrder, newIndex, oldIndex);
      }
    } catch (error) {
      console.error("Error updating post order: ", error);
    }
  };

  if (loading) <PostListSkeleton />;

  return (
    <Box sx={{ margin: "auto" }}>
      <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCenter}>
        {posts && (
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
              {[...posts].map((post, index) => (
                <SortablePost key={index} post={post} index={index + 1} />
              ))}
            </Grid>
          </SortableContext>
        )}
      </DndContext>
      <Snackbar
        open={sbMessage.open}
        autoHideDuration={6000}
        onClose={() => {
          setSbMessage({ open: false, message: "" });
        }}
        message={sbMessage?.message}
      />
    </Box>
  );
};
