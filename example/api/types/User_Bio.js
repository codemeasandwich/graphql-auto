'use strict';

const {
  GraphQLString
} = require('graphql');

module.exports = {
    name:'User_Bio',
    skip:true,
    fields: {
      about:{  type: GraphQLString },
      email:{  type: GraphQLString }
    }
};