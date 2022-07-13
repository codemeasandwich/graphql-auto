'use strict';

const data = require('../../../data.json')

module.exports = function ({source, args, session, ast}) {
    return data.posts[0]  
}

module.exports.genMeta = (Types, Args, {logReq}) => ({
    type: Types.Post,
    description: 'find posts',
    args: Args.Post,
    middleware:logReq,
    plural: true // String OR replcment Fn
})