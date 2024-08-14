import { Schema, model } from "mongoose";

interface Post {
  id?: string;
  title: string;
  content: string;
  order: number;
}

const postSchema = new Schema<Post>({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
});

const PostModel = model<Post>("Post", postSchema);

export default PostModel;
