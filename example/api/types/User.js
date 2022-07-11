'use strict';

const {
  GraphQLID,
  GraphQLString,
  GraphQLObjectType
} = require('graphql');
/*
const Address = new GraphQLObjectType(require('./Address'));
const Company = new GraphQLObjectType(require('./Company'));
*/

const User_Bio = new GraphQLObjectType(require('./User_Bio'));
module.exports = {
   name:'user',
   fields: {
       id : { type: GraphQLID },
       name : {  type: GraphQLString },
       username : {  type: GraphQLString },
       email : {  type: GraphQLString },
       phone:{  type: GraphQLString },
       website:{  type: GraphQLString },
       bio: {  type:  User_Bio  }
   }
};
/*
module.exports = ({Address,Company})=>({
  "id": {
        type: Number,
        required: false
    },
  "name": String,
  "username": String,
  "email": {
        type: Boolean,
        default: false
    }
});

if ("function" === typeof rawType) {
    rawType = rawType(allTypes)
}*/