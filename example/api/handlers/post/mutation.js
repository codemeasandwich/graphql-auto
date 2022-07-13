'use strict';

const data = require('../../../data.json')

module.exports = function Error({source, args, session, ast}) {
     
     const { userId, title, body } = args
     
     const newPost = { userId, title, body, id:data.posts.length }
     
     data.posts.push(newPost)
     
     return Promuse.resolve(newPost)
}

module.exports.genMeta = (Types, Args) => ({
    type: Types.Post,
    description: 'Create a Post',
    args: Args.Post  
})