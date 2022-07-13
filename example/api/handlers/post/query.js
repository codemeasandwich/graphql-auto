'use strict';

const data = require('../../../data.json')

const {
  GraphQLList,
  GraphQLNonNull,
} = require('graphql');

module.exports = function ({source, args, session, ast}) {
    return data.posts 
}

module.exports.genMeta = (Types, Args, {logReq}) => ({
    type: new GraphQLList(Types.Post),
    description: 'Find posts',
    args: Args.Post,
    middleware:logReq,
    plural: true // String OR replcment Fn
})