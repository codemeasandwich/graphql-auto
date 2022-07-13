'use strict';

const data = require('../../../data.json')

module.exports = function User({source, args, session, ast}) {
    //console.log("api/handlers/user/query.js",args)
    const { id } = args
    
    if ("0" === id) {
       throw new Error("Bad ID value")
    }
    
    const user = data.users.find(user => user.id+"" === id)
    //console.log(user)
    if (user) {
       return Promise.resolve(user) 
    }
    return data.users[0]  
}

module.exports.genMeta = (Types, Args, {isAuthorized}) => ({
    type: Types.User,
    description: 'find a user',
    args: Args.User,
    middleware:isAuthorized
})