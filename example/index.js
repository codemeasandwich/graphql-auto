require('url-search-params-polyfill');
const graphql    = require('graphql');
const path       = require("path");
const graphQlAuto = require('../index')


const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const GraphQlSchema = graphQlAuto(path.join(__dirname, '/api'))

const port = 1337 
const app = express();
app.use( '/graphql', graphqlHTTP({ schema: GraphQlSchema, graphiql: true }));

const appServer  = require('http').createServer(app);
      appServer.listen(port, function(error) {
        if (error) throw error;
        console.log();
        console.log(`► Example started on port ${port}`);
        console.log();  
      });
      

/*
const input = { userId : 51, title: "foo", body: "bar" }
var query = `mutation Post($input: PostInput) {
  post(input: $input) {
    id
  }
}`;

fetch('http://localhost:1337/graphql', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  body: JSON.stringify({
    query,
    variables: {
      input
    }
  })
})
  .then(r => r.json())
  .then(data => console.log('data returned:', data));
*/