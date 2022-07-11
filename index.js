'use strict';
  
const graphql    = require('graphql');
const deepRequire = require('./utils/deepRequire')

// polyfill for < Node 12
if(!String.prototype.matchAll) {
    String.prototype.matchAll = function (rx) {
        if (typeof rx === "string") rx = new RegExp(rx, "g"); // coerce a string to be a global regex
        rx = new RegExp(rx); // Clone the regex so we don't update the last index on the regex they pass us
        let cap = []; // the single capture
        let all = []; // all the captures (return this)
        while ((cap = rx.exec(this)) !== null) all.push(cap); // execute and add
        return all; // profit!
    };
}

//=====================================================
//============================================== helper
//=====================================================
//======================================= Wrap Resolver
//=====================================================

function genQLMeta(types, args, Resolves) {
   const result = {}
   for(let resolveName in Resolves){
        const resolveInfo = {
            resolve : (source, args, session, ast) => Resolves[resolveName]({source, args, session, ast})
        }
        Object.assign(resolveInfo, Resolves[resolveName].genMeta(types, args))
        result[resolveName] = resolveInfo
   } // END for
   return result
} // genQLMeta

function toQLObjectType(types,transformer) {

   const result = {}
   for(let typeName in types){
    let transformed = types[typeName]
    if (transformer) {
     transformed = {}
     for(let fieldName in types[typeName]){
        transformed[fieldName] = transformer(types[typeName][fieldName])
     } // END for
    } // END if
    result[typeName] = new graphql.GraphQLObjectType(transformed);
   } // END for
   return result
} // END toQLObjectType

//=====================================================
//======================================== GraphQL-Auto
//=====================================================

module.exports = function gqla(pathToApi,transformer) {
   const { args, mutations, querys, types } = deepRequire(pathToApi);
   
   const typesToQLObjectType = toQLObjectType(types,transformer)
   
   const MutationType = new graphql.GraphQLObjectType({
    name   : 'Mutation',
    fields :  genQLMeta(typesToQLObjectType,args,mutations)
   });
   
   const QueryType = new graphql.GraphQLObjectType({
    name   : 'Query',
    fields :  genQLMeta(typesToQLObjectType,args,querys)
   });
   
   return new graphql.GraphQLSchema({
    query : QueryType,
    mutation : MutationType
  });
} // END gqla
