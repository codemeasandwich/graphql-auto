'use strict';

const data = require('../../data.json')

module.exports = function User({source, args, session, ast}) {
    const { id } = args
    
    if ("0" === id) {
       throw new Error("Bad ID value")
    }
    
    const user = data.users.find(user => user.id+"" === id)
    if (user) {
       return Promise.resolve(user) 
    }
    return data.users[0]  
}

module.exports.genMeta = (Types, Args) => ({
    type: Types.User,
    description: 'find a user',
    args: Args.User  
})