import { Schema, model } from "mongoose";

interface Post {
  id?: string;
  title: string;
  content: string;
  order: number;
  emoji?: string;
  createdAt?: Date;
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
  emoji: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const PostModel = model<Post>("Post", postSchema);

export default PostModel;
