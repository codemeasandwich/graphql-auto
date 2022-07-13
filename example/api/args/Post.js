/*
const {
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLID
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
};*/
const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLID
} = require('graphql');

module.exports = {
  userId: { type:GraphQLID},//new GraphQLNonNull(GraphQLID),
  title: { type:GraphQLString},
  body:{ type:GraphQLString},//new GraphQLNonNull(GraphQLString)
};

/*{
  userId: needed.id,,
  title: string,
  body: needed.string,
}*/