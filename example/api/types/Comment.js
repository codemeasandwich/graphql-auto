'use strict';

const {
  GraphQLID,
  GraphQLString
} = require('graphql');

module.exports = {
   name:'comment',
   fields: {
      postId : { type: GraphQLID },
      id : { type: GraphQLID },
      name : {  type: GraphQLString },
      email : {  type: GraphQLString },
      body: {  type: GraphQLString }
   }
};