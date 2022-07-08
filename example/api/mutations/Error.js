'use strict';

module.exports = function Error({source, args, session, ast}) {
     const result = args.message+" Error saved"
     console.log(result)
     return Promuse.resolve(result)
}

module.exports.genMeta = (Types, Args) => ({
    type: Types.Error,
    description: 'Save client Error',
    args: Args.Error  
})