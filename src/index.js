const { GraphQLServer, PubSub } = require('graphql-yoga');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');
const { magenta } = require('colors');


function main() {
    const pubsub = new PubSub();
    
    const server = new GraphQLServer({
        typeDefs,
        resolvers,
        context: { pubsub }
    })

    server.start({ port: 4000 }, ({ port }) => console.log(magenta(`Server on port: ${port}`)));
}

main();
