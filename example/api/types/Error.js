'use strict';

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
};