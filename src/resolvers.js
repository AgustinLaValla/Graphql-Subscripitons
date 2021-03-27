const { posts } = require('./postData.json');

const resolvers = {
    Query: {
        getPosts() {
            return { posts };
        },

        getPost(_, { id }) {
            const post = posts.find(post => post.id === id.toLowerCase());
            return { post }
        }
    },

    Mutation: {
        createPost(_, { createPostInput }, { pubsub }) {

            const {
                title,
                subtitle,
                body,
                published,
                author,
            } = createPostInput;


            const id = posts.length;
            const commentCount = 0
            const upvotes = 0;
            const downvotes = 0;

            posts.push({
                id,
                title,
                subtitle,
                body,
                published,
                author,
                upvotes,
                downvotes,
                commentCount
            });

            pubsub.publish('post', {
                post: {
                    mutation: 'created',
                    data: posts[posts.length - 1]
                }
            })

            return { post: posts[posts.length - 1] }
        },

        updatePost(_, { updatePostInput }, { pubsub }) {
            const {
                id,
                title,
                subtitle,
                body,
            } = updatePostInput;


            const postIndex = posts.findIndex(post => post.id === id);

            if (postIndex > -1) {
                posts[postIndex] = { ...posts[postIndex], title, subtitle, body }

                return { post: posts[postIndex] }
            }

            pubsub.publish('post', {
                post: {
                    mutation: 'UPDATED',
                    data: { ...updatePostInput }
                }
            })

            return { message: 'Post not found' }
        },

        deletePost(_, { id }, { pubsub }) {
            const post = posts.filter(post => post.id === id);
            if (post) {
                pubsub.publish('post', {
                    post: {
                        mutation: 'DELETE',
                        data: post
                    }
                })
            }
            return { post, message: 'Post Successfully Deleted' };
        },

        setPublished(_, { id, isPublished }, { pubsub }) {
            const postIndex = posts.findIndex(post => post.id === id);
            if (postIndex > -1) {
                posts[postIndex] = { ...posts[postIndex], published: isPublished }

                pubsub.publish('post', {
                    post: {
                        mutation: 'PUBLISHED',
                        data: posts[postIndex]
                    }
                })

                return { post: posts[postIndex] }
            }
            return { message: 'Post not found' }
        },

        addUpvote(_, { id }, { pubsub }) {
            const postIndex = posts.findIndex(post => post.id === id);
            if (postIndex > -1) {
                posts[postIndex] = { ...posts[postIndex], upvotes: posts[postIndex].upvotes + 1 }

                pubsub.publish('post', {
                    post: {
                        mutation: 'ADD_UPVOTE',
                        data: posts[postIndex]
                    }
                })

                return { post: posts[postIndex] }
            }
            return { message: 'Post not found' }
        },

        addDownvote(_, { id }, { pubsub }) {
            const postIndex = posts.findIndex(post => post.id === id);
            if (postIndex > -1) {
                posts[postIndex] = { ...posts[postIndex], downvotes: posts[postIndex].downvotes + 1 }

                pubsub.publish('post', {
                    post: {
                        mutation: 'ADD_DOWNVOTE',
                        data: posts[postIndex]
                    }
                })

                return { post: posts[postIndex] }
            }
            return { message: 'Post not found' }
        }
    },

    Subscription: {
        post: {
            subscribe(_, __, { pubsub }) {
                return pubsub.asyncIterator('post')
            }
        }
    }
}


module.exports = resolvers;