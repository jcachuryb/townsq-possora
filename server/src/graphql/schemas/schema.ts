export const typeDefs = `#graphql


  type Post {
    id: ID!
    title: String!
    content: String!
    imageUri: String
    order: Int!
    createdAt: String!
  }

  input PostInput {
    title: String!
    content: String!
    imageUri: String
    order: Int
  }

  type Query {
    getPosts: [Post]
  }

  type Mutation {
    createPost(postInput: PostInput): Post!,
    changePostOrder(id: ID!, newOrder: Int!): Boolean!,
    deletePost(id: ID!): String!
  }
`;
