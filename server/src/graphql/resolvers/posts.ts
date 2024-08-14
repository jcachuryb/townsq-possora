import PostModel from "../../models/post.js";

export const PostResolver = {
  Query: {
    getPosts: async (_, { page, limit }) => {
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

      return await post.save();
    },
    changePostOrder: async (_, { id, newOrder }, context, info) => {
      const postToUpdate = await PostModel.findById(id);
      if (!postToUpdate) {
        throw new Error("Post not found");
      }

      if (newOrder === postToUpdate.order) {
        return true;
      }

      const currentOrder = postToUpdate.order;
      await adjustPostsOrder(currentOrder, newOrder);
      postToUpdate.order = newOrder;

      await postToUpdate.save();
      return true;
    },
    deletePost: async (_, { id }, context, info) => {
      await PostModel.findByIdAndDelete(id);
      return "Post deleted";
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
