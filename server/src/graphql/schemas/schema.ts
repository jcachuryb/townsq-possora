export const typeDefs = `#graphql
  
  type Query {
    getPosts: [Post],
  }

  input PostInput {
    title: String!
    content: String!
    imageUri: String!
}

  type Post {
    id: ID!
    title: String!
    content: String!
    imageUri: String!
  }
  type Mutations {
    createPost(postInput: PostInput): Post!,
    changePostOrder(id: ID!, order: Int!): ID!,
    deletePost(id: ID!): String!
  }
`;
