export const typeDefs = `#graphql


  type Post {
    id: ID!
    title: String!
    content: String!
    imageUri: String
    order: Float!
    createdAt: String!
  }

  input PostInput {
    title: String!
    content: String!
    imageUri: String
    order: Float
  }

  type Query {
    getPosts(page: Int, limit: Int): [Post]
  }

  type Mutation {
    createPost(postInput: PostInput): Post!,
    changePostOrder(id: ID!, newOrder: Int!): Boolean!,
    updatePostOrder(id: ID!, refOrder: Float!, isUpperLimit: Boolean!): Boolean!,
    deletePost(id: ID!): String!
  }
`;
