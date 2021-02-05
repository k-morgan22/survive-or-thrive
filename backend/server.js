const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const path = require('path');
const { mergeTypeDefs, mergeResolvers, loadFilesSync } = require('graphql-tools')


//merge typeDefs and resolvers
const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./typeDefs")))
const resolvers = mergeResolvers(loadFilesSync(path.join(__dirname, "./resolvers")))


const PORT = 4000; 
const DB_URI = "mongodb://localhost:27017/my_local_db";   
const DB_OPTIONS = {
  useFindAndModify: false,
  useUnifiedTopology: true,
  useNewUrlParser: true
}

mongoose.connect(DB_URI, DB_OPTIONS); 
mongoose.connection.once('open', function() { 
  console.log('Connected to the Database.');
});
mongoose.connection.on('error', function(error) {
  console.log('Mongoose Connection Error : ' + error);
});

const server = new ApolloServer({ 
  typeDefs, 
  resolvers 
});

// The `listen` method launches a web server.
server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
