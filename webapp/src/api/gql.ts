import { gql, TypedDocumentNode } from "@apollo/client";
import { Post } from "../types";

export interface IGetPosts {
  getPosts: Post[];
}

export interface IPostSubscription {
  updatedPost: Post;
}
export interface IUpdatePostOrderMutationResult {
  updatePostOrder: number;
}

export const GET_POSTS = gql`
  query GetPosts($page: Int, $limit: Int) {
    getPosts(page: $page, limit: $limit) {
      id
      title
      content
      createdAt
      emoji
      order
    }
  }
`;

export const MUTATION_UPDATE_POST_ORDER = gql`
  mutation UpdatePostOrder(
    $id: ID!
    $refOrder: Float!
    $isUpperLimit: Boolean!
  ) {
    updatePostOrder(id: $id, refOrder: $refOrder, isUpperLimit: $isUpperLimit)
  }
`;

export const POST_REORDER_SUBSCRIPTION: TypedDocumentNode<any, any> = gql`
  subscription {
    updatedPost {
      id
      order
    }
  }
`;
