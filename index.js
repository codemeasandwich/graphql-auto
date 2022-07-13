'use strict';
  
const graphql    = require('graphql');
const deepRequire = require('./utils/deepRequire')
const flatAndGroup = require('./utils/flatAndGroup')
const path = require('path');

/* istanbul ignore start */
/* c8 ignore start */
// polyfill for < Node 12
if(!String.prototype.matchAll) {
    String.prototype.matchAll = function (rx) {
        if ("string" === typeof rx ) rx = new RegExp(rx, "g"); // coerce a string to be a global regex
        rx = new RegExp(rx); // Clone the regex so we don't update the last index on the regex they pass us
        let cap = []; // the single capture
        let all = []; // all the captures (return this)
        while ((cap = rx.exec(this)) !== null) all.push(cap); // execute and add
        return all; // profit!
    };
}
/* c8 ignore end */
/* istanbul ignore end */

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
} // END capitalizeFirstLetter

//const reservedArgNames = ["NEEDED","STRING","BOOL","NUMBER","DATE"]

//=====================================================
//============================================== helper
//=====================================================
//======================================= Wrap Resolver
//=====================================================

function handleMiddlewareCalls(argsToPass, middlewares) {
   // console.log("handleMiddlewareCalls",middlewares)
    const middlewareToRun = middlewares.shift()
    return new Promise((resolve, reject) => {
        const next = (result)=> {
          //  console.log("on Next",result,middlewares.length)
            if (result && middlewares.length) {
                 return resolve(handleMiddlewareCalls(argsToPass, middlewares))
            }
          //  console.log("In Next",result)
            return resolve(result)
        } // END next
        const middlewareResult = middlewareToRun(argsToPass,next)
        if (middlewareResult) {
            if (middlewareResult.then) {
              return middlewareResult.then(next).catch(reject)
            }  // END if then
            next(middlewareResult)
        }
    }) // END new Promise
} // END handleMiddlewareCalls

function genQLMeta(types, args, middlewares, Resolves) {
   
   return Resolves.reduce((result,[pathItems,handler])=>{
       // console.log(result,pathItems)
        const meta = handler.genMeta(types, args, middlewares)
        const { middleware, plural } = meta
        
        const resolveInfo = {
            resolve : (source, args, session, ast) => {
                
                const argsToPass = { source, args, session, ast }
                
                return new Promise((resolve, reject) => {
                     if ("function" === typeof middleware) {
                         resolve(handleMiddlewareCalls(argsToPass, [middleware,handler]))
                     } else if (Array.isArray(middleware)) {
                         middleware.push(handler)
                         resolve(handleMiddlewareCalls(argsToPass, middleware))
                     } else {
                        resolve(handler(argsToPass))
                     } // END else
                }) // END new Promise
            } // END resolve
        } // END resolveInfo
        const firstPathItem  = pathItems.shift()
                   pathItems = pathItems.map(capitalizeFirstLetter)
                   pathItems.unshift(firstPathItem)
        let rootName = pathItems.pop()
        if ("string" === typeof plural) {
            rootName += plural
        } else if ("function" === typeof plural) {
            rootName = plural(rootName)
        } else if (true ===  plural) {
            rootName += "s"
        }
        pathItems.push(rootName)
        Object.assign(resolveInfo, meta)
        result[pathItems.join("")] = resolveInfo
       // console.log(result)
        return result
   },{}) // END Resolves.forEach
} // genQLMeta

function toQLObjectType(types,transformer) {

   const result = {}
   for(let typeName in types){
    let transformed = types[typeName]
   /* if (transformer) {
     transformed = {}
     for(let fieldName in types[typeName]){
        transformed[fieldName] = transformer(types[typeName][fieldName])
     } // END for
    } // END if
    */result[typeName] = new graphql.GraphQLObjectType(transformed);
   } // END for
   return result
} // END toQLObjectType

//=====================================================
//======================================== GraphQL-Auto
//=====================================================

module.exports = function gqla(pathToApi,transformer) {
    let paths = pathToApi;
    if ("string" === typeof pathToApi) {
       paths = {
            args:path.join(pathToApi, "args"),
           types:path.join(pathToApi, "types"),
        handlers:path.join(pathToApi, "handlers"),
     middlewares:path.join(pathToApi, "middlewares")
       }
   }
   const        args = deepRequire(paths.args)
   const       types = deepRequire(paths.types)
   const middlewares = deepRequire(paths.middlewares)
   const { mutation, query, subscription } = flatAndGroup(deepRequire(paths.handlers,true))
   
   //console.log({args, mutation, query, subscriptions, types, middlewares})
   
   const typesToQLObjectType = toQLObjectType(types,transformer)
   
   const MutationType = new graphql.GraphQLObjectType({
    name   : 'Mutation',
    fields :  genQLMeta(typesToQLObjectType,args,middlewares,mutation)
   });
   
   const QueryType = new graphql.GraphQLObjectType({
    name   : 'Query',
    fields :  genQLMeta(typesToQLObjectType,args,middlewares,query)
   });
   
   return new graphql.GraphQLSchema({
    query : QueryType,
    mutation : MutationType
  });
} // END gqla
