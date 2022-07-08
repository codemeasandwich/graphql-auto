'use strict';
  
const graphql    = require('graphql');
const deepRequire = require('./deepRequire')

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
/*
const qlSchema = gqla(path.join(__dirname, '/example/api'))


graphql.graphql({ schema:qlSchema, source:'{ User(lastname:"ww"){name, fName:firstname, bio{about} } }' })
       .then((result) => {
  // Prints
  // {
  //   data: { hello: "world" }
  // }
  console.log(" ------ ",result);
});
*/


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

/* 
const CompanyType = new graphql.GraphQLObjectType({
   name: 'Company',
   description: 'Company',
   fields: {
      _id: {
         type: new graphql.GraphQLNonNull(graphql.GraphQLID)
      },
      name: {
         type: graphql.GraphQLString
      },
      a: {
         type: graphql.GraphQLString
      }
   }
})

const CompanyArgs = {
      id: {
         type: graphql.GraphQLString
      }
   }
   
const CompanyResolve = (root, params) => {
      return {
        _id:123,
        name:"abcd",
        a:'{}'
     };
   }

const Companies = {
   type: CompanyType,
   args: CompanyArgs,
   resolve:CompanyResolve
}

var schema = new graphql.GraphQLSchema({
   query: new graphql.GraphQLObjectType({
      name: 'Query',
      fields: { Companies }
   })
});

graphql.graphql({ schema, source:'{ Companies(id:"aa"){_id,name,a} }' })
       .then((result) => {
  // Prints
  // {
  //   data: { hello: "world" }
  // }
  console.log(" ------ ",result);
});*/



/*
schema = new graphql.GraphQLSchema({
  query: new graphql.GraphQLObjectType({
    name: 'query',
    fields: {
      User: {
          type: new graphql.GraphQLObjectType({
            name: 'Users',
            fields: {
                a:{ type: graphql.GraphQLString}
            }
        }),
        resolve() {
          return { a:"abc" };
        },
      },
    },
  }),
});
var source = '{ User {a} }';

graphql.graphql({ schema, source }).then((result) => {
  // Prints
  // {
  //   data: { hello: "world" }
  // }
  console.log(" ------ ",result);
});

*/





//=====================================================
//========================= WaterLine Model TO BackBone
//=====================================================
/*
function waterLineModelToBackBone(modelName, Model){
  
 var bluePrint = {  };

 for (let name in Model.attributes){
    
    var typeObj = Model.attributes[name];
        
    if ("string" === typeof typeObj){
        typeObj = { type : typeObj };
    }
    
    var arg = { name: name.splitCamileCase().join(' ') }
    
    switch(typeObj.type.toLowerCase()) {
        case "string":
        case "text":
        case "email":
        case "date":
        case "datetime":
        case "json":
        case "binary":
          arg.type = graphql.GraphQLString;
            break;
        case "integer":
          arg.type = graphql.GraphQLInt;
          break;
        case "float":
        case "number":
          arg.type = graphql.GraphQLFloat;
            break;
        case "boolean":
          arg.type = graphql.GraphQLBoolean;
            break;
        case "array":
        case "enum":
        default:
            throw new Error("Model type unknown. "+typeObj.type);
    }
    
    arg.type = (typeObj.required) ? new graphql.GraphQLNonNull(arg.type) : arg.type;
    
    bluePrint[name] = arg;
    
  }
  
  return bluePrint;
}*/

//=====================================================
//================================== basic Type Mapping
//=====================================================

function basicTypeMapping(type) {
     switch(type.toLowerCase()) {
     /*   case "enum":
          bluePrint.fields[name] = { type: graphql.GraphQLString };
            break;*/
        case "string":
        case "text":
        case "email":
          return graphql.GraphQLString;
            break;
        case "integer":
          return graphql.GraphQLInt;
          break;
        case "float":
       // case "number":
          return graphql.GraphQLFloat;
            break;
        case "date":
        case "datetime":
          return graphql.GraphQLString;//null;
            break;
        case "boolean":
          return graphql.GraphQLBoolean;
            break;
        case "binary":
          return graphql.GraphQLString;//0b0;
            break;
        case "array":
        //  return graphql.GraphQLScalarType;
        //return new graphql.GraphQLList(graphql.GraphQLScalarType)
        return new graphql.GraphQLList(graphql.GraphQLString)
        //break;
        //  bluePrint.fields[name] = [];
        //    break;
        case "json":
          return graphql.GraphQLString;//graphql.GraphQLObjectType;//{ type: graphql.GraphQLString };//{};
            break;
        default:
            throw new Error("Model type unknown. "+typeObj.type);
          
    } // END switch
} // END basicTypeMapping