const typeDefs = `
    type Post {
        id: Int!
        title: String!
        subtitle: String!
        body: String!
        published: Boolean!
        author: String!
        upvotes: Int!
        downvotes: Int!
        commentCount: Int!
    }

    type ErrorResponse {
        message: String!
        status: Int!
    }

    type PostsResponse {
      posts: [Post]
      error: ErrorResponse
    }

    type PostResponse {
        post: Post
        message: String
        error: ErrorResponse
    }
  
    type Query {
        getPosts: PostsResponse!
        getPost(id: Int!): PostResponse!
    }

    input CreatePostInput {
        title: String!
        subtitle: String!
        body: String!
        published: Boolean!
        author: String!
    }

    input UpdatePostInput {
        id: Int!
        title: String!
        subtitle: String!
        body: String!
    }

  type Mutation {

    createPost(createPostInput: CreatePostInput): PostResponse!

    updatePost(updatePostInput: UpdatePostInput): PostResponse!

    deletePost(id: Int!): PostResponse!

    setPublished(id: Int!, isPublished: Boolean!): PostResponse!

    addUpvote(id: Int!): PostResponse!

    addDownvote(id: Int!): PostResponse!
  }

  type SubscriptionPayload {
      mutation: String!
      data: Post!
  }

  type Subscription {
      post: SubscriptionPayload
  }

`;

module.exports = typeDefs;