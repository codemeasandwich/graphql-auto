'use strict';
/*
const {
  GraphQLNonNull,
  GraphQLString
} = require('graphql');

module.exports = {
  name:'Error',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLString) },
    message: { type: new GraphQLNonNull(GraphQLString) },
   }
};*/
'use strict';

const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType
} = require('graphql');

const Comment = new GraphQLObjectType(require('./Comment'));

module.exports = {
   name:'post',
   fields: {
    userId : { type: GraphQLID },
    id : { type: GraphQLID },
    title: {  type: GraphQLString },
    body: {  type: GraphQLString },
    //comments: [{  type: Comment }]
   }
};