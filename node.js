
//=====================================================
//====================================== graphQl Server
//=====================================================


const Graphql = require('graphql');

for(let graphItemName in Graphql){
  if (graphItemName.startsWith('GraphQL')) {
    global[graphItemName] = Graphql[graphItemName]
  }
}

const graphqlHTTP = require('express-graphql');

const GraphQlSchema = require("./serverApiSchema");
// https://github.com/graphql/express-graphql#advanced-options
const GraphqlServer = graphqlHTTP( (request) => {
  return {
    schema: GraphQlSchema,
    pretty: CJ.isDEV,
    graphiql:CJ.isDEV,
    rootValue: { session: request.session },
    context: request.session
    }
})

app.use('/graphql',GraphqlServer);