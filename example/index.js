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
      
      
