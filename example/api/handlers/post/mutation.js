'use strict';

module.exports = function Error({source, args, session, ast}) {
     return Promuse.resolve( {
        "userId": 1,
        "id": 1,
        "title": "sunt aut",
        "body": "quia et suscipit"
    })
}

module.exports.genMeta = (Types, Args) => ({
    type: Types.Post,
    description: 'Save client Error',
    args: Args.Post  
})