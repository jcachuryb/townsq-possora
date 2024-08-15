export const typeDefs = `#graphql


  type Post {
    id: ID!
    title: String!
    content: String!
    order: Float!
    emoji: String
    createdAt: String!
  }

  input PostInput {
    title: String!
    content: String!
    emoji: String
    order: Float
  }

  type Query {
    getPosts(page: Int, limit: Int): [Post]
  }

  type Mutation {
    createPost(postInput: PostInput): Post!,
    updatePostOrder(id: ID!, refOrder: Float!, isUpperLimit: Boolean!): Boolean!,
    reseedPosts(arg:String): Boolean!
  }

  type Subscription {
    newPost: Post,
    updatedPost: Post,
  }
`;
