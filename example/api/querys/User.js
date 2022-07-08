'use strict';

//const data = require('../data.json')

module.exports = function User({source, args, session, ast}) {
    console.log(args)
    return {name:"Ashlyn",bio:{about:"Yo"},firstname:"boom"}
    return Promuse.resolve({name:"Ashlyn"})//.reject(new Error("something ... "))     
}

module.exports.genMeta = (Types, Args) => ({
    type: Types.User,
    description: 'find a user',
    args: Args.User  
})