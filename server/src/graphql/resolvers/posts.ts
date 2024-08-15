import { mockedPosts } from "../../data/mocked_posts.js";
import PostModel from "../../models/post.js";
import { postsPubSub } from "../subscriptions/posts.subscriptions.js";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;

// SUBSCRIPTION EVENTS
const EVENT_POST_UPDATED = "POST_UPDATED";
const EVENT_POST_CREATED = "POST_CREATED";

export const PostResolver = {
  Query: {
    getPosts: async (_, { page, limit }) => {
      page = page ?? DEFAULT_PAGE;
      limit = limit ?? DEFAULT_LIMIT;

      const query = await PostModel.find();
      return await PostModel.find()
        .skip((page - 1) * limit)
        .limit(limit)
        .sort("order");
    },
  },
  Mutation: {
    createPost: async (_, { postInput }, context, info) => {
      const highestOrderPost = await PostModel.findOne().sort({ order: -1 });

      const post = new PostModel({
        title: postInput.title,
        content: postInput.content,
        imageUri: postInput.imageUri,
        order: highestOrderPost ? highestOrderPost.order + 1 : 1,
      });
      if (post.order != 1) {
        await adjustPostsOrder(post.order, post.order);
      }

      const newPost = await post.save();
      postsPubSub.publish(EVENT_POST_CREATED, { post: newPost });
      return newPost;
    },
    updatePostOrder: async (
      _,
      { id, refOrder, isUpperLimit },
      context,
      info
    ) => {
      const postToUpdate = await PostModel.findById(id);
      if (!postToUpdate || !refOrder) {
        throw new Error("Post not found");
      }

      if (refOrder === postToUpdate.order) {
        return false;
      }

      let newOrder = 1;
      // Filter the posts based on the reference order
      const filter = isUpperLimit
        ? { order: { $lte: refOrder } }
        : { order: { $gte: refOrder } };
      const order = isUpperLimit ? -1 : 1;

      const posts = await PostModel.find(filter).sort({ order }).limit(2);

      if (posts.length == 2) {
        const max = Math.max(posts[0].order, posts[1].order);
        const min = Math.min(posts[0].order, posts[1].order);
        newOrder = (max - min) / 2 + min;
      } else if (posts.length == 1) {
        newOrder = posts[0].order / 2;
      } else {
        const lastPost = await PostModel.findOne().sort({ order: -1 });
        newOrder = lastPost.order + 1;
      }
      postToUpdate.order = newOrder;
      postsPubSub.publish(EVENT_POST_UPDATED, { post: postToUpdate });
      await postToUpdate.save();
      return true;
    },

    reseedPosts: async (_, args, context, info) => {
      try {
        await PostModel.deleteMany();

        await PostModel.insertMany(
          mockedPosts.map((post, index) => ({ order: index + 1, ...post }))
        );
        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
  },
  Subscription: {
    newPost: {
      subscribe: () => postsPubSub.asyncIterator(EVENT_POST_CREATED),
    },
    updatedPost: {
      subscribe: () => postsPubSub.asyncIterator(EVENT_POST_UPDATED),
    },
  },
};

const adjustPostsOrder = async (currentOrder: number, newOrder: number) => {
  // If the new order is greater than the current order, decrement the order of the posts in between

  if (newOrder > currentOrder) {
    await PostModel.updateMany(
      { order: { $gt: currentOrder, $lte: newOrder } },
      { $inc: { order: -1 } }
    );
  }
  // If the new order is less than the current order, increment the order of the posts in between
  else if (newOrder <= currentOrder) {
    await PostModel.updateMany(
      { order: { $lt: currentOrder, $gte: newOrder } },
      { $inc: { order: 1 } }
    );
  }
};
