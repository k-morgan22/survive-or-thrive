import { ApolloServer } from 'apollo-server';
import mongoose from 'mongoose';
import typeDefs from './typeDefs/index.js';
import resolvers from './resolvers/index.js'; 

const PORT = 4000; 
const MONGODB_URI = "mongodb://localhost:27017/my_local_db";   

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }); 
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
