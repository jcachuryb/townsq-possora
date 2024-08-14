import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import mongoose from "mongoose";

import dotenv from "dotenv";
import { typeDefs } from "./graphql/schemas/schema.js";
import { PostResolver } from "./graphql/resolvers/posts.js";
// import { PostResolver } from "graphql/resolvers/posts.resolver.js";
// import { PostResolver } from "@resolvers";

dotenv.config({ path: "./.env" });

const MONGODB_URI = process.env["MONGODB_URI"];

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: PostResolver,
});

await mongoose.connect(MONGODB_URI);

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
