import PostModel from "../../models/post.js";

export const PostResolver = {
  Query: {
    getPosts: async (_, { page, limit }) => {
      return await PostModel.find()
        .skip((page - 1) * limit)
        .limit(limit);
    },
  },
  Mutations: {
    createPost: async (_, { postInput }, context, info) => {
      const post = new PostModel({
        title: postInput.title,
        content: postInput.content,
        imageUri: postInput.imageUri,
      });
      return await post.save();
    },
    changePostOrder: async (_, { id, order }, context, info) => {
      const post = await PostModel.findById(id);
      post.order = order;
      await post.save();
      return post._id;
    },
    deletePost: async (_, args, context, info) => {
      await PostModel.findByIdAndDelete(args.id);
      return "Post deleted";
    },
  },
};
