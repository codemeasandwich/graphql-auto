const {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql');

//=====================================================
//========================================== Trace Item
//=====================================================

var TraceItem = new GraphQLInputObjectType({
  name: 'TraceItem',
  fields: {
    columnNumber: { type: GraphQLInt },
    lineNumber:   { type: GraphQLInt },
    functionName: { type: GraphQLString },
    fileName:     { type: GraphQLString },
    source:       { type: GraphQLString },
  }
});

//=====================================================
//=============================================== Error
//=====================================================

module.exports = {

    type:{
        name: 'type of error',
        type: new GraphQLNonNull(GraphQLString)   
    },
    message:{
        name: 'error message',
        type: new GraphQLNonNull(GraphQLString)
    },
    trace:{
        name: 'stack trace',
        type: new GraphQLNonNull(new GraphQLList( TraceItem ) )
    },
};